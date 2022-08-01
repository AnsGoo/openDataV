<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { useRouter, RouterView } from 'vue-router'
import { ref, computed } from 'vue'
import { useBasicStoreWithOut } from '@/store/modules/basic'
import UserAffix from '@/annex/UserAffix.vue'
import { useUserStoreWithOut } from '@/store/modules/user'
import { zhCN, dateZhCN, NConfigProvider, darkTheme, lightTheme } from 'naive-ui'
const userStore = useUserStoreWithOut()

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
const isAuth = computed<boolean>(() => {
  const isNeedAuth: boolean = currentRoute.value.meta.ignoreAuth ? false : true
  const isLogin: boolean = userStore.userToken ? true : false
  return isNeedAuth && isLogin
})
</script>

<template>
  <n-config-provider :locale="zhCN" :date-locale="dateZhCN" :theme="false ? darkTheme : lightTheme">
    <div>
      <UserAffix v-if="isAuth" />
      <RouterView :key="currentRoute.path" :style="{ overflow }" />
    </div>
  </n-config-provider>
</template>
<style lang="less">
:root {
  --el-border-color-lighter: #1e8fff6c !important;
  --el-collapse-header-text-color: #1e90ff;
  --el-color-primary: #1e90ff;
  // --theme-dark-color-primary: #24292f;
  // --el-color-white: #24292f !important;
  // --el-background-color-base: #24292f !important;
  // --el-text-color-primary: #ffffff !important;
  // --el-text-color-regular: #ffffff !important;
}
</style>
