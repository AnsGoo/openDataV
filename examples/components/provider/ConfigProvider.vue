<template>
  <n-config-provider
    :locale="zhCN"
    :theme="getDarkTheme"
    :theme-overrides="getThemeOverrides"
    :date-locale="dateZhCN"
    ><slot></slot
  ></n-config-provider>
</template>
<script setup lang="ts">
import { darkTheme, dateZhCN, lightTheme, NConfigProvider, zhCN } from 'naive-ui'
import { computed } from 'vue'

import { useProjectSettingStoreWithOut } from '@/store/modules/projectSetting'

const projectSettingsStore = useProjectSettingStoreWithOut()
const getThemeOverrides = computed(() => {
  const appTheme = projectSettingsStore.appTheme
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

const getDarkTheme = computed(() => (projectSettingsStore.darkTheme ? darkTheme : lightTheme))
</script>
