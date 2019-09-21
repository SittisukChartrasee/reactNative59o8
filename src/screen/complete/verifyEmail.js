import React from 'react'
import {
	View,
	TouchableOpacity,
	Dimensions,
	Image,
	ScrollView,
	AppState
} from 'react-native'
import { bindActionCreators } from 'redux'
import { withApollo } from 'react-apollo'
import { connect } from 'react-redux'
import Screen from '../../component/screenComponent'
import { NavBar } from '../../component/gradient'
import { TText, TBold, TSemiBold, TLight } from '../../component/texts'
import colors from '../../config/colors'
import { LongButton } from '../../component/button'
import images from '../../config/images'
import { navigateAction } from '../../redux/actions'
import { updateUser, root } from '../../redux/actions/commonAction'
import lockout from '../../containers/hoc/lockout'
import setMutation from '../../containers/mutation'
import { checkVerifiedEmailInterval, getWaitingApprove } from '../../containers/query'
import typeModal from '../../utility/typeModal'

const { width: widthView } = Dimensions.get('window')

const mapToProps = ({ user, root }) => ({ user, root })
const dispatchToProps = dispatch => ({
	navigateAction: bindActionCreators(navigateAction, dispatch),
	updateUser: bindActionCreators(updateUser, dispatch),
	updateRoot: bindActionCreators(root, dispatch),
	toggleModal: value => dispatch({ type: 'modal', value })
})
@connect(mapToProps, dispatchToProps)
@lockout
@setMutation
@withApollo
@checkVerifiedEmailInterval
export default class extends React.Component {

	componentWillReceiveProps = newProps => {
		if (this.props.checkVerifiedEmailInterval.checkVerifiedEmail !== newProps.checkVerifiedEmailInterval.checkVerifiedEmail)
			if (newProps.checkVerifiedEmailInterval.checkVerifiedEmail === true) {
				newProps.checkVerifiedEmailInterval.stopPolling()
				this.handleWaitingApprove()
			}
	}

	componentWillUnmount = () => this.props.checkVerifiedEmailInterval.stopPolling()

	onInProgressToWaitingApprove = async () => {
		try {
			const res = await this.props.inProgressToWaitingApprove()
			return res.data.inProgressToWaitingApprove.success
		} catch (error) {
			return this.props.toggleModal({
				...typeModal['1103'],
				dis: 'เกิดข้อผิดพลาด กรุณาเข้าสู่ระบบใหม่อีกครั้ง ขออภัยในความไม่สะดวก',
			})
		}
	}

	onGetWaitingApprove = async () => {
		try {
			const res = await this.props.client.query({ query: getWaitingApprove, fetchPolicy: "no-cache" })
			return res.data.getWaitingApprove
		} catch (error) {
			return this.props.toggleModal({
				...typeModal['1103'],
				dis: 'เกิดข้อผิดพลาด กรุณาเข้าสู่ระบบใหม่อีกครั้ง ขออภัยในความไม่สะดวก',
			})
		}
	}

	handleWaitingApprove = async () => {

		const waitingApproveState = await this.onGetWaitingApprove()

		if (waitingApproveState) {
			return this.props.navigateAction({ ...this.props, page: 'waiting' })
		} else {
			const saveInprogressToWaitingApprove = await this.onInProgressToWaitingApprove()
			
			if (saveInprogressToWaitingApprove) {
				return this.props.navigateAction({ ...this.props, page: 'waiting' })
			}
		}
	}

	onPressResendEmail = async () => {
		try {
			const res = await this.props.resendEmail()
			return res.data.resendEmail.success
		} catch (error) {
			return this.props.toggleModal({
				...typeModal['1103'],
				dis: 'เกิดข้อผิดพลาด กรุณาทำรายการใหม่อีกครั้ง ขออภัยในความไม่สะดวก',
			})
		}
	}

	onNext = async () => {
		const { user } = this.props
		const { email } = user.contact

		const resendEmail = await this.onPressResendEmail()

		if (resendEmail) {
			this.props.toggleModal({
				...typeModal['1103'],
				dis: `ระบบได้จัดส่งลิงก์ (Link) สำหรับยืนยันตัวตน\nไปยัง Email ของท่านแล้วกรุณาตรวจสอบ\n${email}`,
			})
		}
	}

	render() {
		const { user } = this.props
		const { email } = user.contact

		return (
			<Screen>
				<NavBar
					color="transparent"
					title="ยืนยันที่อยู่อีเมล"
					navRight={
						<TouchableOpacity
							onPress={() => this.props.lockout()}
							style={{ paddingLeft: 30 }}
						>
							<Image source={images.iconlogoOff} />
						</TouchableOpacity>
					}
				/>

				<ScrollView
					showsVerticalScrollIndicator={false}
					contentContainerStyle={{ flexGrow: 1 }}
				>
					<View style={{ flex: 1, alignItems: 'center', paddingTop: '12%', paddingHorizontal: 24 }}>
						<Image source={images.iconVerifyEmail} style={{ width: widthView * .6, marginBottom: 53 }} resizeMode="contain" />
						<View style={{ flex: 1 }}>
							<TBold color={colors.white} mb={24}>กรุณายืนยันที่อยู่อีเมล</TBold>
							<TLight
								mb={24}
								color={colors.white}
							>
								{
									widthView <= 320 ?
										`ระบบได้จัดส่งลิงก์ (Link) สำหรับยืนยันตัวตนไปยัง Email ของท่าน\n${email}\nกรุณาคลิกลิงก์ (Link) เพื่อดำเนินการต่อ` :
										`ระบบได้จัดส่งลิงก์ (Link) สำหรับยืนยันตัวตน\nไปยัง Email ของท่าน\n${email}\nกรุณาคลิกลิงก์ (Link) เพื่อดำเนินการต่อ`
								}
							</TLight>
							<View style={{ flex: 1, justifyContent: 'flex-end', paddingBottom: 12 }}>
								<TLight color={colors.white}>{`หากมีข้อสงสัยกรุณาติดต่อ\n02 673 3888 กด 1 และ กด 1`}</TLight>
							</View>
						</View>
					</View>
				</ScrollView>

				<View style={{ paddingBottom: 44 }}>
					<LongButton
						label="ส่งอีเมลยืนยันอีกครั้ง"
						bgTransparent
						style={{ marginHorizontal: 24 }}
						onPress={this.onNext}
					/>
				</View>
			</Screen>
		)
	}
}