<template>
  <div ref="chartEl"></div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { ref, onMounted, watch, onUnmounted } from 'vue'
import { useResizeObserver } from '@vueuse/core'
import { http } from '@/utils/http'
import type { BasicFetchResult } from '@/types/apiTypes'
import { useBasicStoreWithOut } from '@/store/modules/basic'
import type { ComponentInfo } from '@/types/component'

import mydark from '@/theme/mydark'
echarts.registerTheme('mydark', mydark)

type EChartsOption = echarts.EChartsOption

const props = defineProps<{
  element: ComponentInfo
  propValue: Recordable<any>
}>()
const basicStore = useBasicStoreWithOut()
const chartEl = ref<ElRef>(null)
let chart: echarts.EChartsType | null = null
let historyData = 0
let intervalId: IntervalHandle
let animationIntervalId: IntervalHandle

onMounted(() => {
  initData()
  clearInterval(intervalId)
  initChart()
  intervalId = setInterval(updateData, props.propValue.interval)
  setTimeout(startTimer, 1000)
})

const initData = () => {
  http
    .get<BasicFetchResult<number>>({ url: props.propValue.history })
    .then((resp) => {
      historyData = resp.data || 0
    })
    .catch((err) => {
      console.log(err)
      historyData = Math.round(Math.random() * 100)
    })
    .finally(() => {
      updateData()
    })
}

useResizeObserver(chartEl, (entries) => {
  const entry = entries[0]
  const { width, height } = entry.contentRect
  chart?.resize({ width, height })
})

const _dashed = () => {
  let dataArr: Recordable<any>[] = []
  for (let i = 0; i < 100; i++) {
    if (i % 2 === 0) {
      dataArr.push({
        name: (i + 1).toString(),
        value: 20,
        itemStyle: {
          color: 'rgb(0,255,255,.3)'
        }
      })
    } else {
      dataArr.push({
        name: (i + 1).toString(),
        value: 20,
        itemStyle: {
          color: 'rgb(0,0,0,0)',
          borderWidth: 1,
          borderColor: 'rgba(0,255,255,1)'
        }
      })
    }
  }
  return dataArr
}

const getOption = (): EChartsOption => {
  let int = historyData.toFixed(2).split('.')[0]
  let float = historyData.toFixed(2).split('.')[1]
  let fontSize = props.propValue.fontSize
  let lineLength = props.propValue.lineLength
  let option = {
    title: {
      text: '{a|' + int + '}{a|.' + float + '%}',
      x: 'center',
      y: 'center',
      textStyle: {
        rich: {
          a: {
            fontSize: fontSize,
            color: '#fff',
            fontWeight: '600'
          }
        }
      }
    },
    series: [
      {
        type: 'gauge',
        radius: '80%',
        clockwise: false,
        startAngle: '90',
        endAngle: '-269.9999',
        splitNumber: 30,
        detail: {
          offsetCenter: [0, -20],
          formatter: ' '
        },
        pointer: {
          show: false
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: [
              [0, '#2CFAFC'],
              [36.7 / 100, '#0ff'],
              [1, '#0f232e']
            ],
            width: 20
          }
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: true,
          length: lineLength,
          lineStyle: {
            shadowBlur: 10,
            shadowColor: 'rgba(0, 255, 255, 1)',
            shadowOffsetY: '0',
            color: '#020f18',
            width: 2
          }
        },
        axisLabel: {
          show: false
        }
      },
      {
        type: 'pie',
        radius: ['54%', '58%'],
        hoverAnimation: false,
        clockWise: false,
        itemStyle: {
          color: '#0C355E'
        },
        label: {
          show: false
        },
        data: _dashed()
      },

      {
        type: 'pie',
        radius: [0, '30%'],
        hoverAnimation: false,
        clockWise: false,
        itemStyle: {
          shadowBlur: 20,
          shadowColor: '#000',
          color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [
            {
              offset: 0,
              color: '#0FF'
            },
            {
              offset: 1,
              color: '#060f20'
            }
          ])
        },
        label: {
          show: false
        },
        data: [100]
      },
      {
        type: 'pie',
        radius: ['84%', '85.5%'],
        hoverAnimation: false,
        clockWise: false,
        itemStyle: {
          shadowBlur: 20,
          shadowColor: 'rgba(0, 255, 255,.3)',
          color: '#0f232e'
        },
        label: {
          show: false
        },
        data: [100]
      },
      {
        type: 'pie',
        radius: ['88%', '89.5%'],
        hoverAnimation: false,
        clockWise: false,
        itemStyle: {
          shadowBlur: 20,
          shadowColor: 'rgba(0, 255, 255,.3)',
          color: 'rgba(15, 35, 46,.6)'
        },
        label: {
          show: false
        },
        data: [100]
      }
    ]
  }
  return option as EChartsOption
}
const updateData = () => {
  http
    .get<BasicFetchResult<number>>({ url: props.propValue.history })
    .then((resp) => {
      historyData = resp.data || 0
    })
    .catch((_) => {
      if (basicStore.isEditMode) {
        historyData = Math.round(Math.random() * 100)
      }
    })
    .finally(() => {
      let int: string = historyData.toFixed(2).split('.')[0]
      let float: string = historyData.toFixed(2).split('.')[1]
      const text: string = '{a|' + int + '}{a|.' + float + '%}'
      if (chart) {
        chart.setOption({
          title: {
            text: text
          }
        })
      }
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

const doing = () => {
  if (chart) {
    let option: any = chart.getOption()
    option.series![1].startAngle = option.series![1].startAngle + 1
    chart.setOption({
      series: option.series
    })
  }
}
const startTimer = () => {
  animationIntervalId = setInterval(doing, 100)
}

onUnmounted(() => {
  clearInterval(intervalId)
  clearInterval(animationIntervalId)
  if (chart) {
    chart.clear()
    chart.dispose()
  }
})
</script>
