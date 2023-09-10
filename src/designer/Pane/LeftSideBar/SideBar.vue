<template>
  <o-tabs
    v-if="iscollapsed"
    v-model:value="activeKey"
    type="line"
    animated
    :bar-width="100"
    justify-content="center"
    @update:value="
      (key) => {
        activeKey = key
      }
    "
  >
    <o-tab-pane name="components" display-directive="show:lazy">
      <template #tab>
        <x-icon name="components" />
        <span>组件</span>
      </template>
      <ComponentList />
    </o-tab-pane>
    <o-tab-pane name="layer" display-directive="show:lazy">
      <template #tab>
        <x-icon name="layers" />
        <span>图层</span>
      </template>
      <Layer />
    </o-tab-pane>
  </o-tabs>
  <o-tabs
    v-else
    v-model:value="activeKey"
    type="line"
    animated
    :bar-width="48"
    justify-content="center"
    @update:value="collapsedTabPane"
  >
    <o-tab-pane v-if="activeKey === 'components'" name="components" display-directive="show:lazy">
      <template #tab>
        <x-icon name="components" @click="switchTab('layer')" />
      </template>
      <ComponentList :iscollapsed="iscollapsed" />
    </o-tab-pane>
    <o-tab-pane v-else-if="activeKey === 'layer'" name="layer" display-directive="show:lazy">
      <template #tab>
        <x-icon name="layers" @click="switchTab('components')" />
      </template>
      <Layer />
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
