<template>
  <n-tabs type="line" animated v-if="curComponent">
    <n-tab-pane name="style" tab="样式">
      <StyleList :curComponent="curComponent" v-show="!iscollapsed" />
    </n-tab-pane>
    <n-tab-pane name="attr" tab="属性">
      <AttrList :curComponent="curComponent" v-show="!iscollapsed" />
    </n-tab-pane>
    <n-tab-pane name="data" tab="数据">
      <DataAttr v-show="!iscollapsed" />
    </n-tab-pane>
  </n-tabs>
  <n-tabs type="line" animated v-else>
    <n-tab-pane name="canvas" tab="画布">
      <Canvas v-show="!iscollapsed" />
    </n-tab-pane>
  </n-tabs>
</template>

<script setup lang="ts">
import { NTabs, NTabPane } from 'naive-ui'
import { ref, computed } from 'vue'
import { useBasicStoreWithOut } from '@/store/modules/basic'
import Canvas from './Canvas.vue'
import StyleList from './StyleModule' // 右侧属性列表
import AttrList from './AttrModule'
import DataAttr from './DataModule'

const basicStore = useBasicStoreWithOut()
const sideBarWdith = ref<string>('240px')
withDefaults(
  defineProps<{
    iscollapsed: boolean
  }>(),
  { iscollapsed: false }
)

const curComponent = computed(() => basicStore.curComponent || basicStore.layerComponent)
</script>

<style lang="less" scoped>
:deep(.dv-tab__content) {
  padding: 0px 5px;
}
.side-bar {
  position: relative;
  width: v-bind(sideBarWdith);

  // transition: all 0.3s;
}
.label {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  align-content: center;
}
</style>
