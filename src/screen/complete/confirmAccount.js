import React from 'react'
import {
	View,
	TouchableOpacity,
	ScrollView,
	Image,
} from 'react-native'
import { withApollo } from 'react-apollo'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import get from 'lodash/get'
import Screen from '../../component/screenComponent'
import { NavBar } from '../../component/gradient'
import { TText, TBold, TSemiBold, TLight } from '../../component/texts'
import colors from '../../config/colors'
import { LongButton } from '../../component/button'
import images from '../../config/images'
import { navigateAction } from '../../redux/actions'
import { root } from '../../redux/actions/commonAction'
import { requestOtp, acceptTerm } from '../../redux/actions/root-active'
import { getTermAndCondition } from '../../containers/query'
import SecureKeyStore from "../../utility/keyStore"
import typeModal from '../../utility/typeModal'
import { errorMessage } from '../../utility/messages'

const mapToProps = ({ root }) => ({ root })
const dispatchToProps = dispatch => ({
	requestOtp: bindActionCreators(requestOtp, dispatch),
	acceptTerm: bindActionCreators(acceptTerm, dispatch),
	navigateAction: bindActionCreators(navigateAction, dispatch),
	updateRoot: bindActionCreators(root, dispatch),
	toggleModal: value => dispatch({ type: 'modal', value })
})

@withApollo
@connect(mapToProps, dispatchToProps)
export default class extends React.Component {
	state = {
		risk: 0,
		agree: false,
		text: ''
	}

	componentDidMount = async () => {
		try {
			const res = await this.props.client.query({ query: getTermAndCondition })
			const text = get(res, 'data.getTermAndCondition', '')

			this.setState({ text })

		} catch (error) {
			this.setState({ text: '' })
		}
	}

	onNext = async () => {
		const token = await SecureKeyStore.get("access_token")
		this.props.updateRoot('currFlowUP', 'updatePasscode')

		// try and catch in root-active
		const res = await this.props.acceptTerm(token)

		const success = get(res, 'success', false)
		const accessToken = get(res, 'result.access_token', null)
		const code = get(res, 'code', '1103')
		const message = get(res, 'message', '')

		if (success) {
			setTimeout(() => this.onRequestOtp(accessToken), 1000)
		} else {
			this.props.toggleModal({
				...typeModal[code || errorMessage.messageIsNull.code],
				dis: message || errorMessage.messageIsNull.defaultMessage,
			})
		}

	}

	onRequestOtp = async token => {
		// try and catch in root-active
		const res = await this.props.requestOtp(null, { token, currFlowUP: this.props.root.currFlowUP })

		const success = get(res, 'success', false)
		const time = get(res, 'result.time', 0)
		const refNo = get(res, 'result.ref_no', '')
		const code = get(res, 'code', '1103')
		const message = get(res, 'message', '')

		if (success || code === '1001') {

			if (code === '1001') {
				this.props.updateRoot('time', time)
				this.props.updateRoot('ref_no', refNo)
				this.props.updateRoot('overRequest', true)
				this.props.updateRoot('overRequestUi', true)
			} else {
				this.props.updateRoot('overRequest', false)
				this.props.updateRoot('overRequestUi', false)
			}

			this.props.navigation.navigate({ routeName: 'otp', key: 'otpUpdatePasscode' })
		} else {
			this.props.toggleModal({
				...typeModal[code || errorMessage.messageIsNull.code],
				dis: message || errorMessage.messageIsNull.defaultMessage,
			})
		}
	}

	render() {
		const { agree } = this.state

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
							mb={40}>{`ท่านสามารถเริ่มลงทุนผ่านแอปพลิเคชั่น \nK-My Funds ได้แล้ว`}
						</TLight>

						<View
							style={{
								backgroundColor: colors.white,
								width: '100%',
								marginTop: 16,
								minHeight: 352,
								borderTopRightRadius: 16,
								borderTopLeftRadius: 16,
								overflow: 'hidden'
							}}
						>
							<View style={{ backgroundColor: colors.white, margin: 0, paddingVertical: 16, paddingHorizontal: 16, }}>
								<View style={{ height: 40, flexDirection: 'row' }}>
									<TBold fontSize={18} textAlign="left">เงื่อนไขการเปิดบัญชี</TBold>
								</View>
								<TLight color={colors.grey} textAlign="left">{this.state.text}</TLight>
							</View>
						</View>

					</View>
				</ScrollView>

				<TouchableOpacity
					onPress={() => this.setState({ agree: !agree })}
					activeOpacity={1}
					style={{
						backgroundColor: colors.lightgrey,
						padding: 16,
						marginHorizontal: 24,
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
								: <View
									style={{
										width: 16,
										height: 16,
										borderRadius: 5,
										backgroundColor: colors.white,
										borderWidth: 1,
										borderColor: colors.grey
									}}
								/>
						}
					</View>
					<View style={{ flex: 1 }}>
						<TLight color={colors.midnight} fontSize={16} textAlign="left">ฉันได้อ่านและทำความเข้าใจในข้อความทั้งหมดโดยที่ฉันได้ยอมรับและเห็นด้วย </TLight>
					</View>
				</TouchableOpacity>

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