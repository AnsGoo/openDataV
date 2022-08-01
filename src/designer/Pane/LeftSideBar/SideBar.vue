<template>
  <div class="side-bar">
    <dv-tabs :mode="mode">
      <dv-tab-pane name="component">
        <template #label>
          <div class="label" v-show="expandStatus">
            <icon-park name="components" />
            <div>组件</div>
          </div>
        </template>
        <ComponentList :mode="mode" />
      </dv-tab-pane>
      <dv-tab-pane name="layer">
        <template #label>
          <div class="label" v-show="expandStatus">
            <icon-park name="layers" />
            <div>图层</div>
          </div>
        </template>
        <Layer :mode="mode" />
      </dv-tab-pane>
      <template #suffix>
        <icon-park v-if="expandStatus" name="indent-left" @click="expandSideBar" />
        <icon-park v-else name="indent-right" @click="expandSideBar" />
      </template>
    </dv-tabs>
  </div>
</template>

<script lang="ts" setup>
import ComponentList from './ComponentList.vue'
import Layer from './Layer.vue'
import { ref } from 'vue'
import { DvTabs, DvTabPane } from '../../modules/tabs'

const mode = ref<string>('expand')
const expandStatus = ref<boolean>(true)
const sideBarWdith = ref<string>('200px')
const expandSideBar = () => {
  expandStatus.value = !expandStatus.value
  if (expandStatus.value) {
    sideBarWdith.value = '200px'
    mode.value = 'expand'
  } else {
    sideBarWdith.value = '60px'
    mode.value = 'shrink'
  }
}
</script>

<style lang="less" scoped>
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
}
</style>
