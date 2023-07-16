<template>
  <n-form-item label="动态数据" label-placement="top" size="small">
    <n-input-group>
      <n-input v-model:value="formData.url" style="flex: 1" readonly>
        <template #prefix>
          <n-gradient-text type="success" style="font-weight: 800">
            {{ formData.method }}
          </n-gradient-text>
        </template>
      </n-input>
      <n-button type="primary" @click="isShow = true"> 编辑 </n-button>
    </n-input-group>
  </n-form-item>
  <n-form-item label="是否重复" label-placement="top">
    <n-switch v-model:value="formData.otherConfig.isRepeat" @update:value="changeHandler" />
  </n-form-item>
  <n-form-item v-if="formData.otherConfig.isRepeat" label="请求间隔" label-placement="top">
    <n-input-number
      v-model:value="formData.otherConfig.interval"
      :min="300"
      :step="100"
      @update:value="changeHandler"
    >
      <template #suffix> ms </template>
    </n-input-number>
  </n-form-item>
  <n-modal v-model:show="isShow" display-directive="show" :on-after-leave="changeHandler">
    <n-card
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
    </n-card>
  </n-modal>
</template>

<script lang="ts" setup>
import {
  NButton,
  NCard,
  NFormItem,
  NGradientText,
  NInput,
  NInputGroup,
  NInputNumber,
  NModal,
  NSwitch
} from 'naive-ui'
import { computed, onMounted, reactive, ref, useSlots, watch } from 'vue'

import { RequestMethod } from '../content/requestEnums'
import Rest from '../content/rest/Rest.vue'
import type { RestOption, Slotter, StoreRestOption } from '../type'
import { requestOptionsToStore, storeOptionToRequestOptions, uuid } from '../utils'
import type RestRequestData from './handler'
import DataHandler from './handler'

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

<style lang="less" scoped></style>
