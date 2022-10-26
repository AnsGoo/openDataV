<template>
  <div ref="chartEl" v-resize="resizeHandler"></div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useEchart } from '../../hooks'
import type WaveChartComponent from './config'
import { useProp, useData } from '@/resource/hooks'
import 'echarts-liquidfill'
import type { WaveChartType } from './type'
import type { DataType } from '@/resource/models'
import type { RequestResponse } from '@/resource/models/type'

const props = defineProps<{
  component: WaveChartComponent
}>()

const chartEl = ref<ElRef>(null)
const { updateEchart, resizeHandler } = useEchart(chartEl)
const chartData = ref<number | RequestResponse<number>['afterData']>(0)
const dataChange = (resp: any, _: DataType) => {
  if (resp.status >= 0) {
    chartData.value = resp.afterData
  }

  updateEchart(getOption())
}
useData(props.component, dataChange)

const { propValue } = useProp<WaveChartType>(props.component, async () => {
  updateEchart(getOption())
})

const getOption = () => {
  const option = {
    series: [
      {
        type: 'liquidFill',
        amplitude: propValue.options.amplitude,
        data: [chartData.value],
        outline: {
          show: propValue.options.outlineShow,
          itemStyle: {
            borderColor: propValue.options.outlineColor
          }
        },
        shape: propValue.options.shape,
        radius: propValue.options.radius,
        direction: propValue.options.direction,
        waveAnimation: propValue.options.waveAnimation,
        label: {
          show: propValue.options.labelShow
        },
        backgroundStyle: {
          color: propValue.options.backgroundColor
        },
        color: [propValue.options.color]
      }
    ]
  }
  return option
}

onMounted(async () => {
  updateEchart(getOption())
})
</script>

<style lang="less" scoped></style>
