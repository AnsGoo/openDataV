<template>
  <div ref="chartEl" v-resize="resizeHandler"></div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { ref, onMounted, watch, onUnmounted } from 'vue'
import { http } from '@/utils/http'
import { useBasicStoreWithOut } from '@/store/modules/basic'

import { useEventBus } from '@/bus/useEventBus'
import { debounce } from 'lodash-es'

import type { TagType } from '@/types/wsTypes'

import mydark from '@/theme/mydark'
import type { Thermometer1 } from './type'
echarts.registerTheme('mydark', mydark)

type EChartsOption = echarts.EChartsOption

const props = defineProps<{
  componentId: string
  propValue: Thermometer1
}>()
const basicStore = useBasicStoreWithOut()
const chartEl = ref<ElRef>(null)
let chart: echarts.EChartsType | null = null
let historyData = 100
let intervalId: IntervalHandle

let marks: string[] = []

interface GradientColorStop {
  offset: number
  color: string
}

const handler = (event) => {
  const item: TagType = event as TagType

  if (props.propValue.datatag && item.TagName === props.propValue.datatag) {
    const value = Number(item.TagValue)
    historyData = value
    updateData()
  }
}

onMounted(() => {
  initData()
  clearInterval(intervalId)
  initChart()
})

useEventBus('actual', handler)

const calculteMarks = () => {
  marks = []
  const maxValue = Number(props.propValue.maxValue || 100)
  const mySplitNumber = Number(props.propValue.splitNumber || 10)

  for (let i = 0, len: number = maxValue; i <= len; i++) {
    if ((i - mySplitNumber) % mySplitNumber === 0) {
      marks.push('-3')
    } else if ((i - mySplitNumber) % (mySplitNumber / 2) === 0) {
      marks.push('-1')
    } else {
      marks.push('')
    }
  }
}
const calculteColor = (value) => {
  const maxValue = Number(props.propValue.maxValue || 100)
  const hightFlag = maxValue / 3
  const medieFlag = (maxValue / 3) * 2
  let gradient: GradientColorStop[] = []
  if (value > hightFlag) {
    gradient.push(
      {
        offset: 0,
        color: '#93FE94'
      },
      {
        offset: 0.5,
        color: '#E4D225'
      },
      {
        offset: 1,
        color: '#E01F28'
      }
    )
  } else if (value > medieFlag) {
    gradient.push(
      {
        offset: 0,
        color: '#93FE94'
      },
      {
        offset: 1,
        color: '#E4D225'
      }
    )
  } else {
    gradient.push({
      offset: 1,
      color: '#93FE94'
    })
  }
  return gradient
}
function initData() {
  const maxValue = Number(props.propValue.maxValue || 100)
  http
    .post({ url: props.propValue.history, data: [props.propValue.datatag] })
    .then((resp) => {
      if (resp.ErrorCode === 200) {
        historyData = Number(resp.Results[0].TagValue) || 0
      }
    })
    .catch((err) => {
      console.log(err)
      historyData = Math.round(Math.random() * maxValue)
    })
    .finally(() => {
      updateData()
    })
}

const resizeHandler = (entries: ResizeObserverEntry[]) => {
  const entry = entries[0]
  const { width, height } = entry.contentRect
  const option: any = chart?.getOption()
  chart?.resize({ width, height })
  option.xAxis[3].min = -(width / 2) + 50
  option.xAxis[3].max = width / 2
  chart?.setOption(option)
}

