import React from 'react'
import { AsyncStorage } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import moment from 'moment-timezone'
import { withApollo } from 'react-apollo'
import Keyboard from '../component/keyboard'
import Screen from '../component/screenComponent'
import { HeadSpace } from '../component/headSpace'
import { navigateAction } from '../redux/actions'
import { requestLogin } from '../redux/actions/root-active'
import { updateUser } from '../redux/actions/commonAction'
import { containerQuery, getStatus, getUser } from '../containers/query'
import {
	formatIdCard,
	formatPhoneNumber,
	convertDate_reverse,
	getStatusGender_reverse,
	getStatusMartial_reverse,
	month,
	tomorrowDate
} from '../utility/helper'

const defaultPasscode = {
	dot: ['', '', '', '', '', ''],
	number: '',
}

const momentDate = date => moment(date).tz('Asia/Bangkok')

const mapToProps = ({ user }) => ({ user })
const dispatchToProps = dispatch => ({
	navigateAction: bindActionCreators(navigateAction, dispatch),
	requestLogin: bindActionCreators(requestLogin, dispatch),
	updateUser: bindActionCreators(updateUser, dispatch),
})
@connect(mapToProps, dispatchToProps)
@withApollo
export default class extends React.Component {
	state = {
		dot: ['', '', '', '', '', ''],
		number: '',
		defaultKey: false,
		dis: '',
		countPassFail: 0
	}


