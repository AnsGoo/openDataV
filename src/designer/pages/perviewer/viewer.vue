<template>
  <div class="bg" :style="bgStyle">
    <div ref="screen" :style="screenStyle" class="screen">
      <Wrapper v-for="item in componentData" :key="item.id" :component="item" />
    </div>
  </div>
</template>

<script setup lang="ts">
import Wrapper from 'open-data-v/designer/Editor/Wrapper.vue'
import type { CustomComponent } from 'open-data-v/models'
import { useData, useProp } from 'open-data-v/models'
import { computed, onMounted, onUnmounted, provide, readonly, ref } from 'vue'

import type { CanvasStyleData, LayoutData } from '../../state/type'
import { backgroundToCss, createComponent, filterStyle, pageScale } from '../../utils'

provide('HOOKS', readonly({ useData, useProp }))

const componentData = ref<Array<CustomComponent>>([])
const canvasStyle = ref<CanvasStyleData>({
  width: 0,
  height: 0,
  background: { backgroundColor: '#272e3b' }
})
const bgStyle = computed<Record<string, string>>(() => {
  return backgroundToCss(canvasStyle.value.background)
})

const screenStyle = computed<Record<string, string>>(() => {
  const style = {
    ...canvasStyle.value
  }
  return filterStyle(style, ['width', 'height'])
})
const setLayoutData = (data: LayoutData): void => {
  if (data.canvasStyle) {
    canvasStyle.value = data.canvasStyle
  }
  if (data.canvasData) {
    componentData.value = data.canvasData.map((ele) => {
      return createComponent(ele)
    })
  }
  setScale()
}
defineExpose({ setLayoutData })

onMounted(async () => {
  // 如果是首页
  window.addEventListener('resize', setScale)
})

onUnmounted(() => {
  window.removeEventListener('resize', setScale)
})

const setScale = () => {
  const screenEl: HTMLDivElement | null = document.querySelector('.screen')
  if (screenEl) {
    const designWidth = canvasStyle.value.width
    const designHeight = canvasStyle.value.height
    pageScale(screenEl, designWidth, designHeight)
  }
}
</script>

<style scoped lang="less">
.bg {
  @apply w-screen h-screen;

  .screen {
    position: relative;
    left: 50%;
    transform-origin: 0 0;
    transform: translateX(-50%);
  }
}
</style>