const getOption = (): EChartsOption => {
  const maxValue = Number(props.propValue.maxValue || 100)
  calculteMarks()
  const gradient: GradientColorStop[] = calculteColor(historyData)
  let leftColor = gradient[gradient.length - 1].color

  let option = {
    title: {
      text: '温度计',
      show: false
    },
    yAxis: [
      {
        show: false,
        data: [],
        min: 0,
        max: maxValue,
        axisLine: {
          show: false
        }
      },
      {
        show: false,
        min: 0,
        max: maxValue
      },
      {
        type: 'category',
        data: ['', '', '', '', '', '', '', '', '', '', '', ''],
        axisLabel: {
          fontSize: 20,
          color: 'white'
        },
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        }
      }
    ],
    xAxis: [
      {
        show: false,
        min: -10,
        max: 10,
        data: []
      },
      {
        show: false,
        min: -10,
        max: 10,
        data: []
      },
      {
        show: false,
        min: -10,
        max: 10,
        data: []
      },
      {
        show: false,
        min: -10,
        max: 30
      }
    ],
    series: [
      {
        name: '条',
        type: 'bar',
        // 对应上面XAxis的第一个对)象配置
        xAxisIndex: 0,
        data: [
          {
            value: historyData,
            label: {
              show: true,
              rich: {
                back: {
                  align: 'center',
                  lineHeight: 50,
                  fontSize: 40,
                  fontFamily: 'Arial',
                  color: leftColor
                },
                unit: {
                  fontFamily: '微软雅黑',
                  fontSize: 15,
                  lineHeight: 50,
                  color: leftColor
                },
                downTxt: {
                  lineHeight: 50,
                  fontSize: 25,
                  align: 'center',
                  color: '#fff'
                }
              }
            }
          }
        ],

        barWidth: 10,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 1, 0, 0, gradient)
        },
        z: 2
      },
      {
        name: '白框',
        type: 'bar',
        xAxisIndex: 1,
        barGap: '-100%',
        data: [maxValue - 20],
        barWidth: 18,
        itemStyle: {
          color: '#0C2E6D',
          borderRadius: 50
        },
        z: 1
      },
      {
        name: '外框',
        type: 'bar',
        xAxisIndex: 2,
        barGap: '-100%',
        data: [maxValue],
        barWidth: 25,
        itemStyle: {
          color: '#4577BA',
          borderRadius: 50
        },
        z: 0
      },
      {
        name: '圆',
        type: 'scatter',
        emphasis: {
          scale: true
        },
        data: [0],
        xAxisIndex: 0,
        symbolSize: 25,
        itemStyle: {
          color: '#93FE94',
          opacity: 1
        },
        z: 2
      },
      {
        name: '白圆',
        type: 'scatter',
        emphasis: {
          scale: true
        },
        data: [0],
        xAxisIndex: 1,
        symbolSize: 35,
        itemStyle: {
          color: '#0C2E6D',
          opacity: 1
        },
        z: 1
      },
      {
        name: '外圆',
        type: 'scatter',
        emphasis: {
          scale: true
        },
        data: [0],
        xAxisIndex: 2,
        symbolSize: 43,
        itemStyle: {
          color: '#4577BA',
          opacity: 1
        },
        z: 0
      },
      {
        name: '刻度',
        type: 'bar',
        yAxisIndex: 0,
        xAxisIndex: 3,
        label: {
          show: true,
          position: 'left',
          distance: 1,
          color: 'white',
          fontSize: 12,
          formatter: function (params) {
            if (params.dataIndex > maxValue || params.dataIndex < 0) {
              return ''
            } else {
              if (params.data === '-3') {
                return params.dataIndex
              } else {
                return ''
              }
            }
          }
        },
        barGap: '0%',
        data: marks,
        barWidth: 1,
        itemStyle: {
          color: 'white',
          borderRadius: 120
        },
        z: 0
      }
    ]
  }
  return option as EChartsOption
}
const updateData = debounce(() => {
  const option: EChartsOption = getOption()
  option.series![0].data[0].value = historyData
  if (chart) {
    chart.setOption({ series: option.series })
  }
}, 300)

const initChart = () => {
  chart = echarts.init(chartEl.value!, 'mydark')
  chart.clear()
  chart.setOption(getOption())
}

if (basicStore.isEditMode) {
  watch(
    () => props.propValue,
    (newValue, _) => {
      console.log(newValue)
      if (chart) {
        chart.clear()
        chart.setOption(getOption())
      }
    },
    {
      deep: true
    }
  )
}

onUnmounted(() => {
  if (chart) {
    chart.clear()
    chart.dispose()
  }
})
</script>
