import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  SafeAreaView
} from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import SignatureCapture from 'react-native-signature-capture'
import Screen from '../../component/screenComponent'
import { NavBar } from '../../component/gradient'
import images from '../../config/images'
import { navigateAction } from '../../redux/actions'
import { TLight, TBold } from '../../component/texts';
import colors from '../../config/colors';

const mapToProps = () => ({})
const dispatchToProps = dispatch => ({
  navigateAction: bindActionCreators(navigateAction, dispatch)
})
@connect(mapToProps, dispatchToProps)
export default class Demo extends Component {
  state = {
    dragged: null,
  }


  saveSign = () => {
    const { navigateAction } = this.props
    this.signature.saveImage()
    navigateAction({ ...this.props, page: 'fatca' })
  }

  resetSign = () => {
    this.signature.resetImage()
  }

  _onSaveEvent(result) {
      //result.encoded - for the base64 encoded png
      //result.pathName - for the file path name
      console.log(result);
  }
  _onDragEvent() {
      // This callback will be called when the user enters signature
      console.log("dragged");
  }

  render = () => {
    const styles = StyleSheet.create({
      buttonStyle: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        height: 50,
        borderRadius: 50/2,
        backgroundColor: colors.grey,
        margin: 10
      }, 
      buttonCancelStyle: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        height: 50,
        borderRadius: 50/2,
        borderColor: colors.grey,
        borderWidth: 1,
        margin: 10
      }
    })
    
    return (
      <Screen color="transparent">
        <NavBar
          title="ลายเซ็นอิเล็กทรอนิกส์"
          navLeft={
            <TouchableOpacity  onPress={() => this.props.navigation.goBack()}>
              <Image source={images.iconback} />
            </TouchableOpacity>
          }
          navRight={
            <TouchableOpacity>
              <Image source={images.iconlogoOff} />
            </TouchableOpacity>
          }
        />

        <SafeAreaView style={{ flex: 1 }}>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems:'center' }}>
            <View style={{ position: 'absolute', width: '70%' }}>
              <View style={{ alignItems: 'center', opacity: this.state.dragged === null ? 1 : 0 }}>
                <Image source={images.iconsign} />
                <TLight color={colors.smoky} fontSize={14} mt={15}>เซ็นลายเซ็นของคุณที่นี่</TLight>
              </View>
              <View style={{ justifyContent: 'center' }}>
                <Image source={images.iconlinepath} style={{ width: '100%' }} resizeMode="contain" />
              </View>
            </View>

            <SignatureCapture
              onTouchStart={e => this.setState({ dragged: !!e.nativeEvent })}
              style={{
                width: '100%',
                height: '80%',
                opacity: .5,
                transform: [{ rotateX: '180deg' }]
              }}
              ref={(ref) => { this.signature = ref }}
              showBorder={false}
              saveImageFileInExtStorage
              onSaveEvent={this._onSaveEvent}
              showNativeButtons={false}
              showTitleLabel={false}
              viewMode="portrait"
            />
          </View>


          <View style={{ flexDirection: "row", marginHorizontal: 20 }}>
            <TouchableHighlight style={styles.buttonCancelStyle} onPress={() => this.resetSign()}>
              <TBold fontSize={16} color={colors.grey}>ล้าง</TBold>
            </TouchableHighlight>

            <TouchableHighlight style={styles.buttonStyle} onPress={() => this.saveSign()}>
              <TBold fontSize={16} color={colors.white}>ยืนยัน</TBold>
            </TouchableHighlight>
          </View>
        </SafeAreaView>
      </Screen>
    )
  }
}