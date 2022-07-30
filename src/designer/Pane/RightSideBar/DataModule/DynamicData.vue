<template>
  <n-form-item key="dynamicData" label="动态数据">
    <n-select
      v-model:value="formData.data"
      placeholder="请选择数据接口"
      @update:value="dynamicDatachanged($event)"
      :options="selectOptions"
    />
  </n-form-item>
  <n-form-item key="timeout" label="超时时间">
    <n-input-number
      v-model:value="formData.timeout"
      placeholder="超时时间"
      @update:value="dynamicDatachanged($event)"
    />
  </n-form-item>
  <n-form-item key="isInterval" label="是否定时获取时间">
    <n-switch v-model="formData.isInterval" />
  </n-form-item>

  <n-form-item key="intervalTime" label="间隔时间" v-if="formData.isInterval">
    <n-input-number v-model:value="formData.intervalTime" placeholder="间隔时间" />
  </n-form-item>
  <n-form-item :label="`参数:${item}`" v-for="item in paramList" :key="item">
    <n-input v-model:value="formData.params[item]" />
  </n-form-item>
  <n-form-item key="addParams" label="请求参数">
    <n-input placeholder="参数" v-model:value="activeParam">
      <template #suffix>
        <icon-add-three theme="outline" size="18" fill="var(--n-color-primary)" @click="addParams"
      /></template>
    </n-input>
  </n-form-item>
</template>
<script lang="ts" setup>
import { warnMessage } from '@/utils/message'
import { NFormItem, NSelect, NInput, NInputNumber, NSwitch } from 'naive-ui'
import type { SelectOption } from 'naive-ui'
import { reactive, ref } from 'vue'
const selectOptions = ref<SelectOption[]>([])
const paramList = ref<string[]>([])
const formData = reactive({
  data: undefined,
  timeout: 1000,
  isInterval: false,
  intervalTime: 1000,
  params: {}
})
const activeParam = ref<string>()
const dynamicDatachanged = (value: number) => {
  console.log(value)
}

const addParams = () => {
  if (activeParam.value) {
    if (!paramList.value.includes(activeParam.value)) {
      paramList.value.push(activeParam.value)
    } else {
      warnMessage('参数重复')
    }
  } else {
    warnMessage('请填写参数')
  }
}
</script>
<style lang="less" scoped>
:deep(.n-input-group__append) {
  padding: 0 2px;
}
</style>
