<template>
  <div class="bg" :style="bgStyle">
    <div class="screen" :style="screenStyle">
      <ComponentWrapper v-for="(item, index) in componentData" :key="index" :config="item" />
    </div>
  </div>
</template>

<script setup lang="ts">
import ComponentWrapper from '@/designer/Editor/ComponentWrapper.vue'
import { getScreenStyle } from '@/utils/utils'
import { useBasicStoreWithOut } from '@/store/modules/basic'
import { useStorage } from '@vueuse/core'
import { onUnmounted, onMounted, reactive } from 'vue'
import { channels, eventBus } from '@/bus/useEventBus'
import type { ChannelItem } from '@/bus/useEventBus'
import type { CanvasStyleData } from '@/types/storeTypes'

const websockets: WebSocket[] = []

const basicStore = useBasicStoreWithOut()

const storageComponentData = useStorage(
  'canvasData',
  JSON.stringify(basicStore.componentData),
  window.localStorage
)
const storageCanvasStyleData = useStorage(
  'canvasStyle',
  JSON.stringify(basicStore.canvasStyleData),
  window.localStorage
)

let canvasStyleData: CanvasStyleData = basicStore.canvasStyleData
const componentData = JSON.parse(storageComponentData.value)
try {
  canvasStyleData = JSON.parse(storageCanvasStyleData.value)
} catch (error: any) {
  console.log(error?.message || error)
}

const { width, height } = getScreenStyle(canvasStyleData)
const { backgroundImage, backgroundSize } = getScreenStyle(canvasStyleData)

const screenStyle = reactive<Recordable<string>>({ width, height })
const bgStyle = reactive<Recordable<string>>({ backgroundImage, backgroundSize })

onMounted(() => {
  if (canvasStyleData.dataWs) {
    websockets.push(initWebsocket('actual', canvasStyleData.dataWs))
  }

  setScale()
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
    channels.forEach((value: ChannelItem, channel: string) => {
      if (value.isRegExp) {
        const reg = new RegExp(key)
        if (reg.test(data.TagName)) {
          eventBus.emit(channel, data)
        }
      } else {
        if (channel === data.TagName) {
          eventBus.emit(channel, data)
        }
      }
    })
  }
  return ws
}

onUnmounted(() => {
  websockets.forEach((ws) => {
    console.log('关闭websocket')
    ws.close()
  })
})

const setScale = () => {
  const designWidth = canvasStyleData.width
  const designHeight = canvasStyleData.height

  const scaleX = document.documentElement.clientWidth / designWidth
  const scaleY = document.documentElement.clientHeight / designHeight
  const scale = Math.min(scaleX, scaleY)
  const screenEl: HTMLDivElement | null = document.querySelector('.screen')
  if (screenEl) {
    screenEl.style.transform = `scale(${scale}) translate(-50%)`
  }
}

window.onresize = () => {
  setScale()
}
</script>

<style scoped lang="less">
@design_width: 1920px;
@design_height: 1080px;

@layer components {
  .bg {
    @apply w-screen h-screen;

    .screen {
      width: @design_width;
      height: @design_height;
      position: relative;
      left: 50%;
      transform-origin: 0 0;
      transform: translateX(-50%);
    }
  }
}
</style>
