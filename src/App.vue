<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { useRouter, RouterView } from 'vue-router'
import { ref, computed } from 'vue'
import { useBasicStoreWithOut } from '@/store/modules/basic'
import { useDesignSettingWithOut } from '@/store/modules/designSetting'
import {
  NConfigProvider,
  NDialogProvider,
  NNotificationProvider,
  NMessageProvider,
  NLoadingBarProvider,
  zhCN,
  dateZhCN,
  darkTheme,
  lightTheme
} from 'naive-ui'

const basicStore = useBasicStoreWithOut()
const designStore = useDesignSettingWithOut()

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

const getThemeOverrides = computed(() => {
  const appTheme = designStore.appTheme
  const lightenStr = appTheme //lighten(designStore.appTheme, 6)
  return {
    common: {
      primaryColor: appTheme,
      primaryColorHover: lightenStr,
      primaryColorPressed: lightenStr
    },
    LoadingBar: {
      colorLoading: appTheme
    }
  }
})

const getDarkTheme = computed(() => (designStore.darkTheme ? darkTheme : lightTheme))
</script>

<template>
  <n-config-provider
    :locale="zhCN"
    :theme="getDarkTheme"
    :theme-overrides="getThemeOverrides"
    :date-locale="dateZhCN"
  >
    <n-loading-bar-provider>
            <RouterView :key="currentRoute.path" :style="{ overflow }" />
    </n-loading-bar-provider>
  </n-config-provider>
</template>

<style lang="less"></style>
