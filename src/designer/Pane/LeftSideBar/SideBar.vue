<template>
  <n-tabs
    type="line"
    animated
    v-if="!iscollapsed"
    :bar-width="100"
    justify-content="center"
    v-model:value="activeKey"
    @update:value="(key) => (activeKey = key)"
  >
    <n-tab-pane name="components" display-directive="show:lazy">
      <template #tab>
        <IconPark name="components" />
        <span>组件</span>
      </template>
      <ComponentList />
    </n-tab-pane>
    <n-tab-pane name="layer" display-directive="show:lazy">
      <template #tab>
        <IconPark name="layers" />
        <span>图层</span>
      </template>
      <Layer />
    </n-tab-pane>
  </n-tabs>
  <n-tabs
    type="line"
    animated
    v-else
    :bar-width="48"
    justify-content="center"
    @update:value="collapsedTabPane"
    v-model:value="activeKey"
  >
    <n-tab-pane name="components" v-if="activeKey === 'components'" display-directive="show:lazy">
      <template #tab>
        <IconPark name="components" @click="switchTab('layer')" />
      </template>
      <ComponentList />
    </n-tab-pane>
    <n-tab-pane name="layer" v-else-if="activeKey === 'layer'" display-directive="show:lazy">
      <template #tab>
        <IconPark name="layers" @click="switchTab('components')" />
      </template>
      <Layer />
    </n-tab-pane>
  </n-tabs>
</template>

<script lang="ts" setup>
import ComponentList from './Component/ComponentList.vue'
import Layer from './Layer/Layer.vue'
import { ref } from 'vue'
import { NTabs, NTabPane } from 'naive-ui'

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
