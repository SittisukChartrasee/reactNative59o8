const scopeError = 'error.message'
const scopeModal = 'modal.message'
const scopeOTP = 'otp.message'
const scopePasscode = 'passcode.message'
const code = {
  default: '1103',
  callCenter: '1101',
  defineLogin: '1701',
}

export const errorMessage = {
  networkError: {
    id: `${scopeError}.network`,
    code: code.default,
    defaultMessage: 'ไม่สามารถเชื่อมต่อกับระบบได้ กรุณาตรวจสอบการเชื่อมต่ออินเทอร์เน็ตของท่าน\nและลองทำรายการใหม่อีกครั้ง\nขออภัยในความไม่สะดวก หรือ\nติดต่อ 02 673 3888 กด 1 และ กด 1',
  },
  requestError: {
    id: `${scopeError}.request`,
    code: code.default,
    defaultMessage: 'ไม่สามารถเชื่อมต่อกับระบบได้ กรุณารอสักครู่ และทำรายการใหม่อีกครั้ง\nขออภัยในความไม่สะดวก หรือ\nติดต่อ 02 673 3888 กด 1 และ กด 1',
  },
  jwtExpired: {
    id: `${scopeError}.expired`,
    code: code.defineLogin,
    defaultMessage: 'ท่านไม่ได้ทำรายการใดๆ เกินระยะเวลาที่\nกำหนด กรุณาเข้าสู่ระบบใหม่อีกครั้ง',
  },
  messageIsNull: {
    id: `${scopePasscode}.message`,
    code: code.default,
    defaultMessage: 'เกิดข้อผิดพลาด กรุณารอสักครู่ และทำรายการใหม่อีกครั้ง ขออภัยในความไม่สะดวก',
  }
}

export const modalMessage = {
  callCenter: {
    id: `${scopeModal}.callCenter`,
    code: code.callCenter,
    defaultMessage: 'ขออภัยท่านไม่สามารถเปิดบัญชีกองทุน\nผ่านช่องทาง K-My Funds ได้\nกรุณาติดต่อ KAsset Contact Center\n02 673 3888 กด 1 และ กด 1',
  },
}

export const otpMessage = {
  preconditionRequired: {
    id: `${scopeOTP}.required`,
    code: code.defineLogin,
    defaultMessage: 'เกิดข้อผิดพลาด กรุณาเข้าสู่ระบบใหม่อีกครั้ง ขออภัยในความไม่สะดวก',
  },
}

export const passcodeMessage = {
  unauthorized: {
    id: `${scopePasscode}.unauthorized`,
    code: code.defineLogin,
    defaultMessage: 'เกิดข้อผิดพลาด กรุณาเข้าสู่ระบบใหม่อีกครั้ง ขออภัยในความไม่สะดวก',
  },
  equalPasscode: {
    id: `${scopePasscode}.equal`,
    code: code.default,
    defaultMessage: 'รหัสผ่าน (PIN) ไม่ตรงกับที่ตั้งไว้\nกรุณากรอกใหม่อีกครั้ง',
  },
  messageIsNull: {
    id: `${scopePasscode}.message`,
    code: code.default,
    defaultMessage: 'เกิดข้อผิดพลาด กรุณาทำรายการใหม่อีกครั้ง ขออภัยในความไม่สะดวก',
  }
}
