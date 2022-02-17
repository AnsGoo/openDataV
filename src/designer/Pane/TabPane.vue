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
      <el-tab-pane label="样式" name="style">
        <StyleList v-if="curComponent" />
        <el-descriptions v-else class="placeholder">
          <el-descriptions-item>
            <el-empty description="请选择组件" />
          </el-descriptions-item>
        </el-descriptions>
      </el-tab-pane>
      <el-tab-pane label="属性" name="attr">
        <AttrList v-if="curComponent" />
        <el-descriptions v-else class="placeholder">
          <el-descriptions-item>
            <el-empty description="请选择组件" />
          </el-descriptions-item>
        </el-descriptions>
      </el-tab-pane>
      <el-tab-pane label="画布" name="canvas">
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
import { ElDescriptions, ElDescriptionsItem, ElEmpty, ElTabs, ElTabPane } from 'element-plus'

const basicStore = useBasicStoreWithOut()
const activeName = ref<string>('style')

const curComponent = computed(() => basicStore.curComponent || basicStore.layerComponent)
</script>

<style lang="less" scoped>
:deep(.el-tabs__content) {
  padding: 0px 5px;
}
</style>
