<!-- TODO: 这个页面后续将用 JSX 重构 -->
<template>
  <div class="attr-list">
    <n-scrollbar>
      <n-form size="small" @submit.prevent label-placement="left" label-align="left">
        <n-form-item label="分辨率">
          <n-select
            v-model:value="myPixel"
            @update:value="setScreenSize"
            placeholder="选择分辨率"
            :options="piexls"
          />
        </n-form-item>
        <n-form-item v-for="({ key, label, type }, index) in styleKeys" :key="index" :label="label">
          <n-input-number
            v-if="type === 'number'"
            v-model:value="canvasStyleFrom[key]"
            @update:value="styleChange"
          />
          <n-color-picker
            v-else-if="type === 'color'"
            v-model:value="canvasStyleFrom[key]"
            :modes="['hex', 'rgb', 'hsl']"
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
import { CanvasStyleData } from '@/types/storeTypes'

const piexls = computed<Recordable<string>[]>(() => {
  return [
    { label: '本设备', value: `${window.screen.width}X${window.screen.height}` },
    ...PixelEnum
  ]
})

const basicStore = useBasicStoreWithOut()

const canvasStyleFrom = ref<CanvasStyleData>({
  width: basicStore.canvasData.width,
  height: basicStore.canvasData.height,
  scale: basicStore.canvasData.scale,
  image: basicStore.canvasData.image,
  color: basicStore.canvasData.color || '#084860'
})

const styleChange = () => {
  basicStore.setCanvasStyle(canvasStyleFrom.value)
}
const myPixel = ref<string>('本设备')
const styleKeys = [
  { key: 'width', label: '宽度', type: FormType.NUMBER },
  { key: 'height', label: '高度', type: FormType.NUMBER },
  { key: 'image', label: '背景图', type: FormType.TEXT },
  { key: 'color', label: '背景色', type: FormType.COLOR }
]

const setScreenSize = (piexl: string) => {
  const piexls = piexl.split('X')
  const width = parseInt(piexls[0])
  const height = parseInt(piexls[1])
  canvasStyleFrom.value.width = width
  canvasStyleFrom.value.height = height
}
</script>

<style scoped>
.attr-list {
  @apply overflow-auto p-1 pt-0 h-full;

  backdrop-filter: blur(50px);
  margin-right: 10px;
}
</style>
