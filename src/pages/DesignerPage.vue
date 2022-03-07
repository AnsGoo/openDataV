<template>
  <div class="home">
    <Toolbar @recovery="recoveryDraft" />

    <main>
      <!-- 左侧组件列表 -->
      <section class="left">
        <SideBar />
      </section>
      <!-- 中间画布 -->
      <section class="center scrollbar">
        <Ruler :borderStyle="rulerBorderStyle">
          <div
            class="content scrollbar"
            @drop="handleDrop"
            @dragover="handleDragOver"
            @mousedown="handleMouseDown"
            @mouseup="deselectCurComponent"
          >
            <Editor />
          </div>
        </Ruler>
      </section>
      <!-- 右侧属性列表 -->
      <section class="right">
        <TabPane />
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { cloneDeep } from 'lodash-es'
import Editor from '@/designer/Editor/Index.vue'
import Toolbar from '@/designer/Pane/Toolbar.vue'
import Ruler from '@/designer/Editor/Ruler.vue'
import TabPane from '@/designer/Pane/TabPane.vue'
import SideBar from '@/designer/Pane/SideBar/SideBar.vue'
import { componentList } from '@/designer/load' // 左侧列表数据
import { useBasicStoreWithOut } from '@/store/modules/basic'
import { useSnapShotStoreWithOut } from '@/store/modules/snapshot'
import { ref, onMounted, onUnmounted, reactive, watch } from 'vue'
import { getUIComponents } from '@/api/pages'
import { useRoute } from 'vue-router'
import { eventBus } from '@/bus/useEventBus'
import { ComponentInfo } from '@/types/component'
import { useStorage } from '@vueuse/core'
const basicStore = useBasicStoreWithOut()
const snapShotStore = useSnapShotStoreWithOut()

const websk = ref<WebSocket | null>(null)

const rulerBorderStyle = reactive<{
  type: 'dashed' | 'solid' | 'dotted'
  width: number
  color: string
}>({
  type: 'dashed',
  width: 1,
  color: 'red'
})

const storageComponentData = useStorage('canvasData', JSON.stringify([]), window.localStorage)
const storageCanvasStyleData = useStorage(
  'canvasStyle',
  JSON.stringify({
    width: 0,
    height: 0,
    scale: 0,
    dataWs: '',
    image: '/images/bg.jpg'
  })
)
const route = useRoute()

onMounted(async () => {
  let index = ''
  if (route.params.index) {
    index = route.params.index as string
  }
  if (index) {
    await restore(index)
  }
})

const restore = async (index: string) => {
  const resp = await getUIComponents(index)
  if (!resp) {
    return
  }
  await snapShotStore.recordSnapshot()
  basicStore.setLayoutData(resp)
}

const handleDrop = async (e) => {
  e.preventDefault()
  e.stopPropagation()
  const componentName = e.dataTransfer.getData('componentName')
  if (componentName) {
    const component = cloneDeep(componentList[componentName].component)
    component.style.top = e.offsetY
    component.style.left = e.offsetX
    await snapShotStore.recordSnapshot()
    basicStore.appendComponent(component as ComponentInfo)
  }
}

const handleDragOver = (e) => {
  e.preventDefault()
  e.dataTransfer.dropEffect = 'copy'
}

const handleMouseDown = () => {
  basicStore.setClickComponentStatus(false)
}

const deselectCurComponent = () => {
  if (!basicStore.isClickComponent) {
    basicStore.setCurComponent(undefined)
  }
}

// 恢复草稿
const recoveryDraft = () => {
  // 用保存的数据恢复画布
  basicStore.setComponentData(JSON.parse(storageComponentData.value))
  basicStore.setCanvasStyle(JSON.parse(storageCanvasStyleData.value))
}

watch(
  () => basicStore.canvasStyleData.dataWs,
  (newValue) => {
    websk.value?.close()
    if (newValue) {
      websk.value = initWebsocket('actual', newValue)
    }
  }
)

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

onUnmounted(async (): Promise<void> => {
  websk.value?.close()
  await snapShotStore.clearSnapshot()
  basicStore.clearCanvas()
})
</script>

<style scoped lang="less">
@layer components {
  .home {
    @apply h-screen bg-white flex flex-col;
  }

  main {
    @apply relative flex;

    max-height: calc(100vh - 30px);
    flex: 1;
    overflow: overlay;
    ::-webkit-scrollbar {
      /*滚动条整体样式*/
      width: 8px; /*高宽分别对应横竖滚动条的尺寸*/
      height: 8px;
    }
    ::-webkit-scrollbar-thumb {
      background-color: #70c0ff;
      -webkit-border-radius: 2em;
      -moz-border-radius: 2em;
      border-radius: 2em;
    }
    ::-webkit-scrollbar-track {
      background-color: #ccc;
    }
  }

  .left {
    position: relative;
    width: 200px;

    transition: all 0.3s;
  }

  .right {
    width: 260px;

    transition: all 0.3s;
  }

  .center {
    @apply bg-gray-50 overflow-auto;

    flex: 1;
  }

  .content {
    @apply overflow-auto;

    box-shadow: 0 0 15px 7px;
  }

  // .scrollbar::-webkit-scrollbar {
  //   width: 4px; /*高宽分别对应横竖滚动条的尺寸*/
  //   height: 4px;
  //   scrollbar-arrow-color: red;
  // }

  // .scrollbar::-webkit-scrollbar-thumb {
  //   /*滚动条里面小方块*/
  //   border-radius: 5px;
  //   -webkit-box-shadow: inset 0 0 5px rgba(128, 128, 128, 0.5);
  //   background: darkslategray;
  //   scrollbar-arrow-color: red;
  // }
  // .scrollbar::-webkit-scrollbar-track {
  //   /*滚动条里面轨道*/
  //   -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  //   border-radius: 0;
  //   background: darkgray;
  // }

  .placeholder {
    @apply text-gray-800 text-center;
  }
}
</style>
