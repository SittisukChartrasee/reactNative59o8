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
import HeaderSpace from '../component/gradient/HeaderSpace'
import Input from '../component/input'
import Keyboard from '../component/keyboard'

class Welcome extends React.Component {
  render() {
    return (
      <Screen>
        <View style={{ flex: 1 }}>

        </View>
        <View style={{ flex: 1, backgroundColor: '#fff' }}>

        </View>
      </Screen> 
    )
  }
}

const mapToProps = ({ root }) => ({ root })
export default connect(mapToProps)(Welcome)

// {/* <HeaderSpace /> */}
//         {/* <NavBar
//           navLeft={
//             <TouchableOpacity>
//               <Image source={images.iconback} />
//             </TouchableOpacity>
//           }
//           // navRight={
//           //   <TouchableOpacity>
//           //     <Image source={images.iconback} />
//           //   </TouchableOpacity>
//           // }
//         /> */}
//         {/* <Text style={{ fontFamily: 'SukhumvitSet-Thin', fontSize: 28 }}>TESTTEST</Text> */}
//         {/* <Input type="mask" /> */}

//         {/* <Keyboard /> */}