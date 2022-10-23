<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { useRouter, RouterView } from 'vue-router'
import { ref } from 'vue'
import { useBasicStoreWithOut } from '@/store/modules/basic'
import ConfigProvider from '@/components/provider/ConfigProvider.vue'
import { NLoadingBarProvider, NGlobalStyle } from 'naive-ui'

const basicStore = useBasicStoreWithOut()

const overflow = ref<string>(
  (() => {
    if (!basicStore.isEditMode) {
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
