<template>
  <div class="bg" :style="bgStyle">
    <div class="screen" :style="filterStyle(canvasStyle, ['width', 'height'])">
      <ComponentWrapper v-for="item in componentData" :key="item.id" :component="item" />
    </div>
  </div>
</template>

<script setup lang="ts">
import ComponentWrapper from '@/designer/Editor/ComponentWrapper.vue'
import { ref, onUnmounted, onMounted, computed } from 'vue'
import { getUIComponents, getHomeData } from '@/api/pages'
import type { ComponentInfo } from '@/types/component'
import { useRoute, useRouter } from 'vue-router'
import { filterStyle, pageScale } from '@/utils/utils'
import type { CanvasStyleData } from '@/types/storeTypes'
import { eventBus } from '@/bus/useEventBus'
import { LayoutData } from '@/types/apiTypes'

const websockets: WebSocket[] = []

const componentData = ref<Array<ComponentInfo>>([])
const canvasStyle = ref<CanvasStyleData>({
  width: 0,
  height: 0,
  scale: 0,
  dataWs: '',
  image: '/images/bg.jpg'
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

const initHome = async (): Promise<void> => {
  try {
    const resp: LayoutData = await getHomeData()
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
  if (canvasStyle.value.dataWs) {
    websockets.push(initWebsocket('actual', canvasStyle.value.dataWs))
  }
  setScale()
}

onMounted(async () => {
  // 如果是首页
  if (route.name === 'Home') {
    await initHome()
  } else {
    await initComponents(route.params.index as string)
  }

  window.addEventListener('resize', setScale)
})

const initWebsocket = (key: string, url: string): WebSocket => {
  const ws = new WebSocket(url)
  ws.onopen = () => {
    console.log('websocket连接成功')
  }

  ws.onclose = () => {
    console.log('websocket连接被关闭')
  }

  ws.onmessage = (ev) => {
    const data = JSON.parse(ev.data)
    eventBus.emit(key, data)
  }

  return ws
}

onUnmounted(() => {
  websockets.forEach((ws) => {
    console.log('关闭websocket')
    ws.close()
  })
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
@layer components {
  .bg {
    @apply w-screen h-screen;

    .screen {
      position: relative;
      left: 50%;
      transform-origin: 0 0;
      transform: translateX(-50%);
    }
  }
}
</style>
