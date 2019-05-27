import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  Platform,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  SafeAreaView,
  PermissionsAndroid,
  AsyncStorage
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
import request from '../../utility/requestApi'

const mapToProps = () => ({})
const dispatchToProps = dispatch => ({
  navigateAction: bindActionCreators(navigateAction, dispatch)
})
@connect(mapToProps, dispatchToProps)
export default class Demo extends Component {
  state = {
    dragged: null,
  }

  componentWillMount = async () => {
    
    if (Platform.OS === 'android') {
      PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      ])
    }
  }


  saveSign = async () => {
    this.signature.saveImage()
  }

  resetSign = () => {
    this.signature.resetImage()
    this.setState({ dragged: null })
  }

  _onSaveEvent = async result => {
    const { navigateAction } = this.props
    const token = await AsyncStorage.getItem("access_token")

    const data = new FormData()
    data.append('file', {
      uri: `file://${result.pathName}`,
      type: 'image/jpg',
      name: 'sign.jpg'
    })
    const url = 'upload-signature'
    const res = await request(url, {
      method: 'POST',
      body: data
    }, token)

    if (res.success) {
      navigateAction({ ...this.props, page: 'fatca' })
    }
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

        <Image source={{ uri: '/storage/emulated/0/saved_signature/signature.png' }}/>

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