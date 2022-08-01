<template>
  <div class="side-bar">
    <dv-tabs :mode="mode" v-if="curComponent">
      <template #prefix>
        <icon-park v-if="expandStatus" name="indent-right" @click="expandSideBar" />
        <icon-park v-else name="indent-left" @click="expandSideBar" />
      </template>
      <dv-tab-pane name="style">
        <template #label>
          <div class="label">
            <icon-park name="text-style" />
            <span>样式</span>
          </div>
        </template>
        <div v-show="mode === 'expand'">
          <StyleList :curComponent="curComponent" />
        </div>
      </dv-tab-pane>
      <dv-tab-pane name="attr">
        <template #label>
          <div class="label">
            <icon-park name="internal-data" />
            <span>属性</span>
          </div>
        </template>
        <div v-show="mode === 'expand'">
          <AttrList :curComponent="curComponent" />
        </div>
      </dv-tab-pane>
      <dv-tab-pane name="data">
        <template #label>
          <div class="label">
            <icon-park name="data" />
            <span>数据</span>
          </div>
        </template>
        <div v-show="mode === 'expand'">
          <DataAttr />
        </div>
      </dv-tab-pane>
    </dv-tabs>
    <dv-tabs :mode="mode" v-else>
      <template #prefix>
        <icon-park v-if="expandStatus" name="indent-right" @click="expandSideBar" />
        <icon-park v-else name="indent-left" @click="expandSideBar" />
      </template>
      <dv-tab-pane name="canvas">
        <template #label>
          <div class="label">
            <icon-park name="page" />
            <span>画布</span>
          </div>
        </template>
        <Canvas v-show="mode === 'expand'" />
      </dv-tab-pane>
    </dv-tabs>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useBasicStoreWithOut } from '@/store/modules/basic'
import Canvas from './Canvas.vue'
import StyleList from './StyleModule' // 右侧属性列表
import AttrList from './AttrModule'
import { DvTabs, DvTabPane } from '@/designer/modules/tabs'
import DataAttr from './DataModule'

const basicStore = useBasicStoreWithOut()
const mode = ref<string>('expand')
const expandStatus = ref<boolean>(true)
const sideBarWdith = ref<string>('240px')
const expandSideBar = () => {
  expandStatus.value = !expandStatus.value
  if (expandStatus.value) {
    sideBarWdith.value = '240px'
    mode.value = 'expand'
  } else {
    sideBarWdith.value = '20px'
    mode.value = 'shrink'
  }
}

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
