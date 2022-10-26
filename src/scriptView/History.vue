<template>
  <n-card title="脚本" size="small">
    <n-input placeholder="请输入搜索条件" />
    <n-tabs>
      <n-tab-pane name="脚本列表">
        <n-ol align-text>
          <n-li
            v-for="item in dataList"
            :key="item.id"
            class="data-item"
            @click="selectDataItem(item.id)"
          >
            <div class="rest-detail">
              <div>
                <n-gradient-text type="success" style="font-weight: 800">
                  {{ item.type === ScriptType.Javascript ? 'JS' : 'Py' }}
                </n-gradient-text>
                {{ item.name }}
              </div>
            </div>
          </n-li>
        </n-ol>
      </n-tab-pane>
    </n-tabs>
  </n-card>
</template>
<script setup lang="ts">
import { NInput, NCard, NTabs, NTabPane, NOl, NLi, NGradientText } from 'naive-ui'
import { eventBus, StaticKey } from '@/bus'
import { onMounted, ref } from 'vue'
import { getAfterScriptListApi } from '@/api/data/afterScript'
import type { AfterScriptDetail } from '@/api/data/type'
import { ScriptType } from '@/enum'

const dataList = ref<AfterScriptDetail[]>([])
const loadStaticList = async () => {
  try {
    const resp = await getAfterScriptListApi()
    if (resp.status === 200) {
      dataList.value = resp.data
    }
  } catch (err: any) {
    console.log(err || err.message)
  }
}

const selectDataItem = (id: string) => {
  eventBus.emit(StaticKey.SRCIPT_KEY, id)
}

onMounted(async () => {
  await loadStaticList()
})
</script>
<style lang="less" scoped>
.data-item {
  &:hover {
    transform: scale(1.01);
    color: #2d8cf0;
    cursor: pointer;
  }
}
</style>
