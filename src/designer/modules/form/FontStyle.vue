<template>
  <n-select
    clearable
    v-model="font"
    placeholder="请选择字体"
    @update:value="change"
    :options="fonts"
  />
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { SYS_FONTS } from '@/enum/font'
import { NSelect } from 'naive-ui'

withDefaults(
  defineProps<{
    value?: string
  }>(),
  {
    value: ''
  }
)

const font = ref<string>('')
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
