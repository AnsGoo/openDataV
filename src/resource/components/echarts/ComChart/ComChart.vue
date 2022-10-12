<template>
  <div ref="chartEl" v-resize="resizeHandler"></div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useEchart } from '../hooks'
import { useData } from '@/resource/hooks'
import ComChartComponent from './config'
import { DataType } from '@/resource/models'
import { RequestResponse } from '@/resource/models/type'

const props = defineProps<{
  component: ComChartComponent
}>()

const chartEl = ref<ElRef>(null)
const { updateEchart, resizeHandler } = useEchart(chartEl)

const dataChange = (resp: any, type: DataType) => {
  if (!resp) {
    return
  }
  console.log(resp)
  if (type === DataType.STATIC) {
    resp as Array<{ label: string; value: number }>
    updateEchart(resp)
  } else if (type === DataType.REST) {
    resp as RequestResponse
    updateEchart(resp.afterData)
  }
}

useData(props.component, dataChange)
</script>
