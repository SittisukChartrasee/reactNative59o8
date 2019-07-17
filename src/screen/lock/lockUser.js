import React from 'react'
import {
  View,
  TouchableOpacity,
  Dimensions,
  Linking,
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

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <View style={{ flex: 1, alignItems: 'center', paddingTop: '24%' }}>
            <TBold fontSize={28} color={colors.white} mb="8%">{`บัญชีของท่านถูกล็อค\nเพื่อความปลอดภัย`}</TBold>
            <Image source={images.iconLock} style={{ width: widthView * .6, marginBottom: '8%' }} resizeMode="contain" />
            <TLight color={colors.smoky} fontSize={16} mt="5%">
              {`ท่านใส่รหัสผ่านผิดเกินจำนวนครั้งที่กำหนด\nกรุณาติดต่อ KAsset Contact Center\n02 673 3888 กด 1 และ กด 1  `}
            </TLight>
          </View>
        </ScrollView>

        <View style={{ width: widthView, justifyContent: 'flex-end', paddingBottom: 44 }}>
          <LongButton
            label="ติดต่อ 02 673 3999"
            style={{ marginHorizontal: 24 }}
            bgTransparent
            onPress={() => Linking.openURL(`tel://02-673-3999`)}
          />
        </View>
      </Screen>
    )
  }
}