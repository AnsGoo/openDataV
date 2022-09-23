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
          <n-button type="primary" @click="send">发送</n-button>
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
        <n-tab-pane name="scripts" tab="后置脚本">
          <div class="headers">
            <DynamicKVForm v-model:value="formData['options']" title="脚本参数" />
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
        >请求响应
        <span :class="['resp-code', response.code >= 400 ? 'resp-fail' : 'resp-success']">{{
          response.code ? response.code : ''
        }}</span></n-divider
      >
      <n-tabs>
        <n-tab-pane name="data" tab="脚本处理结果">
          <ReponseContentView :data="response.data" class="content" />
        </n-tab-pane>
        <n-tab-pane name="origin" tab="原始请求结果">
          <ReponseContentView :data="response.data" class="content" />
        </n-tab-pane>
      </n-tabs>
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
import { reactive, ref } from 'vue'
import { KV } from '../modules/type'
import { uuid } from '@/utils/utils'
import { RequestHeaderEnum, RequestMethod } from '../requestEnums'
import type { AxiosResponse, Method } from 'axios'
import ReponseContentView from './modules/ReponseContentView.vue'
import useRestRequest from '@/ApiView/hooks/http'
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

interface AfterScripts {
  options: Array<KV>
  code: string
}

interface RequestResponse {
  code: number
  data: string
  headers: Recordable<string>
}

interface ErrorResponse extends Error {
  config: Recordable
  code?: number | undefined
  response: AxiosResponse
  isAxiosError: boolean

  toJSON: () => {
    message: string
    name: string
    // Microsoft
    description?: string
    number?: string
    // Mozill
    fileName?: string
    lineNumber?: string
    columnNumber?: string
    stack?: string
    // Axios
    config: Recordable
    code?: number
    status?: number
  }
}

const formData = reactive<RequestOption & AfterScripts>({
  method: RequestMethod.GET,
  url: 'http://datav.byteportrait.com',
  headers: [{ key: '', value: '', disable: false, id: uuid() }],
  params: [{ key: '', value: '', disable: false, id: uuid() }],
  data: [{ key: '', value: '', disable: false, id: uuid() }],
  options: [{ key: '', value: '', disable: false, id: uuid() }],
  code: ''
})
const response = ref<RequestResponse>({
  code: 0,
  data: '',
  headers: {}
})
const send = async () => {
  const headers = {}
  const params = {}
  const data = {}
  for (let i of formData.headers) {
    if (i.key) {
      headers[i.key] = i.value
    }
  }
  for (let i of formData.params) {
    if (i.key) {
      params[i.key] = i.value
    }
  }
  for (let i of formData.data) {
    if (i.key) {
      data[i.key] = i.value
    }
  }
  const method = formData.method as Method
  const url = formData.url
  const restRequest = useRestRequest(method, headers, url, params, data)

  try {
    const resp = await restRequest.request()
    response.value.code = resp.status
    response.value.data = JSON.stringify(resp.data, null, '\t')
    response.value.headers = resp.headers
  } catch (err: any) {
    err as ErrorResponse
    const result = err.response || err.toJSON()
    response.value.code = result.status
    response.value.data = JSON.stringify(result.statusText || result.message, null, '\t') || ''
    response.value.headers = result.headers || result?.config?.headers || {}
  }
}
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
.response {
  width: max-wdith;
  .resp-fail {
    color: #f76560;
    margin-left: 10px;
  }
  .resp-code.resp-success {
    color: #18a058;
    margin-left: 10px;
  }
}
</style>
