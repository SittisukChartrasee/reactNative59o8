import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  View,
  StatusBar,
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import colors from '../../config/colors';
import images from '../../config/images';
import { TBold } from '../texts';

const PendingView = () => (
  <View
    style={{
      flex: 1,
      width: '100%',
      backgroundColor: 'black',
      alignItems: 'center',
    }}
  >
    <TBold color={colors.white}>Waiting</TBold>
  </View>
);

export default class extends React.Component {
  static defaultProps = {
    switchCamera: false,
    handleInput: () => console.log('neet this func "handleInput"'),
    filter: <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Image source={images.iconFillterCameraFront1} />
              <Image source={images.iconFillterCameraFront2} style={{ marginTop: 12 }} />
            </View>
  }

  state = {
    switch: true,
  }
  
  render() {
    StatusBar.setBarStyle("light-content")
    return (
      <View style={styles.container}>
        <RNCamera
          style={styles.preview}
          type={this.props.switchCamera ? this.state.switch ? RNCamera.Constants.Type.front : RNCamera.Constants.Type.back : RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.on}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          androidRecordAudioPermissionOptions={{
            title: 'Permission to use audio recording',
            message: 'We need your permission to use your audio',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
        >
          {({ camera, status, recordAudioPermissionStatus }) => {
            if (status !== 'READY') return <PendingView />
            return (
              <View style={{ flex: 1 }}>
                {this.props.filter}

                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                  <View style={{ flex: 1 }}/>
                  <View style={{ flex: 1, alignItems: 'center' }}>
                    <TouchableHighlight
                      onPress={() => this.takePicture(camera)}
                      style={{
                        width: 72,
                        height: 72,
                        borderRadius: 72/2,
                        backgroundColor: colors.smoky,
                        padding: 5
                      }}
                    >
                      <View style={{ flex: 1, backgroundColor: colors.white, borderRadius: 72/2, borderColor: colors.black, borderWidth: 3 }} />
                    </TouchableHighlight>
                  </View>
                  { this.props.switchCamera ? <TouchableOpacity
                    onPress={() => this.setState({ switch: !this.state.switch })}
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  >
                    <Image source={images.iconCameraRefresh} />
                  </TouchableOpacity> : <View style={{ flex: 1 }}/>}
                </View>
              </View>
            )
          }}
        </RNCamera>
      </View>
    );
  }

  takePicture = async function(camera) {
    const options = { quality: 0.5, base64: true };
    const data = await camera.takePictureAsync(options)
    this.props.handleInput({ type: 'camera', uri: data.uri })
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
})