import React, { Component } from 'react';
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
import lockout from '../../containers/hoc/lockout'
import { updateUser } from '../../redux/actions/commonAction'
import typeModal from '../../utility/typeModal'
import { errorMessage } from '../../utility/messages'
import SecureKeyStore from "../../utility/keyStore";

const mapToProps = ({ user }) => ({ user })
const dispatchToProps = dispatch => ({
  updateUser: bindActionCreators(updateUser, dispatch),
  navigateAction: bindActionCreators(navigateAction, dispatch),
  toggleModal: value => dispatch({ type: 'modal', value })
})
@connect(mapToProps, dispatchToProps)
@lockout
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
    await this.signature.saveImage()
    this.setState({ dragged: null })
  }

  resetSign = () => {
    if (this.state.dragged) {
      this.signature.resetImage()
      this.setState({ dragged: null })
      this.props.updateUser('signature', '')
    } else {
      this.props.updateUser('signature', '')
    }
  }

  _onSaveEvent = async result => {
    const token = await SecureKeyStore.get("access_token")
    this.props.updateUser('signature', `data:image/png;base64,${result.encoded}`)

    const data = new FormData()
    data.append('file', {
      uri: `file://${result.pathName}`,
      type: 'image/jpg',
      name: 'sign.jpg'
    })
    const url = 'upload-signature'

    try {
      const res = await request(url, {
        method: 'POST',
        body: data
      }, token)
    } catch (error) {
      this.props.toggleModal({
        ...typeModal[errorMessage.requestError.code],
        dis: errorMessage.requestError.defaultMessage,
      })
    }

    if (this.props.user.signature) {
      this.props.navigateAction({ ...this.props, page: 'fatca' })
    }
  }

  render = () => {
    const styles = StyleSheet.create({
      buttonStyle: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        height: 50,
        borderRadius: 50 / 2,
        backgroundColor: colors.grey,
        margin: 10
      },
      buttonCancelStyle: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        height: 50,
        borderRadius: 50 / 2,
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
            <TouchableOpacity
              onPress={() => this.props.navigation.goBack()}
              style={{ paddingRight: 30 }}
            >
              <Image source={images.iconback} />
            </TouchableOpacity>
          }
          navRight={
            <TouchableOpacity
              onPress={() => this.props.lockout()}
              style={{ paddingLeft: 30 }}
            >
              <Image source={images.iconlogoOff} />
            </TouchableOpacity>
          }
        />


        <SafeAreaView style={{ flex: 1 }}>
          {
            this.props.user.signature ?
              <Image style={{ flex: 1 }} source={this.props.user.signature ? { uri: this.props.user.signature } : {}} />
              : (
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                  <View style={{ position: 'absolute', width: '70%' }}>
                    <View style={{ alignItems: 'center', opacity: this.state.dragged === null ? 1 : 0 }}>
                      <Image source={images.iconsign} />
                      <TLight color={colors.smoky} fontSize={14} mt={15}>เซ็นลายเซ็นของท่านที่นี่</TLight>
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
              )
          }



          <View style={{ flexDirection: "row", marginHorizontal: 20 }}>
            <TouchableOpacity style={styles.buttonCancelStyle} onPress={() => this.resetSign()}>
              <TBold fontSize={16} color={colors.grey}>ล้าง</TBold>
            </TouchableOpacity>

            {
              this.props.user.signature ? (
                <TouchableOpacity style={[styles.buttonStyle, this.props.user.signature && { backgroundColor: colors.emerald }]} onPress={() => this.props.navigateAction({ ...this.props, page: 'fatca' })}>
                  <TBold fontSize={16} color={colors.white}>ยืนยัน</TBold>
                </TouchableOpacity>
              ) : (
                  <TouchableOpacity disabled={!this.state.dragged} style={[styles.buttonStyle, this.state.dragged && { backgroundColor: colors.emerald }]} onPress={() => this.saveSign()}>
                    <TBold fontSize={16} color={colors.white}>ยืนยัน</TBold>
                  </TouchableOpacity>
                )
            }

          </View>
        </SafeAreaView>
      </Screen>
    )
  }
}