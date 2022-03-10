<template>
  <div>
    <Collapse
      parentSelector=".right"
      :expendWidth="260"
      :shrinkWidth="12"
      expendIcon="icon-jiantouyou"
      shrinkIcon="icon-jiantoushangzuo-copy"
      position="left"
    />
    <el-tabs v-model="activeName" :stretch="true" :lazy="true">
      <el-tab-pane name="style">
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
      </el-tab-pane>
      <el-tab-pane name="attr">
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
      </el-tab-pane>
      <el-tab-pane name="canvas">
        <template #label>
          <el-icon style="vertical-align: middle">
            <icon-page theme="outline" size="24" />
          </el-icon>
          <span>画布</span>
        </template>
        <Canvas />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useBasicStoreWithOut } from '@/store/modules/basic'
import Canvas from '@/designer/Pane/Canvas.vue'
import StyleList from '@/designer/Pane/StyleList.vue' // 右侧属性列表
import AttrList from '@/designer/Pane/AttrModule/AttrList.vue'
import Collapse from '@/designer/Pane/Collapse.vue'
import {
  ElDescriptions,
  ElDescriptionsItem,
  ElEmpty,
  ElTabs,
  ElTabPane,
  ElIcon
} from 'element-plus'

const basicStore = useBasicStoreWithOut()
const activeName = ref<string>('style')

const curComponent = computed(() => basicStore.curComponent || basicStore.layerComponent)
</script>

<style lang="less" scoped>
:deep(.el-tabs__content) {
  padding: 0px 5px;
}
</style>
