<template>
  <o-select
    v-model:value="weight"
    clearable
    placeholder="请选择字重"
    :options="weights"
    @update:value="change"
  />
</template>

<script setup lang="ts">
import { OSelect } from '@open-data-v/ui'
import { reactive, ref } from 'vue'

import { SYS_FONT_WEIGHT } from './enum'

const props = withDefaults(
  defineProps<{
    value?: number
  }>(),
  {
    value: 400
  }
)

const weight = ref<number>(props.value)
const weights = reactive<{ label: string; value: number }[]>(SYS_FONT_WEIGHT)

const emits = defineEmits<{
  (e: 'update:value', weight: number): void
  (e: 'change', weight: number): void
}>()

const change = (val: number) => {
  weight.value = val
  emits('update:value', weight.value)
  emits('change', weight.value)
}
</script>
