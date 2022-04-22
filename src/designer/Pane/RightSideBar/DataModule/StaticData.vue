<template>
  <el-form-item key="staticData" label="静态数据">
    <el-select
      v-model="staticData"
      placeholder="请选择静态数据"
      @change="staticDatachanged($event)"
    >
      <el-option
        v-for="item in selectOptions"
        :key="item.id"
        :label="item.label"
        :value="item.id"
      />
    </el-select>
  </el-form-item>
</template>
<script lang="ts" setup>
import { ElFormItem, ElSelect, ElOption } from 'element-plus'
import { ref } from 'vue'
const selectOptions = ref<{ label: string; id: number }[]>([])
const staticData = ref<any>(null)
const staticDatachanged = (value: number) => {
  console.log(value)
}
</script>
