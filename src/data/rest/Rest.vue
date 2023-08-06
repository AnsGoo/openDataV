<template>
  <n-card>
    <div class="rest-data">
      <slot name="data-select"></slot>
    </div>
    <div class="api">
      <n-select
        v-model:value="formData['method']"
        :options="requestMethodOptions"
        class="method"
        :show-arrow="true"
        @update-value="formChange"
      />
      <n-input v-model:value="formData['url']" class="url" @update-value="formChange" />
      <n-space>
        <n-button-group class="send">
          <n-button type="primary" @click="send">调试</n-button>
        </n-button-group>
      </n-space>
    </div>
    <div class="config">
      <n-tabs type="line" animated>
        <n-tab-pane name="query" tab="请求参数" display-directive="show">
          <div class="params">
            <DynamicKVForm
              v-model:value="formData['params']"
              title="请求参数"
              @update:value="formChange"
            />
          </div>
        </n-tab-pane>
        <n-tab-pane name="data" tab="请求体" display-directive="show">
          <div class="headers">
            <DynamicKVForm
              v-model:value="formData['data']"
              title="请求体"
              @update:value="formChange"
            />
          </div>
        </n-tab-pane>
        <n-tab-pane name="headers" tab="请求头" display-directive="show">
          <div class="headers">
            <DynamicKVForm
              v-model:value="formData['headers']"
              title="请求头"
              :options="requestHeaderOptions"
              @update:value="formChange"
            />
          </div>
        </n-tab-pane>
      </n-tabs>
    </div>
    <div class="response">
      <n-divider title-placement="left">
        请求响应
        <span :class="['resp-code', response.status >= 400 ? 'resp-fail' : 'resp-success']">
          {{ response.status ? response.status : '' }}
        </span>
      </n-divider>
      <OCodeEditor :value="response.data" class="content" height="400px" />
    </div>
  </n-card>
</template>
<script setup lang="ts">
import type { AxiosResponse } from 'axios'
import {
  NButton,
  NButtonGroup,
  NCard,
  NDivider,
  NInput,
  NSelect,
  NSpace,
  NTabPane,
  NTabs
} from 'naive-ui'
import { reactive, ref } from 'vue'

import { useRequest } from '../hooks/http'
import { uuid } from '../utils'
import DynamicKVForm from './DynamicKVForm.vue'
import { RequestHeaderEnum, RequestMethod } from './requestEnums'
import type { RequestResponse, RestOption } from './type'
import { requestOptionsToStore } from './utils'

const props = withDefaults(
  defineProps<{
    options?: RestOption
    mode?: 'debug' | 'use'
  }>(),
  {
    options: () => {
      return {
        method: RequestMethod.GET,
        url: '',
        headers: [{ key: '', value: '', disable: false, id: uuid() }],
        params: [{ key: '', value: '', disable: false, id: uuid() }],
        data: [{ key: '', value: '', disable: false, id: uuid() }],
        otherConfig: {
          isRepeat: false,
          interval: 1000
        }
      }
    },
    mode: 'use'
  }
)

const requestMethodOptions = Object.keys(RequestMethod).map((el) => {
  return {
    label: el,
    value: el
  }
})
const requestHeaderOptions = Object.keys(RequestHeaderEnum)
interface ErrorResponse extends Error {
  config: Record<string, any>
  code?: number | undefined
  response: AxiosResponse
  isAxiosError: boolean

  toJSON?: () => {
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
    config: Record<string, any>
    code?: number
    status?: number
  }
}

const emits = defineEmits<{
  (e: 'update:options', value: RestOption): void
  (e: 'change', value: RestOption): void
}>()
interface RequestDataOption extends RestOption {
  title?: string
  id?: string
}
const formData = reactive<RequestDataOption>(props.options)
const response = ref<RequestResponse>({
  status: 0,
  data: '',
  afterData: '',
  headers: {}
})
const requestInstance = useRequest()
const send = async () => {
  formChange()
  try {
    const resp = await requestInstance.request(requestOptionsToStore(formData))
    response.value.status = resp.status
    response.value.data = JSON.stringify(resp.data, null, '\t')
  } catch (err: any) {
    err as ErrorResponse
    const result = err.response || (err.toJSON ? err.toJSON() : {})
    response.value.code = result.status
    response.value.data = err.stack || err.message
  }
}
const formChange = () => {
  emits('change', formData)
  emits('update:options', formData)
}
</script>

<style scoped lang="less">
.rest-data {
  display: flex;
  margin-bottom: 5px;
  .selected {
    flex: 4;
  }
  .title {
    flex: 8;
  }
}
.api {
  display: flex;
  .method {
    min-width: 110px;
    flex: 8;
  }
  .url {
    flex: 90;
  }
}
.response {
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
