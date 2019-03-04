import React from 'react'
import { 
  View, 
  Text, 
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Platform,
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import colors from '../../config/colors'

const Screen = props => (
  <LinearGradient 
    colors={props.color ? [props.color, props.color] : [colors.darkSage, colors.hunterGreen]} 
    style={styles.linearGradient}
  >
    { Platform.OS === 'android' && <StatusBar translucent backgroundColor="transparent" currentHeight={(d) => console.log(d)} /> }
    {/* <SafeAreaView> */}
      { props.children }
      <Text style={styles.buttonText}>
        Sign in with Facebook
      </Text>
    {/* </SafeAreaView> */}
  </LinearGradient>
)

var styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
});


export default Screen