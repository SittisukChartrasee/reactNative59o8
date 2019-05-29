import React from 'react'
import {
  View,
  Image,
  TouchableOpacity,
} from 'react-native'
import colors from '../../config/colors'
import images from '../../config/images'
import { TLight, TMed, TBold } from '../texts'

// const secToMinute = (sec) => `${Math.floor(sec / 60).toString().padStart(2, '0')}:${(sec % 60).toString().padStart(2, '0')}`

export default class extends React.Component {
  static defaultProps = {
    dot: [false, false, false, false, false, false],
    currentDot: '',
    refNo: null,
    overRequest: false,
    details: 3,
    onPress: () => { },
  }

  timerCount = ''

  state = {
    startState: 180,
    endState: 0,
    start: Date.now(),
    diff: 0,
    minutes: 0,
    seconds: 0,
    duration: 60 * 3,
    resend: false,
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.overRequest) {
      clearInterval(this.timerCount)
      this.resendOTP(6)
      this.props.setState()
    }
  }

  componentDidMount = () => {
    clearInterval(this.timerCount)
    this.timerCount = setInterval(() => {
      this.timer()
    }, 1000)
  }

  componentWillUnmount = () => {
    clearInterval(this.timerCount)
  }

  starttimer = () => {
    clearInterval(this.timerCount)
    this.timerCount = setInterval(() => {
      this.timer()
    }, 1000)
  }

  timer = () => {
    let diff = this.state.diff
    let minutes = this.state.minutes
    let seconds = this.state.seconds
    diff = this.state.duration - (((Date.now() - this.state.start) / 1000) | 0)
    minutes = (diff / 60) | 0
    seconds = (diff % 60) | 0
    minutes = minutes < 10 ? "0" + minutes : minutes
    seconds = seconds < 10 ? "0" + seconds : seconds
    this.setState({ minutes: minutes, seconds: seconds })

    if (diff <= 0) {
      this.setState({ resend: true })
      clearInterval(this.timerCount)
    }
  }

  resendOTP = (minutes) => {
    this.setState({ start: Date.now(), minutes: 6, seconds: 0, duration: 60 * minutes })
    this.starttimer()
  }

  render() {
    const { startState } = this.state
    const { dot, onPress, refNo, overRequestUi, onPrevPage } = this.props
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
                    {/* <TBold>{secToMinute(startState)}</TBold> */}
                    <TBold>{this.state.minutes.toString().padStart(2, '0')} : {this.state.seconds.toString().padStart(2, '0')}</TBold>
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
          <TLight color={colors.grey}>กรุณากรอกรหัสผ่านแบบใช้ครั้งเดียว ( SMS OTP) ที่ได้รับทาง SMS บนมือถือของท่าน (รหัส OTP มีอายุการใช้งาน {this.props.details} นาที)</TLight>
          <TBold color={colors.emerald} fontSize={16} mt={16}>รหัสอ้างอิง : {refNo}</TBold>

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