<template>
  <NCard>
    <div class="api">
      <n-select
        :options="requestMethodOptions"
        class="method"
        v-model:value="formData['method']"
        :show-arrow="false"
      />
      <n-input class="url" v-model:value="formData['url']" />
      <n-space>
        <n-button-group class="send">
          <n-button type="primary">发送</n-button>
          <n-dropdown :options="sendOptions" trigger="hover" :show-arrow="true">
            <n-button type="primary">
              <template #icon>
                <icon-park name="down" />
              </template>
            </n-button>
          </n-dropdown>
        </n-button-group>
      </n-space>
      <n-space>
        <n-button-group class="save">
          <n-button>保存</n-button>
          <n-dropdown :options="saveOptions" trigger="hover" :show-arrow="true">
            <n-button>
              <template #icon>
                <icon-park name="down" />
              </template>
            </n-button>
          </n-dropdown>
        </n-button-group>
      </n-space>
    </div>
    <div class="config">
      <n-tabs type="line" animated>
        <n-tab-pane name="query" tab="请求参数">
          <div class="params">
            <DynamicKVForm v-model:value="formData['params']" title="请求参数" />
          </div>
        </n-tab-pane>
        <n-tab-pane name="data" tab="请求体">
          <div class="headers">
            <DynamicKVForm v-model:value="formData['data']" title="请求体" />
          </div>
        </n-tab-pane>
        <n-tab-pane name="headers" tab="请求头">
          <div class="headers">
            <DynamicKVForm
              v-model:value="formData['headers']"
              title="请求头"
              :options="requestHeaderOptions"
            />
          </div>
        </n-tab-pane>
      </n-tabs>
    </div>
    <div class="response">
      <n-divider
        title-placement="left"
        style="
           {
            width: '50%';
          }
        "
        >请求响应</n-divider
      >
      <ReponseContentView />
    </div>
  </NCard>
</template>
<script setup lang="ts">
import {
  NCard,
  NInput,
  NSelect,
  NButton,
  NButtonGroup,
  NDropdown,
  NSpace,
  NTabs,
  NTabPane,
  NDivider
} from 'naive-ui'
import DynamicKVForm from '../modules/DynamicKVForm.vue'
import { reactive } from 'vue'
import { KV } from '../modules/type'
import { uuid } from '@/utils/utils'
import { RequestHeaderEnum, RequestMethod } from '../requestEnums'
import ReponseContentView from './modules/ReponseContentView.vue'
const requestMethodOptions = Object.keys(RequestMethod).map((el) => {
  return {
    label: el,
    value: el
  }
})

const requestHeaderOptions = Object.keys(RequestHeaderEnum)
const saveOptions = [
  {
    label: '复制衔接',
    key: 'copyLink'
  }
]

const sendOptions = [
  {
    label: '导入衔接',
    key: 'importURL'
  }
]
interface RequestOption {
  method: RequestMethod
  url: string
  headers: Array<KV>
  params: Array<KV>
  data: Array<KV>
}
const formData = reactive<RequestOption>({
  method: RequestMethod.GET,
  url: 'http://datav.byteportrait.com',
  headers: [{ key: '', value: '', disable: false, id: uuid() }],
  params: [{ key: '', value: '', disable: false, id: uuid() }],
  data: [{ key: '', value: '', disable: false, id: uuid() }]
})
</script>

<style scoped lang="less">
.api {
  display: flex;
  .method {
    width: 100px;
    flex: 8;
  }
  .url {
    flex: 90;
  }
}
</style>
