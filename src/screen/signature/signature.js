import React, {Component} from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import SignatureCapture from 'react-native-signature-capture'
export default class Demo extends Component {
  saveSign() {
    this.signature.saveImage()
  }

  resetSign() {
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
      signature: {
          flex: 1,
          borderColor: '#000033',
          borderWidth: 1,
      },
      buttonStyle: {
          flex: 1, justifyContent: "center", alignItems: "center", height: 50,
          backgroundColor: "#eeeeee",
          margin: 10
      }
  })
    return (
      <View style={{ flex: 1, flexDirection: "column" }}>
        <Text style={{alignItems:"center",justifyContent:"center"}}>Signature Capture Extended </Text>
        {/* <SignatureCapture
          style={[{flex:1},styles.signature]}
          ref={ref => { this.sign = ref }}
          onSaveEvent={this._onSaveEvent}
          onDragEvent={this._onDragEvent}
          saveImageFileInExtStorage={false}
          showNativeButtons={false}
          showTitleLabel={false}
          viewMode={"portrait"}/> */}

        <SignatureCapture
          // onTouchStart={e => this.setState({ dragged: !!e.nativeEvent })}
          style={{
            flex: 1
            // width: '100%', height: '99.99%', opacity: 0.5,
          }}
          ref={(ref) => { this.signature = ref }}
          showBorder
          saveImageFileInExtStorage
          onSaveEvent={this._onSaveEvent}
          showNativeButtons={false}
          showTitleLabel={false}
          viewMode="portrait"
        />

        <View style={{ flex: 1, flexDirection: "row" }}>
          <TouchableHighlight style={styles.buttonStyle}
              onPress={() => { this.saveSign() } } >
              <Text>Save</Text>
          </TouchableHighlight>

          <TouchableHighlight style={styles.buttonStyle}
              onPress={() => { this.resetSign() } } >
              <Text>Reset</Text>
          </TouchableHighlight>
        </View>
    </View>
    )
  }
}