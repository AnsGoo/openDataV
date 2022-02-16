<template>
  <div ref="chartDom"></div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { ref, onMounted } from 'vue'
import { http } from '@/utils/http'
import type { BasicFetchResult } from '@/types/apiTypes'
import type { ComponentInfo } from '@/types/component'
import mydark from '@/theme/mydark'
import 'echarts-gl'
echarts.registerTheme('mydark', mydark)

const props = defineProps<{
  element: ComponentInfo
  propValue: Recordable<any>
}>()

onMounted(() => {
  getData()
})

function getData() {
  http
    .get<BasicFetchResult<number>>({
      url: props.propValue.history,
      params: { start: props.propValue.startTime, end: props.propValue.endTime }
    })
    .then((res) => {
      drawChart(res)
    })
}

const chartDom = ref<ElRef>(null)
function drawChart(data) {
  console.log(chartDom)
  console.log(chartDom.value)
  var myChart = echarts.init(chartDom.value!, 'mydark')
  var option

  option = {
    tooltip: {},
    backgroundColor: '#030E20',
    visualMap: {
      show: false,
      dimension: 2,
      min: 0,
      max: 30,
      inRange: {
        color: [
          '#08FC1A',
          '#4575b4',
          '#74add1',
          '#abd9e9',
          '#8003FE',
          '#f00',
          '#fee090',
          '#FE2512',
          '#FF190D',
          '#4605B9',
          '#FF8E5F'
        ]
      }
    },
    xAxis3D: {
      type: 'category'
    },
    yAxis3D: {
      type: 'value'
    },
    zAxis3D: {
      type: 'value'
    },
    grid3D: {
      viewControl: {
        beta: 10,
        distance: 300 //默认视角距离主体的距离(常用)
      },

      boxWidth: 280, //三维场景高度
      boxHeight: 160, //三维场景高度
      axisLine: {
        //坐标轴轴线(线)控制
        show: true, //该参数需设为true
        interval: 0, //x,y坐标轴刻度标签的显示间隔，在类目轴中有效。
        lineStyle: {
          //坐标轴样式
          color: '#fff',
          opacity: 1, //(单个刻度不会受影响)
          width: 2 //线条宽度
        }
      }
    },
    series: [
      {
        type: 'line3D',
        data: data,
        lineStyle: {
          width: 6
        }
      }
    ]
  }
  option && myChart.setOption(option)
}
</script>
