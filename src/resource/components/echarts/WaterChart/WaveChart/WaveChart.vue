<template>
  <div ref="chartEl" v-resize="resizeHandler"></div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useEchart } from '../../hooks'
import WaveChartComponent from './config'
import { useProp } from '@/resource/hooks'
import 'echarts-liquidfill'
import { WaveChartType } from './type'

const props = defineProps<{
  component: WaveChartComponent
}>()

const chartEl = ref<ElRef>(null)
let data = props.component.exampleData
const { updateEchart, resizeHandler } = useEchart(chartEl)
const { propValue } = useProp<WaveChartType>(props.component, async () => {
  updateEchart(getOption())
})

const getOption = () => {
  const option = {
    series: [
      {
        type: 'liquidFill',
        amplitude: propValue.options.amplitude,
        data: [data],
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

onMounted(() => {
  updateEchart(getOption())
})
</script>

<style lang="less" scoped></style>
