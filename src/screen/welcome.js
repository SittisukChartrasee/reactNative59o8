import React from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native'
import { connect } from 'react-redux'
import Screen from '../component/screenComponent'
import { NavBar } from '../component/gradient/navBar';
import images from '../config/images'
import HeaderBox from '../component/gradient/headerBox'

class Welcome extends React.Component {
  render() {
    return (
      <Screen color="transparent">
        <HeaderBox />
        {/* <NavBar
          navLeft={
            <TouchableOpacity>
              <Image source={images.iconback} />
            </TouchableOpacity>
          }
          // navRight={
          //   <TouchableOpacity>
          //     <Image source={images.iconback} />
          //   </TouchableOpacity>
          // }
        /> */}
        <Text style={{ fontFamily: 'SukhumvitSet-Thin', fontSize: 28 }}>TESTTEST</Text>
        <TextInput value="" style={{ backgroundColor: 'red'}} />
      </Screen>
    )
  }
}

const mapToProps = ({root}) => ({root})

export default connect(mapToProps)(Welcome)