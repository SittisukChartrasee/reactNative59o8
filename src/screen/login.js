import React from 'react'
import { AsyncStorage, Platform, NativeModules } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withApollo } from 'react-apollo'
import DeviceInfo from 'react-native-device-info'
import get from 'lodash/get'
import Keyboard from '../component/keyboard'
import Screen from '../component/screenComponent'
import { HeadSpace } from '../component/headSpace'
import { navigateAction } from '../redux/actions'
import { requestLogin } from '../redux/actions/root-active'
import { root, fatca, suittest, updateUser } from '../redux/actions/commonAction'
import getnativeModules from '../containers/hoc/infoAppNativeModules'
import typeModal from '../utility/typeModal'
import { getStatus, getUser, getSubmit, checkVerifiedEmail } from '../containers/query'
import { formatIdCard, formatPhoneNumber, } from '../utility/helper'
import { userDataToProps } from '../schemaData/userData'
import releaseApp from '../../release/releaseApp.json'

const defaultPasscode = {
	dot: ['', '', '', '', '', ''],
	number: '',
}

const mapToProps = ({ root, user, fatcaReducer, suitReducer }) => ({ root, user, fatcaReducer, suitReducer })
const dispatchToProps = dispatch => ({
	navigateAction: bindActionCreators(navigateAction, dispatch),
	requestLogin: bindActionCreators(requestLogin, dispatch),
	updateUser: bindActionCreators(updateUser, dispatch),
	updateRoot: bindActionCreators(root, dispatch),
	updateFatca: bindActionCreators(fatca, dispatch),
	updateSuittest: bindActionCreators(suittest, dispatch),
	toggleModal: value => dispatch({ type: 'modal', value })
})
@connect(mapToProps, dispatchToProps)
@getnativeModules
@withApollo
export default class extends React.Component {
	state = {
		dot: ['', '', '', '', '', ''],
		number: '',
		defaultKey: false,
		dis: '',
	}

	onGetUser = async () => {
		try {
			const res = await this.props.client.query({ query: getUser })

			const success = get(res.data.getUser, 'success', false)

			if (success) {
				const result = get(res.data.getUser, 'result', {})

				return userDataToProps({
					result,
					updateUser: this.props.updateUser,
					updateFatca: this.props.updateFatca,
					updateSuittest: this.props.updateSuittest,
					userProps: this.props.user,
					fatcaProps: this.props.fatcaReducer,
					suittestProps: this.props.suitReducer
				})

			}

		} catch (error) {
			this.props.toggleModal({
				...typeModal['1103'],
				dis: 'เกิดข้อผิดพลาด กรุณาเข้าสู่ระบบใหม่อีกครั้ง ขออภัยในความไม่สะดวก',
			})
		}
	}

	onGetStatus = async ({ password }) => {
		try {
			const res = await this.props.client.query({ query: getStatus })
			this.onHandleChooseScreen({ res, password })
		} catch (error) {
			this.props.toggleModal({
				...typeModal['1103'],
				dis: 'เกิดข้อผิดพลาด กรุณาเข้าสู่ระบบใหม่อีกครั้ง ขออภัยในความไม่สะดวก',
			})
		}
	}

	onCheckSubmit = async () => {
		try {
			const res = await this.props.client.query({ query: getSubmit })
			return res.data.getSubmit
		} catch (error) {
			return false
		}
	}

	onCheckVerifiedEmail = async () => {
		try {
			const res = await this.props.client.query({ query: checkVerifiedEmail })
			return res.data.checkVerifiedEmail
		} catch (error) {
			return false
		}
	}

	onRequestLogin = async ({ userToken, obj }) => {
		try {

			const res = await this.props.requestLogin({
				userToken,
				password: obj.number,
				type: Platform.OS,
				fcm_token: this.props.fcm,
				version: this.props.version,
				system_version: DeviceInfo.getSystemVersion(),
				device_id: this.props.deviceInfo
			})

			return res

		} catch (error) {
			this.props.toggleModal({
				...typeModal['1103'],
				dis: 'เกิดข้อผิดพลาด กรุณาเข้าสู่ระบบใหม่อีกครั้ง ขออภัยในความไม่สะดวก',
			})
		}
	}

	setNumber = async obj => {

		let userToken = await AsyncStorage.getItem('user_token')
		if (!userToken) userToken = this.props.navigation.getParam('user_token', '')

		this.setState({ ...obj })

		if (obj.number.length === 6) {

			this.props.updateRoot('loading', true)

			const requestLogin = await this.onRequestLogin({ userToken, obj })

			if (requestLogin.success) {
				AsyncStorage.setItem('access_token', requestLogin.result.access_token)
				AsyncStorage.setItem('user_token', userToken)

				NativeModules.KMyFundOnboarding.saveUserToken(userToken)

				this.props.updateUser('profile', {
					...this.props.user.profile,
					'idCard': formatIdCard(requestLogin.result.id_card)
				})

				this.props.updateUser('contact', {
					...this.props.user.contact,
					mobilePhone: formatPhoneNumber(requestLogin.result.phone_no),
					email: requestLogin.result.email
				})

				this.onGetStatus({ password: obj.number })
				this.onGetUser()

				this.props.updateRoot('loading', false)

			} else if (!requestLogin.success) {
				this.setState({ ...defaultPasscode, defaultKey: true })
				this.handleErrorLogin({ code: requestLogin.code, message: requestLogin.message })
			}
		}
	}

	handleErrorLogin = ({ code, message }) => {
		switch (code) {
			case '1000':
				this.props.navigateAction({ ...this.props, page: 'lockUser' })
				break
			case '1104':
				this.props.toggleModal({
					...typeModal[code],
					dis: message,
					labelBtn: typeModal[code].labelBtn('ลองใหม่'),
				})
				break
			default:
				this.props.toggleModal({
					...typeModal[code],
					dis: message,
				})
				break
		}
	}

	onHandleCheckScreen = async () => {
		const checkSubmit = await this.onCheckSubmit()
		const checkVerified = await this.onCheckVerifiedEmail()

		if (checkSubmit) {
			if (checkVerified) {
				return this.props.navigateAction({ ...this.props, page: 'waiting' })
			} else {
				return this.props.navigateAction({ ...this.props, page: 'verifyEmail' })
			}
		} else {
			return this.props.navigateAction({ ...this.props, page: 'checkpoint' })
		}
	}

	onHandleChooseScreen = ({ res, password }) => {
		NativeModules.KMyFundOnboarding.saveRegisterFlag(NativeModules.KMyFundOnboarding.STATUS_NEW_CUSTOMER)
		switch (res.data.getStatus) {
			case 'Approved':
				this.props.updateRoot('password', password)
				this.props.navigateAction({ ...this.props, page: 'confirmAccount' })
				break

			case 'InProgress':
				this.onHandleCheckScreen()
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
		return (
			<Screen>
				<HeadSpace
					{...{
						dot,
						title: 'กรุณากรอกรหัสผ่าน',
						onPrevPage: () => releaseApp.modeDev
							? AsyncStorage.clear()
							: NativeModules.KMyFundOnboarding.finishActivity(),
						forgetbtn: () => this.props.navigateAction({ ...this.props, page: 'forgetPasscode' })
					}}
				/>
				<Keyboard setNumber={this.setNumber} defaultKey={defaultKey} />
			</Screen>
		)
	}
}