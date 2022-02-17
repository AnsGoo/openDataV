<template>
  <el-collapse>
    <el-collapse-item title="公共属性" name="commonAttr">
      <el-form-item label="类型">
        <el-input :model-value="curComponent.component" :readonly="true" />
      </el-form-item>
      <el-form-item label="ID">
        <el-input :model-value="curComponent.id" :readonly="true" />
      </el-form-item>
      <el-form-item label="名称">
        <!--eslint-disable-next-line vue/no-mutating-props !--->
        <el-input v-model="curComponent.label" />
      </el-form-item>
    </el-collapse-item>
  </el-collapse>
</template>

<script lang="ts" setup>
import type { ComponentInfo } from '@/types/component'
import { ElCollapse, ElInput, ElFormItem, ElCollapseItem } from 'element-plus'

defineProps<{
  curComponent: ComponentInfo
}>()
</script>
