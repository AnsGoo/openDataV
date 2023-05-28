<template>
  <div ref="chartEl" v-resize="resizeHandler"></div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

import type { DataType } from '@/enum/data'
import { useData } from '@/models/hooks'

import { useEchart } from '../hooks'
import type ComChartComponent from './config'

const props = defineProps<{
  component: ComChartComponent
}>()

const chartEl = ref<ElRef>(null)
const { updateEchart, resizeHandler } = useEchart(chartEl)

const dataChange = (resp: any, _: DataType | string) => {
  if (!resp || !resp.afterData) {
    return
  }

  updateEchart(resp.afterData)
}

useData(props.component, dataChange)
</script>
