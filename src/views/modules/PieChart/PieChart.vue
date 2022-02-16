<template>
  <div ref="chartEl"></div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { http } from '@/utils/http'
import type { ComponentInfo } from '@/types/component'
import type { EChartPropTypes, EChartPieSeriesOption } from '@/utils/echarts/propTypes'
import { EChartTypeEnum } from '@/enum'
import type { DataOption } from '@/types/common'
import { useEChart } from '@/utils/echarts/useECharts'

const props = defineProps<{
  element: ComponentInfo
  propValue: EChartPropTypes<EChartPieSeriesOption> & DataOption
}>()

const chartEl = ref<HTMLElement | null>(null)
const dataValues = ref<number[]>([])

const { updateChart, getOptions } = useEChart(
  props.propValue,
  chartEl,
  EChartTypeEnum.PIE,
  props.element.component + props.element.id
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
  const options = getOptions()
  options.series![0].data = [
    {
      value: 80,
      name: '自动化率'
    },
    {
      value: 20,
      name: '人工率'
    }
  ]

  updateChart(options)
}

onMounted(() => {
  initData()
})
</script>
