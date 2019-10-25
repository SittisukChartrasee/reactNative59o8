import React from 'react'
import {
	View,
	TouchableOpacity,
	Dimensions,
	ScrollView,
	Image,
} from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import get from 'lodash/get'
import Screen from '../../component/screenComponent'
import { NavBar } from '../../component/gradient'
import { NextButton } from '../../component/button'
import images from '../../config/images'
import { Choice } from '../../component/cardSelect'
import { suittest } from '../../redux/actions/commonAction'
import { navigateAction } from '../../redux/actions'
import setMutation from '../../containers/mutation'
import lockout from '../../containers/hoc/lockout'
import typeModal from '../../utility/typeModal'
import { errorMessage } from '../../utility/messages'

const checkActiveData = (data) => {
	return data.reduce((pre, curr, inx, arr) => {
		if (curr.answer >= 0) pre.count += 1
		pre.leng = arr.length

		if (pre.leng === pre.count) pre.IS_TRUE = false
		else pre.IS_TRUE = true

		if (curr.answer >= 0) {
			pre.IS_SUM += curr.answer + 1
		}
		return pre
	}, {
		count: 0,
		leng: 0,
		IS_SUM: 0,
		IS_TRUE: true,
	})
}

const getBoolean = (arr) => arr.map(d => d.select)

const mapToProps = ({ suitReducer }) => ({ suitReducer })
const dispatchToProps = dispatch => ({
	updateSuittest: bindActionCreators(suittest, dispatch),
	navigateAction: bindActionCreators(navigateAction, dispatch),
	toggleModal: value => dispatch({ type: 'modal', value })
})

@connect(mapToProps, dispatchToProps)
@setMutation
@lockout
export default class extends React.Component {

	onPress = (obj) => {
		this.props.updateSuittest('suittest', obj.choice)
		this.props.updateSuittest('sumSuittest', checkActiveData(obj.choice).IS_SUM)
	}

	onNext = async () => {
		const { suitReducer } = this.props

		const data = {
			suit01: suitReducer.suittest[0].answer + 1,
			suit02: suitReducer.suittest[1].answer + 1,
			suit03: suitReducer.suittest[2].answer + 1,
			suit04: suitReducer.suittest[3].answer + 1,
			suit04Array: getBoolean(suitReducer.suittest[3].choice),
			suit05: suitReducer.suittest[4].answer + 1,
			suit06: suitReducer.suittest[5].answer + 1,
			suit07: suitReducer.suittest[6].answer + 1,
			suit08: suitReducer.suittest[7].answer + 1,
			suit09: suitReducer.suittest[8].answer + 1,
			suit10: suitReducer.suittest[9].answer + 1,
			suit11: suitReducer.suittest[10].answer + 1,
			suit12: suitReducer.suittest[11].answer + 1,
		}

		try {
			const res = await this.props.saveSuittest({ variables: { input: data } })
			const success = get(res, 'data.saveSuittest.success', false)
			const code = get(res, 'data.saveIdentity.code', errorMessage.messageIsNull.code)
			const message = get(res, 'data.saveIdentity.message', errorMessage.messageIsNull.defaultMessage)

			if (success) {
				this.props.updateRoot('screenModal', { visible: true, page: 'reviewScore' })
			} else {
				this.props.toggleModal({
					...typeModal[code],
					dis: message,
				})
			}

		} catch (error) {
			this.props.toggleModal({
				...typeModal[errorMessage.requestError.code],
				dis: errorMessage.requestError.defaultMessage,
			})
		}
	}

	render() {
		const suittest = this.props.suitReducer.suittest
		return (
			<Screen color="transparent">
				<NavBar
					title="แบบประเมินความเสี่ยง"
					navLeft={
						<TouchableOpacity
							onPress={() => this.props.navigation.goBack()}
							style={{ paddingRight: 30 }}
						>
							<Image source={images.iconback} />
						</TouchableOpacity>
					}
					navRight={
						<TouchableOpacity
							onPress={() => this.props.lockout()}
							style={{ paddingLeft: 30 }}
						>
							<Image source={images.iconlogoOff} />
						</TouchableOpacity>
					}
				/>
				{
					Choice({
						init: this.props.suitReducer.suittest,
						onPress: this.onPress,
						paddingBottom: 100
					})
				}
				<NextButton disabled={checkActiveData(suittest).IS_TRUE} onPress={this.onNext} />
			</Screen>
		)
	}
}