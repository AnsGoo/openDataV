<template>
  <o-form-item label="动态数据" label-placement="top" size="small">
    <o-input-group>
      <o-input v-model:value="formData.url" style="flex: 1" readonly>
        <template #prefix>
          <span class="accent-green-500" style="font-weight: 800">
            {{ formData.method }}
          </span>
        </template>
      </o-input>
      <o-button type="primary" @click="isShow = true"> 编辑 </o-button>
    </o-input-group>
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
  <o-modal v-model:show="isShow" display-directive="show" :on-after-leave="changeHandler">
    <o-card
      style="width: 600px"
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
        @update:options="changeHandler"
        @change="changeHandler"
      />
    </o-card>
  </o-modal>
</template>

<script lang="ts" setup>
import {
  OButton,
  OCard,
  OFormItem,
  OInput,
  OInputGroup,
  OInputNumber,
  OModal,
  OSwitch
} from 'open-data-v/ui'
import { computed, onMounted, reactive, ref, useSlots, watch } from 'vue'

import type { Slotter } from '../type'
import { uuid } from '../utils'
import type RestRequestData from './handler'
import DataHandler from './handler'
import { RequestMethod } from './requestEnums'
import Rest from './RestDataView.vue'
import type { RestOption, StoreRestOption } from './type'
import { requestOptionsToStore, storeOptionToRequestOptions } from './utils'

const props = defineProps<{
  slotter: Slotter
  index?: number
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
    dataInstance: new DataHandler(requestOptionsToStore(formData))
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
