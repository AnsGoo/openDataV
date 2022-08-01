<template>
  <div ref="chartEl" v-resize="resizeHandler"></div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { ref, onMounted, watch, onUnmounted } from 'vue'
import { http } from '@/utils/http'
import { debounce } from 'lodash-es'
import { useBasicStoreWithOut } from '@/store/modules/basic'

import type { TagType } from '@/types/wsTypes'
import { useEventBus } from '@/bus/useEventBus'
import mydark from '../../utils/echarts/mydark'
import type { GaugeOne } from './type'
echarts.registerTheme('mydark', mydark)

type EChartsOption = echarts.EChartsOption

const props = defineProps<{
  componentId: string
  propValue: GaugeOne
}>()

const chartEl = ref<ElRef>(null)
let chart: echarts.EChartsType | null = null
let gloabalData = 0
const basicStore = useBasicStoreWithOut()

const handler = (event) => {
  const item: TagType = event as TagType
  if (props.propValue.datatag && item.TagName === props.propValue.datatag) {
    const value = Number(item.TagValue)
    gloabalData = value
    updateData()
  }
}

onMounted(() => {
  initData()
  initChart()
})

useEventBus('actual', handler)
function initData() {
  http
    .post({ url: props.propValue.history, data: [props.propValue.datatag] })
    .then((resp) => {
      if (resp.ErrorCode === 200) {
        gloabalData = Number(resp.Results[0].TagValue)
      }
    })
    .catch((err) => {
      console.log(err)
      const maxValue = props.propValue.maxValue
      gloabalData = Math.round(Math.random() * maxValue)
    })
    .finally(() => {
      updateData()
    })
}

const resizeHandler = (entries: ResizeObserverEntry[]) => {
  const entry = entries[0]
  const { width, height } = entry.contentRect
  chart?.resize({ width, height })
}

const getOption = (): EChartsOption => {
  const highlight = '#03b7c9'
  const maxValue = props.propValue.maxValue
  const name = props.propValue.name
  const unit = props.propValue.unit
  const value = props.propValue.value
  let option: EChartsOption = {
    series: [
      // 外围刻度
      {
        type: 'gauge',
        // center: ['50%', '50%'],
        radius: '80%', // 1行3个
        splitNumber: 10,
        min: 0,
        max: maxValue,
        startAngle: 225,
        endAngle: -45,
        axisLine: {
          show: true,
          lineStyle: {
            width: 2,
            shadowBlur: 0,
            color: [[1, highlight]]
          }
        },
        axisTick: {
          show: true,
          lineStyle: {
            color: highlight,
            width: 1
          },
          length: -5,
          splitNumber: 10
        },
        splitLine: {
          show: true,
          length: -14,
          lineStyle: {
            color: highlight
          }
        },
        axisLabel: {
          distance: -20,
          color: highlight,
          fontSize: '14',
          fontWeight: 'bold'
        },
        pointer: {
          show: false
        },
        detail: {
          show: false
        }
      },

      // 内侧指针、数值显示
      {
        name: name,
        type: 'gauge',
        // center: ['50%', '50%'],
        radius: '80%',
        startAngle: 225,
        endAngle: -45,
        min: 0,
        max: maxValue,
        axisLine: {
          show: true,
          lineStyle: {
            width: 16,
            color: [[1, 'rgba(255,255,255,.1)']]
          }
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: false
        },
        axisLabel: {
          show: false
        },
        pointer: {
          show: true,
          length: '105%'
        },
        detail: {
          show: true,
          offsetCenter: [0, '100%'],
          fontSize: 20,
          color: '#fff',
          formatter: ['{value} ' + (unit || ''), '{name|' + name + '}'].join('\n'),
          rich: {
            name: {
              fontSize: 14,
              lineHeight: 30,
              color: '#ddd'
            }
          }
        },
        itemStyle: {
          color: highlight
        },
        data: [
          {
            value: value
          }
        ]
      }
    ]
  }
  return option
}
const updateData = debounce(() => {
  const option: EChartsOption = getOption()
  option.series![1].data[0] = gloabalData
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
    () => {
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
