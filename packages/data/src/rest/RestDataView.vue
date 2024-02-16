<template>
  <o-card>
    <div class="rest-data">
      <slot name="data-select"></slot>
    </div>
    <div class="flex flex-row mt-1">
      <div class="w-1/4">
        <o-select
          v-model:value="formData['method']"
          :options="requestMethodOptions"
          :show-arrow="true"
          @update-value="formChange"
        />
      </div>
      <div class="w-3/4">
        <o-input v-model:value="formData['url']" @update-value="formChange" />
      </div>
      <div>
        <o-button type="primary" @click="send">调试</o-button>
      </div>
    </div>
    <div>
      <o-tabs value="query" justify-content="flex-start">
        <o-tab-pane name="query" label="请求参数">
          <DynamicKVForm
            v-model:value="formData['params']"
            title="请求参数"
            @update:value="formChange"
          />
        </o-tab-pane>
        <o-tab-pane name="data" label="请求体">
          <DynamicKVForm
            v-model:value="formData['data']"
            title="请求体"
            @update:value="formChange"
          />
        </o-tab-pane>
        <o-tab-pane name="headers" label="请求头">
          <div class="headers">
            <DynamicKVForm
              v-model:value="formData['headers']"
              title="请求头"
              :options="requestHeaderOptions"
              @update:value="formChange"
            />
          </div>
        </o-tab-pane>
      </o-tabs>
    </div>
    <div class="response">
      <o-divider title-placement="left">
        请求响应
        <span :class="['resp-code', response.status >= 400 ? 'resp-fail' : 'resp-success']">
          {{ response.status ? response.status : '' }}
        </span>
      </o-divider>
      <OCodeEditor :value="response.data" height="400px" />
    </div>
  </o-card>
</template>
<script setup lang="ts">
import type { DataInstance } from '@open-data-v/base'
import { OButton, OCard, ODivider, OInput, OSelect, OTabPane, OTabs } from '@open-data-v/ui'
import { reactive, ref } from 'vue'

import { uuid } from '../utils'
import DynamicKVForm from './DynamicKVForm.vue'
import { RequestHeaderEnum, RequestMethod } from './requestEnums'
import type { RestOption, RestResponse } from './type'

const props = withDefaults(
  defineProps<{
    options?: RestOption
    mode?: 'debug' | 'use'
    dataInstance?: DataInstance
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

const emits = defineEmits<{
  (e: 'update:options', value: RestOption): void
  (e: 'change', value: RestOption): void
}>()

const formData = reactive<RestOption>(props.options)
const response = ref<RestResponse>({
  status: 0,
  data: '',
  afterData: '',
  headers: {}
})
const send = async () => {
  if (!props.dataInstance) {
    return
  }
  const acceptor = (resp: any) => {
    response.value.status = resp.status
    response.value.data = JSON.stringify(resp.data, null, '\t')
  }
  props.dataInstance.debug(acceptor)
}
const formChange = () => {
  emits('change', formData)
  emits('update:options', formData)
}
</script>

<style scoped lang="less">
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
