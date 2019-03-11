import React from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native'
import { connect } from 'react-redux'
import { TBold } from '../component/texts'
import Screen from '../component/screenComponent'
import colors from '../config/colors'
import images from '../config/images'
import { NavBar } from '../component/gradient/navBar';
import HeaderSpace from '../component/gradient/HeaderSpace'
import Input from '../component/input'
import Keyboard from '../component/keyboard'

class Welcome extends React.Component {
  render() {
    return (
      <Screen>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Image source={images.kmyfundLogo} />
          <TBold fontSize={20} color={colors.white} mt="30">{`ลงทะเบียนเปิดบัญชีลงทุน\nผ่านแอปพลิเคชั่น`}</TBold>
        </View>
        <View style={{ flex: 1, backgroundColor: '#fff', paddingHorizontal: 24, paddingVertical: 24 }}>
          <Input type="mask" />
          <Input type="dropdown" />
          <Input type="textInput" />
          <Input type="radio" />
          <Input />
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
