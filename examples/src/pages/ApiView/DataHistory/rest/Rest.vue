<template>
  <n-card title="REST数据" size="small">
    <n-input placeholder="请输入搜索条件" />
    <n-tabs>
      <n-tab-pane name="REST数据">
        <n-ol align-text>
          <n-li
            v-for="item in dataList"
            :key="item.id"
            v-contextmenu="() => dataListContextMenus(item.id)"
            class="data-item"
            @click="selectDataItem(item.id)"
          >
            <div class="rest-detail">
              <div class="desc">{{ item.name }}</div>
              <div>
                <n-gradient-text type="success" style="font-weight: 800">
                  {{ item.method }}
                </n-gradient-text>
                {{ item.url }}
              </div>
            </div>
          </n-li>
        </n-ol>
      </n-tab-pane>
      <n-tab-pane name="最近使用">
        <n-ol align-text>
          <n-li
            v-for="item in dataHistory"
            :key="item.id"
            v-contextmenu="() => dataHistoryContextMenus(item.id)"
            class="data-item"
            @click="selectDataItem(item.id)"
          >
            <div class="rest-detail">
              <div class="desc">{{ item.name }}</div>
              <div>
                <n-gradient-text type="success" style="font-weight: 800">
                  {{ item.method }}
                </n-gradient-text>
                {{ item.url }}
              </div>
            </div>
          </n-li>
        </n-ol></n-tab-pane
      >
    </n-tabs>
  </n-card>
</template>
<script setup lang="ts">
import { eventBus, StaticKey } from '@open-data-v/base'
import type { ContextmenuItem } from '@open-data-v/designer'
import { NCard, NGradientText, NInput, NLi, NOl, NTabPane, NTabs } from 'naive-ui'
import { onMounted, ref } from 'vue'

import { deleteRestDataApi, getRestDataListApi } from '@/api/data'
import type { RestDataDetail } from '@/api/data/type'
import { message } from '@/utils/message'
import { Logger } from '@/utils/utils'

const dataList = ref<RestDataDetail[]>([])
const dataHistory = ref<RestDataDetail[]>([])

const loadStaticList = async () => {
  try {
    const resp = await getRestDataListApi()
    if (resp.status === 200) {
      dataList.value = resp.data
    }
  } catch (err: any) {
    Logger.log(err || err.message)
  }
}

const selectDataItem = (id: string) => {
  eventBus.emit(StaticKey.REST_KEY, id)
}
onMounted(async () => {
  await loadStaticList()
})

const removeData = async (id: string) => {
  try {
    const resp = await deleteRestDataApi(id)
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
  return [
    {
      text: '清除',
      subText: '',
      handler: () => {}
    }
  ]
}
</script>
<style lang="less">
.data-item {
  &:hover {
    transform: scale(1.01);
    color: #2d8cf0;
    cursor: pointer;
  }
  .rest-detail {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    flex-direction: column;
    flex-wrap: nowrap;
    align-content: flex-start;
    .desc {
      filter: brightness(0.5);
      font-size: 5px;
    }
  }
}
</style>
