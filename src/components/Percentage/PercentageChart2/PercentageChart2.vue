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
let angle = 0

onMounted(() => {
  initData()
  clearInterval(intervalId)
  initChart()
  intervalId = setInterval(updateData, props.propValue.interval)
  setTimeout(startTimer, 1000)
})

function initData() {
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

const getCirlPoint = (x0: number, y0: number, r: number, myAngle: number) => {
  let x1 = x0 + r * Math.cos((myAngle * Math.PI) / 180)
  let y1 = y0 + r * Math.sin((myAngle * Math.PI) / 180)
  return {
    x: x1,
    y: y1
  }
}

const getOption = (): EChartsOption => {
  let fontSize = props.propValue.fontSize
  let lineLength = props.propValue.lineLength
  let option = {
    title: {
      text: '{a|' + historyData + '%}',
      x: 'center',
      y: 'center',
      textStyle: {
        rich: {
          a: {
            fontSize: fontSize,
            color: '#29EEF3'
          },

          c: {
            fontSize: 20,
            color: '#29EEF3'
            // padding: [5,0]
          }
        }
      }
    },
    series: [
      {
        name: 'ring5',
        type: 'custom',
        coordinateSystem: 'none',
        renderItem: function (_, api) {
          return {
            type: 'arc',
            shape: {
              cx: api.getWidth() / 2,
              cy: api.getHeight() / 2,
              r: (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.6,
              startAngle: ((0 + angle) * Math.PI) / 180,
              endAngle: ((90 + angle) * Math.PI) / 180
            },
            style: {
              stroke: '#0CD3DB',
              fill: 'transparent',
              lineWidth: 1.5
            },
            silent: true
          }
        },
        data: [0]
      },
      {
        name: 'ring5',
        type: 'custom',
        coordinateSystem: 'none',
        renderItem: function (_, api) {
          return {
            type: 'arc',
            shape: {
              cx: api.getWidth() / 2,
              cy: api.getHeight() / 2,
              r: (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.6,
              startAngle: ((180 + angle) * Math.PI) / 180,
              endAngle: ((270 + angle) * Math.PI) / 180
            },
            style: {
              stroke: '#0CD3DB',
              fill: 'transparent',
              lineWidth: 1.5
            },
            silent: true
          }
        },
        data: [0]
      },
      {
        name: 'ring5',
        type: 'custom',
        coordinateSystem: 'none',
        renderItem: function (_, api) {
          return {
            type: 'arc',
            shape: {
              cx: api.getWidth() / 2,
              cy: api.getHeight() / 2,
              r: (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.65,
              startAngle: ((270 + -angle) * Math.PI) / 180,
              endAngle: ((40 + -angle) * Math.PI) / 180
            },
            style: {
              stroke: '#0CD3DB',
              fill: 'transparent',
              lineWidth: 1.5
            },
            silent: true
          }
        },
        data: [0]
      },
      {
        name: 'ring5',
        type: 'custom',
        coordinateSystem: 'none',
        renderItem: function (_, api) {
          return {
            type: 'arc',
            shape: {
              cx: api.getWidth() / 2,
              cy: api.getHeight() / 2,
              r: (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.65,
              startAngle: ((90 + -angle) * Math.PI) / 180,
              endAngle: ((220 + -angle) * Math.PI) / 180
            },
            style: {
              stroke: '#0CD3DB',
              fill: 'transparent',
              lineWidth: 1.5
            },
            silent: true
          }
        },
        data: [0]
      },
      {
        name: 'ring5',
        type: 'custom',
        coordinateSystem: 'none',
        renderItem: function (_, api) {
          let x0 = api.getWidth() / 2
          let y0 = api.getHeight() / 2
          let r = (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.65
          let point = getCirlPoint(x0, y0, r, 90 + -angle)
          return {
            type: 'circle',
            shape: {
              cx: point.x,
              cy: point.y,
              r: 4
            },
            style: {
              stroke: '#0CD3DB', //粉
              fill: '#0CD3DB'
            },
            silent: true
          }
        },
        data: [0]
      },
      {
        name: 'ring5', //绿点
        type: 'custom',
        coordinateSystem: 'none',
        renderItem: function (_, api) {
          let x0 = api.getWidth() / 2
          let y0 = api.getHeight() / 2
          let r = (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.65
          let point = getCirlPoint(x0, y0, r, 270 + -angle)
          return {
            type: 'circle',
            shape: {
              cx: point.x,
              cy: point.y,
              r: 4
            },
            style: {
              stroke: '#0CD3DB', //绿
              fill: '#0CD3DB'
            },
            silent: true
          }
        },
        data: [0]
      },
      {
        name: 'invent',
        type: 'pie',
        radius: ['58%', '45%'],
        silent: true,
        clockwise: true,
        startAngle: 90,
        z: 0,
        zlevel: 0,
        label: {
          normal: {
            position: 'center'
          }
        },
        data: [
          {
            value: historyData,
            name: '',
            itemStyle: {
              color: {
                // 完成的圆环的颜色
                colorStops: [
                  {
                    offset: 0,
                    color: '#4FADFD' // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: '#28E8FA' // 100% 处的颜色
                  }
                ]
              }
            }
          },
          {
            value: 100 - historyData,
            name: '',
            label: {
              normal: {
                show: false
              }
            },
            itemStyle: {
              color: '#173164'
            }
          }
        ]
      },

      {
        name: '',
        type: 'gauge',
        radius: '58%',
        center: ['50%', '50%'],
        startAngle: 0,
        endAngle: 359.9,
        splitNumber: 8,
        hoverAnimation: true,
        axisTick: {
          show: false
        },
        splitLine: {
          length: lineLength,
          lineStyle: {
            width: 5,
            color: '#061740'
          }
        },
        axisLabel: {
          show: false
        },
        pointer: {
          show: false
        },
        axisLine: {
          lineStyle: {
            opacity: 0
          }
        },
        detail: {
          show: false
        },
        data: [
          {
            value: 0,
            name: ''
          }
        ]
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
  const option: EChartsOption = getOption()
  if (chart) {
    angle = angle + 3
    chart.setOption(option, true)
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
