<template>
  <n-select
    v-model:value="font"
    clearable
    placeholder="请选择字体"
    :options="fonts"
    @update:value="change"
  />
</template>

<script setup lang="ts">
import { NSelect } from 'naive-ui'
import { reactive, ref } from 'vue'

import { SYS_FONTS } from './enum'

const props = withDefaults(
  defineProps<{
    value?: string
  }>(),
  {
    value: ''
  }
)

const font = ref<string>(props.value)
const fonts = reactive<{ label: string; value: string }[]>(SYS_FONTS)

const emits = defineEmits<{
  (e: 'update:value', color: string): void
  (e: 'change', color: string): void
}>()

const change = (val: string) => {
  font.value = val
  emits('update:value', font.value)
  emits('change', font.value)
}
</script>
