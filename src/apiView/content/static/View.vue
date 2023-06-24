<template>
  <n-card>
    <div class="static-data">
      <slot name="data-select"></slot>
    </div>
    <StaticDataView
      :data="originData"
      :title="title"
      class="content"
      :mode="mode"
      :error="errMessage"
      @update:data="originDataChange"
    />
  </n-card>
</template>

<script lang="ts" setup>
import { NCard } from 'naive-ui'
import { computed, ref } from 'vue'

import type { AfterScript } from '../../type'
import StaticDataView from './StaticDataView.vue'

const props = withDefaults(
  defineProps<{
    options?: {
      data: string
    }
    title?: string
    mode?: 'debug' | 'use'
  }>(),
  {
    title: '',
    options: () => {
      return {
        data: ''
      }
    },
    mode: 'debug'
  }
)

const emits = defineEmits<{
  (e: 'update:options', value: { script?: AfterScript; data: string }): void
  (e: 'dataChange', value: string): void
}>()

const errMessage = ref<string | undefined>(undefined)

const originData = computed<string>(() => {
  return props.options.data
})

const originDataChange = (value: string) => {
  emits('dataChange', value)
  errMessage.value = undefined
  try {
    JSON.parse(value)
  } catch (err) {
    errMessage.value = '语法错误'
    return
  }
}
</script>
