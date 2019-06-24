import React from 'react'
import { AsyncStorage } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import moment from 'moment-timezone'
import { withApollo } from 'react-apollo'
import Keyboard from '../component/keyboard'
import Screen from '../component/screenComponent'
import { HeadSpace } from '../component/headSpace'
import { navigateAction } from '../redux/actions'
import { fatca, suittest } from '../redux/actions/commonAction'
import { requestLogin } from '../redux/actions/root-active'
import { updateUser } from '../redux/actions/commonAction'
import { containerQuery, getStatus, getUser } from '../containers/query'
import {
	formatIdCard,
	formatPhoneNumber,
	convertDate_reverse,
	getStatusGender_reverse,
	getStatusMartial_reverse,
	month,
	tomorrowDate
} from '../utility/helper'

const defaultPasscode = {
	dot: ['', '', '', '', '', ''],
	number: '',
}

const momentDate = date => moment(date).tz('Asia/Bangkok')

const mapToProps = ({ user, fatcaReducer, suitReducer }) => ({ user, fatcaReducer, suitReducer })
const dispatchToProps = dispatch => ({
	navigateAction: bindActionCreators(navigateAction, dispatch),
	requestLogin: bindActionCreators(requestLogin, dispatch),
	updateUser: bindActionCreators(updateUser, dispatch),
	updateFatca: bindActionCreators(fatca, dispatch),
	updateSuittest: bindActionCreators(suittest, dispatch)
})
@connect(mapToProps, dispatchToProps)
@withApollo
export default class extends React.Component {
	state = {
		dot: ['', '', '', '', '', ''],
		number: '',
		defaultKey: false,
		dis: '',
		countPassFail: 0
	}


	setNumber = async obj => {
		let userToken = await AsyncStorage.getItem('user_token')
		if (!userToken) userToken = this.props.navigation.getParam('user_token', '')
		const { user } = this.props
		this.setState({ ...obj })

		if (obj.number.length === 6) {
			this.props.requestLogin({ userToken, password: obj.number })
				.then(async res => {
					if (res.success) {
						AsyncStorage.setItem('access_token', res.result.access_token)
						AsyncStorage.setItem('user_token', userToken)

						this.props.updateUser('profile', {
							...user.profile,
							'idCard': formatIdCard(res.result.id_card)
						})

						this.props.updateUser('contact', {
							...user.contact,
							mobilePhone: formatPhoneNumber(res.result.phone_no),
							email: res.result.email
						})

						await this.props.client.query({ query: getUser })
							.then((val) => this.onHandletesttest(val))
							.catch(err => console.error(err))

						await containerQuery(
							this.props.client,
							{ query: getStatus },
							this.onHandleChooseScreen
						)

					} else if (!res.success) {
						this.setState({
							...defaultPasscode,
							defaultKey: true,
							countPassFail: this.state.countPassFail + 1
						},
							() => {
								if (this.state.countPassFail > 3) return this.props.navigateAction({ ...this.props, page: 'lockUser' })
							}
						)
					}
				})
				.catch(err => {
					console.log(err)
				})
		}
	}

