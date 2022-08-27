<template>
  <n-select
    clearable
    v-model:value="weight"
    placeholder="请选择字重"
    @update:value="change"
    :options="weights"
  />
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { SYS_FONT_WEIGHT } from '@/enum/font'
import { NSelect } from 'naive-ui'

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
console.log(111, props.value)
const emits = defineEmits<{
  (e: 'update:value', weight: number): void
  (e: 'change', weight: number): void
}>()

const change = (val: number) => {
  weight.value = val
  console.log(val)
  emits('update:value', weight.value)
  emits('change', weight.value)
}
</script>
