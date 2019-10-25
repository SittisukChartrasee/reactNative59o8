import React from 'react'
import {
	View,
	TouchableOpacity,
	Dimensions,
	ScrollView,
	Image
} from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withApollo } from 'react-apollo'
import Screen from '../../component/screenComponent'
import { NavBar } from '../../component/gradient'
import { TText, TBold, TSemiBold, TLight } from '../../component/texts'
import colors from '../../config/colors'
import { LongButton } from '../../component/button'
import images from '../../config/images'
import { navigateAction, navigateReset } from '../../redux/actions'
import lockout from '../../containers/hoc/lockout'
import { getStatus } from '../../containers/query'
import typeModal from '../../utility/typeModal'
import { errorMessage } from '../../utility/messages'

const { width: widthView } = Dimensions.get('window')

const mapToProps = () => ({})
const dispatchToProps = dispatch => ({
	navigateAction: bindActionCreators(navigateAction, dispatch),
	navigateReset: bindActionCreators(navigateReset, dispatch),
  toggleModal: value => dispatch({ type: 'modal', value })
})
@connect(mapToProps, dispatchToProps)
@withApollo
@lockout
export default class extends React.Component {

	onNext = () => {
		this.props.client.query({
			query: getStatus,
			fetchPolicy: "no-cache"
		})
			.then(res => {
				console.log(res)
				switch (res.data.getStatus) {
					case 'Approved':
						this.props.navigateAction({ ...this.props, page: 'confirmAccount' })
						break
					case 'Rejected':
						this.props.navigateAction({ ...this.props, page: 'statusApprove', params: { status: res.data.getStatus } })
						break
					case 'Editing':
						this.props.navigateReset({ ...this.props, page: 'softReject' })
						break
					default:
						break
				}
			})
			.catch(err => {
        this.props.toggleModal({
          ...typeModal[errorMessage.requestError.code],
          dis: errorMessage.requestError.defaultMessage,
        })
      })
	}

	render() {
		return (
			<Screen>
				<NavBar
					color="transparent"
					title="รอผลอนุมัติเปิดบัญชี"
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
						<Image source={images.iconTransfer} style={{ width: widthView * .6, marginBottom: 53 }} resizeMode="contain" />
						<View style={{ flex: 1 }}>
							<TBold color={colors.white} mb={24}>{`เราได้รับข้อมูลการเปิดบัญชีกองทุน\nของท่านแล้ว`}</TBold>
							<TLight color={colors.white} mb={24}>{`กรุณารอผลการอนุมัติภายใน 3 วันทำการ\nผ่านระบบแจ้งเตือน`}</TLight>
						</View>
						<View style={{ flex: 1, justifyContent: 'flex-end', paddingBottom: 12 }}>
							<TLight color={colors.white}>{`หากมีข้อสงสัยกรุณาติดต่อ\n02 673 3888 กด 1 และ กด 1`}</TLight>
						</View>
					</View>
				</ScrollView>

				<View style={{ paddingBottom: 44 }}>
					<LongButton
						label="รีเฟรช"
						bgTransparent
						IconImage={images.iconCameraRefresh}
						style={{ marginHorizontal: 24 }}
						onPress={this.onNext}
					/>
				</View>
			</Screen>
		)
	}
}