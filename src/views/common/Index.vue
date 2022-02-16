<template>
  <div class="bg" :style="bgStyle">
    <div class="screen" :style="screenStyle">
      <ComponentWrapper v-for="(item, index) in componentData" :key="index" :config="item" />
    </div>
  </div>
</template>

<script setup lang="ts">
import ComponentWrapper from '@/components/Editor/ComponentWrapper.vue'
import { ref, onUnmounted, onMounted, reactive } from 'vue'
import { getUIComponents, getHomeData } from '@/api'
import type { ComponentInfo } from '@/types/component'
import { useRoute, useRouter } from 'vue-router'
import { getScreenStyle } from '@/utils/utils'
import type { CanvasStyleData } from '@/types/storeTypes'
import { useWsDataStoreWithOut } from '@/store/modules/wsdata'
import { cloneDeep } from 'lodash-es'
import { eventBus } from '@/bus/useEventBus'
import { LayoutData } from '@/types/apiTypes'

const websockets: WebSocket[] = []

const wsDataStore = useWsDataStoreWithOut()

const componentData = ref<Array<ComponentInfo>>([])
const canvasStyle = ref<CanvasStyleData>({} as CanvasStyleData)
const route = useRoute()
const router = useRouter()

const setScale = () => {
  const designWidth = parseInt(canvasStyle.value.width as unknown as string)
  const designHeight = parseInt(canvasStyle.value.height as unknown as string)

  const scaleX = document.documentElement.clientWidth / designWidth
  const scaleY = document.documentElement.clientHeight / designHeight
  const scale = Math.min(scaleX, scaleY)

  const screenEl: HTMLDivElement | null = document.querySelector('.screen')
  if (screenEl) {
    screenEl.style.transform = `scale(${scale}) translate(-50%)`
  }
}

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
    canvasStyle.value = cloneDeep(data.canvasStyle)
    const { width, height } = getScreenStyle(canvasStyle.value)
    const { backgroundImage, backgroundSize } = getScreenStyle(canvasStyle.value)
    bgStyle.backgroundImage = backgroundImage
    bgStyle.backgroundSize = backgroundSize
    screenStyle.width = width
    screenStyle.height = height
  }
  if (data.canvasData) {
    componentData.value = cloneDeep(data.canvasData)
  }
  if (canvasStyle.value.alertWs) {
    websockets.push(initWebsocket('alert', canvasStyle.value.alertWs))
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
})

const screenStyle = reactive<Recordable<string>>({ width: '0px', height: '0px' })
const bgStyle = reactive<Recordable<string>>({
  backgroundImage: 'url("/images/bg.jpg")',
  backgroundSize: 'cover'
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
    wsDataStore.addData(key, data)
  }

  return ws
}

onUnmounted(() => {
  websockets.forEach((ws) => {
    console.log('关闭websocket')
    ws.close()
  })
})

window.onresize = () => {
  setScale()
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
