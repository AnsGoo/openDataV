<template>
  <o-tabs
    v-if="iscollapsed"
    v-model:value="activeKey"
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
      <ComponentList :iscollapsed="iscollapsed" class="h-full components" />
    </o-tab-pane>
    <o-tab-pane v-else-if="activeKey === 'layer'" name="layer">
      <template #label>
        <x-icon name="layers" @click="switchTab('components')" />
      </template>
      <Layer :iscollapsed="iscollapsed" />
    </o-tab-pane>
  </o-tabs>
</template>

<script lang="ts" setup>
import { OTabPane, OTabs } from 'open-data-v/ui'
import { ref } from 'vue'

import ComponentList from './Component/ComponentList.vue'
import Layer from './Layer/Layer.vue'

const activeKey = ref<string>('components')
const emits = defineEmits<{
  (e: 'update:iscollapsed', iscollapsed: boolean): void
}>()
withDefaults(
  defineProps<{
    iscollapsed: boolean
  }>(),
  { iscollapsed: false }
)
const collapsedTabPane = (key: string) => {
  emits('update:iscollapsed', false)
  activeKey.value = key
}

const switchTab = (key: string) => {
  activeKey.value = key
}
</script>
<style scoped lang="less">
.components {
  height: calc(90vh - 28px);
}
.layers {
  height: calc(90vh - 28px);
}
</style>