	onHandletesttest = val => {
		console.log(val.data.getUser.result)
		if (val.data.getUser.success) {

			if (val.data.getUser.result.identity) {
				const identityDocExpDate = momentDate(val.data.getUser.result.identity.docExpDate)._a
				this.props.updateUser('profile', {
					...this.props.user.profile,
					isNoDocExpDate: val.data.getUser.result.identity.isNoDocExpDate,
					expireDateFlag: val.data.getUser.result.identity.isNoDocExpDate ? 'ไม่มีวันหมดอายุ' : 'มีวันหมดอายุ',
					docExpDate: val.data.getUser.result.identity.isNoDocExpDate ? `${tomorrowDate()[2]}-${tomorrowDate()[1]}-${tomorrowDate()[0]}` : convertDate_reverse(identityDocExpDate),
					genderCode: val.data.getUser.result.identity.genderCode,
					gender: getStatusGender_reverse(val.data.getUser.result.identity.genderCode),
					titleTH: val.data.getUser.result.identity.titleTH,
					firstNameTH: val.data.getUser.result.identity.firstNameTH,
					lastNameTH: val.data.getUser.result.identity.lastNameTH,
					firstNameEN: val.data.getUser.result.identity.firstNameEN,
					lastNameEN: val.data.getUser.result.identity.lastNameEN,
					birthDay: `${val.data.getUser.result.identity.dayOfBirth}/${month[parseInt(val.data.getUser.result.identity.monthOfBirth) - 1]}/${val.data.getUser.result.identity.yearOfBirth}`,
					dayOfBirth: val.data.getUser.result.identity.dayOfBirth,
					monthOfBirth: val.data.getUser.result.identity.monthOfBirth,
					yearOfBirth: val.data.getUser.result.identity.yearOfBirth,
					nationalityCode: val.data.getUser.result.identity.nationalityCode,
					martialStatusCode: val.data.getUser.result.identity.martialStatusCode,
					martialStatus: getStatusMartial_reverse(val.data.getUser.result.identity.martialStatusCode),
					isChild: val.data.getUser.result.identity.isChild ? 'มี' : 'ไม่มี',
				})
			}
			
			if (val.data.getUser.result.spouse) {
				const spouseDocExpDate = momentDate(val.data.getUser.result.spouse.cardExpiredDate)._a
				this.props.updateUser('spouse', {
					...this.props.user.spouse,
					nationFlag: val.data.getUser.result.spouse.nationalityCode === 'TH' ? 'ไทย' : 'ชาวต่างชาติ',
					IDCardNo: val.data.getUser.result.spouse.nationalityCode === 'TH' ? formatIdCard(val.data.getUser.result.spouse.IDCardNo) : '',
					marryPassport: val.data.getUser.result.spouse.nationalityCode === 'TH' ? '' : val.data.getUser.result.spouse.IDCardNo,
					marryCountry: '', // ต้องให้ back ส่งมา
					nationalityCode: val.data.getUser.result.spouse.nationalityCode,
					isIDCardExpDate: !val.data.getUser.result.spouse.isIDCardExpDate,
					cardExpiredDate: val.data.getUser.result.spouse.isIDCardExpDate ? convertDate_reverse(spouseDocExpDate) : `${tomorrowDate()[2]}-${tomorrowDate()[1]}-${tomorrowDate()[0]}`,
					marryExpireDate: val.data.getUser.result.spouse.nationalityCode === 'TH' ? `${tomorrowDate()[2]}-${tomorrowDate()[1]}-${tomorrowDate()[0]}` : convertDate_reverse(spouseDocExpDate),
					title: val.data.getUser.result.spouse.title,
					fistName: val.data.getUser.result.spouse.fistName,
					lastName: val.data.getUser.result.spouse.lastName,
					pepFlag: val.data.getUser.result.spouse.pepFlag,
				})
			}


			if (val.data.getUser.result.fatca) {
				const { fatca } = this.props.fatcaReducer
				const data = [
					{
						...fatca[0],
						answer: val.data.getUser.result.fatca.isUSCitizen ? 0 : 1
					}, {
						...fatca[1],
						answer: val.data.getUser.result.fatca.isUSCitizen ? 0 : 1,
					}, {
						...fatca[2],
						answer: val.data.getUser.result.fatca.isHoldingUsCard ? 0 : 1,
					}, {
						...fatca[3],
						answer: val.data.getUser.result.fatca.isUSTaxPurposes ? 0 : 1,
					}, {
						...fatca[4],
						answer: val.data.getUser.result.fatca.surrenderedUSCitizenship ? 0 : 1,
					}, {
						...fatca[5],
						answer: val.data.getUser.result.fatca.transferFundsToAccountInUS ? 0 : 1,
					}, {
						...fatca[6],
						answer: val.data.getUser.result.fatca.grantedToPersonWithUSAddress ? 0 : 1,
					}, {
						...fatca[7],
						answer: val.data.getUser.result.fatca.mailOrCareOfAddressAccountOpenedKBank ? 0 : 1,
					}, {
						...fatca[8],
						answer: val.data.getUser.result.fatca.currentOrMailingAddressAccountOpenedKbank ? 0 : 1,
					}, {
						...fatca[9],
						answer: val.data.getUser.result.fatca.isUSPhoneNo ? 0 : 1,
					}	
				]
				this.props.updateFatca('fatca', data)
			}
			
			if (val.data.getUser.result.fraud) {
				const { fraud } = this.props.user 
				const data = [
					{
						...fraud.choice[0],
						answer: val.data.getUser.result.fraud.hasLaunderingRecord ? 0 : 1,
					}, {
						...fraud.choice[1],
						answer: val.data.getUser.result.fraud.isPolitician ? 0 : 1,
					},
				]
				this.props.updateUser('fraud', { choice: data })
			}

			if (val.data.getUser.result.contact) {
				const data = {
					workPhone: val.data.getUser.result.contact.workPhone,
					homePhone: val.data.getUser.result.contact.homePhone,
					mobilePhone: val.data.getUser.result.contact.mobilePhone,
					email: val.data.getUser.result.contact.email
				}
				this.props.updateUser('contact', data)
			}

			if (val.data.getUser.result.contact) {
				const data = {
					workPhone: val.data.getUser.result.contact.workPhone,
					homePhone: val.data.getUser.result.contact.homePhone,
					mobilePhone: val.data.getUser.result.contact.mobilePhone,
					email: val.data.getUser.result.contact.email
				}
				this.props.updateUser('contact', data)
			}


			if (val.data.getUser.result.suitability) {
				const { suittest } = this.props.suitReducer
				const suitability = [
					{
						...suittest[0],
						answer: val.data.getUser.result.suitability.suit01 - 1,
					}, {
						...suittest[1],
						answer: val.data.getUser.result.suitability.suit02 - 1,
					}, {
						...suittest[2],
						answer: val.data.getUser.result.suitability.suit03 - 1,
					}, {
						...suittest[3],
						choice: [
							{ ...suittest[3].choice[0], select: val.data.getUser.result.suitability.suit04Array[0]},
							{ ...suittest[3].choice[1], select: val.data.getUser.result.suitability.suit04Array[1]},
							{ ...suittest[3].choice[2], select: val.data.getUser.result.suitability.suit04Array[2]},
							{ ...suittest[3].choice[3], select: val.data.getUser.result.suitability.suit04Array[3]},
							{ ...suittest[3].choice[4], select: val.data.getUser.result.suitability.suit04Array[4]},
						]
					}, {
						...suittest[4],
						answer: val.data.getUser.result.suitability.suit05 - 1,
					}, {
						...suittest[5],
						answer: val.data.getUser.result.suitability.suit06 - 1,
					}, {
						...suittest[6],
						answer: val.data.getUser.result.suitability.suit07 - 1,
					}, {
						...suittest[7],
						answer: val.data.getUser.result.suitability.suit08 - 1,
					}, {
						...suittest[8],
						answer: val.data.getUser.result.suitability.suit09 - 1,
					}, {
						...suittest[9],
						answer: val.data.getUser.result.suitability.suit10 - 1,
					}, {
						...suittest[10],
						answer: val.data.getUser.result.suitability.suit11 - 1,
					}, {
						...suittest[11],
						answer: val.data.getUser.result.suitability.suit12 - 1,
					} ]
				this.props.updateSuittest('suittest', suitability)
			}

			if (val.data.getUser.result.mailingAddress) {
				const mailingAddress = {
					countryCode: val.data.getUser.result.mailingAddress.CountryCode,
					addressNoTH: val.data.getUser.result.mailingAddress.AddressNoTH,
					moo: val.data.getUser.result.mailingAddress.Moo,
					addressVillageTH: val.data.getUser.result.mailingAddress.AddressVillageTH,
					floorNo: val.data.getUser.result.mailingAddress.FloorNo,
					trokSoiYaek: val.data.getUser.result.mailingAddress.TrokSoiYaek,
					thanon: val.data.getUser.result.mailingAddress.Thanon,
					districtNameTH: val.data.getUser.result.mailingAddress.District,
					districtCode: val.data.getUser.result.mailingAddress.DistrictCode,
					subDistrict: val.data.getUser.result.mailingAddress.SubDistrict,
					subDistrictCode: val.data.getUser.result.mailingAddress.SubDistrictCode,
					provinceNameTH: val.data.getUser.result.mailingAddress.Province,
					provinceCode: val.data.getUser.result.mailingAddress.ProvinceCode,
					zipCode: val.data.getUser.result.mailingAddress.ZipCode,
				}
				this.props.updateUser('addressDoc', mailingAddress)
			}

			if (val.data.getUser.result.currentAddress) {
				const currentAddress = {
					countryCode: val.data.getUser.result.currentAddress.CountryCode,
					addressNoTH: val.data.getUser.result.currentAddress.AddressNoTH,
					moo: val.data.getUser.result.currentAddress.Moo,
					addressVillageTH: val.data.getUser.result.currentAddress.AddressVillageTH,
					floorNo: val.data.getUser.result.currentAddress.FloorNo,
					trokSoiYaek: val.data.getUser.result.currentAddress.TrokSoiYaek,
					thanon: val.data.getUser.result.currentAddress.Thanon,
					districtNameTH: val.data.getUser.result.currentAddress.District,
					districtCode: val.data.getUser.result.currentAddress.DistrictCode,
					subDistrict: val.data.getUser.result.currentAddress.SubDistrict,
					subDistrictCode: val.data.getUser.result.currentAddress.SubDistrictCode,
					provinceNameTH: val.data.getUser.result.currentAddress.Province,
					provinceCode: val.data.getUser.result.currentAddress.ProvinceCode,
					zipCode: val.data.getUser.result.currentAddress.ZipCode,
				}
				this.props.updateUser('addressCurr', currentAddress)
			}

			if (val.data.getUser.result.workAddress) {
				const workAddress = {
					countryCode: val.data.getUser.result.workAddress.CountryCode,
					addressNoTH: val.data.getUser.result.workAddress.AddressNoTH,
					moo: val.data.getUser.result.workAddress.Moo,
					addressVillageTH: val.data.getUser.result.workAddress.AddressVillageTH,
					floorNo: val.data.getUser.result.workAddress.FloorNo,
					trokSoiYaek: val.data.getUser.result.workAddress.TrokSoiYaek,
					thanon: val.data.getUser.result.workAddress.Thanon,
					districtNameTH: val.data.getUser.result.workAddress.District,
					districtCode: val.data.getUser.result.workAddress.DistrictCode,
					subDistrict: val.data.getUser.result.workAddress.SubDistrict,
					subDistrictCode: val.data.getUser.result.workAddress.SubDistrictCode,
					provinceNameTH: val.data.getUser.result.workAddress.Province,
					provinceCode: val.data.getUser.result.workAddress.ProvinceCode,
					zipCode: val.data.getUser.result.workAddress.ZipCode,
					companyName: val.data.getUser.result.workAddress.CompanyName,
				}
				this.props.updateUser('addressWork', workAddress)
			}

			if (val.data.getUser.result.permanentAddress) {
				const permanentAddress = {
					countryCode: val.data.getUser.result.permanentAddress.CountryCode,
					addressNoTH: val.data.getUser.result.permanentAddress.AddressNoTH,
					moo: val.data.getUser.result.permanentAddress.Moo,
					addressVillageTH: val.data.getUser.result.permanentAddress.AddressVillageTH,
					floorNo: val.data.getUser.result.permanentAddress.FloorNo,
					trokSoiYaek: val.data.getUser.result.permanentAddress.TrokSoiYaek,
					thanon: val.data.getUser.result.permanentAddress.Thanon,
					districtNameTH: val.data.getUser.result.permanentAddress.District,
					districtCode: val.data.getUser.result.permanentAddress.DistrictCode,
					subDistrict: val.data.getUser.result.permanentAddress.SubDistrict,
					subDistrictCode: val.data.getUser.result.permanentAddress.SubDistrictCode,
					provinceNameTH: val.data.getUser.result.permanentAddress.Province,
					provinceCode: val.data.getUser.result.permanentAddress.ProvinceCode,
					zipCode: val.data.getUser.result.permanentAddress.ZipCode,
				}
				this.props.updateUser('addressHome', permanentAddress)
			}

			if (val.data.getUser.result.sourceOfFund) {
				const sourceOfFund = {
					investmentSource: val.data.getUser.result.sourceOfFund.investmentSource,
					investmentSourceOther: val.data.getUser.result.sourceOfFund.investmentSourceOther,
					investmentSourceCountry: val.data.getUser.result.sourceOfFund.investmentSourceCountry,
					investmentPurpose: val.data.getUser.result.sourceOfFund.investmentPurpose,
					investmentPurposeOther: val.data.getUser.result.sourceOfFund.investmentPurposeOther,
					dividendWithHoldingTax: val.data.getUser.result.sourceOfFund.dividendWithHoldingTax,
				}
				this.props.updateUser('sourceOfFund', sourceOfFund)
			}

			if (val.data.getUser.result.career) {
				const career = {
					busTypeOther: val.data.getUser.result.career.isicOther,
					busType: val.data.getUser.result.career.isicCode,
					occupation_other: val.data.getUser.result.career.occupationOther,
					occupation: val.data.getUser.result.career.occupationCode,
					incomeRangeCode: val.data.getUser.result.career.incomeRangeCode,
					countrySourceOfIncome: val.data.getUser.result.career.countrySourceOfIncome,
				}
				this.props.updateUser('career', career)
			}
		}
	}

