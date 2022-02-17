<template>
  <div ref="chartEl"></div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { ref, onMounted, watch, onUnmounted } from 'vue'
import type { WatchStopHandle } from 'vue'
import { useResizeObserver } from '@vueuse/core'
import { http } from '@/utils/http'
import { useBasicStoreWithOut } from '@/store/modules/basic'
import type { ComponentInfo } from '@/types/component'

import mydark from '@/theme/mydark'
import { warnMessage } from '@/utils/message'
echarts.registerTheme('mydark', mydark)

type EChartsOption = echarts.EChartsOption

const props = defineProps<{
  element: ComponentInfo
  propValue: Recordable<any>
}>()
const basicStore = useBasicStoreWithOut()
const chartEl = ref<ElRef>(null)
let chart: echarts.EChartsType | null = null
let majorSeria: number[] = []
let intervalId: IntervalHandle
let xAxis: string[] = []

onMounted(async () => {
  await initData()
  initChart()
  clearInterval(intervalId)
  intervalId = setInterval(updateData, props.propValue.interval)
})

const initData = async () => {
  let params: any = null
  try {
    params = JSON.parse(props.propValue.data)
  } catch (err: any) {
    warnMessage(err.message)
  }
  if (params) {
    const url = props.propValue.history
    try {
      await getData(url, params)
    } catch (error) {
      console.log(error)
      if (basicStore.isEditMode) {
        majorSeria = []
        xAxis = []
        for (let i = 0; i < 100; i++) {
          majorSeria.push(Math.round(Math.random() * 600))
          xAxis.push(String(i))
        }
      }
    } finally {
      await updateData()
    }
  }
}

useResizeObserver(chartEl, (entries) => {
  const entry = entries[0]
  const { width, height } = entry.contentRect
  chart?.resize({ width, height })
})

const getOption = (): EChartsOption => {
  let highSerie: Recordable<string>[] = []
  let lowSerie: number[] = []
  const total = xAxis.length
  for (let i = 0; i < total; i++) {
    if (props.propValue.highflag) {
      highSerie.push(props.propValue.highflag)
    }
    if (props.propValue.lowflag) {
      lowSerie.push(props.propValue.lowflag)
    }
  }

  let option: EChartsOption = {
    grid: {
      top: '10%',
      left: '3%',
      right: '4%',
      bottom: '10%',
      containLabel: true
    },
    title: {
      text: props.propValue.title,
      subtext: props.propValue.subTitle,
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    xAxis: {
      type: 'category',
      data: xAxis
    },
    yAxis: {
      type: 'value'
    },
    series: [] as Record<string, number>[]
  }
  let series: Recordable<any> = [
    {
      data: majorSeria,
      type: 'line',
      symbol: 'none',
      smooth: true
    }
  ]
  if (lowSerie.length > 0) {
    series.push({
      data: lowSerie,
      type: 'line',
      symbol: 'none'
    })
  }
  if (highSerie.length > 0) {
    series.push({
      data: highSerie,
      type: 'line',
      symbol: 'none'
    })
  }
  option.series = series
  return option as EChartsOption
}

const getData = async (url: string, params: Recordable<any>) => {
  const method = props.propValue.method ? props.propValue.method : 'GET'
  let resp: any
  if (method === 'GET') {
    resp = await http.get({ url, params })
  } else {
    resp = await http.post({ url, data: params })
  }
  const result: Recordable<any> = JSON.parse(resp)[0]
  const records = result.Records
  majorSeria = []
  xAxis = []
  records.map((ele) => {
    majorSeria.push(parseInt(ele['Values']['_value']))
    xAxis.push(ele['Values']['_time'])
    return {
      time: ele['Values']['_time'],
      value: parseInt(ele['Values']['_value'])
    }
  })
}
const updateData = async () => {
  let option = getOption()
  let params: any = null
  try {
    params = JSON.parse(props.propValue.data)
  } catch (err: any) {
    warnMessage(err.message)
  }
  if (params) {
    const url = props.propValue.history
    try {
      await getData(url, params)
    } catch (_) {
      if (basicStore.isEditMode) {
        majorSeria = []
        xAxis = []
        for (let i = 0; i < 100; i++) {
          majorSeria.push(Math.round(Math.random() * 600))
          xAxis.push(String(i))
        }
      }
    } finally {
      option.series![0].data = majorSeria
      if (chart) {
        chart.setOption({
          xAxis: {
            data: xAxis
          },
          series: option.series
        })
      }
    }
  }
}
const initChart = () => {
  chart = echarts.init(chartEl.value!, 'mydark')
  chart.clear()
  chart.setOption(getOption())
}

let stopHandle: WatchStopHandle = () => {
  console.log('stop')
}
if (basicStore.isEditMode) {
  stopHandle = watch(
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
  clearInterval(intervalId)
  stopHandle()
  if (chart) {
    chart.clear()
    chart.dispose()
  }
})
</script>
