<template>
  <n-tabs type="line" animated>
    <n-tab-pane name="components" tab="组件">
      <ComponentList :mode="mode" />
    </n-tab-pane>
    <n-tab-pane name="layer" tab="图层">
      <Layer :mode="mode" />
    </n-tab-pane>
  </n-tabs>
</template>

<script lang="ts" setup>
import ComponentList from './ComponentList.vue'
import Layer from './Layer.vue'
import { ref } from 'vue'
import { NTabs, NTabPane } from 'naive-ui'

const mode = ref<string>('expand')
withDefaults(
  defineProps<{
    iscollapsed: boolean
  }>(),
  { iscollapsed: false }
)
</script>