	setNumber = async obj => {
		let userToken = await AsyncStorage.getItem('user_token')
		if (!userToken) userToken = this.props.navigation.getParam('user_token', '')
		const { user } = this.props
		this.setState({ ...obj })

		if (obj.number.length === 6) {
			this.props.requestLogin({ userToken, password: obj.number })
				.then(async res => {
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

						await this.props.client.query({ query: getUser })
							.then((val) => this.onHandletesttest(val))
							.catch(err => console.error(err))

						await containerQuery(
							this.props.client,
							{ query: getStatus },
							this.onHandleChooseScreen
						)

					} else if (!res.success) {
						this.setState({
							...defaultPasscode,
							defaultKey: true,
							countPassFail: this.state.countPassFail + 1
						},
							() => {
								if (this.state.countPassFail > 3) return this.props.navigateAction({ ...this.props, page: 'lockUser' })
							}
						)
					}
				})
				.catch(err => {
					console.log(err)
				})
		}
	}

	onHandletesttest = val => {
		if (val.data.getUser.success) {

			const identityDocExpDate = momentDate(val.data.getUser.result.identity.docExpDate)._a

			this.props.updateUser('profile', {
				...this.props.user.profile,
				'isNoDocExpDate': val.data.getUser.result.identity.isNoDocExpDate,
				expireDateFlag: val.data.getUser.result.identity.isNoDocExpDate ? 'ไม่มีวันหมดอายุ' : 'มีวันหมดอายุ',
				'docExpDate': val.data.getUser.result.identity.isNoDocExpDate ? `${tomorrowDate()[2]}-${tomorrowDate()[1]}-${tomorrowDate()[0]}` : convertDate_reverse(identityDocExpDate),
				'genderCode': val.data.getUser.result.identity.genderCode,
				'gender': getStatusGender_reverse(val.data.getUser.result.identity.genderCode),
				'titleTH': val.data.getUser.result.identity.titleTH,
				'firstNameTH': val.data.getUser.result.identity.firstNameTH,
				'lastNameTH': val.data.getUser.result.identity.lastNameTH,
				'firstNameEN': val.data.getUser.result.identity.firstNameEN,
				'lastNameEN': val.data.getUser.result.identity.lastNameEN,
				'birthDay': `${val.data.getUser.result.identity.dayOfBirth}/${month[parseInt(val.data.getUser.result.identity.monthOfBirth) - 1]}/${val.data.getUser.result.identity.yearOfBirth}`,
				'dayOfBirth': val.data.getUser.result.identity.dayOfBirth,
				'monthOfBirth': val.data.getUser.result.identity.monthOfBirth,
				'yearOfBirth': val.data.getUser.result.identity.yearOfBirth,
				'nationalityCode': val.data.getUser.result.identity.nationalityCode,
				'martialStatusCode': val.data.getUser.result.identity.martialStatusCode,
				'martialStatus': getStatusMartial_reverse(val.data.getUser.result.identity.martialStatusCode),
				'isChild': val.data.getUser.result.identity.isChild ? 'มี' : 'ไม่มี',
			})

			// const spouseDocExpDate = momentDate(val.data.getUser.result.identity.docExpDate)._a
			// console.log(val.data.getUser.result.spouse)

			// this.props.updateUser('profile', {
			// 	...this.props.user.profile,
			// 	'isNoDocExpDate': val.data.getUser.result.spouse.isNoDocExpDate,
			// 	expireDateFlag: val.data.getUser.result.spouse.isNoDocExpDate ? 'ไม่มีวันหมดอายุ' : 'มีวันหมดอายุ',
			// 	'docExpDate': val.data.getUser.result.spouse.isNoDocExpDate ? `${tomorrowDate()[2]}-${tomorrowDate()[1]}-${tomorrowDate()[0]}` : convertDate_reverse(identityDocExpDate),
			// 	'genderCode': val.data.getUser.result.spouse.genderCode,
			// 	'gender': getStatusGender_reverse(val.data.getUser.result.identity.genderCode),
			// 	'titleTH': val.data.getUser.result.spouse.titleTH,
			// 	'firstNameTH': val.data.getUser.result.spouse.firstNameTH,
			// 	'lastNameTH': val.data.getUser.result.spouse.lastNameTH,
			// 	'firstNameEN': val.data.getUser.result.spouse.firstNameEN,
			// 	'lastNameEN': val.data.getUser.result.spouse.lastNameEN,
			// 	'birthDay': `${val.data.getUser.result.spouse.dayOfBirth}/${month[parseInt(val.data.getUser.result.identity.monthOfBirth) - 1]}/${val.data.getUser.result.identity.yearOfBirth}`,
			// 	'dayOfBirth': val.data.getUser.result.spouse.dayOfBirth,
			// 	'monthOfBirth': val.data.getUser.result.spouse.monthOfBirth,
			// 	'yearOfBirth': val.data.getUser.result.spouse.yearOfBirth,
			// 	'nationalityCode': val.data.getUser.result.spouse.nationalityCode,
			// 	'martialStatusCode': val.data.getUser.result.spouse.martialStatusCode,
			// 	'martialStatus': getStatusMartial_reverse(val.data.getUser.result.spouse.martialStatusCode),
			// 	'isChild': val.data.getUser.result.spouse.isChild ? 'มี' : 'ไม่มี',
			// })
		}
	}

	onHandleChooseScreen = val => {
		switch (val.data.getStatus) {
			case 'Approved':
				this.props.navigateAction({ ...this.props, page: 'confirmAccount' })
				break

			case 'InProgress':
				this.props.navigateAction({ ...this.props, page: 'checkpoint' })
				break

			case 'WaitingApprove':
				this.props.navigateAction({ ...this.props, page: 'waiting' })
				break

			case 'Editing':
				this.props.navigateAction({ ...this.props, page: 'softReject' })
				break

			default: // Rejected
				this.props.navigateAction({ ...this.props, page: 'statusApprove', params: { status: 'Rejected' } })
				break
		}
	}

	render() {
		const { dot, defaultKey } = this.state

		// console.log(
		// 	AsyncStorage.getItem('access_token'),
		// 	AsyncStorage.getItem('user_token')
		// )
		return (
			<Screen>
				<HeadSpace
					{...{
						dot,
						title: 'กรุณากรอกรหัสผ่าน',
						// onPrevPage: () => this.props.navigation.goBack(),
						onPrevPage: () => AsyncStorage.clear(),
						forgetbtn: () => this.props.navigateAction({ ...this.props, page: 'forgetPasscode' })
					}}
				/>
				<Keyboard setNumber={this.setNumber} defaultKey={defaultKey} />
			</Screen>
		)
	}
}