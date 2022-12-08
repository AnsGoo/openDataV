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
        @collapse="collapsedLeft = true"
        @expand="collapsedLeft = false"
      >
        <LeftSideBar
          v-model:iscollapsed="collapsedLeft"
          @update:iscollapsed="
            (value) => {
              collapsedLeft = value
            }
          "
        />
      </n-layout-sider>
      <n-layout has-sider sider-placement="right">
        <Canvas />
        <n-layout-sider
          class="right"
          width="240"
          :collapsed="collapsedRight"
          :native-scrollbar="false"
          bordered
          :collapsed-width="35"
          collapse-mode="width"
          show-trigger="arrow-circle"
          @collapse="collapsedRight = true"
          @expand="collapsedRight = false"
        >
          <RightSideBar
            v-model:iscollapsed="collapsedRight"
            @update:iscollapsed="
              (value) => {
                collapsedRight = value
              }
            "
          />
        </n-layout-sider>
      </n-layout>

      <!-- 右侧属性列表 -->
    </n-layout>
  </n-layout>
</template>

<script setup lang="ts">
import ToolBar from '@/designer/Pane/Toolbar'
import LeftSideBar from '@/designer/Pane/LeftSideBar'
import RightSideBar from '@/designer/Pane/RightSideBar'
import Canvas from './Canvas.vue'
import { useBasicStoreWithOut } from '@/store/modules/basic'
import { ref, onMounted, onUnmounted } from 'vue'
import { getPageApi } from '@/api/pages'
import { useRoute } from 'vue-router'
import { NLayout, NLayoutHeader, NLayoutSider } from 'naive-ui'
import { useUnloadAlert } from '@/hooks'

useUnloadAlert()

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
  const resp = await getPageApi(index)
  if (!resp.data) {
    return
  }
  basicStore.setLayoutData(resp.data)
}

onUnmounted(() => {
  basicStore.clearCanvas()
})
</script>

<style scoped lang="less">
.home > :deep(.n-layout-scroll-container:first-child) {
  @apply flex flex-col h-screen;

  .header {
    height: 5vh;
  }

  .main {
    flex: 1;
  }
}
</style>
