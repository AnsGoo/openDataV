<template>
  <div class="meterPic">
    <div class="meterPic_left" ref="mainEls">
      <div class="histogramS_content_echarts" ref="chartEls" style="width: 100%; height: 9vh"></div>
    </div>
    <div class="meterPic_right">
      <p class="fontStyle1">{{ propValue.name }}</p>
      <p class="fontStyle2">{{ propValue.value }} {{ propValue.unit }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { useResizeObserver } from '@vueuse/core'
import { http } from '@/utils/http'
import type { BasicFetchResult } from '@/types/apiTypes'
import { debounce } from 'lodash'
import { useEventBus } from '@/bus/useEventBus'
import { useBasicStoreWithOut } from '@/store/modules/basic'

import mydark from '@/theme/mydark'
echarts.registerTheme('mydark', mydark)

const props = defineProps<{
  element: Object
  propValue: Recordable<any>
}>()

const mainEls = ref<ElRef>(null)
const chartEls = ref<ElRef>(null)
let chart: echarts.EChartsType | null = null
let historyData: Recordable<any>[] = [] as never
let gloabalData = 0
const basicStore = useBasicStoreWithOut()

const handler = (event) => {
  const item: { TagName: string; TagValue: string } = event as {
    TagName: string
    TagValue: string
  }
  if (props.propValue.datatag && item.TagName === props.propValue.datatag) {
    const value = Number(item.TagValue)
    gloabalData = value
    updateData()
  }
}

onMounted(() => {
  initData()
})

useEventBus('actual', handler)

function initData() {
  http
    .get<BasicFetchResult<Recordable<any>[]>>({ url: props.propValue.history })
    .then((resp) => {
      historyData = resp.data || []
      historyData.forEach((ele) => {
        gloabalData = Number(ele.TagValue)
      })
    })
    .catch(() => {
      const maxValue = props.propValue.maxValue
      gloabalData = Math.round(Math.random() * maxValue)
    })
    .finally(() => {
      initChart()
    })
}

useResizeObserver(mainEls, (entries) => {
  const entry = entries[0]
  const { width, height } = entry.contentRect
  chart?.resize({ width, height })
})

function getOption() {
  const name = props.propValue.name
  const unit = props.propValue.unit
  const value = props.propValue.value
  let option: Recordable<any> = {
    tooltip: {
      formatter: `${name}{a} {b} : ${value}${unit}`
    },

    series: [
      {
        name: '小圆形',
        type: 'pie',
        hoverAnimation: false,
        legendHoverLink: false,
        tooltip: {
          show: false
        },
        center: ['100%', '100%'],
        //center: [ '53%', '45.5%' ],
        radius: ['0%'],
        z: 20,
        label: {
          normal: {
            show: false,
            position: 'center'
          },
          emphasis: {
            show: false
          }
        },
        labelLine: {
          normal: {
            show: false
          }
        },
        animation: false,
        data: [
          {
            value: 0,
            name: '1',
            itemStyle: {
              normal: {
                color: 'red'
              }
            }
          },
          {
            value: 100,
            name: '2',
            itemStyle: {
              normal: {
                color: '#17acce'
              }
            }
          }
        ]
      },
      {
        name: '',
        type: 'gauge',
        min: 0,
        // max:total,    //设置刻度盘内数值区间
        // splitNumber:2,  //设置间隔区域的显示数量
        detail: { formatter: `${value}${unit}` },
        radius: '100%',
        axisLine: {
          // 坐标轴线
          lineStyle: {
            // 属性lineStyle控制线条样式
            width: 4,
            color: [
              [0.4, '#0DBC79'],
              [0.8, '#E7A402'],
              [1, '#E00100']
            ]
          },
          show: true
        },
        axisTick: {
          show: true,
          length: 6,
          splitNumber: 3
        },
        axisLabel: {
          // 坐标轴小标记
          // fontWeight: 'bolder',
          fontSize: '12px',
          color: '#fff',
          shadowColor: '#fff', //默认透明
          shadowBlur: 10,
          show: false,
          distance: -26,
          splitNumber: 2,
          formatter: function (v) {
            return v.toFixed(0)
          }
        },
        splitLine: {
          // 分隔线
          length: 10, // 属性length控制线长
          lineStyle: {
            // 属性lineStyle（详见lineStyle）控制线条样式
            width: 1,
            color: '#fff',
            shadowColor: '#fff', //默认透明
            shadowBlur: 10
          }
        },
        pointer: {
          show: true,
          length: '68%',
          radius: '50%',
          width: '4'
        },
        itemStyle: {
          color: '#17acce'
        },
        // startAngle: 185,
        // endAngle: -5,
        data: [{ value: value, name: '' }] //表示指针上方的文字
      }
    ]
  }
  return option
}
const updateData = debounce(() => {
  const option = getOption()
  option.series[1].data[0] = gloabalData
  if (chart) {
    chart.setOption({ series: option.series })
  }
}, 300)
const initChart = () => {
  const width = mainEls.value!.getBoundingClientRect().width
  const height = mainEls.value!.getBoundingClientRect().height
  chart = echarts.init(chartEls.value!, 'mydark')
  chart.clear()
  chart.resize({ width, height })
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

onUnmounted(() => {
  if (chart) {
    chart.clear()
    chart.dispose()
  }
})
</script>
<style lang="less" scoped>
.meterPic {
  height: 9vh;
  display: flex;
  // background: #09172c;
  .meterPic_left,
  .meterPic_right {
    flex: 1;
  }
  .meterPic_right {
    font-size: 39.72px;
    color: #0387f6;
    padding-left: 20px;
    .fontStyle1 {
      color: #ffffff;
      font-size: 26px;
      height: 50%;
    }
    .fontStyle2 {
      color: #0dbc79;
      font-size: 26px;
      height: 50%;
    }
    p::before {
      display: inline-block;
      content: '';
      height: 100%;
      vertical-align: middle;
    }
  }
}
</style>
