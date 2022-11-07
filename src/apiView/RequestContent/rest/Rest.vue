<template>
  <n-card>
    <div class="rest-data">
      <n-select
        :options="restDataList"
        :value="formData.id"
        class="selected"
        clearable
        placeholder="请选择数据"
        @update:value="selectedChange"
        @clear="clear"
      />
      <n-input v-if="mode === 'debug'" v-model:value="formData.title" class="title">
        <template #prefix>
          <x-icon name="api" />
        </template>
      </n-input>
      <n-space v-if="mode === 'debug'">
        <n-button-group class="save">
          <n-button @click="formData.id ? handleUpdate() : handleSave()">保存</n-button>
        </n-button-group>
      </n-space>
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
        <span :class="['resp-code', response.code >= 400 ? 'resp-fail' : 'resp-success']">
          {{ response.code ? response.code : '' }}
        </span>
      </n-divider>
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
            :mode="mode"
            class="content"
            @update:data="afterScriptChange"
          />
        </n-tab-pane>
      </n-tabs>
    </div>
  </n-card>
</template>
<script setup lang="ts">
import type { SelectOption } from 'naive-ui'
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
import useRestRequest from '@/apiView/hooks/http'
import ScriptsEditor from '../modules/ScriptsEditor'
import { ScriptType } from '@/enum'
import type { RequestOption, RequestResponse } from '@/apiView/hooks/http/type'
import { KVToRecordable, recordabletoKV, requestOptionsToStore } from '@/apiView/hooks/http/utils'
import { useEventBus, StaticKey } from '@/bus'
import {
  createRestDataApi,
  getRestDataApi,
  getRestDataListApi,
  updateRestDataApi
} from '@/api/data'
import type { RestDataDetail } from '@/api/data/type'
import useDataSnapShot from '@/apiView/hooks/snapshot'
import { message } from '@/utils/message'
import type { AfterScript } from '@/types/component'
const getEmptyParams = () => {
  return [{ key: '', value: '', disable: false, id: uuid() }]
}

const props = withDefaults(
  defineProps<{
    restOptions?: RequestOption
    mode?: 'debug' | 'use'
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
    },
    mode: 'use'
  }
)

const restDataList = ref<Array<SelectOption>>([])
const loadRestList = async () => {
  try {
    const resp = await getRestDataListApi()
    if (resp.status === 200) {
      restDataList.value = resp.data.map((el: RestDataDetail) => {
        return {
          label: el.name,
          value: el.id
        }
      })
    }
  } catch (err: any) {
    console.log(err || err.message)
  }
}

const requestMethodOptions = Object.keys(RequestMethod).map((el) => {
  return {
    label: el,
    value: el
  }
})
const requestHeaderOptions = Object.keys(RequestHeaderEnum)

const clear = () => {
  formData.id = undefined
  formData.title = undefined
  formData.headers = [{ key: '', value: '', disable: false, id: uuid() }]
  formData.data = [{ key: '', value: '', disable: false, id: uuid() }]
  formData.params = [{ key: '', value: '', disable: false, id: uuid() }]
  formData.method = RequestMethod.GET
  formData.url = ''
  formData.afterScript = {
    code: '',
    type: ScriptType.Javascript
  }
}
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
let snapShot
if (props.mode === 'debug') {
  useEventBus(StaticKey.REST_KEY, async (id) => {
    await loadRestData(id as string)
    await send()
  })
  snapShot = useDataSnapShot('REST', true)
}

const loadRestData = async (id: string) => {
  try {
    const resp = await getRestDataApi(id)
    if (resp.status === 200) {
      const data: RestDataDetail = resp.data
      formData.method = data.method
      formData.url = data.url
      const body = recordabletoKV(data.data || {})
      formData.data = body.length > 0 ? body : getEmptyParams()
      const params = recordabletoKV(data.params || {})
      formData.params = params.length > 0 ? params : getEmptyParams()
      formData.title = data.name
      formData.id = data.id!

      const headers = recordabletoKV(data.headers || {})
      formData.headers = headers.length > 0 ? headers : getEmptyParams()
    }
  } catch (err) {
    return undefined
  }
}
const emits = defineEmits<{
  (e: 'update:restOptions', value: RequestOption): void
  (e: 'change', value: RequestOption): void
}>()

interface RequestDataOption extends RequestOption {
  title?: string
  id?: string
}
const formData = reactive<RequestDataOption>(props.restOptions)
const response = ref<RequestResponse>({
  code: 0,
  data: '',
  afterData: '',
  headers: {}
})
const send = async () => {
  const restRequest = useRestRequest(requestOptionsToStore(formData), true)
  try {
    const resp = await restRequest.request()
    response.value.code = resp.status
    response.value.data = JSON.stringify(resp.data, null, '\t')
    response.value.afterData = JSON.stringify(resp.afterData, null, '\t')
    response.value.headers = resp.headers
    formData.id && snapShot && snapShot.save(formData)
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
const selectedChange = async (id: string) => {
  await loadRestData(id)
  await send()
  emits('update:restOptions', formData)
}
const handleSave = async () => {
  try {
    const headers = KVToRecordable(formData.headers)
    const params = KVToRecordable(formData.headers)
    const data = KVToRecordable(formData.data)
    const resp = await createRestDataApi({
      data: data,
      name: formData.title || '未命名',
      url: formData.url,
      method: formData.method,
      headers: headers,
      params: params
    })
    if (resp.status === 201) {
      const data: RestDataDetail = resp.data
      formData.id = data.id!
      formData.title = data.name
      message.success('数据保存成功')
    } else {
      message.warning('数据保存失败')
    }
  } catch (err) {
    message.warning('数据保存失败')
  }
}
const handleUpdate = async () => {
  try {
    const headers = KVToRecordable(formData.headers)
    const params = KVToRecordable(formData.headers)
    const data = KVToRecordable(formData.data)
    const resp = await updateRestDataApi(formData.id!, {
      data: data,
      name: formData.title || '未命名',
      url: formData.url,
      method: formData.method,
      headers: headers,
      params: params
    })
    if (resp.status === 200) {
      message.success('数据更新成功')
    } else {
      message.warning('数据更新失败')
    }
  } catch (err) {
    message.warning('数据更新失败')
  }
}

onMounted(async () => {
  await send()
  await loadRestList()
})
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
    width: 100px;
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
