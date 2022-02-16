<template>
  <div class="colorfullHistogramH subbkg">
    <div class="colorfullHistogramH_content">
      <div :class="['colorfullHistogramH_content_chart subbkg']">
        <div class="all_box">
          <div class="chart_box">
            <div class="tip_id" ref="tipId" style="width: 100%; height: 5%"></div>
            <div class="chart_id" ref="chartId" style="width: 100%; height: 95%"></div>
          </div>
          <div class="dushu_box">
            <div class="dushu_boxS">
              <div class="dushu_text">{{ propValue.name }} {{ propValue.unit }}</div>
              <div class="dushu_v">{{ display }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import * as echarts from 'echarts'
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { useResizeObserver } from '@vueuse/core'
import { http } from '@/utils/http'
import type { BasicFetchResult } from '@/types/apiTypes'
import { useEventBus } from '@/bus/useEventBus'
import { useBasicStoreWithOut } from '@/store/modules/basic'
import type { ComponentInfo } from '@/types/component'

const props = defineProps<{
  element: ComponentInfo
  propValue: Recordable<any>
}>()

//获取dom元素
const tipId = ref<ElRef>(null)
const chartId = ref<ElRef>(null)

let chart: echarts.EChartsType | null = null
let historyData: Recordable<any>[] = [] as never
let gloabalData = 0
const basicStore = useBasicStoreWithOut()
const display = ref<number>(0)

const handler = (event) => {
  const item: { TagName: string; TagValue: string } = event as {
    TagName: string
    TagValue: string
  }

  if (props.propValue.datatag && item.TagName === props.propValue.datatag) {
    const value = Number(item.TagValue)

    gloabalData = value
    display.value = value
    drawChart(gloabalData)
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
      drawChart(gloabalData)
    })
    .catch((_) => {
      if (basicStore.isEditMode) {
        gloabalData = Math.round(Math.random() * 100)
      }
    })
    .finally(() => {
      display.value = gloabalData
      drawChart(gloabalData)
    })
}
useResizeObserver(tipId, (entries) => {
  const entry = entries[0]
  const { width, height } = entry.contentRect
  chart?.resize({ width, height })
})

