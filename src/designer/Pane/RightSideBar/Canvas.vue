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
          <n-input-number v-if="type === 'number'" v-model:value="canvasStyleData[key]" />
          <n-input v-else v-model:value="canvasStyleData[key]" />
        </n-form-item>
      </n-form>
    </n-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { useBasicStoreWithOut } from '@/store/modules/basic'
import { computed, ref } from 'vue'
import { NForm, NFormItem, NInput, NSelect, NInputNumber, NScrollbar } from 'naive-ui'
import PixelEnum from '@/enum/pixel'
import { FormType } from '@/enum'

const piexls = computed<Recordable<string>[]>(() => {
  return [
    { label: '本设备', value: `${window.screen.width}X${window.screen.height}` },
    ...PixelEnum
  ]
})

const basicStore = useBasicStoreWithOut()

const canvasStyleData = computed(() => basicStore.canvasStyleData)

const myPixel = ref<string>('本设备')
const styleKeys = [
  { key: 'width', label: '宽度', type: FormType.NUMBER },
  { key: 'height', label: '高度', type: FormType.NUMBER },
  { key: 'image', label: '背景图', type: FormType.TEXT }
]

const setScreenSize = (piexl: string) => {
  const piexls = piexl.split('X')
  const width = parseInt(piexls[0])
  const height = parseInt(piexls[1])
  basicStore.setCanvasStyle({
    ...canvasStyleData.value,
    width,
    height
  })
}
</script>

<style scoped>
.attr-list {
  @apply overflow-auto p-1 pt-0 h-full;

  backdrop-filter: blur(50px);
  margin-right: 10px;
}
</style>
