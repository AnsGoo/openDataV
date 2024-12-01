<template>
  <div class="bg" :style="bgStyle">
    <div ref="screen" :style="screenStyle" class="screen">
      <Wrapper v-for="item in componentData" :key="item.id" :component="item" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useData, useProp } from '@open-data-v/base'
import { computed, onMounted, onUnmounted, provide, readonly } from 'vue'

import { HOOKS } from '../../const'
import Wrapper from '../../editor/Wrapper.vue'
import { useCanvasState } from '../../state'
import type { LayoutData } from '../../state/type'
import { backgroundToCss, filterStyle, pageScale } from '../../utils'

provide(HOOKS, readonly({ useData, useProp }))

const canvasState = useCanvasState()
const canvasStyle = computed(() => canvasState.canvasStyleData)
const componentData = computed(() => canvasState.componentData)
const bgStyle = computed<Record<string, string>>(() => {
  return backgroundToCss(canvasStyle.value.background)
})

const screenStyle = computed<Record<string, string>>(() => {
  const style = {
    ...canvasStyle.value
  }
  return filterStyle(style, ['width', 'height'])
})
const setLayoutData = async (data: LayoutData): Promise<void> => {
  await canvasState.setLayoutData(data)
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

<style lang="less" scoped>
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
