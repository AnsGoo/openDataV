<template>
  <div class="left o-scroll">
    <Toggle
      :direction="leftDreiction"
      :x="leftWidth"
      location="left"
      @click="collapsedLeft = !collapsedLeft"
    />
    <o-tabs
      v-if="collapsedLeft"
      v-model:value="activeKey"
      :style="{ width: leftWidth }"
      @update:value="
        (key) => {
          activeKey = key
        }
      "
    >
      <o-tab-pane name="components" display-directive="show:lazy">
        <template #label>
          <div class="flex-nowrap flex flex-row items-center">
            <x-icon name="components" class="inline-block" />
            <span class="inline-block">组件</span>
          </div>
        </template>
        <ComponentList class="components" />
      </o-tab-pane>
      <o-tab-pane name="layer" display-directive="show:lazy">
        <template #label>
          <div class="flex-nowrap flex flex-row items-center">
            <x-icon name="layers" class="inline-block" />
            <span class="inline-block">图层</span>
          </div>
        </template>
        <Layer class="layers" />
      </o-tab-pane>
    </o-tabs>
    <o-tabs v-else v-model:value="activeKey" @update:value="collapsedTabPane">
      <o-tab-pane v-if="activeKey === 'components'" name="components">
        <template #label>
          <x-icon name="components" @click="switchTab('layer')" />
        </template>
        <ComponentList :iscollapsed="collapsedLeft" class="h-full components" />
      </o-tab-pane>
      <o-tab-pane v-else-if="activeKey === 'layer'" name="layer">
        <template #label>
          <x-icon name="layers" @click="switchTab('components')" />
        </template>
        <Layer :iscollapsed="collapsedLeft" />
      </o-tab-pane>
    </o-tabs>
  </div>
</template>

<script lang="ts" setup>
import { Toggle } from '@open-data-v/designer'
import { OTabPane, OTabs } from '@open-data-v/ui'
import { computed, ref } from 'vue'

import ComponentList from './component-list/components.vue'
import Layer from './layer/layer.vue'

const activeKey = ref<string>('components')
const emits = defineEmits<{
  (e: 'update:iscollapsed', iscollapsed: boolean): void
}>()
const collapsedTabPane = (key: string) => {
  emits('update:iscollapsed', false)
  activeKey.value = key
}

const switchTab = (key: string) => {
  activeKey.value = key
}
const collapsedLeft = ref(true)
const leftWidth = computed<string>(() => (collapsedLeft.value ? '18rem' : '4rem'))
const leftDreiction = computed<'left' | 'right'>(() => (collapsedLeft.value ? 'left' : 'right'))
</script>
<style lang="less" scoped>
.components {
  height: calc(90vh - 28px);
}
.layers {
  height: calc(90vh - 28px);
}
.left {
  transition-property: width;
  transition-duration: 0.5s;
  width: v-bind(leftWidth);
}
</style>
