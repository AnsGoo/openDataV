<template>
  <ToolBar v-if="toolbars.length > 0" :bars="toolbars" class="w-full h-14 align-middle" />
</template>

<script setup lang="ts">
import type { ToolBarItemType } from '../../components'
import { ToolBar } from '../../components'

withDefaults(
  defineProps<{
    toolbars?: Array<ToolBarItemType>
  }>(),
  {
    toolbars: () => []
  }
)
</script>

<style lang="less" scoped>
.tool-bar-title {
  font-size: 20px;
  font-weight: 400;
}
</style>
