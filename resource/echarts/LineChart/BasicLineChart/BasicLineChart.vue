<template>
  <div ref="chartEl" v-resize="resizeHandler"></div>
</template>

<script setup lang="ts">
import type { Response } from '@open-data-v/base'
import { useData, useProp } from '@open-data-v/base'
import type { EChartsOption, LineSeriesOption, XAXisComponentOption } from 'echarts'
import { onMounted, ref } from 'vue'

import { useEchart } from '../../hooks'
import { compareResetValue } from '../../utils'
import type BasicLineChartComponent from './config'
import type { BasicLineChart } from './type'

const chartEl = ref<ElRef>(null)
let globalOption: EChartsOption
const props = defineProps<{
  component: BasicLineChartComponent
}>()
let chartData: Array<{ label: string; value: number }> = []
const dataChange = (resp: Response, _?: string) => {
  if (resp.status === 'SUCCESS') {
    chartData = resp.afterData
    updateData(chartData)
  } else {
    updateData([])
  }
}

useData(props.component, dataChange)

const propValueChange = () => {
  updateData(chartData)
}

const { updateEchart, resizeHandler } = useEchart(chartEl)
const { propValue } = useProp<BasicLineChart>(props.component, propValueChange)

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
      max: propValue.data.max ? propValue.data.max : 'dataMax',
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
  let series: LineSeriesOption[] = [
    {
      data: [],
      type: 'line',
      symbol: 'none',
      smooth: true,
      markLine: {
        data: []
      },
      areaStyle: {
        opacity: propValue.series.lineArea ? 0.7 : 0
      },
      lineStyle: {
        width: 1,
        color: propValue.series.lineColor || '#3491FA'
      },
      itemStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: propValue.series.lineLinearStart || '#3491FA' // 0% 处的颜色
            },
            {
              offset: 1,
              color: propValue.series.lineLinearEnd || 'transparent' // 100% 处的颜色
            }
          ],
          global: false // 缺省为 false
        }
      }
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
