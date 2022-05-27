<template>
  <div class="linear-gradient">
    <el-input-number
      :modelValue="value!.angle"
      @change="changed('angle', $event)"
      :controls="true"
      :min="0"
      :max="360"
      :step="1"
    />
    <ColorPicker :value="value!.color1" @change="changed('color1', $event)" />
    <ColorPicker :value="value!.color2" @change="changed('color2', $event)" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElInputNumber } from 'element-plus'
import ColorPicker from './ColorPicker.vue'

interface LinearGradient {
  angle: number
  color1: string
  color2: string
}

const props = withDefaults(
  defineProps<{
    value: LinearGradient
  }>(),
  {
    value: {
      angle: 0,
      color1: '',
      color2: ''
    } as any
  }
)

const linearGradient = ref<LinearGradient>({
  angle: props.value.angle || 0,
  color1: props.value.color1 || '',
  color2: props.value.color2 || ''
})

const emits = defineEmits<{
  (e: 'update:value', value: LinearGradient): void
  (e: 'change', value: LinearGradient): void
}>()

const changed = (key: string, value: string | number) => {
  linearGradient.value[key] = value
  console.log(linearGradient.value)
  emits('update:value', linearGradient.value)
  emits('change', linearGradient.value)
}
</script>
