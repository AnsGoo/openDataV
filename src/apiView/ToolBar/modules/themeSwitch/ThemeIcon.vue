<template>
  <x-icon :name="themeIcon" :size="24" />
</template>
<script lang="ts" setup>
import { useProjectSettingStoreWithOut } from '@/store/modules/projectSetting'
import { computed } from 'vue'
const projectStore = useProjectSettingStoreWithOut()
const themeIcon = computed<string>(() => (projectStore.darkTheme ? 'sun' : 'moon'))
</script>
