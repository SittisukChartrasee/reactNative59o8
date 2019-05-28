import React from 'react'
import {
  View,
  Image,
  TouchableOpacity,
} from 'react-native'
import colors from '../../config/colors';
import images from '../../config/images';
import { TLight, TMed, TBold } from '../texts';

const secToMinute = (sec) => `${Math.floor(sec / 60).toString().padStart(2, '0')}:${(sec % 60).toString().padStart(2, '0')}`

export default class extends React.Component {
  static defaultProps = {
    dot: [false, false, false, false, false, false],
    currentDot: '',
    refNo: null,
    onPress: () => { },
  }

  state = {
    startState: 1,
    endState: 0
  }

  componentDidMount = () => this.timer()

  timer = () => {
    if (this.state.startState > this.state.endState) {
      setTimeout(() => {
        this.setState({ startState: this.state.startState - 1 })
        this.timer()
      }, 1000)
    }
  }

  render() {
    const { startState } = this.state
    const { dot, onPress, refNo, onPrevPage } = this.props
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 0.8, justifyContent: 'flex-end' }}>
          {/* <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingBottom: 24 }}> */}
          {/* <TouchableOpacity onPress={onPrevPage} >
              <Image source={images.iconback} />
            </TouchableOpacity> */}
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingBottom: 24 }}>
            <TBold fontSize={28} color={colors.white}>ยืนยัน OTP</TBold>
            <View />
          </View>
          <View style={{ backgroundColor: 'transparent', alignItems: 'center' }}>
            <View style={{ backgroundColor: colors.white, height: 60 / 2, width: '100%', position: 'absolute', bottom: 0 }} />
            {
              startState !== 0
                ? (
                  <TouchableOpacity
                    disabled
                    style={{
                      width: 160,
                      height: 40,
                      borderRadius: 40 / 2,
                      backgroundColor: colors.white,
                      shadowColor: colors.black,
                      shadowOpacity: 0.5,
                      shadowRadius: 5,
                      shadowOffset: {
                        height: 0,
                        width: 0
                      },
                      marginBottom: 10,
                      justifyContent: 'center',
                    }}
                  >
                    <TBold>{secToMinute(startState)}</TBold>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={
                      async () => {
                        await onPress(async (time = 180) => {
                          await this.setState({ startState: time })
                          await this.timer()
                        })
                      }}
                    style={{
                      width: 160,
                      height: 40,
                      borderRadius: 40 / 2,
                      backgroundColor: colors.emerald,
                      marginBottom: 10,
                      justifyContent: 'center',
                    }}
                  >
                    <TBold color={colors.white}>ขอรับรหัสใหม่</TBold>
                  </TouchableOpacity>
                )
            }
          </View>
        </View>

        <View style={{ flex: 1, paddingHorizontal: 24, paddingTop: 5, backgroundColor: colors.white }}>
          <TLight color={colors.grey}>กรุณากรอกรหัสผ่านแบบใช้ครั้งเดียว ( SMS OTP) ที่ได้รับทาง SMS บนมือถือของท่าน (รหัส OTP มีอายุการใช้งาน 3 นาที)</TLight>
          <TBold color={colors.emerald} fontSize={16} mt={16}>รหัสอ้างอิง : {refNo}</TBold>

          <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: 10 }}>
            {
              dot.map((d, key) => {
                return d ? (
                  <View
                    key={key}
                    style={{
                      width: 40,
                      borderColor: colors.emerald,
                      borderWidth: 2,
                      borderRadius: 4,
                      marginLeft: key === 0 ? 0 : 8
                    }}
                  >
                    {
                      key + 1 < (dot.indexOf(false) < 0 ? 6 : dot.indexOf(false))
                        ? <TMed fontSize={28} color={colors.emerald}>•</TMed>
                        : <TMed fontSize={28}>{this.props.currentDot}</TMed>
                    }
                  </View>
                ) : (
                    <View
                      key={key}
                      style={{
                        width: 40,
                        borderColor: key === dot.indexOf(false) ? colors.emerald : colors.smoky,
                        borderWidth: 2,
                        borderRadius: 4,
                        marginLeft: key === 0 ? 0 : 8
                      }}
                    >
                      <TMed fontSize={28}>{` `}</TMed>
                    </View>
                  )
              })
            }
          </View>

        </View>
      </View>
    )
  }
}