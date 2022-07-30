<template>
  <n-form-item key="realTimeData" label="实时数据">
    <n-input
      v-model:value="realTimeData"
      placeholder="实时数据"
      @update:value="realTimeDatachanged($event)"
    />
  </n-form-item>
</template>
<script lang="ts" setup>
import { NFormItem, NInput } from 'naive-ui'
import { ref } from 'vue'
const realTimeData = ref<any>(null)
const realTimeDatachanged = (value: string) => {
  console.log(value)
}
</script>
