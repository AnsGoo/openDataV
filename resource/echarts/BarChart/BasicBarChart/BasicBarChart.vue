<template>
  <div ref="chartEl" v-resize="resizeHandler"></div>
</template>

<script setup lang="ts">
import type { Hooks } from '@open-data-v/base'
import type { BarSeriesOption, EChartsOption, XAXisComponentOption } from 'echarts'
import { inject, onMounted, ref } from 'vue'

import { useEchart } from '../../hooks'
import { compareResetValue } from '../../utils'
import type BasicLineChartComponent from './config'
import type { BasicLineChart } from './type'

const chartEl = ref<ElRef>(null)
let globalOption: EChartsOption
const props = defineProps<{
  component: BasicLineChartComponent
}>()
const { useProp, useData } = inject<Hooks>('HOOKS') || {}

let chartData: Array<{ label: string; value: number }> = []

const dataChange = (resp: any, _?: string) => {
  if (resp.status === 'SUCCESS') {
    chartData = resp.afterData
    updateData(chartData)
  }
}

if (useData) {
  useData(props.component, dataChange)
}

let propValue: BasicLineChart
const propValueChange = (..._propValue) => {
  updateData(chartData)
}
if (useProp) {
  const { propValue: newPropValue } = useProp<BasicLineChart>(props.component, propValueChange)
  propValue = newPropValue
}

const { updateEchart, resizeHandler } = useEchart(chartEl)

onMounted(async () => {
  globalOption = getOption()
  updateEchart(globalOption)
})

const getOption = () => {
  const option: EChartsOption = {
    grid: {
      top: '10%',
      left: '3%',
      right: '4%',
      bottom: '10%',
      containLabel: true
    },
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      data: [],
      splitLine: {
        show: propValue.axis.xshow,
        lineStyle: {
          type: propValue.axis.xLineType,
          color: propValue.axis.xAxisLineColor
        }
      },
      axisLine: {
        lineStyle: {
          color: propValue.axis.axisColor || '#fff'
        }
      },
      axisTick: {
        lineStyle: {
          color: propValue.axis.axisColor || '#fff'
        }
      },
      axisLabel: {
        color: propValue.axis.axisLabelColor || '#fff'
      }
    },
    yAxis: {
      type: 'value',
      max: (value) => {
        if (propValue.data.max === 'dataMax' || !propValue.data.max) {
          return value.max + Number(propValue.data.maxOffset || 0)
        } else {
          return Number(propValue.data.max) + Number(propValue.data.maxOffset || 0)
        }
      },
      min: (value) => {
        if (propValue.data.min === 'dataMin') {
          return value.min - Number(propValue.data.minOffset || 0)
        } else if (['', undefined, null].includes(propValue.data.min)) {
          return 0 - Number(propValue.data.minOffset || 0)
        } else {
          return Number(propValue.data.min) - Number(propValue.data.minOffset || 0)
        }
      },
      splitLine: {
        show: propValue.axis.yshow,
        lineStyle: {
          type: propValue.axis.yLineType,
          color: propValue.axis.yAxisLineColor
        }
      },
      axisLine: {
        lineStyle: {
          color: propValue.axis.axisColor || '#fff'
        }
      },
      axisTick: {
        lineStyle: {
          color: propValue.axis.axisColor || '#fff'
        }
      },
      axisLabel: {
        color: propValue.axis.axisLabelColor || '#fff'
      }
    },
    series: []
  }
  let series: BarSeriesOption[] = [
    {
      data: [],
      type: 'bar'
    }
  ]
  option.series = series
  return option as EChartsOption
}

const updateData = (resp: Array<{ label: string; value: number }>) => {
  const upperLimit = propValue.data.upperLimit
  const lowerLimit = propValue.data.lowerLimit
  const data = (resp || []).map((ele) => {
    return {
      value: compareResetValue(Number(ele.value), upperLimit, lowerLimit),
      label: ele.label
    }
  })
  globalOption = getOption()
  globalOption.series![0].data = data.map((el) => el.value)
  globalOption.xAxis = {
    ...globalOption.xAxis,
    data: data.map((el) => el.label)
  } as XAXisComponentOption
  updateEchart(globalOption)
}
</script>
