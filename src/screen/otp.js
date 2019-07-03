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
		overRequest: false,
		overRequestUi: false,
		ref_no: this.props.root.ref_no,
		details: 3,
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
			const token = await AsyncStorage.getItem("access_token")

			this.props.velidateOtp(data, token) // Api ใช้สำหรับ OTP register และ accept
				.then(res => {
					console.log(res)
					if (res.success) {
						if (res.result.is_register) {
							this.props.navigateAction({ ...this.props, page: 'login', params: { user_token: res.result.user_token } })
						} else {
							this.props.navigateAction({ ...this.props, page: 'passcode' })
						}
						this.setState({ ...defaultDot, defaultKey: true })
					} else if (!res.success) {
						if (res.details === 6) {
							this.setState({
								overRequest: true,
								overRequestUi: true,
								details: res.details,
							})
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
		// const accept_term = this.props.navigation.getParam('accept_term', '')
		const accept_term = this.props.root.accept_term
		console.log(accept_term)
		const token = await AsyncStorage.getItem("access_token")

		const data = {
			id_card: user.profile.idCard.replace(/ /g, ''),
			email: (user.contact.email).trim().toLowerCase(),
			phone_no: user.contact.mobilePhone.replace(/ /g, ''),
		}

		this.props.requestOtp(data, token, { accept_term: accept_term ? false : null }) // Api ใช้สำหรับ OTP register และ accept
			.then(res => {
				if (res.success) {
					setTimeWaiting(res.details)
					this.setState({
						ref_no: res.result.ref_no,
						overRequestUi: false,
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
						start: this.props.root.time || (Date.now() / 1000),
						overRequest: this.state.overRequest,
						overRequestUi: this.state.overRequestUi,
						details: this.state.details,
						onPress: this.onPress,
						onPrevPage: () => this.props.navigation.goBack(),
						setState: () => this.setState({ overRequest: false }),
					})
				}

				{
					this.state.overRequestUi
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