<template>
  <o-card>
    <div>
      <slot name="data-select"></slot>
    </div>
    <StaticDataView
      :data="originData"
      :title="title"
      :mode="mode"
      @update:data="originDataChange"
    />
  </o-card>
</template>

<script lang="ts" setup>
import { OCard } from '@open-data-v/ui'
import { computed, ref } from 'vue'

import StaticDataView from './data-content.vue'

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
  (e: 'update:options', value: { data: string }): void
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
