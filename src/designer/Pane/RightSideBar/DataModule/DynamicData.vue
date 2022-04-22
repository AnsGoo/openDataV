<template>
  <el-form-item key="dynamicData" label="动态数据">
    <el-select
      v-model="formData.data"
      placeholder="请选择数据接口"
      @change="dynamicDatachanged($event)"
    >
      <el-option
        v-for="item in selectOptions"
        :key="item.id"
        :label="item.label"
        :value="item.id"
      />
    </el-select>
  </el-form-item>
  <el-form-item key="timeout" label="超时时间">
    <el-input-number
      v-model="formData.timeout"
      placeholder="超时时间"
      @change="dynamicDatachanged($event)"
    />
  </el-form-item>
  <el-form-item key="isInterval" label="是否定时获取时间">
    <el-switch v-model="formData.isInterval" />
  </el-form-item>

  <el-form-item key="intervalTime" label="间隔时间" v-if="formData.isInterval">
    <el-input-number v-model="formData.intervalTime" placeholder="间隔时间" />
  </el-form-item>
  <el-form-item :label="`参数:${item}`" v-for="(item, _) in paramList" :key="item">
    <el-input v-model="formData.params[item]" />
  </el-form-item>
  <el-form-item key="addParams" label="请求参数">
    <el-input placeholder="参数" v-model="activeParam">
      <template #append>
        <icon-add-three theme="outline" size="18" fill="var(--el-color-primary)" @click="addParams"
      /></template>
    </el-input>
  </el-form-item>
</template>
<script lang="ts" setup>
import { warnMessage } from '@/utils/message'
import { ElFormItem, ElSelect, ElOption, ElInputNumber, ElSwitch, ElInput } from 'element-plus'
import { reactive, ref } from 'vue'
const selectOptions = ref<{ label: string; id: number }[]>([])
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
:deep(.el-input-group__append) {
  padding: 0 2px;
}
</style>
