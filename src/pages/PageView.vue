<template>
  <div class="bg" :style="bgStyle">
    <div :style="screenStyle" ref="screen" class="screen">
      <ComponentWrapper v-for="item in componentData" :key="item.id" :component="item" />
    </div>
  </div>
</template>

<script setup lang="ts">
import ComponentWrapper from '@/designer/Editor/ComponentWrapper.vue'
import { ref, onUnmounted, onMounted, computed } from 'vue'
import { getPage } from '@/api/pages'
import { useRoute, useRouter } from 'vue-router'
import { filterStyle, pageScale } from '@/utils/utils'
import type { CanvasStyleData } from '@/types/storeTypes'
import { LayoutData } from '@/types/apiTypes'
import { BaseComponent, createComponent } from '@/resource/models'

const componentData = ref<Array<BaseComponent>>([])
const canvasStyle = ref<CanvasStyleData>({
  width: 0,
  height: 0,
  image: import.meta.env.VITE_BACKGROUND as string,
  color: '#084860'
})
const bgStyle = computed<Recordable<string>>(() => {
  const style = {
    backgroundImage: canvasStyle.value.image,
    backgroundSize: 'cover',
    backgroundColor: canvasStyle.value.color || '#084860'
  }
  return filterStyle(style, ['backgroundImage', 'backgroundSize', 'backgroundColor'])
})

const screenStyle = computed<Recordable<string>>(() => {
  const style = {
    ...canvasStyle.value
  }
  return filterStyle(style, ['width', 'height'])
})
const route = useRoute()
const router = useRouter()

const initComponents = async (index: string): Promise<void> => {
  console.log('加载通用组件')
  try {
    const resp = await getPage(index)
    setPageData(resp.data)
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
    componentData.value = data.canvasData.map((ele) => {
      return createComponent(ele)
    })
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

  .screen {
    position: relative;
    left: 50%;
    transform-origin: 0 0;
    transform: translateX(-50%);
  }
}
</style>
