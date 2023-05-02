<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { RouterView, useRouter } from 'vue-router'
import { ref, provide, readonly, computed } from 'vue'
import useCanvasState from '@/designer/state/canvas'
import ConfigProvider from '@/components/provider/ConfigProvider.vue'
import { NGlobalStyle, NLoadingBarProvider } from 'naive-ui'
import { useProjectSettingStoreWithOut } from '@/store/modules/projectSetting'

const canvasState = useCanvasState()
const projectStore = useProjectSettingStoreWithOut()
provide('DarkTheme', readonly(computed(() => projectStore.darkTheme)))
const overflow = ref<string>(
  (() => {
    if (!canvasState.isEditMode) {
      return 'hidden'
    } else {
      return 'auto'
    }
  })()
)
const { currentRoute } = useRouter()
</script>

<template>
  <ConfigProvider>
    <n-loading-bar-provider>
      <RouterView :key="currentRoute.path" :style="{ overflow }" />
      <n-global-style />
    </n-loading-bar-provider>
  </ConfigProvider>
</template>

<style lang="less">
html,
body,
#app {
  height: 100vh;
  width: 100vw;
  // overflow: hidden;
}
</style>
