<template>
  <div class="bg" :style="bgStyle">
    <ComponentWrapper v-for="item in componentData" :key="item.id" :component="item" />
  </div>
</template>

<script setup lang="ts">
import ComponentWrapper from '@/designer/Editor/ComponentWrapper.vue'
import { ref, onUnmounted, onMounted, computed } from 'vue'
import { getUIComponents } from '@/api/pages'
import { useRoute, useRouter } from 'vue-router'
import { filterStyle, pageScale } from '@/utils/utils'
import type { CanvasStyleData } from '@/types/storeTypes'
// import { eventBus } from '@/bus/useEventBus'
import { LayoutData } from '@/types/apiTypes'
import { BaseComponent } from '@/resource/models'

// const websockets: WebSocket[] = []

const componentData = ref<Array<BaseComponent>>([])
const canvasStyle = ref<CanvasStyleData>({
  width: 0,
  height: 0,
  scale: 0,
  image: import.meta.env.VITE_BACKGROUND as string
})
const bgStyle = computed<Recordable<string>>(() => {
  const style = {
    ...canvasStyle.value,
    backgroundImage: canvasStyle.value.image,
    backgroundSize: 'cover'
  }
  return filterStyle(style, ['width', 'height', 'backgroundImage', 'backgroundSize'])
})
const route = useRoute()
const router = useRouter()

const initComponents = async (index: string): Promise<void> => {
  console.log('加载通用组件')
  try {
    const resp: LayoutData = await getUIComponents(index)
    setPageData(resp)
  } catch (e: any) {
    router.push({
      name: 'Error'
    })
  }
}

const setPageData = (data: LayoutData): void => {
  if (data.canvasStyle) {
    canvasStyle.value = data.canvasStyle
  }
  if (data.canvasData) {
    componentData.value = data.canvasData
  }
  setScale()
}

onMounted(async () => {
  // 如果是首页
  await initComponents(route.params.index as string)

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
}
</style>
