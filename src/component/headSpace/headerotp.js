import React from 'react'
import {
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator
} from 'react-native'
import { connect } from 'react-redux'
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

const mapToProps = ({ root }) => ({ root })

@connect(mapToProps, null)
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
    countdown: 1,
    lastTime: 0,
    appState: '',
    loading: false
  }

  componentDidMount = () => {
    this.setState({ loading: true })
    this.starttimer()
  }

  // tick for Renew countdown otp
  componentWillReceiveProps = nextProps => {

    if (nextProps.root.appState === 'background') {
      clearInterval(this.timerCount)
      this.setState({ appState: 'background', loading: true })
    } else if (nextProps.root.appState === 'active' && this.state.appState === 'background') {
      const currentTime = new Date()

      const diff = (Math.abs(currentTime - this.state.lastTime)) / 1000

      this.starttimer(this.state.countdown + diff)

      this.setState({ appState: 'active' })
    }

    if (nextProps.overRequest) {
      this.setState({ loading: true })
      clearInterval(this.timerCount)
      this.starttimer()
      // tick overRequest for reset state in otp page
      this.props.setState()
    }

  }

  componentWillUnmount = () => clearInterval(this.timerCount)

  starttimer = (countdown = 1) => {
    clearInterval(this.timerCount)
    this.setState({ countdown })
    setTimeout(() => this.setState({ loading: false }), 1300)
    this.timerCount = setInterval(() => this.timer(), 1000)
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
      this.setState({
        lastTime: new Date(),
        countdown: this.state.countdown + 1,
        minutes: minutes,
        seconds: seconds
      }) // เปรียบเทียบโดยใช้เวลาเริ่มต้นและเวลาปัจจุบัน
    }
  }

  onResendOTP = success => {
    if (!success) {
      return this.setState({ countdown: 1, minutes: '00', seconds: '00', loading: false })
    } else {
      this.starttimer()
    }
  }

  onPressResendOTP = () => {
    this.setState({ loading: true })
    this.props.onPress(async success => await this.onResendOTP(success))
  }

  render() {
    const { minutes, seconds, loading } = this.state
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
                    {
                      loading ? <ActivityIndicator size="small" color={colors.emerald} />
                        : <TBold>{secToMinute({ minutes, seconds })}</TBold>
                    }
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPressIn={this.onPressResendOTP}
                    style={{
                      width: 160,
                      height: 40,
                      borderRadius: 40 / 2,
                      backgroundColor: loading ? colors.white : colors.emerald,
                      marginBottom: 10,
                      justifyContent: 'center',
                    }}
                  >
                    {
                      loading ? <ActivityIndicator size="small" color={colors.emerald} />
                        : <TBold color={colors.white}>ขอรับรหัสใหม่</TBold>
                    }
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