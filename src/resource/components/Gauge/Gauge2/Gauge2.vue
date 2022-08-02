<template>
  <div ref="chartEl" v-resize="resizeHandler"></div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { ref, onMounted, watch, computed, onUnmounted } from 'vue'
import { http } from '@/utils/http'
import { debounce } from 'lodash-es'

import type { TagType } from '@/types/wsTypes'
import { useEventBus } from '@/bus/useEventBus'
import { useBasicStoreWithOut } from '@/store/modules/basic'
import mydark from '../../../utils/echarts/mydark'
import type { GaugeTwo } from './type'
echarts.registerTheme('mydark', mydark)

type EChartsOption = echarts.EChartsOption

const props = defineProps<{
  componentId: string
  propValue: GaugeTwo
}>()

const basicStore = useBasicStoreWithOut()
const chartEl = ref<ElRef>(null)
let chart: echarts.EChartsType | null = null
const dataValue = ref<number>(0)

onMounted(() => {
  initData()
  initChart()
})

const resizeHandler = (entries: ResizeObserverEntry[]) => {
  const entry = entries[0]
  const { width, height } = entry.contentRect
  chart?.resize({ width, height })
}

const getOption = (): EChartsOption => {
  const option: EChartsOption = {
    series: [
      {
        type: 'gauge',
        min: props.propValue.minValue,
        max: props.propValue.maxValue,
        splitNumber: chartConfig.value.splitNumber,
        axisLine: {
          lineStyle: {
            width: chartConfig.value.axisLine.width,
            color: chartConfig.value.axisLine.color
          }
        },
        pointer: {
          icon: chartConfig.value.pointer.icon,
          showAbove: false,
          length: chartConfig.value.pointer.length,
          width: chartConfig.value.pointer.width,
          offsetCenter: chartConfig.value.pointer.offsetCenter,
          itemStyle: {
            color: chartConfig.value.pointer.color || 'inherit'
          }
        },
        axisTick: {
          length: chartConfig.value.axisTick.length,
          lineStyle: {
            color: chartConfig.value.axisTick.color || 'inherit',
            width: chartConfig.value.axisTick.width
          }
        },
        splitLine: {
          length: chartConfig.value.splitLine.length,
          lineStyle: {
            color: chartConfig.value.splitLine.color || 'inherit',
            width: chartConfig.value.splitLine.width
          }
        },
        axisLabel: {
          show: chartConfig.value.axisLabel.show,
          color: chartConfig.value.axisLabel.color || 'inherit',
          fontSize: chartConfig.value.axisLabel.fontSize,
          distance: chartConfig.value.axisLabel.distance
        },
        title: {
          offsetCenter: chartConfig.value.title.offsetCenter,
          fontSize: chartConfig.value.title.fontSize,
          color: chartConfig.value.title.color
        },
        detail: {
          fontSize: chartConfig.value.detail.fontSize,
          offsetCenter: chartConfig.value.detail.offsetCenter,
          valueAnimation: true,
          formatter: function (value) {
            return value + chartConfig.value.detail.unit
          },
          color: chartConfig.value.detail.color || 'auto'
        },
        data: [
          {
            value: dataValue.value,
            name: props.propValue.title
          }
        ]
      }
    ]
  }

  // 如果起始角度和结束角度不一致，则需要设置起始角度，否则就采用图表默认的角度
  if (chartConfig.value.startAngle !== chartConfig.value.endAngle) {
    option.series![0].startAngle = chartConfig.value.startAngle
    option.series![0].endAngle = chartConfig.value.endAngle
  }
  return option
}

const handleActual = (event) => {
  const item: TagType = event as TagType
  if (props.propValue.datatag === item.TagName) {
    dataValue.value = Number(item.TagValue)
    updateData()
  }
}

const updateData = debounce(() => {
  const option: EChartsOption = getOption()
  option.series![0].data[0].value = dataValue.value
  if (chart) {
    chart.setOption({ series: option.series })
  }
}, 300)

const initData = () => {
  http
    .post({ url: props.propValue.history, data: [props.propValue.datatag] })
    .then((resp) => {
      if (resp.ErrorCode === 200) {
        dataValue.value = Number(resp.Results[0].TagValue)
      }
    })
    .catch((err) => {
      console.log(err)
      const maxValue = props.propValue.maxValue
      if (basicStore.isEditMode) {
        dataValue.value = Math.round(Math.random() * maxValue)
      }
    })
    .finally(() => {
      updateData()
    })
}

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

const chartConfig = computed(() => {
  return {
    startAngle: Number(props.propValue.startAngle), // 起始角度
    endAngle: Number(props.propValue.endAngle), // 结束角度
    minValue: Number(props.propValue.minValue), // 最小值
    maxValue: Number(props.propValue.maxValue), // 最大值
    splitNumber: Number(props.propValue.splitNumber), // 分割段数
    axisLine: {
      // 外圈线
      width: Number(props.propValue.axisWidth),
      color: calcAxisColor()
    },
    pointer: {
      // 指针
      width: Number(props.propValue.pointerWidth),
      color: props.propValue.pointerColor,
      length: props.propValue.pointerLength,
      offsetCenter: props.propValue.pointerOffset.split(','),
      icon: props.propValue.pointStyle
    },
    axisLabel: {
      show: props.propValue.tickShow,
      color: props.propValue.tickFontColor, // 外圈文字颜色
      fontSize: Number(props.propValue.tickFontSize), // 外圈文字大小
      distance: Number(props.propValue.tickDistance) // 外圈文字距离边框的距离
    },
    title: {
      offsetCenter: props.propValue.titleOffset.split(','), // 标题位置
      fontSize: Number(props.propValue.titleFontSize), // 标题文字大小
      color: props.propValue.titleColor // 标题文字颜色
    },
    detail: {
      fontSize: Number(props.propValue.detailFontSize), // 数值文字大小
      offsetCenter: props.propValue.detailOffset.split(','), // 数值位置
      color: props.propValue.detailFontColor, // 数值文字颜色
      unit: props.propValue.unit
    },
    splitLine: {
      // 分割刻度线
      length: Number(props.propValue.splitLength),
      color: props.propValue.splitColor,
      width: Number(props.propValue.splitWidth)
    },
    axisTick: {
      // 刻度线
      length: Number(props.propValue.tickLength),
      color: props.propValue.tickColor,
      width: Number(props.propValue.tickWidth)
    }
  }
})

const calcAxisColor = (): [number, string][] => {
  return props.propValue.axisColor.split(';').map((item) => {
    const arr = item.split(',')
    return [Number(arr[0]), arr[1]]
  })
}

useEventBus('actual', handleActual)

onUnmounted(() => {
  if (chart) {
    chart.clear()
    chart.dispose()
  }
})
</script>
