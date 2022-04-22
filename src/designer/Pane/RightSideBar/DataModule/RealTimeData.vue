<template>
  <el-form-item key="realTimeData" label="实时数据">
    <el-input v-model="realTimeData" placeholder="实时数据" @change="realTimeDatachanged($event)" />
  </el-form-item>
</template>
<script lang="ts" setup>
import { ElFormItem, ElInput } from 'element-plus'
import { ref } from 'vue'
const realTimeData = ref<any>(null)
const realTimeDatachanged = (value: string) => {
  console.log(value)
}
</script>
