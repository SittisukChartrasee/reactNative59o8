import React from 'react'
import {
	View,
	TouchableOpacity,
	Dimensions,
	Image,
	ScrollView
} from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Screen from '../../component/screenComponent'
import { NavBar } from '../../component/gradient'
import { TText, TBold, TSemiBold, TLight } from '../../component/texts'
import colors from '../../config/colors'
import { LongButton } from '../../component/button'
import images from '../../config/images'
import { navigateAction } from '../../redux/actions'
import queryStatus, { checkVerifiedEmail } from '../../containers/query'

const { width: widthView } = Dimensions.get('window')

const renderText = (caseStatus) => {
	const bankName = this.props.navigation.getParam('bankName', '')

	if (caseStatus === 'FAIL') {
		return {
			title: 'เชื่อมบัญชีธนาคารไม่สำเร็จ',
			des: `กรุณาตรวจสอบกับธนาคารที่ท่านเลือก\n1. แอปพลิเคชันธนาคารเป็นเวอร์ชันล่าสุดหรือไม่\n2. ข้อมูลบัญชีธนาคาร หรือข้อมูลที่ให้ไว้\nกับธนาคารไม่ถูกต้อง`,
			image: images.iconFailBank,
			titleBtn: 'ลองอีกครั้ง',
			page: 'chooseBank',
		}
	} else if (caseStatus === 'SUCCESS') {
		return {
			title: 'เชื่อมบัญชีธนาคารสำเร็จ',
			des: 'ท่านได้ดำเนินการเชื่อมบัญชีสำเร็จแล้ว',
			image: images.iconPassBank,
			titleBtn: 'ถัดไป',
			page: 'suittest',
		}
	} else if (caseStatus === 'WAIT' && bankName === 'KASIKORN') {
		return {
			title: 'กรุณาดำเนินการต่อที่แอป K PLUS',
			header: 'เชื่อมบัญชีธนาคาร',
			des: `เมื่อทำรายการสำเร็จ ให้กลับเข้าแอป KmyFunds อีกครั้ง เพื่ออัพเดทสถานะการเชื่อมบัญชีธนาคาร`,
			image: images.iconWaitBank,
		}
	} else {
		return {
			title: 'รอดำเนินการเชื่อมบัญชีธนาคาร',
			header: 'เชื่อมบัญชีธนาคาร',
			des: `รอดำเนินการอัพเดทสถานะการเชื่อมบัญชีธนาคาร`,
			image: images.iconWaitBank,
		}
	}
}

const mapToProps = () => ({})
const dispatchToProps = dispatch => ({
	navigateAction: bindActionCreators(navigateAction, dispatch)
})
@connect(mapToProps, dispatchToProps)
@queryStatus
export default class extends React.Component {
	state = {
		status: 'SENT', // SUCCESS, SENT, FAIL
	}

	render() {
		const status = this.props.getRegisterBankStatus.getRegisterBankStatus && this.props.getRegisterBankStatus.getRegisterBankStatus.status
		return (
			<Screen>
				<ScrollView
					showsVerticalScrollIndicator={false}
					contentContainerStyle={{ flexGrow: 1 }}
				>
					<View
						style={{
							alignItems: 'center',
							paddingTop: '12%',
							marginTop: '24%',
							paddingHorizontal: 24,
							marginBottom: 24
						}}
					>
						<Image source={renderText(status).image} style={{ width: widthView * .6, marginBottom: 53 }}
							resizeMode="contain" />
						<TBold color={colors.white} mb={24}>{renderText(status).title}</TBold>
						<TLight color={colors.smoky}>{renderText(status).des}</TLight>
					</View>
				</ScrollView>
				{
					renderText(status).titleBtn !== undefined &&
					<LongButton
						label={renderText(status).titleBtn}
						style={{ marginHorizontal: 24, marginBottom: 24 }}
						onPress={() => this.props.navigateAction({ ...this.props, page: renderText(status).page })}
					/>
				}
			</Screen>
		)
	}
}