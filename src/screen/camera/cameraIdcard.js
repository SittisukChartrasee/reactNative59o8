import React from 'react'
import {
  View,
  Image,
  SafeAreaView,
  TouchableHighlight,
  AsyncStorage,
  TouchableOpacity,
} from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Camera } from '../../component/camera'
import colors from '../../config/colors'
import { TLight, TBold } from '../../component/texts'
import images from '../../config/images'
import { navigateAction } from '../../redux/actions'
import request from '../../utility/requestApi'

const mapToProps = () => ({})
const dispatchToProps = dispatch => ({
  navigateAction: bindActionCreators(navigateAction, dispatch)
})
@connect(mapToProps, dispatchToProps)
export default class extends React.Component {
  state = {
    photo: '',
  }

  onNext = async () => {
    const { navigateAction } = this.props
    const token = await AsyncStorage.getItem("access_token")
    const data = new FormData()
    data.append('file', {
      uri: this.state.photo,
      type: 'image/jpg',
      name: 'Idcard.jpg'
    })
    const url = 'upload-idcard'
    const res = await request(url, {
      method: 'POST',
      body: data
    }, token)
    if (res.success) navigateAction({ ...this.props, page: 'tutorialFrontCamera' })
  }

  render() {
    const { navigateAction, navigation } = this.props
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.black }}>
        {
          this.state.photo
            ? (
              <View style={{ flex: 1, backgroundColor: colors.midnight }}>
                <View style={{ flex: 1, marginHorizontal: 32, marginTop: 48 }}>
                  <Image source={{ uri: this.state.photo }} style={{ flex: 1 }} />
                </View>
                <View style={{ paddingTop: 51, paddingBottom: 24, flexDirection: 'row', justifyContent: 'space-around' }}>
                  <TouchableOpacity onPress={() => this.setState({ photo: '' })} style={{ backgroundColor: colors.white, paddingVertical: 12, paddingHorizontal: 30, borderRadius: 50 }}>
                    <TBold color={colors.grey}>ถ่ายใหม่</TBold>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={this.onNext} style={{ backgroundColor: colors.emerald, paddingVertical: 12, paddingHorizontal: 30, borderRadius: 50 }}>
                    <TBold color={colors.white}>ยืนยัน</TBold>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <View style={{ flex: 1 }}>
                <View style={{ height: 56, flexDirection: 'row' }}>
                  <TouchableHighlight onPress={() => this.props.navigation.goBack()} style={{ flex: .2, justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={images.iconback} />
                  </TouchableHighlight>
                  <View style={{ flex: .2 }} />
                </View>
                <Camera
                  filter={
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                      <TLight fontSize={16} color={colors.white}>{`กรุณาถ่ายรูปบัตรประชาชน\nให้อยู่ในกรอบเส้นประที่กำหนดไว้ `}</TLight>
                      <Image source={images.iconFIllterCameraBack} style={{ marginTop: 12 }} />
                    </View>
                  }
                  handleInput={photo => this.setState({ photo: photo.uri })}
                />
              </View>
            )
          }
      </SafeAreaView>
    )
  }
}