import React from 'react'
import {
  View,
  TouchableOpacity,
  Dimensions,
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
import { navigateAction } from '../../redux/actions'
import lockout from '../../containers/hoc/lockout'
import { getStatus } from '../../containers/query'

const { width: widthView } = Dimensions.get('window')

const mapToProps = () => ({})
const dispatchToProps = dispatch => ({
  navigateAction: bindActionCreators(navigateAction, dispatch)
})
@connect(mapToProps, dispatchToProps)
@withApollo
@lockout
export default class extends React.Component {

  onNext = async () => {
    const { navigateAction } = this.props
    this.props.client.query({ query: getStatus })
      .then(res => {
        console.log(res)
        switch (res.data.getStatus) {
          case 'Approved':
            navigateAction({ ...this.props, page: 'statusApprove', params: { status: res.data.getStatus } })
            break
          case 'Rejected':
            navigateAction({ ...this.props, page: 'statusApprove', params: { status: res.data.getStatus } })
            break
          case 'Editing':
            navigateAction({ ...this.props, page: 'softReject', params: { status: res.data.getStatus } })
            break
          default:
            break
        }
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

        <View style={{ flex: 1, justifyContent: 'space-around', alignItems: 'center' }}>
          <Image source={images.iconTransfer} style={{ width: widthView * .6 }} resizeMode="contain" />
          <View>
            <TBold color={colors.white} mb={24}>{`เราได้รับข้อมูลการเปิดบัญชีกองทุน\nของท่านแล้ว`}</TBold>
            <TLight color={colors.white}>{`กรุณารอผลการอนุมัติภายใน 3 วันทำการ\nผ่านระบบแจ้งเตือน`}</TLight>
          </View>
          <TLight color={colors.white}>{`หากมีข้อสงสัยกรุณาติดต่อ\n02 673 3888 กด 1 และ กด 1`}</TLight>
        </View>

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