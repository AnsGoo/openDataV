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
import type { PieSeriesOption, EChartsOption } from 'echarts'
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

const updateData = (data: Record[]) => {
  gloabalOption = getOption()
  gloabalOption.series![0].data = data.map((el) => {
    return {
      value: el.value,
      name: el.label
    }
  })
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
