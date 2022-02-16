<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { useTitle } from '@vueuse/core'
import { useRouter } from 'vue-router'
import { watch, unref, ref, computed } from 'vue'
import { useBasicStoreWithOut } from '@/store/modules/basic'
import UserAffix from './components/common/UserAffix.vue'
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
