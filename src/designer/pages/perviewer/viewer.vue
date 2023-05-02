<template>
  <div class="bg" :style="bgStyle">
    <div ref="screen" :style="screenStyle" class="screen">
      <ComponentWrapper v-for="item in componentData" :key="item.id" :component="item" />
    </div>
  </div>
</template>

<script setup lang="ts">
import ComponentWrapper from '@/designer/Editor/ComponentWrapper.vue'
import { computed, onMounted, onUnmounted, provide, readonly, ref } from 'vue'
import type { LayoutData } from '@/api/pages'
import { backgroundToCss, filterStyle, pageScale } from '@/utils/utils'
import type { CanvasStyleData } from '@/types/storeTypes'
import type { CustomComponent } from '@/models'
import hooks from '@/hooks'
import { createComponent } from '@/designer/utils'

provide('HOOKS', readonly(hooks))

const componentData = ref<Array<CustomComponent>>([])
const canvasStyle = ref<CanvasStyleData>({
  width: 0,
  height: 0,
  background: { backgroundColor: '#272e3b' }
})
const bgStyle = computed<Recordable<string>>(() => {
  return backgroundToCss(canvasStyle.value.background)
})

const screenStyle = computed<Recordable<string>>(() => {
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
