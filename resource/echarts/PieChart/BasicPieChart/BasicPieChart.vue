<template>
  <div ref="chartEl" v-resize="resizeHandler"></div>
</template>

<script setup lang="ts">
import type { Response } from '@open-data-v/base'
import { useData, useProp } from '@open-data-v/base'
import type { EChartsOption, PieSeriesOption } from 'echarts'
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

const { updateEchart, resizeHandler } = useEchart(chartEl)
let chartData: Array<{ label: string; value: number }> = []
const dataChange = (resp: Response, _?: string) => {
  if (resp.status === 'SUCCESS') {
    chartData = resp.afterData
    updateData(chartData)
  }

  updateData(chartData)
}
useData(props.component, dataChange)
const propValueChange = () => {
  updateData(chartData)
}

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
      bottom: '0%',
      containLabel: true
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      show: propValue.legend.isShow,
      top: '5%',
      left: 'center'
    },
    series: []
  }
  let series: PieSeriesOption[] = [
    {
      type: 'pie',
      radius: [`${propValue.series.radiusMin || 0}%`, `${propValue.series.radiusMax || 100}%`],
      avoidLabelOverlap: true,
      itemStyle: {
        borderRadius: propValue.series.borderRadius,
        borderColor: 'transparent',
        borderWidth: 100
      },
      label: {
        show: false,
        position: 'center',
        color: propValue.label.labelColor
      },
      emphasis: {
        label: {
          show: propValue.label.isShow,
          fontSize: propValue.label.labelSize,
          fontWeight: propValue.label.labelWeight
        },
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      },
      labelLine: {
        show: false
      },
      data: []
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
  globalOption.series![0].data = data.map((el) => {
    return {
      value: el.value,
      name: el.label
    }
  })
  updateEchart(globalOption)
}
</script>
