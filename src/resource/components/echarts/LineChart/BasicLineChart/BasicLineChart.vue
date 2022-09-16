<template>
  <div ref="chartEl" v-resize="resizeHandler"></div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { ref, onMounted, onUnmounted } from 'vue'
import { http } from '@/utils/http'
import { useBasicStoreWithOut } from '@/store/modules/basic'
import mydark from '../../theme'
import { useProp } from '@/resource/hooks'
import BasicLineChartComponent from './config'
import { BasicLineChart } from './type'
import type { EChartsOption, LineSeriesOption, XAXisComponentOption } from 'echarts'
import { compareResetValue } from '../../utils'
echarts.registerTheme('mydark', mydark)

const chartEl = ref<ElRef>(null)
let chart: echarts.EChartsType | null = null
let gloabalOption: EChartsOption
const basicStore = useBasicStoreWithOut()
const props = defineProps<{
  component: BasicLineChartComponent
}>()

interface Record {
  label: string
  value: number
}
const propValueChange = () => {
  if (chart) {
    chart.clear()
    initData()
  }
}

const { propValue } = useProp<BasicLineChart>(props.component, propValueChange)

onMounted(async () => {
  gloabalOption = getOption()
  initChart()
  await initData()
})
const initData = async () => {
  try {
    const resp = await http.get({ url: propValue.data.url })
    if (resp.status === 200) {
      const upperLimit = propValue.data.upperLimit
      const lowerLimit = propValue.data.lowerLimit
      const data = resp.data.map((ele) => {
        return {
          value: compareResetValue(Number(ele.value), upperLimit, lowerLimit),
          label: ele.label
        }
      })
      updateData(data)
    }
  } catch (err: any) {
    console.log(err?.message || err)
    if (basicStore.isEditMode) {
      const labels = ['秦', '齐', '楚', '赵', '燕', '韩', '魏']
      const demoData: Record[] = labels.map((el) => {
        return {
          label: el,
          value: Math.round(Math.random() * (propValue.data.upperLimit || 100))
        }
      })
      updateData(demoData)
    }
  }
}

const resizeHandler = (entries) => {
  const entry = entries[0]
  const { width, height } = entry.contentRect
  chart?.resize({ width, height })
}

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

const updateData = (data: Record[]) => {
  gloabalOption = getOption()
  gloabalOption.series![0].data = data.map((el) => el.value)
  gloabalOption.xAxis = {
    ...gloabalOption.xAxis,
    data: data.map((el) => el.label)
  } as XAXisComponentOption
  if (chart) {
    chart.setOption(gloabalOption)
  }
}
const initChart = () => {
  chart = echarts.init(chartEl.value!, 'mydark')
  chart.clear()
  chart.setOption(gloabalOption)
}
onUnmounted(() => {
  if (chart) {
    chart.clear()
    chart.dispose()
  }
})
</script>
