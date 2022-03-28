<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { useTitle } from '@vueuse/core'
import { useRouter } from 'vue-router'
import { watch, unref, ref, computed } from 'vue'
import { useBasicStoreWithOut } from '@/store/modules/basic'
import UserAffix from '@/annex/UserAffix.vue'
import { useUserStoreWithOut } from '@/store/modules/user'
const userStore = useUserStoreWithOut()

const basicStore = useBasicStoreWithOut()

const title = useTitle()

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
title.value = import.meta.env.VITE_APP_TITLE
const isAuth = computed<boolean>(() => {
  const isNeedAuth: boolean = currentRoute.value.meta.ignoreAuth ? false : true
  const isLogin: boolean = userStore.userToken ? true : false
  return isNeedAuth && isLogin
})
watch(
  () => currentRoute.value.path,
  () => {
    const route = unref(currentRoute)
    if (route.name === 'Redirect') {
      return
    }

    const sTitle = route?.meta?.title as string
    title.value = sTitle
  }
)
</script>

<template>
  <div>
    <UserAffix v-if="isAuth" />
    <RouterView :key="currentRoute.path" :style="{ overflow }" />
  </div>
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
.el-form-item {
  margin-bottom: 3px !important;
}

.el-collapse {
  // border-top: none !important;
  border-bottom: none !important;
  --el-collapse-header-height: 30px !important;
  --el-collapse-header-font-color: var(
    --el-collapse-header-text-color
  ) !important;
}

.el-input-number--mini {
  width: 100% !important;
}

.el-collapse-item__content {
  padding-bottom: 5px !important;
}

.el-descriptions__body {
  background-color: var(--theme-dark-color-primary) !important;
}

.el-input-number__decrease,
.el-input-number__increase {
  background-color: var(--theme-dark-color-primary) !important;
}
.el-scrollbar {
  --el-scrollbar-background-color: var(--theme-dark-color-primary) !important;
}

.el-sub-menu {
  background-color: var(--theme-dark-color-primary) !important;
}

.el-select-dropdown {
  min-width: 20px;
}
</style>
