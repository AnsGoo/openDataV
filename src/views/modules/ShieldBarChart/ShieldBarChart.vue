<template>
  <div ref="chartEl"></div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { ref, onMounted, watch, onUnmounted, nextTick } from 'vue'
import type { WatchStopHandle } from 'vue'
import { useResizeObserver } from '@vueuse/core'
import { http } from '@/utils/http'
import { debounce } from 'lodash-es'
import { useBasicStoreWithOut } from '@/store/modules/basic'
import type { ComponentInfo } from '@/types/component'
import type { TagType } from '@/types/wsTypes'
import { useEventBus } from '@/bus/useEventBus'
import { compareValue } from '@/utils/utils'
import mydark from '@/theme/mydark'
echarts.registerTheme('mydark', mydark)

type EChartsOption = echarts.EChartsOption

const props = defineProps<{
  element: ComponentInfo
  propValue: Recordable<any>
}>()

const chartEl = ref<ElRef>(null)
const tagNameList = ref<string[]>([])
let chart: echarts.EChartsType | null = null
let historyData: Recordable<any>[] = [] as never
let majorSeria: number[] = []
let gloabalData: Map<number, number> = new Map()
const basicStore = useBasicStoreWithOut()

const handler = (event) => {
  const item: TagType = event as TagType

  if (props.propValue.subtag) {
    const upperLimit = Number(props.propValue.upperLimit)
    const lowerLimit = Number(props.propValue.lowerLimit)
    const b = RegExp(props.propValue.subtag)
    if (b.test(item.TagName)) {
      const value = compareValue(Number(item.TagValue), upperLimit, lowerLimit)
      const index = Number(item.TagName.replace(/\D/gi, '')) - 1
      gloabalData.set(index, value)
      updateData()
    }
  }
}

onMounted(async () => {
  createTagNameList()
  await initData()
  initChart()
})
useEventBus('actual', handler)

const createTagNameList = () => {
  for (let i = 1; i <= props.propValue.total; i++) {
    tagNameList.value.push(props.propValue.subtag.replace('[1-9]', i))
  }
}

const initData = async () => {
  try {
    const resp = await http.post({ url: props.propValue.history, data: tagNameList.value })
    const upperLimit = Number(props.propValue.upperLimit)
    const lowerLimit = Number(props.propValue.lowerLimit)
    if (resp.ErrorCode === 200) {
      historyData = resp.Results || []
      majorSeria = historyData.map((ele) =>
        compareValue(Number(ele.TagValue), upperLimit, lowerLimit)
      )
    }
  } catch (err: any) {
    console.log(err?.message || err)
    for (let i = 0; i < props.propValue.total; i++) {
      majorSeria.push(Math.round(Math.random() * 600))
    }
  } finally {
    updateData()
  }
}

useResizeObserver(chartEl, (entries) => {
  const entry = entries[0]
  const { width, height } = entry.contentRect
  nextTick(() => {
    if (chart) {
      chart?.resize({ width, height })
    }
  })
})

const getOption = (): EChartsOption => {
  let xAxis: string[] = []
  let highSerie: Recordable<string>[] = []
  let lowSerie: number[] = []
  for (let i = 0; i < props.propValue.total; i++) {
    xAxis.push(String(i + 1))
    if (props.propValue.highflag) {
      highSerie.push(props.propValue.highflag)
    }
    if (props.propValue.lowflag) {
      lowSerie.push(props.propValue.lowflag)
      updateData()
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
      type: 'bar'
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
const updateData = debounce(() => {
  const option: EChartsOption = getOption()
  const length: number = option.series![0].data.length
  gloabalData.forEach((value: number, key: number) => {
    if (key < length) {
      option.series![0].data[key] = value
    }
  })
  gloabalData = new Map()

  if (chart) {
    chart.setOption({ series: option.series })
  }
}, 300)
const initChart = () => {
  chart = echarts.init(chartEl.value!, 'mydark')
  chart.setOption(getOption())
}

let stopHandler: WatchStopHandle | undefined = undefined

if (basicStore.isEditMode) {
  stopHandler = watch(
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
  if (stopHandler) {
    stopHandler()
  }
  if (chart) {
    chart.clear()
    chart.dispose()
  }
})
</script>
