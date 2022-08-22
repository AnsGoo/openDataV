<template>
  <n-layout class="home">
    <n-layout-header class="header">
      <ToolBar />
    </n-layout-header>
    <!-- 左侧组件列表 -->
    <n-layout has-sider class="main">
      <n-layout-sider
        class="left"
        width="200"
        :collapsed="collapsedLeft"
        :native-scrollbar="false"
        bordered
        collapse-mode="width"
        show-trigger
        @collapse="() => (collapsedLeft = true)"
        @expand="() => (collapsedLeft = false)"
      >
        <LeftSideBar
          v-model:iscollapsed="collapsedLeft"
          @update:iscollapsed="(value) => (collapsedLeft = value)"
        />
      </n-layout-sider>
      <n-layout has-sider sider-placement="right">
        <!-- 中间画布 -->
        <n-layout-content class="content" v-resize="editorWindowResizeHandler">
          <n-scrollbar x-scrollable :style="scrobarStyle">
            <Editor
              @drop="handleDrop"
              @dragover="handleDragOver"
              @mousedown="handleMouseDown"
              @mouseup="deselectCurComponent"
            />
          </n-scrollbar>
        </n-layout-content>
        <n-layout-sider
          class="right"
          width="240"
          :collapsed="collapsedRight"
          :native-scrollbar="false"
          bordered
          :collapsed-width="35"
          collapse-mode="width"
          show-trigger="arrow-circle"
          @collapse="() => (collapsedRight = true)"
          @expand="() => (collapsedRight = false)"
        >
          <RightSideBar
            v-model:iscollapsed="collapsedRight"
            @update:iscollapsed="(value) => (collapsedRight = value)"
          />
        </n-layout-sider>
      </n-layout>

      <!-- 右侧属性列表 -->
    </n-layout>
  </n-layout>
</template>

<script setup lang="ts">
import Editor from '@/designer/Editor/Index.vue'
import ToolBar from '@/designer/Pane/Toolbar'
import LeftSideBar from '@/designer/Pane/LeftSideBar'
import RightSideBar from '@/designer/Pane/RightSideBar'
import { componentList } from '@/designer/load' // 左侧列表数据
import { useBasicStoreWithOut } from '@/store/modules/basic'
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { getUIComponents } from '@/api/pages'
import { useRoute } from 'vue-router'
import { NLayout, NLayoutContent, NLayoutHeader, NLayoutSider, NScrollbar } from 'naive-ui'
import { BaseComponent } from '@/resource/models'

const basicStore = useBasicStoreWithOut()
const websk = ref<WebSocket | null>(null)
const collapsedLeft = ref(false)
const collapsedRight = ref(false)

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
    width: windowWidth.value + 'px',
    height: windowHeight.value + 'px'
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
    const component: BaseComponent = new componentList[componentName]()
    const editorRectInfo = document.querySelector('#editor')!.getBoundingClientRect()
    const y = e.pageY - editorRectInfo.top
    const x = e.pageX - editorRectInfo.left
    component.change('top', y)
    component.change('left', x)
    basicStore.appendComponent(component)
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

// const initWebsocket = (key: string, url: string): WebSocket => {
//   const ws = new WebSocket(url)

//   ws.onopen = () => {
//     console.log('websocket连接成功')
//   }

//   ws.onclose = () => {
//     console.log('websocket连接被关闭')
//   }

//   ws.onmessage = (ev) => {
//     const data = JSON.parse(ev.data)
//     eventBus.emit(key, data)
//   }

//   return ws
// }

onUnmounted(() => {
  websk.value?.close()
  basicStore.clearCanvas()
})
</script>

<style scoped lang="less">
.header {
  height: 5vh;
}

.main {
  height: 94vh;
}

.content {
  box-shadow: inset 0px 0px 3px black;
}
</style>
