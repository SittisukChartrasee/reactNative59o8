import React from 'react'
import {
  ART,
  View,
  Image,
} from 'react-native'
import PieChart from 'react-native-pie-chart'

const genSetData = (data) => {
  if (data.length > 0) {
    return {
      color: data.map(d => d.color),
      percent: data.map(d => d.percent)
    }
  }
  return {
    color: ['#F44336','#2196F3','#FFEB3B', '#4CAF50', '#FF9800'],
    percent: [123, 321, 123, 789, 537]
  }
}

export default ({
  chart_wh=56,
  data=[],
}) => (
  <PieChart
    chart_wh={chart_wh}
    series={genSetData(data).percent}
    sliceColor={genSetData(data).color}
  />
)