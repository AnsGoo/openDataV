<template>
  <div ref="chartEl" v-resize="resizeHandler"></div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import 'echarts-liquidfill'
import { ref, onMounted, watch, computed, onUnmounted } from 'vue'
import { useEventBus } from '@/bus/useEventBus'
import { http } from '@/utils/http'

import type { TagType } from '@/types/wsTypes'
import { debounce } from 'lodash-es'

import mydark from '../../utils/echarts/mydark'
import type { WaterChart } from './type'
echarts.registerTheme('mydark', mydark)

type EChartsOption = echarts.EChartsOption

const props = defineProps<{
  componentId: string
  propValue: WaterChart
}>()

const chartEl = ref<ElRef>(null)
let chart: echarts.EChartsType | null = null
let intervalId: IntervalHandle
let dataValue = 0

onMounted(() => {
  initChart()

  // 如果是定时刷新，就不监听实时数据
  updateData()
  if (!props.propValue.isInterval) {
    useEventBus('actual', handler)
  } else {
    clearInterval(intervalId)
    intervalId = setInterval(updateData, props.propValue.interval)
  }
})

// 定时更新数据接口
const updateData = () => {
  http
    .post({ url: props.propValue.history, data: [props.propValue.dataTag] })
    .then((resp) => {
      if (resp.ErrorCode === 200) {
        dataValue = Number(resp.Results[0].TagValue) || 0
      }
    })
    .catch((err) => {
      console.log(err)
    })
    .finally((): void => {
      delayUpdateData()
    })
}

// 实时刷新接口
const handler = (event) => {
  const item: TagType = event as TagType
  if (props.propValue.dataTag === item.TagValue) {
    dataValue = parseFloat(item.TagValue)

    delayUpdateData()
  }
}

// 为防止后端数据发送太快，采取延时更新数据方式
const delayUpdateData = debounce(() => {
  if (!chart) {
    return
  }

  const option: EChartsOption = getOption()
  chart.setOption({ series: option.series })
}, 300)

// 计算百分比数据
const getValueData = () => {
  const data = parseFloat((dataValue / props.propValue.maxValue).toFixed(2))
  if (data > 1.0) {
    return [1.0, 1.0]
  }

  return [data, data - 0.1]
}

const resizeHandler = (entries: ResizeObserverEntry[]) => {
  const entry = entries[0]
  const { width, height } = entry.contentRect
  chart?.resize({ width, height })
}

const initChart = () => {
  chart = echarts.init(chartEl.value!, 'mydark')
  chart.clear()
  chart.setOption(getOption())
}

const getOption = (): EChartsOption => {
  let propValue = props.propValue

  const option = {
    title: {
      text: propValue.title,
      left: 'center'
    },
    series: [
      {
        type: 'liquidFill',
        data: getValueData(),
        radius: '80%',
        shape: shape.value,
        center: ['50%', '50%'],
        direction: propValue.direction,
        outline: {
          show: propValue.outline
        },
        waveAnimation: propValue.waveAnimation,
        backgroundStyle: {
          borderColor: propValue.borderColor,
          borderWidth: propValue.borderWidth,
          shadowColor: 'rgba(0, 0, 0, 0.4)',
          shadowBlur: 20
        },
        label: {
          position: position.value,
          fontSize: propValue.fontSize,
          color: propValue.textColor
        }
      }
    ]
  }

  return option as EChartsOption
}

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

const shape = computed(() => {
  if (props.propValue.shape === 'whale') {
    return 'path://M367.855,428.202c-3.674-1.385-7.452-1.966-11.146-1.794c0.659-2.922,0.844-5.85,0.58-8.719 c-0.937-10.407-7.663-19.864-18.063-23.834c-10.697-4.043-22.298-1.168-29.902,6.403c3.015,0.026,6.074,0.594,9.035,1.728 c13.626,5.151,20.465,20.379,15.32,34.004c-1.905,5.02-5.177,9.115-9.22,12.05c-6.951,4.992-16.19,6.536-24.777,3.271 c-13.625-5.137-20.471-20.371-15.32-34.004c0.673-1.768,1.523-3.423,2.526-4.992h-0.014c0,0,0,0,0,0.014 c4.386-6.853,8.145-14.279,11.146-22.187c23.294-61.505-7.689-130.278-69.215-153.579c-61.532-23.293-130.279,7.69-153.579,69.202 c-6.371,16.785-8.679,34.097-7.426,50.901c0.026,0.554,0.079,1.121,0.132,1.688c4.973,57.107,41.767,109.148,98.945,130.793 c58.162,22.008,121.303,6.529,162.839-34.465c7.103-6.893,17.826-9.444,27.679-5.719c11.858,4.491,18.565,16.6,16.719,28.643 c4.438-3.126,8.033-7.564,10.117-13.045C389.751,449.992,382.411,433.709,367.855,428.202z'
  }

  return props.propValue.shape
})

const position = computed(() => {
  if (props.propValue.offsetLeft && props.propValue.offsetRight) {
    return [
      props.propValue.offsetLeft.toString() + '%',
      props.propValue.offsetRight.toString() + '%'
    ]
  } else if (props.propValue.offsetLeft) {
    return [props.propValue.offsetLeft.toString() + '%', '50%']
  } else if (props.propValue.offsetRight) {
    return ['50%', props.propValue.offsetRight.toString() + '%']
  }

  return ['50%', '50%']
})

onUnmounted(() => {
  if (chart) {
    chart.clear()
    chart.dispose()
  }
})
</script>
