import React from 'react'
import {
	View,
	TouchableOpacity,
	Dimensions,
	ScrollView,
	Image
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
import lockout from '../../containers/hoc/lockout'
import { checkVerifiedEmail, getWaitingApprove } from '../../containers/query'
import setMutation from '../../containers//mutation'
import typeModal from '../../utility/typeModal'

const { width: widthView } = Dimensions.get('window')

const mapToProps = () => ({})
const dispatchToProps = dispatch => ({
	navigateAction: bindActionCreators(navigateAction, dispatch),
	toggleModal: value => dispatch({ type: 'modal', value })
})
@connect(mapToProps, dispatchToProps)
@lockout
@withApollo
@setMutation
export default class extends React.Component {

	onSubmit = async () => {
		try {
			const res = await this.props.saveSubmit()
			return res.data.saveSubmit.success
		} catch (error) {
			return this.props.toggleModal({
				...typeModal['1103'],
				dis: 'เกิดข้อผิดพลาด กรุณาเข้าสู่ระบบใหม่อีกครั้ง ขออภัยในความไม่สะดวก',
			})
		}
	}

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

	onCheckVerifiedEmail = async () => {
		try {
			const res = await this.props.client.query({ query: checkVerifiedEmail, fetchPolicy: "no-cache" })
			return res.data.checkVerifiedEmail
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

	onNext = async () => {

		const submit = await this.onSubmit()
		const checkVerified = await this.onCheckVerifiedEmail()

		if (!checkVerified) {
			return this.props.navigateAction({ ...this.props, page: 'verifyEmail' })
		} else if (submit) {

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
	}

	render() {
		return (
			<Screen>
				<NavBar
					color="transparent"
					title="ยืนยันการสมัคร"
					navLeft={
						<TouchableOpacity
							onPress={() => this.props.navigation.goBack()}
							style={{ paddingRight: 30 }}
						>
							<Image source={images.iconback} />
						</TouchableOpacity>
					}
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
						<Image source={images.iconPlete} style={{ width: widthView * .6, marginBottom: 53 }} resizeMode="contain" />
						<TBold color={colors.white} mb={24}>ท่านได้กรอกข้อมูลครบถ้วนแล้ว</TBold>
						<TBold color={colors.white}
							mb={24}>{
								widthView <= 320 ?
									`ข้าพเจ้าขอรับรองว่าข้อมูลที่ให้ไว้กับบลจ.กสิกรไทย มีความถูกต้องและเป็นจริงทุกประการ ทั้งนี้ ข้าพเจ้ารับทราบว่าข้อมูลดังกล่าวจะมีผลต่อการแนะนำพอร์ตการลงทุนที่เหมาะสม ` :
									`ข้าพเจ้าขอรับรองว่าข้อมูลที่ให้ไว้กับ\nบลจ.กสิกรไทย มีความถูกต้องและเป็นจริง\nทุกประการ ทั้งนี้ ข้าพเจ้ารับทราบว่าข้อมูลดัง\nกล่าวจะมีผลต่อการแนะนำพอร์ตการลงทุนที่เหมาะสม `
							}</TBold>
						<TLight
							color={colors.white}>{
								widthView <= 320 ?
									`กรุณากดปุ่ม “ยืนยันเปิดบัญชีกองทุน” เพื่อยืนยันการส่งข้อมูลเปิดบัญชีกองทุนของท่านไปยัง บริษัท หลักทรัพย์จัดการกองทุนกสิกรไทย จำกัด` :
									`กรุณากดปุ่ม “ยืนยันเปิดบัญชีกองทุน” เพื่อยืนยัน\nการส่งข้อมูลเปิดบัญชีกองทุนของท่านไปยัง\nบริษัท หลักทรัพย์จัดการกองทุนกสิกรไทย จำกัด`
							}</TLight>
					</View>
				</ScrollView>

				<View style={{ paddingBottom: 44 }}>
					<LongButton
						label="ยืนยันเปิดบัญชีลงทุน"
						style={{ marginHorizontal: 24 }}
						onPress={this.onNext}
					/>
				</View>
			</Screen>
		)
	}
}