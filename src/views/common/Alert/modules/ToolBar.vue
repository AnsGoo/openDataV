<template>
  <el-form :inline="true" :model="formOptions" class="toolbar">
    <el-form-item label="报警日期" v-if="alertType === 'history'">
      <el-date-picker
        v-model="formOptions.searchTime"
        :readonly="false"
        type="daterange"
        range-separator="到"
        value-format="YYYY-MM-DD"
        start-placeholder="开始时间"
        end-placeholder="结束时间"
        :disabled-date="disabledDate"
        style="width: 250px"
      />
    </el-form-item>
    <el-form-item label="报警点" style="width: 200px">
      <el-input v-model="formOptions.tagName" placeholder="tag名称模糊搜索" />
    </el-form-item>
    <el-form-item label="报警类型" style="width: 175px">
      <el-select v-model="formOptions.alarmType" clearable placeholder="报警类型">
        <el-option label="超限报警" value="1" />
        <el-option label="状态报警" value="2" />
      </el-select>
    </el-form-item>
    <el-form-item label="报警级别" style="width: 175px">
      <el-select v-model="formOptions.alarmLevel" clearable placeholder="报警级别">
        <el-option label="一般" value="0" />
        <el-option label="紧急" value="1" />
        <el-option label="严重" value="2" />
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="handleSearch">搜索</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import moment from 'moment'
import {
  ElDatePicker,
  ElInput,
  ElButton,
  ElSelect,
  ElOption,
  ElForm,
  ElFormItem
} from 'element-plus'
import { SearchType, AlertType } from '../types'

defineProps<{
  alertType: AlertType
}>()

const emits = defineEmits<{
  (e: 'search', options: SearchType): void
}>()

const formOptions = reactive<SearchType>({
  searchTime: [new Date(), new Date()],
  tagName: '',
  alarmType: '',
  alarmLevel: ''
})

const disabledDate = (time: Date) => {
  const oneMonthAgo = moment().subtract(1, 'months').valueOf()
  return time.getTime() > Date.now() || oneMonthAgo > time.getTime()
}

const handleSearch = () => {
  const startTime = moment(formOptions.searchTime[0]).format('YYYY-MM-DD')
  const endTime = moment(formOptions.searchTime[1]).format('YYYY-MM-DD')
  const searchTime = `${startTime}|${endTime}`
  formOptions.searchTime = searchTime
  emits('search', formOptions)
}
</script>

<style lang="less" scoped>
.toolbar {
  margin-bottom: -8px;
}

:deep(.el-range-separator) {
  margin-right: 10px;
}
</style>
