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
      @submit="handleSubmit"
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
    dataInstance?: DataInstance
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
  (e: 'dataChange', value: { data: string }): void
  (e: 'submit'): void
}>()

const errMessage = ref<string | undefined>(undefined)

const originData = computed<string>(() => {
  return props.options.data
})

const originDataChange = (value: string) => {
  errMessage.value = undefined
  try {
    JSON.parse(value)
    emits('dataChange', { data: value })
    emits('update:options', { data: value })
  } catch (err) {
    errMessage.value = '语法错误'
    return
  }
}

function handleSubmit() {
  emits('submit')
}
</script>
