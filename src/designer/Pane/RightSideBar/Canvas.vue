<!-- TODO: 这个页面后续将用 JSX 重构 -->
<template>
  <div class="attr-list">
    <n-scrollbar>
      <n-form size="small" label-placement="left" label-align="left" @submit.prevent>
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
      </n-form>
    </n-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { useBasicStoreWithOut } from '@/store/modules/basic'
import { computed, ref } from 'vue'
import { NForm, NFormItem, NInput, NSelect, NInputNumber, NScrollbar, NColorPicker } from 'naive-ui'
import PixelEnum from '@/enum/pixel'
import { FormType } from '@/enum'
import type { CanvasStyleData } from '@/types/storeTypes'
import BackItem from '../../modules/backItem'

const pixels = computed<Recordable<string>[]>(() => {
  return [
    { label: '本设备', value: `${window.screen.width}X${window.screen.height}` },
    ...PixelEnum
  ]
})

const basicStore = useBasicStoreWithOut()

const canvasStyleFrom = ref<CanvasStyleData>({
  width: basicStore.canvasData.width,
  height: basicStore.canvasData.height,
  background: basicStore.canvasStyleData.background
})

const styleChange = () => {
  basicStore.setCanvasStyle(canvasStyleFrom.value)
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

<style scoped>
.attr-list {
  @apply overflow-auto p-1 pt-0 h-full;

  backdrop-filter: blur(50px);
  margin-right: 10px;
}
</style>
