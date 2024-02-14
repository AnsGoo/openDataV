<template>
  <o-form-item label="动态数据" label-placement="top" size="small">
    <div class="justify-center flex-row flex-nowrap flex items-center">
      <o-input v-model:value="formData.url" readonly>
        <template #prefix>
          <span class="text-green-700" style="font-weight: 800">
            {{ formData.method }}
          </span>
        </template>
      </o-input>
      <o-button type="primary" @click="isShow = true"> 编辑 </o-button>
    </div>
  </o-form-item>
  <o-form-item label="是否重复" label-placement="top">
    <o-switch v-model:value="formData.otherConfig.isRepeat" @update:value="changeHandler" />
  </o-form-item>
  <o-form-item v-if="formData.otherConfig.isRepeat" label="请求间隔" label-placement="top">
    <o-input-number
      v-model:value="formData.otherConfig.interval"
      :min="300"
      :step="100"
      @update:value="changeHandler"
    >
      <template #suffix> ms </template>
    </o-input-number>
  </o-form-item>
  <o-modal v-model:show="isShow" :beforeClose="changeHandler">
    <o-card
      title="动态数据"
      :bordered="false"
      size="small"
      closable
      role="dialog"
      aria-modal="true"
      @close="isShow = false"
    >
      <RestView
        v-model:options="formData"
        :dataInstance="dataInstance"
        @update:options="changeHandler"
        @change="changeHandler"
      />
    </o-card>
  </o-modal>
</template>

<script lang="ts" setup>
import type { DataHandler, Slotter } from '@open-data-v/base'
import { OButton, OCard, OFormItem, OInput, OInputNumber, OModal, OSwitch } from '@open-data-v/ui'
import { computed, onMounted, reactive, ref, useSlots, watch } from 'vue'

import { uuid } from '../utils'
import type RestRequestData from './handler'
import { RequestMethod } from './requestEnums'
import Rest from './RestDataView.vue'
import type { RestOption, StoreRestOption } from './type'
import { requestOptionsToStore, storeOptionToRequestOptions } from './utils'

const props = defineProps<{
  slotter: Slotter
  index?: number
  handler: DataHandler
}>()
const slots = useSlots()
const isShow = ref<boolean>(false)
const RestView = computed(() => {
  if (slots.default) {
    return slots.default()[0].type
  } else {
    return Rest
  }
})

const dataInstance = computed(() => props.slotter.dataConfig.dataInstance)

const formData = reactive<RestOption>({
  method: RequestMethod.GET,
  url: '/getRiskArea',
  headers: [{ key: '', value: '', disable: false, id: uuid() }],
  params: [{ key: '', value: '', disable: false, id: uuid() }],
  data: [{ key: '', value: '', disable: false, id: uuid() }],
  otherConfig: {
    isRepeat: false,
    interval: 1000
  }
})
const changeHandler = () => {
  setDataConfig()
}

const setDataConfig = () => {
  const dataConfig = {
    type: 'REST',
    dataInstance: new props.handler(requestOptionsToStore(formData))
  }
  if (props.slotter) {
    props.slotter.changeDataConfig(dataConfig)
  }
}

onMounted(async () => {
  if (props.slotter) {
    initComponentData()
  }
})

const initComponentData = () => {
  const dataConfig = props.slotter!.dataConfig
  if (dataConfig && dataConfig.type === 'REST') {
    const restRequest = props.slotter!.dataConfig?.dataInstance as RestRequestData
    if (!restRequest) {
      return
    }
    const { options } = restRequest.toJSON()
    Object.assign(formData, storeOptionToRequestOptions(options as StoreRestOption))
  } else {
    Object.assign(formData, {
      method: RequestMethod.GET,
      url: '',
      headers: [{ key: '', value: '', disable: false, id: uuid() }],
      params: [{ key: '', value: '', disable: false, id: uuid() }],
      data: [{ key: '', value: '', disable: false, id: uuid() }],
      otherConfig: {
        isRepeat: false,
        interval: 1000
      }
    })
    setDataConfig()
  }
}

watch(
  () => props.slotter,
  async (value: Slotter | undefined) => {
    if (value) {
      initComponentData()
    }
  },
  { immediate: true }
)
</script>
