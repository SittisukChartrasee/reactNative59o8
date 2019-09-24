import React from 'react'
import {
  View,
  Image,
  TouchableOpacity,
  Dimensions
} from 'react-native'
import colors from '../../config/colors'
import images from '../../config/images'
import { TLight, TMed, TBold } from '../texts'
import { NavBar } from '../gradient'

const secToMinute = ({ minutes, seconds }) => `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
const { height: heightScreen } = Dimensions.get('window')


let sizeFont = { TLight: 16, TBold: 16, navBar: 28, margin: 16, }
if (heightScreen <= 568) {
  sizeFont = { TLight: 12, TBold: 12, navBar: 20, margin: 6, }
} else if (heightScreen <= 667) {
  sizeFont = { TLight: 14, TBold: 14, navBar: 24, margin: 10, }
} else {
  sizeFont = { TLight: 16, TBold: 16, navBar: 28, margin: 16, }
}

export default class extends React.Component {
  static defaultProps = {
    dot: [false, false, false, false, false, false],
    currentDot: '',
    refNo: null,
    overRequest: false,
    onPress: () => { },
  }

  state = {
    diff: 0,
    minutes: 0,
    seconds: 0,
    countdown: 1
  }

  componentDidMount = () => {
    clearInterval(this.timerCount)
    this.timerCount = setInterval(() => {
      this.timer()
    }, 1000)
  }

  // tick for Renew countdown otp
  componentWillReceiveProps(nextProps) {
    if (nextProps.overRequest) {
      clearInterval(this.timerCount)
      this.resendOTP()
      // tick overRequest for reset state in otp page
      this.props.setState()
    }
  }

  componentWillUnmount = () => {
    clearInterval(this.timerCount)
  }

  starttimer = () => {
    clearInterval(this.timerCount)
    this.setState({ countdown: 1 })
    this.timerCount = setInterval(() => {
      this.timer()
    }, 1000)
  }

  timer() {
    let diff = this.state.diff
    let minutes = this.state.minutes
    let seconds = this.state.seconds

    // เปรียบเทียบโดยใช้เวลาหมดอายุลบด้วยเวลาปัจจุบัน
    // diff = ((((this.props.timer * 1000) - Date.now()) / 1000) | 0)

    // เปรียบเทียบโดยใช้นับถอยหลัง
    diff = this.props.timer - this.state.countdown
    minutes = (diff / 60) | 0
    seconds = (diff % 60) | 0
    minutes = minutes < 10 ? "0" + minutes : minutes
    seconds = seconds < 10 ? "0" + seconds : seconds
    if (diff <= 0) { // ดักก่อน setState
      clearInterval(this.timerCount)
      this.setState({ countdown: 1, minutes: '00', seconds: '00' })
    } else {
      this.setState({ countdown: this.state.countdown + 1, minutes: minutes, seconds: seconds }) // เปรียบเทียบโดยใช้เวลาเริ่มต้นและเวลาปัจจุบัน
    }
  }

  resendOTP = () => this.starttimer()

  render() {
    const { minutes, seconds } = this.state
    const { dot, refNo, overRequestUi } = this.props
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 0.8, justifyContent: 'flex-end' }}>
          <NavBar
            color="transparent"
            title="ยืนยัน OTP"
            fontSize={sizeFont.navBar}
            navLeft={
              <TouchableOpacity
                onPress={this.props.onPrevPage}
                style={{ paddingRight: 30 }}
              >
                <Image source={images.iconback} />
              </TouchableOpacity>
            }
          />
          <View style={{ backgroundColor: 'transparent', alignItems: 'center' }}>
            <View style={{ backgroundColor: colors.white, height: 60 / 2, width: '100%', position: 'absolute', bottom: 0 }} />
            {
              minutes !== '00' || seconds !== '00'
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
                    <TBold>{secToMinute({ minutes, seconds })}</TBold>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={
                      async () => {
                        await this.props.onPress(async () => {
                          await this.resendOTP()
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
          <TLight fontSize={sizeFont.TLight} color={colors.grey}>{`กรุณากรอกรหัสผ่านแบบใช้ครั้งเดียว ( SMS OTP)\nที่ได้รับทาง SMS บนมือถือของท่าน\n(รหัส OTP มีอายุการใช้งาน ${this.props.text} นาที)`}</TLight>
          <TBold color={colors.emerald} fontSize={sizeFont.TBold} mt={sizeFont.margin}>รหัสอ้างอิง : {refNo}</TBold>

          <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: 10 }}>
            {
              overRequestUi
                ? (
                  dot.map((d, key) => (
                    <View
                      key={key}
                      style={{
                        width: 40,
                        backgroundColor: colors.smoky,
                        borderRadius: 4,
                        marginLeft: key === 0 ? 0 : 8
                      }}
                    >
                      <TMed fontSize={28}>{` `}</TMed>
                    </View>
                  )))
                : (
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
                )
            }
          </View>

        </View>
      </View>
    )
  }
}