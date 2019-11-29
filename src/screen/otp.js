import React from 'react'
import { View, Image, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import get from 'lodash/get'
import Keyboard from '../component/keyboard'
import Screen from '../component/screenComponent'
import { headerotp } from '../component/headSpace'
import { navigateAction, navigateReset } from '../redux/actions'
import colors from '../config/colors'
import { TLight, TBold, TMed } from '../component/texts'
import images from '../config/images'
import { velidateOtp, requestOtp } from '../redux/actions/root-active'
import { updateUser, root } from '../redux/actions/commonAction'
import typeModal from '../utility/typeModal'
import { errorMessage, otpMessage } from '../utility/messages'
import SecureKeyStore from "../utility/keyStore";

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
	updateUser: bindActionCreators(updateUser, dispatch),
	toggleModal: value => dispatch({ type: 'modal', value })
})

@connect(mapToProps, dispatchToProps)
export default class extends React.Component {
	state = {
		dot: [false, false, false, false, false, false],
		number: '',
		currentDot: '',
		ref_no: this.props.root.ref_no,
		defaultKey: false,
		timer: 180
	}

	// try and catch in root-active
	onVelidateOtp = (data, { token, currFlowUP }) => {
		try {
			const res = this.props.velidateOtp(data, { token, currFlowUP }) // Api Uses for OTP register and accept
			return res
		} catch (error) {
			this.setState({ ...defaultDot, defaultKey: true })
		}
	}

	// try and catch in root-active
	onRequestOtp = async (data, { token, currFlowUP }) => {
		const res = await this.props.requestOtp(data, { token, currFlowUP })
		return res
	}

	handleError = ({ code, details, message }) => {
		const time = get(details, 'time', 0)

		switch (code) {
			case '2101':
				this.props.toggleModal({
					...typeModal[otpMessage.preconditionRequired.code],
					dis: otpMessage.preconditionRequired.defaultMessage
				})
				break
			case '1001':
				this.props.updateRoot('time', time)
				this.props.updateRoot('overRequest', true) // status for tick reNew setInterval in headerotp
				this.props.updateRoot('overRequestUi', true)
				break
			case '1102':
				this.props.toggleModal({
					...typeModal[code],
					dis: message,
					labelBtn: typeModal[code].labelBtn('ไปหน้ากรอกข้อมูลเพื่อเปิดบัญชีฯ'),
					onPress: () => {
						typeModal[code].onPress('welcome')
						this.props.updateUser('profile', { ...this.props.user.profile, idCard: '' })
						this.props.updateUser('contact', { ...this.props.user.contact, mobilePhone: '', email: '', })
					},
				})
				break
			default:
				this.props.toggleModal({ ...typeModal[code], dis: message, })
				break
		}
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

			const res = await this.onVelidateOtp(data, { token, currFlowUP })

			const success = get(res, 'success', false)
			const code = get(res, 'code', errorMessage.requestError.code)
			const details = get(res, 'details', null)
			const message = get(res, 'message', errorMessage.requestError.defaultMessage)

			if (success) {
				const isRegister = get(res, 'result.is_register', false)
				const userToken = get(res, 'result.user_token', null)

				if (isRegister && userToken) {
					this.props.navigateAction({ ...this.props, page: 'login', params: { user_token: userToken } })
					SecureKeyStore.set("user_token", userToken)
	  
				} else {
					this.props.navigateAction({ ...this.props, page: 'passcode' })
				}

				this.setState({ ...defaultDot, defaultKey: true })
			} else {
				this.handleError({ code, details, message })
				this.setState({ ...defaultDot, defaultKey: true })
			}
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
		const token = this.props.root.access_token

		const data = {
			id_card: user.profile.idCard.replace(/ /g, ''),
			email: (user.contact.email).trim().toLowerCase(),
			phone_no: user.contact.mobilePhone.replace(/ /g, ''),
		}

		const res = await this.onRequestOtp(data, { token, currFlowUP: this.props.root.currFlowUP })

		const success = get(res, 'success', false)
		const refNo = get(res, 'result.ref_no', '')

		setTimeWaiting(success)

		if (success) {
			this.props.updateRoot('overRequestUi', false)
			this.setState({ ref_no: refNo, defaultKey: true, ...defaultDot })
		}
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
						timer: this.props.root.time,
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