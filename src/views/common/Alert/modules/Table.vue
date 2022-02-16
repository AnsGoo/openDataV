<template>
  <div class="table">
    <el-table
      :data="data"
      :border="true"
      :header-cell-style="{ textAlign: 'center' }"
      :cell-style="{ textAlign: 'center' }"
      height="84vh"
    >
      <el-table-column type="index" label="序号" width="60" />
      <el-table-column prop="AlarmDescription" label="报警信息" width="280" />
      <el-table-column prop="TagLabel" label="报警点" width="200" />
      <el-table-column prop="TagValue" label="报警值" width="100" />
      <el-table-column prop="AlarmValue" label="临界点" width="100" />
      <el-table-column prop="AlarmType" label="类型" width="100">
        <template #default="scope">
          <span>{{ typeFormater(scope.row.AlarmType) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="AlarmDetailsType" label="详细类型" width="100" />
      <el-table-column prop="Level" label="级别" width="80">
        <template #default="scope">
          <span>{{ levelFormater(scope.row.Level) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="StartTime" label="开始时间" width="180" />
      <el-table-column v-if="alertType === 'history'" prop="EndTime" label="结束时间" width="180" />
    </el-table>
    <span class="iconfont icon-jiantoushangzuo-copy pre" @click="handlePreClick"></span>
    <span class="iconfont icon-jiantouyou next" @click="handleNextClick"></span>
  </div>
</template>

<script lang="ts" setup>
import { ElTable, ElTableColumn } from 'element-plus'
import { AlarmType, AlarmLevel } from '@/enum'
import type { WSAlertDataType } from '@/types/wsTypes'
import { reactive, ref, watch } from 'vue'
import { PageType, AlertType } from '../types'

const props = defineProps<{
  data: WSAlertDataType[]
  alertType: AlertType
  page: number
  pageSize: number
}>()

const emits = defineEmits<{
  (e: 'update:page', page: number): void
  (e: 'refresh'): void
}>()

const preColor = ref<string>('#ccc')
const pagiation = reactive<PageType>({
  page: 1,
  pageSize: 14
})

const typeFormater = (type: number): string => {
  switch (type) {
    case AlarmType.ALARM_OVER:
      return '超限报警'
    case AlarmType.ALARM_STATE:
      return '状态报警'
    default:
      return '未知'
  }
}

const levelFormater = (level: number): string => {
  switch (level) {
    case AlarmLevel.NotUrgent:
      return '一般'
    case AlarmLevel.Urgent:
      return '紧急'
    case AlarmLevel.VeryUrgent:
      return '严重'
    default:
      return '未知'
  }
}

const handlePreClick = () => {
  pagiation.page--
  if (pagiation.page < 1) {
    preColor.value = '#ccc'
    pagiation.page = 1
    return
  }

  emits('update:page', pagiation.page)
  emits('refresh')
}

const handleNextClick = () => {
  pagiation.page++
  preColor.value = '#409eff'

  emits('update:page', pagiation.page)
  emits('refresh')
}

watch(
  () => props.page,
  (newVal) => {
    console.log(newVal)
    pagiation.page = newVal
    if (pagiation.page <= 1) {
      preColor.value = '#ccc'
      pagiation.page = 1
    }
  },
  {
    immediate: true
  }
)
</script>

<style lang="less" scoped>
.table {
  position: relative;
  width: 100%;

  .pre,
  .next {
    position: absolute;
    top: 50%;
    font-size: 30px;
    transition: all 0.3s;

    &:hover {
      transform: scale(1.3);
    }

    &:active {
      transform: scale(1);
    }
  }

  .pre {
    left: -30px;
    color: v-bind(preColor);
  }

  .next {
    right: -30px;
    color: #409eff;
  }
}
</style>
