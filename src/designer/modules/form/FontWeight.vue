<template>
  <n-select
    clearable
    v-model="weight"
    placeholder="请选择字重"
    @update:value="change"
    :options="weights"
  />
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { SYS_FONT_WEIGHT } from '@/enum/font'
import { NSelect } from 'naive-ui'

withDefaults(
  defineProps<{
    value?: string
  }>(),
  {
    value: ''
  }
)

const weight = ref<string>('')
const weights = reactive<{ label: string; value: number }[]>(SYS_FONT_WEIGHT)

const emits = defineEmits<{
  (e: 'update:value', color: string): void
  (e: 'change', color: string): void
}>()

const change = (val: string) => {
  weight.value = val
  emits('update:value', weight.value)
  emits('change', weight.value)
}
</script>
