<template>
  <div class="side-bar">
    <dv-tabs :mode="mode" v-if="curComponent">
      <template #prefix>
        <!-- <el-icon style="vertical-align: middle"> -->
        <icon-indent-right
          v-if="expandStatus"
          theme="outline"
          size="18"
          fill="var(--el-color-primary)"
          @click="expandSideBar"
        />
        <icon-indent-left
          v-else
          theme="outline"
          size="18"
          fill="var(--el-color-primary)"
          @click="expandSideBar"
        />

        <!-- </el-icon> -->
      </template>
      <dv-tab-pane name="style">
        <template #label>
          <el-icon style="vertical-align: middle">
            <icon-text-style theme="outline" size="24" />
          </el-icon>
          <span>样式</span>
        </template>
        <div v-show="mode === 'expand'">
          <StyleList :curComponent="curComponent" />
        </div>
      </dv-tab-pane>
      <dv-tab-pane name="attr">
        <template #label>
          <el-icon style="vertical-align: middle">
            <icon-internal-data theme="outline" size="24" />
          </el-icon>
          <span>属性</span>
        </template>
        <div v-show="mode === 'expand'">
          <AttrList :curComponent="curComponent" />
        </div>
      </dv-tab-pane>
      <dv-tab-pane name="data">
        <template #label>
          <el-icon style="vertical-align: middle">
            <icon-data theme="outline" size="24" />
          </el-icon>
          <span>数据</span>
        </template>
        <div v-show="mode === 'expand'">
          <DataAttr />
        </div>
      </dv-tab-pane>
    </dv-tabs>
    <dv-tabs :mode="mode" v-else>
      <template #prefix>
        <!-- <el-icon style="vertical-align: middle"> -->
        <icon-indent-right
          v-if="expandStatus"
          theme="outline"
          size="18"
          fill="var(--el-color-primary)"
          @click="expandSideBar"
        />
        <icon-indent-left
          v-else
          theme="outline"
          size="18"
          fill="var(--el-color-primary)"
          @click="expandSideBar"
        />
      </template>
      <dv-tab-pane name="canvas">
        <template #label>
          <el-icon style="vertical-align: middle">
            <icon-page theme="outline" size="24" />
          </el-icon>
          <span>画布</span>
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
import { ElIcon } from 'element-plus'
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
</style>