function drawChart(data: number) {
  const total = props.propValue.total
  const normal = props.propValue.normal
  const warning = props.propValue.warning
  const alarm = props.propValue.alarm
  if (data > total) {
    data = total
  }
  if (data < 0) {
    data = 0
  }
  const width = chartId.value!.getBoundingClientRect().width
  const height = chartId.value!.getBoundingClientRect().height
  chart = echarts.init(chartId.value!, '')
  let option: Recordable<any> = {
    grid: {
      left: 20,
      top: 0, // 设置条形图的边距
      right: 30,
      bottom: 18
    },
    yAxis: [
      {
        data: [''],
        axisLine: {
          show: false,
          lineStyle: {
            color: '#FFFFFF'
          }
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          color: '#FFFFFF',
          fontSize: 12,
          interval: 0
        }
      },
      {
        type: 'category',
        show: true,
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          interval: 0,
          margin: 10,
          color: '#fff',
          fontSize: '10'
        },
        //数量显示
        //data: [currValue],
        data: []
      }
    ],
    xAxis: [
      {
        max: total,
        splitLine: {
          show: false
        },
        axisTick: {
          show: true
        },
        axisLine: {
          show: false,
          lineStyle: {
            color: '#FFFFFF'
          }
        },
        splitNumber: 3,
        axisLabel: {
          show: true,
          textStyle: {
            color: '#FFFFFF'
          }
        }
      },
      {
        max: total,
        type: 'value',
        splitLine: {
          show: false
        },
        axisTick: {
          show: true
        },
        axisLine: {
          show: false,
          lineStyle: {
            color: '#FFFFFF'
          },
          length: 5,
          inside: true
        },
        axisLabel: {
          textStyle: {
            color: '#FFFFFF'
          }
          // formatter: function(value){
          //   return parseInt(value * 100) + '%'
          // },
        }
      }
    ],
    series: [
      //整体背景
      {
        // 分隔
        type: 'pictorialBar',
        itemStyle: {
          normal: {
            color: '#07314a'
          }
        },
        symbolRepeat: 'fixed',
        symbolMargin: 2,
        symbol: 'rect',
        symbolClip: true,
        symbolSize: [3, 40],
        symbolPosition: 'start',
        symbolOffset: [3, 0],
        symbolBoundingData: total,
        data: [total],
        z: 0,
        animationEasing: 'elasticOut',
        yAxisIndex: 0
      },
      //柱状图
      {
        name: '数量',
        type: 'pictorialBar',
        symbol: 'rect',
        itemStyle: {
          normal: {
            color: '#009BF1',
            function(params) {
              var colorList: string[] = []
              let myData = params.gloabalData
              let str = ''
              if (0 <= myData && myData <= normal) {
                str = '#009BF1'
                colorList.push(str)
              } else if (normal < myData && myData <= warning) {
                str = '#E7A402'
                colorList.push(str)
              } else if (warning < myData <= alarm) {
                str = '#E00100'
                colorList.push(str)
              }
              return colorList[params.dataIndex]
            }
          }
        },
        symbolRepeat: true,
        symbolSize: [3, 38],
        // symbolBoundingData: 100,
        symbolMargin: 0,
        symbolPosition: 'start',
        z: -20,
        data: [data],
        label: {
          normal: {
            show: false,
            position: 'top',
            verticalAlign: 'top'
            // formatter: function(value){
            //   return value && (value.data * 100).toFixed(1) + '%'
            // }
          }
        },
        yAxisIndex: 0
      },
      //柱状图边框
      {
        name: '',
        type: 'bar',
        barWidth: 40,
        itemStyle: {
          color: 'rgba(0,0,0,0)',
          borderWidth: 2,
          borderColor: '#10bffc',
          padding: 0
        },
        label: {
          show: false
        },
        z: -10,
        yAxisIndex: 1,
        data: [total]
      }
    ]
  }
  chart.resize({ width, height })
  chart.setOption(option)
}

if (basicStore.isEditMode) {
  watch(
    () => props.propValue,
    (_) => {
      if (chart) {
        drawChart(gloabalData)
      }
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
.colorfullHistogramH {
  .colorfullHistogramH_content {
    position: relative;
    right: 0;
    left: 0;
    height: 100%;
    overflow: hidden;
    .colorfullHistogramH_content_chart {
      width: 100%;
      height: 100%;
      background-color: #010a41;
      border: 1px solid #003387;
      margin: 0 0 7% 0;
      overflow: hidden;
      .all_box {
        width: 100%;
        height: 100%;
        cursor: pointer;
        .chart_box {
          float: left;
          padding: 1% 0 0 0;
          width: 65%;
          height: 100%;
          .chart_id {
            div {
              width: 100% !important;
              height: 60% !important;
              canvas {
                width: 100% !important;
              }
            }
          }
          .tip_id {
            position: relative;
            top: 2px;
            z-index: 2;
          }
        }
        .dushu_box {
          position: relative;
          float: left;
          width: 35%;
          height: 100%;
          text-align: center;
          border-left: 1px solid #003387;
          .dushu_text {
            font-size: 16px;
            color: #ffffff;
          }
          .dushu_v {
            font-size: 20px;
            color: #0dbc79;
            text-align: center;
            margin: 2px 0 0 0;
            .unit {
              color: #fff;
              font-size: 20px;
            }
          }
        }
        .dushu_boxS {
          width: 100%;
          position: absolute;
          transform: translate(-50%, -50%);
          left: 50%;
          top: 50%;
        }
      }
    }
    .addStyle {
      width: 49% !important;
      float: left;
      margin: 0 0 3.5% 0;
    }
    .addStyle:nth-child(2n) {
      width: 49% !important;
      float: left;
      margin: 0 0 3.5% 2%;
    }
  }
}
</style>
