import React from 'react'
import {
  View,
  TouchableOpacity,
  Dimensions,
  Image
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
const { width: widthView } = Dimensions.get('window')

const mapToProps = () => ({})
const dispatchToProps = dispatch => ({
  navigateAction: bindActionCreators(navigateAction, dispatch)
})
@connect(mapToProps, dispatchToProps)
export default class extends React.Component {

  onNext = async () => {
    const { navigateAction } = this.props
    const verifyStatus = true

    // รอ backEnd ทำ API

    // this.props.verify({ variables: { input: data } })
    // .then(res => {
    //   if (res.data.saveFatca.success) {
    //     navigateAction({ ...this.props, page: 'fraud' })
    //   } else if (!res.data.saveFatca.success) {
    //     const modal = {
    //       dis: res.data.saveFatca.message,
    //       visible: true,
    //       onPress: () => this.setState({ modal: { visible: false } })
    //     }
    //     return this.setState({ modal })
    //   }
    // })
    // .catch(err => {
    //   console.log(err)
    // })

    if (verifyStatus) {
      navigateAction({ ...this.props, page: 'waiting' })
    }
  }

  render() {
    return (
      <Screen>
        <NavBar
          color="transparent"
          title="ยืนยันที่อยู่อีเมล"
          navRight={
            <TouchableOpacity>
              <Image source={images.iconlogoOff} />
            </TouchableOpacity>
          }
        />

        <View style={{ flex: 1, justifyContent: 'space-around', alignItems: 'center' }}>
            <Image source={images.iconVerifyEmail} style={{ width: widthView * .6 }} resizeMode="contain"  />
          <View>
            <TBold color={colors.white} mb={24}>กรุณายืนยันที่อยู่อีเมล</TBold>
            <TLight color={colors.white}>{`ระบบได้จัดส่งลิงก์ (Link) สำหรับยืนยันตัวตน\nไปยัง Email ของท่าน\nUsername@domainname.com กรุณาคลิกลิงก์ (Link) เพื่อดำเนินการต่อ  `}</TLight>
          </View>
          <TLight color={colors.white}>{`หากมีข้อสงสัยกรุณาติดต่อ\n02 673 3888 กด 1 และ กด 1`}</TLight>
        </View>

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