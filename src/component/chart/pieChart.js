import React from 'react'
import PieChart from 'react-native-pie-chart'

const genSetData = (data) => {
  if (data.length > 0) {
    return {
      color: data.map(d => d.color),
      percent: data.map(d => +d.weight)
    }
  }
  return {
    color: ['#ccc'],
    percent: [100]
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