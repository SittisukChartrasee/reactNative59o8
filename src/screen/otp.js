import React from 'react'
import { View, Image, TouchableOpacity, AsyncStorage } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Keyboard from '../component/keyboard'
import Screen from '../component/screenComponent'
import { headerotp } from '../component/headSpace'
import { navigateAction, navigateReset } from '../redux/actions'
import colors from '../config/colors'
import { TLight, TBold, TMed } from '../component/texts'
import images from '../config/images'
import { velidateOtp, requestOtp } from '../redux/actions/root-active'
import { root } from '../redux/actions/commonAction'

const defaultDot = {
	dot: [false, false, false, false, false, false],
	number: '',
	currentDot: '',
}

const mapToProps = ({ root, user }) => ({ root, user })
const dispatchToProps = dispatch => ({
	navigateAction: bindActionCreators(navigateAction, dispatch),
	navigateReset: bindActionCreators(navigateReset, dispatch),
	requestOtp: bindActionCreators(requestOtp, dispatch),
	velidateOtp: bindActionCreators(velidateOtp, dispatch),
	updateRoot: bindActionCreators(root, dispatch),
})

@connect(mapToProps, dispatchToProps)
export default class extends React.Component {
	state = {
		dot: [false, false, false, false, false, false],
		number: '',
		currentDot: '',
		ref_no: this.props.root.ref_no,
		defaultKey: false,
	}

	setNumber = async (obj) => {
		const data = {
			trans_id: this.props.root.trans_id,
			ref_no: this.props.root.ref_no,
			phone_no: this.props.root.phone_no,
			secret: obj.number,
		}

		this.setState({ ...obj })

		if (obj.key === 'del') this.setState({ currentDot: '•' })
		else obj.dot.map(d => d && this.delayDot(d))

		if (obj.number.length === 6) {
			const token = this.props.root.access_token
			const currFlowUP = this.props.root.currFlowUP

			this.props.velidateOtp(data, { token, currFlowUP }) // Api ใช้สำหรับ OTP register และ accept
				.then(res => {
					if (res.success) {
						if (res.result.is_register) {
							this.props.navigateAction({ ...this.props, page: 'login', params: { user_token: res.result.user_token } })
						} else {
							this.props.navigateAction({ ...this.props, page: 'passcode' })
						}
						this.setState({ ...defaultDot, defaultKey: true })
					} else if (!res.success) {
						if (res.details && res.details.code === '1001') {
							this.props.updateRoot('time', res.details.time)
							this.props.updateRoot('overRequest', true)
							this.props.updateRoot('overRequestUi', true)
						}
						this.setState({ ...defaultDot, defaultKey: true })
					}
				})
				.catch(err => {
					console.log(err)
				})
		}
	}

	delayDot = (number) => {
		this.setState({ currentDot: number })
		setTimeout(() => {
			this.setState({ currentDot: '•' })
		}, 200)
	}

	onPress = async setTimeWaiting => {
		const { user } = this.props
		const token = await AsyncStorage.getItem("access_token")

		const data = {
			id_card: user.profile.idCard.replace(/ /g, ''),
			email: (user.contact.email).trim().toLowerCase(),
			phone_no: user.contact.mobilePhone.replace(/ /g, ''),
		}

		this.props.requestOtp(data, { token }) // Api ใช้สำหรับ OTP register และ accept
			.then(res => {
				if (res.success) {
					setTimeWaiting()
					this.props.updateRoot('overRequestUi', false)
					this.setState({
						ref_no: res.result.ref_no,
						defaultKey: true,
						...defaultDot
					})
				}
			})
			.catch(err => {
				console.log(err)
			})
	}

	render() {
		const { ref_no, defaultKey } = this.state
		return (
			<Screen>
				{
					headerotp({
						dot: this.state.dot,
						currentDot: this.state.currentDot,
						refNo: ref_no || null,
						timer: this.props.root.time || (Date.now() / 1000),
						text: this.props.root.overRequestUi ? '6' : '3',
						overRequest: this.props.root.overRequest,
						overRequestUi: this.props.root.overRequestUi,
						onPress: this.onPress,
						onPrevPage: () => this.props.navigation.goBack(),
						setState: () => this.props.updateRoot('overRequest', false),
					})
				}

				{
					this.props.root.overRequestUi
						? (
							<View style={{ flex: 1, backgroundColor: colors.white, marginTop: -40 }}>
								<TBold color={colors.softRed}>ท่านกรอกผิดเกินจำนวนครั้งที่กำหนด</TBold>
							</View>
						) : <Keyboard setNumber={this.setNumber} defaultKey={defaultKey} />
				}

			</Screen>
		)
	}
}