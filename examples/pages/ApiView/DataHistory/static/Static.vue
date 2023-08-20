<template>
  <n-card title="静态数据" size="small">
    <n-input placeholder="请输入搜索条件" />
    <n-tabs>
      <n-tab-pane name="静态数据">
        <n-ol align-text>
          <n-li
            v-for="item in dataList"
            :key="item.id"
            v-contextmenu="() => dataListContextMenus(item.id)"
            class="data-item"
            @click="selectDataItem(item.id)"
            ><n-space>{{ item.name }}</n-space></n-li
          >
        </n-ol>
      </n-tab-pane>
      <n-tab-pane name="最近使用">
        <n-ol align-text>
          <n-li
            v-for="item in dataHistory"
            :key="item.id"
            class="data-item"
            @click="selectDataItem(item.id)"
            ><n-space>{{ item.name }}</n-space></n-li
          >
        </n-ol>
      </n-tab-pane>
    </n-tabs>
  </n-card>
</template>
<script setup lang="ts">
import { NCard, NInput, NLi, NOl, NSpace, NTabPane, NTabs } from 'naive-ui'
import type { ContextmenuItem } from 'open-data-v'
import { eventBus, StaticKey } from 'open-data-v'
import { onMounted, ref } from 'vue'

import type { StaticDataDetail } from '@/api/data'
import { deleteStaticDataApi, getStaticDataListApi } from '@/api/data'
import { message } from '@/utils/message'
import { Logger } from '@/utils/utils'

const dataHistory = ref<StaticDataDetail[]>([])
const dataList = ref<StaticDataDetail[]>([])
const loadStaticList = async () => {
  try {
    const resp = await getStaticDataListApi()
    if (resp.status === 200) {
      dataList.value = resp.data
    }
  } catch (err: any) {
    Logger.log(err || err.message)
  }
}

const selectDataItem = (id: string) => {
  eventBus.emit(StaticKey.STATIC_KEY, id)
}

onMounted(async () => {
  await loadStaticList()
})

const removeData = async (id: string) => {
  try {
    const resp = await deleteStaticDataApi(id)
    if (resp.status === 200) {
      message.success('删除成功')
      await loadStaticList()
    }
  } catch (err) {
    return undefined
  }
}

const dataListContextMenus = (id: string): Optional<ContextmenuItem[]> => {
  return [
    {
      text: '删除',
      subText: '',
      handler: () => removeData(id)
    }
  ]
}

const dataHistoryContextMenus = (_: string): Optional<ContextmenuItem[]> => {
  return []
}
</script>
<style lang="less">
.data-item {
  &:hover {
    transform: scale(1.01);
    color: #2d8cf0;
    cursor: pointer;
  }
}
</style>
