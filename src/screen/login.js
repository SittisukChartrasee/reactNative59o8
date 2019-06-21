import React from 'react'
import {AsyncStorage} from 'react-native'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {withApollo} from 'react-apollo'
import Keyboard from '../component/keyboard'
import Screen from '../component/screenComponent'
import {HeadSpace} from '../component/headSpace'
import {navigateAction} from '../redux/actions'
import {requestLogin} from '../redux/actions/root-active'
import {updateUser} from '../redux/actions/commonAction'
import {containerQuery, getStatus} from '../containers/query'
import {formatIdCard, formatPhoneNumber} from '../utility/helper'

const mapToProps = ({user}) => ({user})
const dispatchToProps = dispatch => ({
	navigateAction: bindActionCreators(navigateAction, dispatch),
	requestLogin: bindActionCreators(requestLogin, dispatch),
	updateUser: bindActionCreators(updateUser, dispatch),
})
@connect(mapToProps, dispatchToProps)
@withApollo
export default class extends React.Component {
	state = {
		defaultPasscode: {
			dot: ['', '', '', '', '', ''],
			number: '',
		},
		dot: ['', '', '', '', '', ''],
		number: '',
		defaultKey: false,
		dis: '',
		countPassFail: 0
	}


	setNumber = async obj => {
		let userToken = await AsyncStorage.getItem('user_token')
		if (!userToken) userToken = this.props.navigation.getParam('user_token', '')
		const {user} = this.props
		const {defaultPasscode} = this.state
		this.setState({...obj})

		if (obj.number.length === 6) {
			this.props.requestLogin({userToken, password: obj.number})
					.then(res => {
						// console.log(res)
						if (res.success) {
							AsyncStorage.setItem('access_token', res.result.access_token)
							AsyncStorage.setItem('user_token', userToken)

							this.props.updateUser('profile', {
								...user.profile,
								'idCard': formatIdCard(res.result.id_card)
							})

							this.props.updateUser('contact', {
								...user.contact,
								mobilePhone: formatPhoneNumber(res.result.phone_no),
								email: res.result.email
							})

							containerQuery(
									this.props.client,
									{query: getStatus},
									this.onHandleChooseScreen
							)
						} else if (!res.success) {
							return this.setState({countPassFail: this.state.countPassFail + 1}, () => {
								if (this.state.countPassFail > 3) return this.props.navigateAction({...this.props, page: 'lockUser'})
							})
						}
					})
					.catch(err => {
						console.log(err)
					})
		}
	}

	onHandleChooseScreen = val => {
		switch (val.data.getStatus) {
			case 'Approved':
				this.props.navigateAction({...this.props, page: 'confirmAccount'})
				break

			case 'InProgress':
				this.props.navigateAction({...this.props, page: 'checkpoint'})
				break

			case 'WaitingApprove':
				this.props.navigateAction({...this.props, page: 'waiting'})
				break

			case 'Editing':
				this.props.navigateAction({...this.props, page: 'softReject'})
				break

			default: // Rejected
				this.props.navigateAction({...this.props, page: 'statusApprove', params: {status: 'Rejected'}})
				break
		}
	}

	render() {
		const {dot, defaultKey} = this.state
		return (
				<Screen>
					<HeadSpace
							{...{
								dot,
								title: 'กรุณากรอกรหัสผ่าน',
								// onPrevPage: () => this.props.navigation.goBack(),
								onPrevPage: () => AsyncStorage.clear(),
								forgetbtn: () => this.props.navigateAction({...this.props, page: 'forgetPasscode'})
							}}
					/>
					<Keyboard setNumber={this.setNumber} defaultKey={defaultKey}/>
				</Screen>
		)
	}
}