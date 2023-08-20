<template>
  <div class="tool-bar">
    <div class="tool-bar-item">
      <ToolBarItem
        v-for="(item, index) in leftToolBars"
        :key="index"
        :action="item.action"
        :label="item.label"
        :divider="item.divider"
        :icon="item.icon"
      />
    </div>
    <div class="tool-bar-middle"><slot></slot></div>
    <div class="tool-bar-item">
      <ToolBarItem
        v-for="(item, index) in rightToolBars"
        :key="index"
        :action="item.action"
        :label="item.label"
        :divider="item.divider"
        :icon="item.icon"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import ToolBarItem from './ToolBarItem.vue'
import type { ToolBarItemType } from './type'

const props = withDefaults(
  defineProps<{
    bars?: ToolBarItemType[]
  }>(),
  {
    bars: () => []
  }
)

const leftToolBars = computed<ToolBarItemType[]>(() =>
  props.bars.filter((el) => el.location === 'left' || el.location === undefined)
)

const rightToolBars = computed<ToolBarItemType[]>(() =>
  props.bars.filter((el) => el.location === 'right')
)
</script>

<style scoped lang="less">
.tool-bar {
  display: flex;
  align-items: center;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  height: inherit;
  border-bottom: 1px var(--n-text-color) solid;
}
.tool-bar-item {
  height: inherit;
  display: flex;
  align-items: center;
}

button {
  border: none;
  margin: auto 3px;
}
</style>
