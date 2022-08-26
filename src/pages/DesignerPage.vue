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
            <Editor />
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
import { useBasicStoreWithOut } from '@/store/modules/basic'
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { getUIComponents } from '@/api/pages'
import { useRoute } from 'vue-router'
import { NLayout, NLayoutContent, NLayoutHeader, NLayoutSider, NScrollbar } from 'naive-ui'

const basicStore = useBasicStoreWithOut()
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

onUnmounted(() => {
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
