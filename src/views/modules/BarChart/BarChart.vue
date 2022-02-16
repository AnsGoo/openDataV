<template>
  <div ref="chartEl"></div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { ref, onMounted, watch, onUnmounted } from 'vue'
import { useResizeObserver } from '@vueuse/core'

import mydark from '@/theme/mydark'
echarts.registerTheme('mydark', mydark)
const props = defineProps<{
  element: Object
  propValue: Recordable<string>
}>()

const chartEl = ref<ElRef>(null)
let chart: echarts.EChartsType | null = null

onMounted(() => {
  initChart()
})

useResizeObserver(chartEl, (entries) => {
  const entry = entries[0]
  const { width, height } = entry.contentRect
  chart?.resize({ width, height })
})

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
