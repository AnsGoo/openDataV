<template>
  <icon-park :name="themeIcon" />
</template>
<script lang="ts" setup>
import { useProjectSettingStoreWithOut } from '@/store/modules/projectSetting'
import { computed } from 'vue'
const projectStore = useProjectSettingStoreWithOut()
const themeIcon = computed<string>(() => (projectStore.darkTheme ? 'sun-one' : 'moon'))
</script>
