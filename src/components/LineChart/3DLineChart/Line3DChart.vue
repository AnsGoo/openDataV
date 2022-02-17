<template>
  <div ref="chartEl"></div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import 'echarts-gl'
import { ref, onMounted, onUnmounted } from 'vue'
import { http } from '@/utils/http'
import type { ComponentInfo } from '@/types/component'
import type { PropValueType } from './config'
import moment from 'moment'
import mydark from '@/theme/mydark'
import { useResizeObserver } from '@vueuse/core'
echarts.registerTheme('mydark', mydark)

type EChartsOption = echarts.EChartsOption

const props = defineProps<{
  propValue: PropValueType
  element: ComponentInfo
}>()

const chartEl = ref<ElRef>(null)
let chart: echarts.ECharts | null = null
let dataValues: Array<any> = []
let yData: Array<string> = []
let timeHandler: IntervalHandle | null = null

useResizeObserver(chartEl, (entries) => {
  const entry = entries[0]
  const { width, height } = entry.contentRect
  chart?.resize({ width, height })
})

const getOption = () => {
  const option: EChartsOption | any = {
    visualMap: {
      show: false,
      min: Number(props.propValue.min),
      max: Number(props.propValue.max),
      inRange: {
        color: ['#003dff', '#00fffc', '#46ff00', '#ffdf00', '#ff9e00', '#ff0028']
      }
    },
    xAxis3D: {
      type: 'value'
    },
    yAxis3D: {
      type: 'category',
      data: yData
    },
    zAxis3D: {
      type: 'value',
      max: Number(props.propValue.max),
      min: Number(props.propValue.min)
    },
    grid3D: {},
    series: [
      {
        type: 'surface',
        data: dataValues,
        wireframe: {
          // 是否显示图形的网格
          show: false
        },
        shading: 'color'
      }
    ]
  }
  return option
}

const updateData = async () => {
  const now = moment('2022-01-05 00:00:00')
  const start = now.format('YYYY-MM-DD HH:mm:ss')
  const end = now.subtract(props.propValue.interval as number, props.propValue.unit)

  try {
    const res = await http.get({
      url: props.propValue.url,
      params: {
        start: end.format('YYYY-MM-DD HH:mm:ss'),
        end: start
      }
    })

    for (let item in res) {
      yData.push(item[0])
      dataValues.push([item[1], item[0], item[2]])
    }
  } catch (err) {
    console.log(err)
  }

  updateChart()
}

const updateChart = () => {
  if (chart) {
    const option = getOption()
    console.log(option)
    chart.setOption(option)
  }
}

onMounted(async () => {
  // 初始化图表
  chart = echarts.init(chartEl.value!)
  const option = getOption()
  chart.setOption(option)

  // 更新图表数据
  await updateData()

  // 定时刷新
  timeHandler = setInterval(() => {
    updateData()
  }, 10 * 60 * 1000)
})

onUnmounted(() => {
  if (timeHandler) {
    clearInterval(timeHandler)
  }
  if (chart) {
    chart.clear()
    chart.dispose()
  }
})
</script>
