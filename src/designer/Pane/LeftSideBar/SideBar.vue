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
    <n-tab-pane name="components">
      <template #tab>
        <IconPark name="components" />
        <span>组件</span>
      </template>
      <ComponentList :mode="mode" />
    </n-tab-pane>
    <n-tab-pane name="layer">
      <template #tab>
        <IconPark name="layers" />
        <span>图层</span>
      </template>
      <Layer :mode="mode" />
    </n-tab-pane>
  </n-tabs>
  <n-tabs
    type="line"
    animated
    v-else
    :bar-width="48"
    justify-content="center"
    @update:value="collapsedTabPane"
  >
    <n-tab-pane name="components" v-if="activeKey === 'components'">
      <template #tab>
        <IconPark name="components" />
      </template>
      <ComponentList />
    </n-tab-pane>
    <n-tab-pane name="layer" v-else-if="activeKey === 'layer'">
      <template #tab>
        <IconPark name="layers" />
      </template>
      <Layer />
    </n-tab-pane>
  </n-tabs>
</template>

<script lang="ts" setup>
import ComponentList from './ComponentList.vue'
import Layer from './Layer.vue'
import { ref } from 'vue'
import { NTabs, NTabPane } from 'naive-ui'

const mode = ref<string>('expand')
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
</script>
