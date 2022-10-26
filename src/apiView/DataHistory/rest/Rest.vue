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
import { getRestDataListApi, deleteRestDataApi } from '@/api/data'
import { NInput, NCard, NTabs, NTabPane, NOl, NLi, NGradientText } from 'naive-ui'
import { eventBus, StaticKey } from '@/bus'
import { onMounted, ref } from 'vue'
import type { RestDataDetail } from '@/api/data/type'
import useDataSnapShot from '@/apiView/hooks/snapshot'
import type { ContextmenuItem } from '@/plugins/directive/contextmenu/types'
import { message } from '@/utils/message'

const dataList = ref<RestDataDetail[]>([])
const snapShot = useDataSnapShot('REST', true)
const dataHistory = ref<RestDataDetail[]>([])
const loadStaticList = async () => {
  try {
    const resp = await getRestDataListApi()
    if (resp.status === 200) {
      dataList.value = resp.data
    }
  } catch (err: any) {
    console.log(err || err.message)
  }
}

const selectDataItem = (id: string) => {
  eventBus.emit(StaticKey.REST_KEY, id)
}
const getHistory = async () => {
  const data = await snapShot.list()
  dataHistory.value = data.map((el) => el.data)
}

onMounted(async () => {
  await loadStaticList()
  await getHistory()
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

const clearSnapshot = async () => {
  await snapShot.clear()
  await getHistory()
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
      handler: () => clearSnapshot()
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
