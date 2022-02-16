<template>
  <div>
    <Collapse
      parentSelector=".left"
      :expendWidth="200"
      :shrinkWidth="50"
      expendIcon="icon-jiantoushangzuo-copy"
      shrinkIcon="icon-jiantouyou"
      position="right"
    />
    <el-tabs v-model="activeName" :stretch="true" :lazy="true">
      <el-tab-pane label="组件" name="component">
        <ComponentList />
      </el-tab-pane>
      <el-tab-pane label="图层" name="layer">
        <Layer />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts" setup>
import ComponentList from './ComponentList.vue'
import Collapse from '../Collapse.vue'
import Layer from './Layer.vue'
import { ref } from 'vue'
import { ElTabs, ElTabPane } from 'element-plus'

const activeName = ref<string>('component')
</script>

<style lang="less" scoped>
:deep(.el-tabs__header) {
  margin-bottom: 0;
}
</style>
