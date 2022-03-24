<template>
  <div class="side-bar">
    <dv-tabs :mode="mode">
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
        <StyleList v-if="curComponent" :curComponent="curComponent" />
        <el-descriptions v-else class="placeholder">
          <el-descriptions-item>
            <el-empty description="请选择组件" />
          </el-descriptions-item>
        </el-descriptions>
      </dv-tab-pane>
      <dv-tab-pane name="attr">
        <template #label>
          <el-icon style="vertical-align: middle">
            <icon-internal-data theme="outline" size="24" />
          </el-icon>
          <span>属性</span>
        </template>
        <AttrList v-if="curComponent" :curComponent="curComponent" />
        <el-descriptions v-else class="placeholder">
          <el-descriptions-item>
            <el-empty description="请选择组件" />
          </el-descriptions-item>
        </el-descriptions>
      </dv-tab-pane>
      <dv-tab-pane name="canvas">
        <template #label>
          <el-icon style="vertical-align: middle">
            <icon-page theme="outline" size="24" />
          </el-icon>
          <span>画布</span>
        </template>
        <Canvas />
      </dv-tab-pane>
    </dv-tabs>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useBasicStoreWithOut } from '@/store/modules/basic'
import Canvas from '@/designer/Pane/Canvas.vue'
import StyleList from '@/designer/Pane/StyleList.vue' // 右侧属性列表
import AttrList from '@/designer/Pane/AttrModule/AttrList.vue'
import { DvTabs, DvTabPane } from '../modules/tabs'
import { ElDescriptions, ElDescriptionsItem, ElEmpty, ElIcon } from 'element-plus'

const basicStore = useBasicStoreWithOut()
const mode = ref<string>('expand')
const expandStatus = ref<boolean>(true)
const sideBarWdith = ref<string>('200px')
const expandSideBar = () => {
  expandStatus.value = !expandStatus.value
  if (expandStatus.value) {
    sideBarWdith.value = '260px'
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
