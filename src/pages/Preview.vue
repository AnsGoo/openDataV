<template>
  <div class="bg" :style="bgStyle">
    <div ref="screen" :style="screenStyle" class="screen">
      <ComponentWrapper v-for="(item, index) in componentData" :key="index" :component="item" />
    </div>
  </div>
</template>

<script setup lang="ts">
import ComponentWrapper from '@/designer/Editor/ComponentWrapper.vue'
import { backgroundToCss, filterStyle, pageScale } from '@/utils/utils'
import { onUnmounted, onMounted, ref, computed } from 'vue'
import type { CanvasStyleData } from '@/types/storeTypes'
import { useSnapShotStoreWithOut } from '@/store/modules/snapshot'
import { useBasicStoreWithOut } from '@/store/modules/basic'
import type { BaseComponent } from '@/resource/models'
import type { ComponentDataType } from '@/types/component'
const snapShotStore = useSnapShotStoreWithOut()
const basicStore = useBasicStoreWithOut()

const componentData = computed<BaseComponent[]>(() => basicStore.componentData)
const canvasStyleData = ref<CanvasStyleData>({
  width: 0,
  height: 0,
  background: { backgroundColor: '#272e3b' }
})

const screen = ref<HTMLDivElement | null>(null)

const bgStyle = computed<Recordable<string>>(() => {
  const backgroundStyle = backgroundToCss(canvasStyleData.value.background)
  const style = {
    ...canvasStyleData.value,
    ...backgroundStyle
  }
  return filterStyle(style, ['backgroundImage', 'backgroundSize', 'backgroundColor'])
})

const screenStyle = computed<Recordable<string>>(() => {
  const style = {
    ...canvasStyleData.value
  }
  return filterStyle(style, ['width', 'height'])
})

onMounted(async () => {
  const snapshot = await snapShotStore.latestRecord()
  if (snapshot) {
    basicStore.setLayoutData({
      canvasData: snapshot.canvasData as ComponentDataType[],
      canvasStyle: snapshot.canvasStyle
    })
  }
  canvasStyleData.value = basicStore.canvasStyleData
  setScale()
  window.addEventListener('resize', setScale)
})

onUnmounted(() => {
  window.removeEventListener('resize', setScale)
})

const setScale = () => {
  const screenEl: HTMLDivElement | null = document.querySelector('.screen')
  if (screenEl) {
    const designWidth = canvasStyleData.value.width
    const designHeight = canvasStyleData.value.height
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
