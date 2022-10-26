<template>
  <div ref="chartEl" v-resize="resizeHandler"></div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useEchart } from '../hooks'
import { useData } from '@/resource/hooks'
import type ComChartComponent from './config'
import type { DataType } from '@/resource/models'

const props = defineProps<{
  component: ComChartComponent
}>()

const chartEl = ref<ElRef>(null)
const { updateEchart, resizeHandler } = useEchart(chartEl)

const dataChange = (resp: any, _: DataType) => {
  if (!resp || !resp.afterData) {
    return
  }

  updateEchart(resp.afterData)
}

useData(props.component, dataChange)
</script>
