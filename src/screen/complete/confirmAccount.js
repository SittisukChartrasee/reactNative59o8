import React from 'react'
import {
	View,
	TouchableOpacity,
	ScrollView,
	Image,
	AsyncStorage,
} from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { PieChart } from '../../component/chart'
import Screen from '../../component/screenComponent'
import { NavBar } from '../../component/gradient'
import { TText, TBold, TSemiBold, TLight } from '../../component/texts'
import colors from '../../config/colors'
import { LongButton } from '../../component/button'
import images from '../../config/images'
import { RiskList } from '../../component/lists'
import { navigateAction } from '../../redux/actions'
import { root } from '../../redux/actions/commonAction'
import { requestOtp } from '../../redux/actions/root-active'

const text = `1. ผู้ขอใช้บริการมีความประสงค์ให้ธนาคารหักเงินจากบัญชีเงินฝากของผู้ขอใช้บริการ เพื่อชำระหนี้ และ หรือ ภาระผูกพันใด ๆให้แก่ผู้รับเงิน ตามจำนวนเงินและวันที่ที่ปรากฏในใบแจ้งหนี้ และ หรือ ข้อมูลที่ผู้รับเงินได้นำส่งให้แก่ธนาคารผ่านช่องทางอิเล็กทรอนิกส์ หรือด้วยวิธีใดที่ธนาคารได้ตกลงกับผู้รับเงิน หรือตามคำสั่งที่ธนาคารได้รับจากผู้รับเงิน ตัวแทนของผู้รับเงิน และ หรือบุคคลอื่นใดที่ได้รับแต่งตั้งหรือมอบหมายจากผู้รับเงินให้กระทำการแทน และ หรือในนามของผู้รับเงิน (ต่อไปนี้จะเรียกว่า ”ข้อมูลที่นำส่ง”) และนำเงินดังกล่าวโอนเข้าบัญชีเงินฝากของผู้รับเงิน และ หรือบุคคลดังกล่าว.   	ผู้ขอใช้บริการมีความประสงค์ให้ธนาคารหักเงินจากบัญชีเงินฝากของผู้ขอใช้บริการ เพื่อชำระหนี้ และ/หรือ ภาระผูกพันใด ๆ ให้แก่ผู้รับเงิน ตามจำนวนเงินและวันที่ที่ปรากฏในใบแจ้งหนี้ และ/หรือ ข้อมูลที่ผู้รับเงินได้นำส่งให้แก่ธนาคารผ่านช่องทางอิเล็กทรอนิกส์ หรือด้วยวิธีใดที่ธนาคารได้ตกลงกับผู้รับเงิน หรือตามคำสั่งที่ธนาคารได้รับจากผู้รับเงิน ตัวแทนของผู้รับเงิน และ/หรือบุคคลอื่นใดที่ได้รับแต่งตั้งหรือมอบหมายจากผู้รับเงินให้กระทำการแทน และ/หรือในนามของผู้รับเงิน (ต่อไปนี้จะเรียกว่า ”ข้อมูลที่นำส่ง”) และนำเงินดังกล่าวโอนเข้าบัญชีเงินฝากของผู้รับเงิน และ/หรือบุคคลดังกล่าว. `

const mapToProps = () => ({})            
const dispatchToProps = dispatch => ({
	requestOtp: bindActionCreators(requestOtp, dispatch),
	navigateAction: bindActionCreators(navigateAction, dispatch),
	updateRoot: bindActionCreators(root, dispatch)
})
@connect(mapToProps, dispatchToProps)
export default class extends React.Component {
	state = {
		risk: 0,
		agree: false,
	}

	componentDidMount = () => {
		const sumSuittest = this.props.navigation.getParam('sumSuittest', 0)
		if (sumSuittest <= 15) this.setState({ risk: 0 })
		else if (sumSuittest <= 21) this.setState({ risk: 1 })
		else if (sumSuittest <= 29) this.setState({ risk: 2 })
		else if (sumSuittest > 30) this.setState({ risk: 3 })
	}

	onNext = async () => {
		const token = await AsyncStorage.getItem("access_token")

		this.props.requestOtp(null, token, { accept_term: true })
			.then(res => {
				console.log(res)
				if (res.success) {
					this.props.navigateAction({ ...this.props, page: 'otp', params: { accept_term: true } })
				}
			})
			.catch(err => {
				console.log(err)
			})
	}

	render() {
		const { risk, agree } = this.state
		return (
			<Screen>
				<NavBar
					color="transparent"
					title="ผลอนุมัติเปิดบัญชี"
				/>

				<ScrollView
					contentContainerStyle={{ paddingTop: 40, paddingHorizontal: 24 }}
				>
					<View style={{ flex: 1, alignItems: 'center' }}>
						<View style={{ marginBottom: 19 }}>
							<Image source={images.kmyfundLogo} />
						</View>

						<View style={{ marginBottom: 10 }}>
							<TBold fontSize={16} color={colors.white}>เปิดบัญชีสำเร็จ</TBold>
						</View>

						<TLight color={colors.white}
							mb={40}>{`ท่านสามารถเริ่มลงทุนผ่านแอปพลิเคชั่น \nK-My Funds ได้แล้ว`}</TLight>

						<View
							style={{    
								backgroundColor: colors.white,
								width: '100%',
								minHeight: 352,
								paddingVertical: 16,
								paddingHorizontal: 16,
								borderTopRightRadius: 16,
								borderTopLeftRadius: 16,
								overflow: 'hidden'
							}}
						>
							<View style={{ height: 40, flexDirection: 'row' }}>
								<TBold fontSize={18} textAlign="left">เงื่อนไขการเปิดบัญชี</TBold>
							</View>
							<TLight color={colors.grey} textAlign="left">{text}</TLight>
						</View>
						<TouchableOpacity
							onPress={() => this.setState({ agree: !agree })}
							activeOpacity={1}
							style={{
								backgroundColor: colors.lightgrey,
								padding: 16,
								flexDirection: 'row',
								borderBottomRightRadius: 16,
								borderBottomLeftRadius: 16,
							}}
						>
							<View style={{ marginRight: 16, marginTop: 5 }}>
								{
									agree
										? <Image source={images.iconCheck}
											style={{ width: 16, height: 16, borderRadius: 5, backgroundColor: 'red' }} />
										: <Image source={{}} style={{
											width: 16,
											height: 16,
											borderRadius: 5,
											backgroundColor: colors.white,
											borderWidth: 1,
											borderColor: colors.grey
										}} />
								}
							</View>
							<View style={{ flex: 1 }}>
								<TLight color={colors.midnight} fontSize={16}
									textAlign="left">ฉันได้อ่านและทำความเข้าใจในข้อความทั้งหมดโดยที่ฉันได้ยอมรับและเห็นด้วย </TLight>
							</View>
						</TouchableOpacity>
					</View>
				</ScrollView>

				<View style={{ paddingBottom: 44 }}>
					<LongButton
						label="เริ่มใช้งาน K-My Funds"
						style={{ marginHorizontal: 24 }}
						disabled={!agree}
						onPress={this.onNext}
					/>
				</View>
			</Screen>
		)
	}
}