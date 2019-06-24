import React from 'react'
import {
  View,
  TouchableOpacity,
  Dimensions,
  Linking,
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
  render() {
    return (
      <Screen>
        <View style={{ flex: 1, justifyContent: 'space-around', alignItems: 'center', paddingTop: 40 }}>
          <TBold fontSize={28} color={colors.white} mb="5%">{`บัญชีของคุณถูกล็อค\nเพื่อความปลอดภัย`}</TBold>
          <Image source={images.iconLock} style={{ width: widthView * .6 }} resizeMode="contain"  />
          <TLight color={colors.smoky} fontSize={16} mt="5%">{`คุณใส่รหัสผิดเกิน 4 ครั้ง\nกรุณาติดต่อเจ้าหน้าที่เพื่อทำการปลดล็อค`}</TLight>
        </View>
        <View style={{ flex: 1, width: widthView, justifyContent: 'flex-end', paddingBottom: 44 }}>
          <LongButton
            label="ติดต่อ 02-673-3999"
            style={{ marginHorizontal: 24 }}
            bgTransparent
            onPress={() => Linking.openURL(`tel://02-673-3999`)}
          />
        </View>
      </Screen>
    )
  }
}