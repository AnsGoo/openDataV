<template>
  <n-form-item key="staticData" label="静态数据">
    <n-select
      v-model:value="staticData"
      placeholder="请选择静态数据"
      @update:value="staticDatachanged($event)"
      :options="options"
    />
  </n-form-item>
</template>
<script lang="ts" setup>
import { NFormItem, NSelect } from 'naive-ui'
import { ref } from 'vue'
const options = ref<{ label: string; id: number }[]>([])
const staticData = ref<any>(null)
const staticDatachanged = (value: number) => {
  console.log(value)
}
</script>
