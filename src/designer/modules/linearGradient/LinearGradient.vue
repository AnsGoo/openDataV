<template>
  <div class="linear-gradient">
    <n-slider
      v-model:value="linearGradient.angle"
      :step="5"
      size="small"
      :max="360"
      @update:value="changed"
    />
    <NColorPicker
      v-model:value="linearGradient.color1"
      :swatches="GlobalColorSwatches"
      clearable
      @update:value="changed"
    />
    <NColorPicker
      v-model:value="linearGradient.color2"
      :swatches="GlobalColorSwatches"
      clearable
      @update:value="changed"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { NColorPicker, NSlider } from 'naive-ui'
import { GlobalColorSwatches } from '@/enum'
import type { Gradient } from './type'

const props = withDefaults(
  defineProps<{
    value: Gradient
  }>(),
  {
    value: () => ({
      angle: 0,
      color1: '',
      color2: ''
    })
  }
)

const linearGradient = ref<Gradient>({
  angle: props.value.angle || 0,
  color1: props.value.color1 || '',
  color2: props.value.color2 || ''
})

const emits = defineEmits<{
  (e: 'updateValue', value: Gradient): void
  (e: 'update:value', value: Gradient): void
}>()

const changed = () => {
  emits('updateValue', linearGradient.value)
  emits('update:value', linearGradient.value)
}
</script>

<style scoped lang="less">
.linear-gradient {
  width: 100%;
}
</style>
