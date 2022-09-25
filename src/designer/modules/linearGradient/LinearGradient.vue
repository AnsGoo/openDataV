<template>
  <div class="linear-gradient">
    <n-input-number
      :modelValue="value!.angle"
      @update:value="(value) => changed('angle', value)"
      :controls="true"
      :min="0"
      :max="360"
      :step="1"
      clearable
    />
    <NColorPicker
      :value="value!.color1"
      @update:value="(value) => changed('color1', value)"
      :swatches="GlobalColorSwatches"
      clearable
    />
    <NColorPicker
      :value="value!.color2"
      @update:value="(value) => changed('color2', value)"
      :swatches="GlobalColorSwatches"
      clearable
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { NColorPicker, NInputNumber } from 'naive-ui'
import { GlobalColorSwatches } from '@/enum'
import { Gradient } from './type';

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

interface Gradient {
  angle: number
  color1: string
  color2: string
}

const linearGradient = ref<Gradient>({
  angle: props.value.angle || 0,
  color1: props.value.color1 || '',
  color2: props.value.color2 || ''
})

const emits = defineEmits<{
  (e: 'update:value', value: Gradient): void
}>()

const changed = (key: string, value: string | number | null) => {
  linearGradient.value[key] = value
  emits('update:value', linearGradient.value)
}
</script>
