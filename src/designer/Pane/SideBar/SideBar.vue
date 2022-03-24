<template>
  <div class="side-bar">
    <dv-tabs :mode="mode">
      <dv-tab-pane name="component">
        <template #label>
          <div class="label" v-show="expandStatus">
            <div>
              <icon-components theme="outline" size="18" fill="var(--el-color-primary)" />
            </div>
            <div>组件</div>
          </div>
        </template>
        <ComponentList :mode="mode" />
      </dv-tab-pane>
      <dv-tab-pane name="layer">
        <template #label>
          <div class="label" v-show="expandStatus">
            <div>
              <icon-layers theme="outline" size="18" fill="var(--el-color-primary)" />
            </div>
            <div>图层</div>
          </div>
        </template>
        <Layer />
      </dv-tab-pane>
      <template #suffix>
        <!-- <el-icon style="vertical-align: middle"> -->
        <icon-indent-left
          v-if="expandStatus"
          theme="outline"
          size="18"
          fill="var(--el-color-primary)"
          @click="expandSideBar"
        />
        <icon-indent-right
          v-else
          theme="outline"
          size="18"
          fill="var(--el-color-primary)"
          @click="expandSideBar"
        />
        <!-- </el-icon> -->
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
:deep(.el-tabs__header) {
  margin-bottom: 0;
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
