<template>
  <div class="bg" :style="bgStyle">
    <ComponentWrapper v-for="(item, index) in componentData" :key="index" :component="item" />
  </div>
</template>

<script setup lang="ts">
import ComponentWrapper from '@/designer/Editor/ComponentWrapper.vue'
import { filterStyle, pageScale } from '@/utils/utils'
import { onUnmounted, onMounted, ref, computed } from 'vue'
import { channels, eventBus } from '@/bus/useEventBus'
import type { ChannelItem } from '@/bus/useEventBus'
import type { CanvasStyleData } from '@/types/storeTypes'
import { useSnapShotStoreWithOut } from '@/store/modules/snapshot'
import { useBasicStoreWithOut } from '@/store/modules/basic'
import { BaseComponent } from '@/resource/models'
const snapShotStore = useSnapShotStoreWithOut()
const basicStore = useBasicStoreWithOut()

const websockets: WebSocket[] = []

const componentData = computed<BaseComponent[]>(() => basicStore.componentData)
const canvasStyleData = ref<CanvasStyleData>({
  width: 0,
  height: 0,
  scale: 0,
  dataWs: '',
  image: '/images/bg.png'
})

const bgStyle = computed<Recordable<string>>(() => {
  const style = {
    ...canvasStyleData.value,
    backgroundImage: canvasStyleData.value.image,
    backgroundSize: 'cover'
  }
  return filterStyle(style, ['width', 'height', 'backgroundImage', 'backgroundSize'])
})

onMounted(async () => {
  const snapshot = await snapShotStore.undo()
  if (snapshot) {
    basicStore.setLayoutData({
      canvasData: snapshot.canvasData,
      canvasStyle: snapshot.canvasStyle
    })
  }
  canvasStyleData.value = basicStore.canvasStyleData
  if (canvasStyleData.value.dataWs) {
    websockets.push(initWebsocket('actual', canvasStyleData.value.dataWs))
  }
  setScale()
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
  window.removeEventListener('resize', setScale)
  websockets.forEach((ws) => {
    console.log('关闭websocket')
    ws.close()
  })
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
@layer components {
  .bg {
    @apply w-screen h-screen;
  }
}
</style>
