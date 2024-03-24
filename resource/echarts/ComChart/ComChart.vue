<template>
  <div ref="chartEl" v-resize="resizeHandler"></div>
</template>

<script lang="ts" setup>
import { useData } from '@open-data-v/base'
import { ref } from 'vue'

import { useEchart } from '../hooks'
import type ComChartComponent from './config'

const props = defineProps<{
  component: ComChartComponent
}>()

const chartEl = ref<ElRef>(null)
const { updateEchart, resizeHandler } = useEchart(chartEl)

const dataChange = (resp: any, _?: string) => {
  if (!resp || !resp.afterData) {
    return
  }
  if (resp.status === 'SUCCESS') {
    updateEchart(resp.afterData)
  }
}

useData(props.component, dataChange)
</script>
