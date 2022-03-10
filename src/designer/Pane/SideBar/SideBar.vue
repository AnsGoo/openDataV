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
      <el-tab-pane name="component">
        <template #label>
          <el-icon style="vertical-align: middle">
            <icon-components theme="outline" size="24" />
          </el-icon>
          <span>组件</span>
        </template>
        <ComponentList />
      </el-tab-pane>
      <el-tab-pane name="layer">
        <template #label>
          <el-icon style="vertical-align: middle">
            <icon-layers theme="outline" size="24" />
          </el-icon>
          <span>图层</span>
        </template>
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
import { ElTabs, ElTabPane, ElIcon } from 'element-plus'

const activeName = ref<string>('component')
</script>

<style lang="less" scoped>
:deep(.el-tabs__header) {
  margin-bottom: 0;
}
</style>
