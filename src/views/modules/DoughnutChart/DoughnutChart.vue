<template>
  <div ref="chartEl"></div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { ref, onMounted, watch, onUnmounted } from 'vue'
import { useResizeObserver } from '@vueuse/core'
import { http } from '@/utils/http'
import { useBasicStoreWithOut } from '@/store/modules/basic'
import type { ComponentInfo } from '@/types/component'
import mydark from '@/theme/mydark'
echarts.registerTheme('mydark', mydark)

type EChartsOption = echarts.EChartsOption

const props = defineProps<{
  element: ComponentInfo
  propValue: Recordable<any>
}>()

const chartEl = ref<ElRef>(null)
let chart: echarts.EChartsType | null = null

let value_zd = 40 //tageName
let value_sc = 100
let value_sd: number = value_sc - value_zd
let datas = [
  { value: value_zd, name: props.propValue.name_zd },
  { value: value_sd, name: props.propValue.name_sd }
]
const basicStore = useBasicStoreWithOut()
onMounted(() => {
  initChart(datas)
  setInterval(function () {
    initData()
  }, 4500)
})

function initData() {
  http
    .post({
      url: props.propValue.url,
      data: [props.propValue.tagName_sc, props.propValue.tagName_zd]
    })
    .then((resp) => {
      if (resp.ErrorCode === 200) {
        let res = resp.Results
        console.log(res)
        for (let i in res) {
          if (props.propValue.tagName_sc == res[i].TagName) {
            value_sc = res[i].TagValue
          } else if (props.propValue.tagName_zd == res[i].TagName) {
            value_zd = res[i].TagValue
          }

          value_sd = value_sc - value_zd
          datas[0].value = value_zd
          datas[1].value = value_sd
          console.log(datas)
          initChart(datas)
        }
      }
    })
    .catch((err) => {
      console.log(err)
    })
}

useResizeObserver(chartEl, (entries) => {
  const entry = entries[0]
  const { width, height } = entry.contentRect
  chart?.resize({ width, height })
})

const getOption = (data): EChartsOption => {
  let option: Recordable<any> = {
    color: ['#0DBC79', '#55A0ED', '#454545'],
    series: [
      {
        name: '',
        type: 'pie',
        radius: ['60%', '85%'],
        avoidLabelOverlap: false,
        showOriginValue: false,
        activeTimeGap: '200',
        label: {
          normal: {
            // normal 是图形在默认状态下的样式
            show: true,
            position: 'center',
            fontSize: 18,
            fontWeight: 'bold',
            formatter: '{d}%\n{b}' // {b}:数据名； {c}：数据值； {d}：百分比，可以自定义显示内容，
          }
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '18',
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        // data: [{value:30, name:'自动化率',label:{normal:{show:true}}},{value:20, name:'手动割煤',label:{normal:{show:true}}},{value:0, name:'在线学习率',label:{normal:{show:true}}}]
        data: data
      }
    ]
  }
  return option as EChartsOption
}
const initChart = (data) => {
  chart = echarts.init(chartEl.value!, 'mydark')
  chart.setOption(getOption(data))
}

if (basicStore.isEditMode) {
  watch(
    () => props.propValue,
    () => {
      if (chart) {
        chart.setOption(getOption(datas))
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
.main_pieChart_left_contentL_text {
  height: 3vh;
  position: absolute;
  bottom: 0px;
  width: 100%;
  .pieChart_content_text {
    width: 32%;
    display: inline-block;
    text-align: center;
    font-size: 12px;
    .greens {
      color: #0dbc79;
    }
    .yellows {
      color: yellow;
    }
    .blues {
      color: #55a0ed;
    }
    .pieChart_content_text_span {
      display: inline-block;
      width: 6.5px;
      height: 0.6vh;
    }
    .pieChart_content_text_span1 {
      background-color: #0dbc79;
    }
    .pieChart_content_text_span3 {
      background-color: #55a0ed;
    }
    .pieChart_content_text_span2 {
      background-color: yellow;
    }
    p {
      display: inline-block;
    }
  }
}
</style>
