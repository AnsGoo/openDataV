<!-- TODO: 这个页面后续将用 JSX 重构 -->
<template>
  <n-form-item label="分辨率">
    <n-select
      v-model:value="myPixel"
      placeholder="选择分辨率"
      :options="pixels"
      @update:value="setScreenSize"
    />
  </n-form-item>
  <n-form-item v-for="({ key, label, type }, index) in styleKeys" :key="index" :label="label">
    <n-input-number
      v-if="type === FormType.NUMBER"
      v-model:value="canvasStyleFrom[key]"
      @update:value="styleChange"
    />
    <n-color-picker
      v-else-if="type === FormType.COLOR"
      v-model:value="canvasStyleFrom[key]"
      :modes="['hex', 'rgb', 'hsl']"
      @update:value="styleChange"
    />
    <back-item
      v-else-if="type === FormType.BACKGROUND"
      v-model:value="canvasStyleFrom[key]"
      @update:value="styleChange"
    />
    <n-input v-else v-model:value="canvasStyleFrom[key]" @update:value="styleChange" />
  </n-form-item>
</template>

<script setup lang="ts">
import { NColorPicker, NFormItem, NInput, NInputNumber, NSelect } from 'naive-ui'
import useCanvasState from 'open-data-v/designer/state/canvas'
import { FormType } from 'open-data-v/enum'
import PixelEnum from 'open-data-v/enum/pixel'
import { computed, ref } from 'vue'

import BackItem from '../../modules/backItem'
import type { CanvasStyleData } from '../../state/type'

const pixels = computed<Record<string, string>[]>(() => {
  return [
    { label: '本设备', value: `${window.screen.width}X${window.screen.height}` },
    ...PixelEnum
  ]
})

const canvasState = useCanvasState()

const canvasStyleFrom = ref<CanvasStyleData>({
  width: canvasState.canvasData.width,
  height: canvasState.canvasData.height,
  background: canvasState.canvasStyleData.background
})

const styleChange = () => {
  // canvasState.setCanvasStyle(canvasStyleFrom.value)
}
const myPixel = ref<string>('本设备')
const styleKeys = [
  { key: 'width', label: '宽度', type: FormType.NUMBER },
  { key: 'height', label: '高度', type: FormType.NUMBER },
  { key: 'background', label: '背景', type: FormType.BACKGROUND }
]

const setScreenSize = (pixel: string) => {
  const pixels = pixel.split('X')
  const width = parseInt(pixels[0])
  const height = parseInt(pixels[1])
  canvasStyleFrom.value.width = width
  canvasStyleFrom.value.height = height
  styleChange()
}
</script>
