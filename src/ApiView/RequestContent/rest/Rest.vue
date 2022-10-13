<template>
  <NCard>
    <div class="api">
      <n-select
        :options="requestMethodOptions"
        class="method"
        v-model:value="formData['method']"
        :show-arrow="true"
        @update-value="formChange"
      />
      <n-input class="url" v-model:value="formData['url']" @update-value="formChange" />
      <n-space>
        <n-button-group class="send">
          <n-button type="primary" @click="send">发送</n-button>
        </n-button-group>
      </n-space>
      <n-space>
        <n-button-group class="save">
          <n-button>保存</n-button>
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
        <n-tab-pane name="scripts" tab="后置脚本" display-directive="show">
          <div class="headers">
            <DynamicKVForm v-model:value="scriptArgs" title="脚本参数" @update:value="formChange" />
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
        <n-tab-pane name="data" tab="脚本处理结果" display-directive="show">
          <ReponseContentView :data="response.afterData" class="content" />
        </n-tab-pane>
        <n-tab-pane name="origin" tab="原始请求结果" display-directive="show">
          <ReponseContentView :data="response.data" class="content" />
        </n-tab-pane>
        <n-tab-pane name="scripts" tab="脚本" display-directive="show">
          <ScriptsEditor
            :data="formData.afterScript"
            class="content"
            @update:data="afterScriptChange"
          />
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
  NSpace,
  NTabs,
  NTabPane,
  NDivider
} from 'naive-ui'
import DynamicKVForm from '../modules/DynamicKVForm.vue'
import { onMounted, reactive, ref } from 'vue'
import { uuid } from '@/utils/utils'
import { RequestHeaderEnum, RequestMethod } from '../requestEnums'
import type { AxiosResponse } from 'axios'
import ReponseContentView from './modules/ReponseContentView.vue'
import useRestRequest from '@/ApiView/hooks/http'
import ScriptsEditor from '@/components/ScriptsEditor'
import { ScriptType } from '@/components/ScriptsEditor/eunm'
import { KV, AfterScript, RequestOption, RequestResponse } from '@/ApiView/hooks/http/type'
import { KVToRecordable, requestOptionsToStore } from '@/ApiView/hooks/http/utils'

const props = withDefaults(
  defineProps<{
    restOptions?: RequestOption
  }>(),
  {
    restOptions: () => {
      return {
        method: RequestMethod.GET,
        url: '/getRiskArea',
        headers: [{ key: '', value: '', disable: false, id: uuid() }],
        params: [{ key: '', value: '', disable: false, id: uuid() }],
        data: [{ key: '', value: '', disable: false, id: uuid() }],
        afterScript: {
          code: '',
          type: ScriptType.Javascript
        }
      }
    }
  }
)

const requestMethodOptions = Object.keys(RequestMethod).map((el) => {
  return {
    label: el,
    value: el
  }
})
const requestHeaderOptions = Object.keys(RequestHeaderEnum)
const scriptArgs = ref<KV[]>([{ key: '', value: '', disable: false, id: uuid() }])

interface ErrorResponse extends Error {
  config: Recordable
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
    config: Recordable
    code?: number
    status?: number
  }
}

const emits = defineEmits<{
  (e: 'update:restOptions', value: RequestOption): void
  (e: 'change', value: RequestOption): void
}>()

const formData = reactive<RequestOption>(props.restOptions)
const response = ref<RequestResponse>({
  code: 0,
  data: '',
  afterData: '',
  headers: {}
})
const send = async () => {
  const restRequest = useRestRequest(requestOptionsToStore(formData), true)
  try {
    const args = KVToRecordable(scriptArgs.value)
    const resp = await restRequest.request(args)
    response.value.code = resp.status
    response.value.data = JSON.stringify(resp.data, null, '\t')
    response.value.afterData = JSON.stringify(resp.afterData, null, '\t')
    response.value.headers = resp.headers
  } catch (err: any) {
    err as ErrorResponse
    const result = err.response || (err.toJSON ? err.toJSON() : {})
    response.value.code = result.status
    response.value.data = err.stack || err.message
    response.value.afterData = err.stack || err.message
    response.value.headers = result.headers || result?.config?.headers || {}
  }
}
const formChange = () => {
  emits('change', formData)
  emits('update:restOptions', formData)
}

const afterScriptChange = (data: AfterScript) => {
  formData.afterScript = data
  formChange()
}

onMounted(async () => {
  await send()
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
