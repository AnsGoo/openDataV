<template>
  <main>
    <h1>详细报警信息</h1>
    <ToolBar @search="handleSearch" :alertType="alertType" />
    <div class="content">
      <Tabs @changeTab="changeTab" />
      <MyTable
        :data="tableData"
        v-model:page="pagiation.page"
        :pageSize="pagiation.pageSize"
        :alertType="alertType"
        @refresh="refreshTable"
      />
    </div>
  </main>
</template>

<script lang="ts" setup>
import { reactive, onMounted, ref } from 'vue'
import { http } from '@/utils/http'
import MyTable from './modules/Table.vue'
import Tabs from './modules/Tabs.vue'
import type { WSAlertDataType } from '@/types/wsTypes'
import { errorMessage } from '@/utils/message'
import ToolBar from './modules/ToolBar.vue'
import { PageType, SearchType, AlertType } from './types'
import { useSystemSettingWithOut } from '@/store/modules/setting'
import moment from 'moment'

const systemSetting = useSystemSettingWithOut()

const alertType = ref<AlertType>('actual')
const tableData = reactive<WSAlertDataType[]>([])
const pagiation = reactive<PageType>({
  page: 1,
  pageSize: 14
})

const nowTime = moment().format('YYYY-MM-DD')
const search = reactive<SearchType>({
  searchTime: `${nowTime}|${nowTime}`,
  tagName: '',
  alarmType: '',
  alarmLevel: ''
})

// 获取请求参数
const getRequestParams = () => {
  const start = (search.searchTime as string).split('|')[0]
  const end = (search.searchTime as string).split('|')[1]
  return {
    StartTime: `${start} 00:00:00`,
    EndTime: `${end} 23:59:59`,
    TagName: search.tagName,
    AlarmType: search.alarmType,
    Level: search.alarmLevel,
    Page: pagiation.page,
    PageSize: pagiation.pageSize
  }
}

/**
 * 获取报警信息
 * alertType 报警类型, 实时（actual）/历史（history）
 * @param: pages 分页信息
 * @param: search 搜索信息
 */
const initTableData = async () => {
  let requestUrl = ''
  // 根据报警类型获取报警地址
  try {
    requestUrl = systemSetting.systemSetting('alertUrl')?.config[alertType.value]
  } catch (error) {
    errorMessage('报警地址未配置或者配置错误')
    return
  }

  if (!requestUrl) {
    errorMessage('报警地址未配置或者配置错误')
    return
  }

  try {
    const res = await http.get({
      url: requestUrl,
      params: getRequestParams()
    })

    if (res.Results) {
      // 如果查询到的数据没有，则表示没有更多数据了
      tableData.splice(0, tableData.length, ...res.Results)
    } else {
      errorMessage(res.Message)
    }
  } catch (error) {
    console.log(error)
    errorMessage('报警数据请求失败')
  }
}

const refreshTable = () => {
  console.log('refreshTable', pagiation)
  initTableData()
}

const changeTab = (tab: AlertType) => {
  alertType.value = tab
  // 切换tab时重置查询条件
  resetQuery()
  initTableData()
}

const handleSearch = (options: SearchType) => {
  Object.assign(search, options)

  // 查询时重置查询条件
  resetQuery()
  initTableData()
}

const resetQuery = () => {
  search.searchTime = `${nowTime}|${nowTime}`
  search.tagName = ''
  search.alarmType = ''
  search.alarmLevel = ''
  pagiation.page = 1
}

onMounted(() => {
  initTableData()
})
</script>

<style lang="less" scoped>
main {
  width: 100%;
  height: 100vh;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  overflow: visible !important;

  h1 {
    text-align: center;
    font-size: 30px;
    font-weight: bold;
    padding: 20px;
  }

  .content {
    position: relative;
    width: 100%;
  }
}
</style>
