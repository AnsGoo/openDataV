<template>
  <div ref="chartEl" v-resize="resizeHandler"></div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { ref, onMounted, watch, onUnmounted } from 'vue'

import mydark from '../../utils/echarts/mydark'
import type { BarChart } from './type'
echarts.registerTheme('mydark', mydark)
const props = defineProps<{
  componentId: string
  propValue: BarChart
}>()

const chartEl = ref<ElRef>(null)
let chart: echarts.EChartsType | null = null

onMounted(() => {
  initChart()
})

const resizeHandler = (entries: ResizeObserverEntry[]) => {
  const entry = entries[0]
  const { width, height } = entry.contentRect
  chart?.resize({ width, height })
}

function getOption() {
  let propValue = props.propValue
  let option: Recordable<any> = {
    title: {
      text: propValue.title,
      subtext: propValue.subTitle,
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    xAxis: {
      type: 'category',
      data: JSON.parse(propValue.xAxis)
    },
    yAxis: {
      type: 'value'
    },
    series: [] as Record<string, number>[]
  }
  let series: Record<string, number>[] = JSON.parse(propValue.series).map((ele) => {
    return {
      data: ele,
      type: 'bar'
    }
  })

  option.series = series
  return option
}
const initChart = () => {
  chart = echarts.init(chartEl.value!, 'mydark')
  chart.clear()
  chart.setOption(getOption())
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
onUnmounted(() => {
  if (chart) {
    chart.clear()
    chart.dispose()
  }
})
</script>
