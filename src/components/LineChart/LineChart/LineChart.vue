<template>
  <div ref="chartEl"></div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { ref, onMounted } from 'vue'
import { http } from '@/utils/http'

import type { EChartPropTypes, EChartLineSeriesOption } from '@/utils/echarts/propTypes'
import { EChartTypeEnum } from '@/enum'
import type { DataOption } from '@/types/common'
import { useEChart } from '@/utils/echarts/useECharts'

type EChartsOption = echarts.EChartsOption

const props = defineProps<{
  propValue: EChartPropTypes<EChartLineSeriesOption> & DataOption
  componentId: string
}>()

const chartEl = ref<ElRef>(null)
const dataValues = ref<number[]>([])

const { updateChart, getOptions } = useEChart(
  props.propValue,
  chartEl,
  EChartTypeEnum.LINE,
  props.componentId
)

const initData = () => {
  http
    .post({ url: props.propValue.history, data: [props.propValue.dataTag] })
    .then((resp) => {
      if (resp.ErrorCode === 200) {
        dataValues.value = resp.Results.map((item) => Number(item.TagValue))
      }
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      updateData()
    })
}

const updateData = () => {
  const options: EChartsOption = getOptions()
  // 更新x轴数据
  if (options.xAxis && options.xAxis['type'] === 'category') {
    options.xAxis['data'] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  } else if (options.xAxis) {
    options.xAxis['data'] = []
  }

  // 更新y轴数据
  if (options.yAxis && options.yAxis['type'] === 'category') {
    options.yAxis['data'] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  } else if (options.yAxis) {
    options.yAxis['data'] = []
  }

  options.series![0].data = [820, 932, 901, 934, 1290, 1330, 1320]

  updateChart(options)
}

onMounted(() => {
  initData()
})
</script>
