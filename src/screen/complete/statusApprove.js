import React from 'react'
import {
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Image,
  Linking
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
import lockout from '../../containers/hoc/lockout'

const { width: widthView } = Dimensions.get('window')

const renderText = (caseStatus) => {
  switch (caseStatus) {
    case 'Rejected':
      return {
        header: 'ผลอนุมัติเปิดบัญชี',
        title: 'ขออภัยท่านไม่สามารถเปิดบัญชีกองทุนได้',
        dis: 'กรุณาติดต่อ KAsset Contact Center\n02 673 3888 กด 1 และ กด 1',
        titleBtn: 'ติดต่อ 02 673 3888',
        phone: '026733888',
        btnStatus: true,
      }

    default:
      return {
        title: 'เกิดข้อผิดพลาด',
        dis: 'กรุณาติดต่อ KAsset Contact Center\n02 673 3888 กด 1 และ กด 1',
        titleBtn: 'ติดต่อ 02 673 3888',
        phone: '026733888',
        btnStatus: true,
      }
  }
}

const mapToProps = () => ({})
const dispatchToProps = dispatch => ({
  navigateAction: bindActionCreators(navigateAction, dispatch)
})
@connect(mapToProps, dispatchToProps)
@lockout
export default class extends React.Component {
  static defaultProps = {
    status: 'Rejected',
  }

  render() {
    const status = this.props.navigation.getParam('status', '')
    return (
      <Screen>
        <NavBar
          color="transparent"
          title={renderText(status).header || null}
          navRight={
            renderText(status).btnStatus ? (
              <TouchableOpacity
                onPress={() => this.props.lockout()}
                style={{ paddingLeft: 30 }}
              >
                <Image source={images.iconlogoOff} />
              </TouchableOpacity>
            ) : null
          }
        />
        <ScrollView
          contentContainerStyle={{ paddingTop: 40, paddingHorizontal: 24 }}
        >
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Image source={images.kmyfundLogo} style={{ width: widthView * .6, marginBottom: 19 }} resizeMode="contain" />
            <TBold color={colors.white} mb={24}>{renderText(status).title}</TBold>
            <TLight color={colors.white}>{renderText(status).dis}</TLight>
          </View>
        </ScrollView>
        <View style={{ paddingBottom: 44 }}>
          <LongButton
            label={renderText(status).titleBtn}
            bgTransparent={renderText(status).btnStatus}
            style={{ marginHorizontal: 24 }}
            onPress={() => Linking.openURL(`tel://${renderText(status).phone}`)}
          />
        </View>
      </Screen>
    )
  }
}