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
import { checkVerifiedEmailInterval, checkVerifiedEmail } from '../../containers/query'
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
		if (newProps.root.appState === 'active') {
			this.props.client.query({ query: checkVerifiedEmail })
				.then(res => {
					if (res.data.checkVerifiedEmail) this.handleSanction()
				})
				.catch(err => console.log(err))
		}
		if (newProps.checkVerifiedEmailInterval.checkVerifiedEmail) {
			newProps.checkVerifiedEmailInterval.stopPolling()
			this.handleSanction()
		}
	}

	handleSanction = async () => {
		await this.props.saveSanction()
			.then(res => {
				console.log(res)
				if (res.data.saveSanction.success) this.props.navigateAction({ ...this.props, page: 'waiting' })
				else if (!res.data.saveSanction.success) {
					return this.props.toggleModal({
						...typeModal[res.data.saveSanction.code],
						dis: res.data.saveSanction.message
					})
				}
			})
			.catch(err => {
				console.log(err)
			})
	}

	onNext = async () => {
		const { user } = this.props
		const { email } = user.contact

		const res = await this.props.resendEmail()
		if (res.data.resendEmail.success) {
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