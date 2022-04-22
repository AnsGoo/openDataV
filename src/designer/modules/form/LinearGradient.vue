<template>
  <div class="linear-gradient">
    <el-input-number
      v-model="linearGradient.angle"
      @change="changed('angle', $event)"
      :controls="true"
      :min="0"
      :max="360"
      :step="1"
    />
    <ColorPicker v-model:value="linearGradient.color1" @change="changed('color1', $event)" />
    <ColorPicker v-model:value="linearGradient.color2" @change="changed('color2', $event)" />
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { ElInputNumber } from 'element-plus'
import ColorPicker from './ColorPicker.vue'

interface LinearGradient {
  angle: number
  color1: string
  color2: string
}

withDefaults(
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

const linearGradient = reactive<LinearGradient>({ angle: 0, color1: '', color2: '' })

const emits = defineEmits<{
  (e: 'update:value', value: LinearGradient): void
  (e: 'change', value: LinearGradient): void
}>()

const changed = (key: string, value: string | number) => {
  console.log(key, value)
  linearGradient[key] = value
  console.log(linearGradient)
  emits('update:value', linearGradient)
  emits('change', linearGradient)
}
</script>
