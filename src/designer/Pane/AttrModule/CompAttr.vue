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
        <el-input v-model="label" @change="labelChange($event)" />
      </el-form-item>
    </el-collapse-item>
  </el-collapse>
</template>

<script lang="ts" setup>
import { useBasicStoreWithOut } from '@/store/modules/basic'
import type { ComponentInfo } from '@/types/component'
import { ElCollapse, ElInput, ElFormItem, ElCollapseItem } from 'element-plus'
import { ref, watch } from 'vue'

const props = defineProps<{
  curComponent: ComponentInfo
}>()

const label = ref<string>('')
const basicStore = useBasicStoreWithOut()
const labelChange = (value) => {
  basicStore.setCurComponentProps('label', value)
}

watch(
  () => props.curComponent,
  () => {
    label.value = props.curComponent.label || ''
  },
  { immediate: true }
)
</script>