	onHandleChooseScreen = val => {
		switch (val.data.getStatus) {
			case 'Approved':
				this.props.navigateAction({ ...this.props, page: 'confirmAccount' })
				break

			case 'InProgress':
				this.props.navigateAction({ ...this.props, page: 'checkpoint' })
				break

			case 'WaitingApprove':
				this.props.navigateAction({ ...this.props, page: 'waiting' })
				break

			case 'Editing':
				this.props.navigateAction({ ...this.props, page: 'softReject' })
				break

			default: // Rejected
				this.props.navigateAction({ ...this.props, page: 'statusApprove', params: { status: 'Rejected' } })
				break
		}
	}

	render() {
		const { dot, defaultKey } = this.state

		// console.log(
		// 	AsyncStorage.getItem('access_token'),
		// 	AsyncStorage.getItem('user_token')
		// )
		return (
			<Screen>
				<HeadSpace
					{...{
						dot,
						title: 'กรุณากรอกรหัสผ่าน',
						// onPrevPage: () => this.props.navigation.goBack(),
						onPrevPage: () => AsyncStorage.clear(),
						forgetbtn: () => this.props.navigateAction({ ...this.props, page: 'forgetPasscode' })
					}}
				/>
				<Keyboard setNumber={this.setNumber} defaultKey={defaultKey} />
			</Screen>
		)
	}
}