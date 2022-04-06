<template>
  <div class="home">
    <ToolBar />

    <main>
      <!-- 左侧组件列表 -->
      <section class="left">
        <LeftSideBar />
      </section>
      <!-- 中间画布 -->
      <section class="center scrollbar" ref="editor" v-resize="editorWindowResizeHandler">
        <div class="content scrollbar" :style="scrobarStyle">
          <Ruler :borderStyle="rulerBorderStyle">
            <Editor
              @drop="handleDrop"
              @dragover="handleDragOver"
              @mousedown="handleMouseDown"
              @mouseup="deselectCurComponent"
            />
          </Ruler>
        </div>
      </section>
      <!-- 右侧属性列表 -->
      <section class="right">
        <RightSideBar />
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { cloneDeep } from 'lodash-es'
import Editor from '@/designer/Editor/Index.vue'
import ToolBar from '@/designer/Pane/Toolbar'
import Ruler from '@/designer/Editor/Ruler.vue'
import LeftSideBar from '@/designer/Pane/LeftSideBar'
import RightSideBar from '@/designer/Pane/RightSideBar'
import { componentList } from '@/designer/load' // 左侧列表数据
import { useBasicStoreWithOut } from '@/store/modules/basic'
import { ref, onMounted, onUnmounted, reactive, watch, computed } from 'vue'
import { getUIComponents } from '@/api/pages'
import { useRoute } from 'vue-router'
import { eventBus } from '@/bus/useEventBus'
import { ComponentInfo } from '@/types/component'
const basicStore = useBasicStoreWithOut()
const websk = ref<WebSocket | null>(null)

const editor = ref<HTMLDivElement | null>(null)

const rulerBorderStyle = reactive<{
  type: 'dashed' | 'solid' | 'dotted'
  width: number
  color: string
}>({
  type: 'dashed',
  width: 1,
  color: 'red'
})
const route = useRoute()

onMounted(async () => {
  const index = route.params.index as string
  if (index) {
    await restore(index)
  }
})

const restore = async (index: string) => {
  const resp = await getUIComponents(index)
  if (!resp) {
    return
  }
  basicStore.setLayoutData(resp)
}
const windowWidth = ref<number>(0)
const windowHeight = ref<number>(0)
const scrobarStyle = computed(() => {
  return {
    width: windowWidth.value - 18 + 'px',
    height: windowHeight.value - 18 + 'px'
  }
})

const editorWindowResizeHandler: ResizeObserverCallback = (entries: ResizeObserverEntry[]) => {
  const entry = entries[0]
  const { width, height } = entry.contentRect
  windowWidth.value = width
  windowHeight.value = height
}

const handleDrop = async (e) => {
  e.preventDefault()
  e.stopPropagation()
  const componentName = e.dataTransfer.getData('componentName')
  if (componentName) {
    const component = cloneDeep(componentList[componentName].component)
    component.style.top = e.offsetY
    component.style.left = e.offsetX
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

onUnmounted(() => {
  websk.value?.close()
  basicStore.clearCanvas()
})
</script>

<style scoped lang="less">
@layer components {
  .home {
    @apply h-screen bg-white flex flex-col;
    background-color: var(--theme-dark-color-primary);
  }

  main {
    @apply relative flex;

    max-height: calc(100vh - 30px);
    flex: 1;
    overflow: hidden;
    ::-webkit-scrollbar {
      /*滚动条整体样式*/
      width: 6px; /*高宽分别对应横竖滚动条的尺寸*/
      height: 6px;
    }
    ::-webkit-scrollbar-thumb {
      background-color: #8b8b8b;
      -webkit-border-radius: 2em;
      -moz-border-radius: 2em;
      border-radius: 2em;
    }
    ::-webkit-scrollbar-track {
      background-color: #ccc;
    }
  }
  .center {
    @apply bg-gray-50 overflow-auto;

    flex: 1;
    border: var(--el-color-primary) 1px solid;
  }

  .content {
    @apply overflow-auto;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-content: center;
    justify-content: center;
  }

  .placeholder {
    @apply text-gray-800 text-center;
  }
}
</style>
