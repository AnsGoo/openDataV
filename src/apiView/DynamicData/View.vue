<template>
  <n-form :model="formData" size="small">
    <n-form-item label="动态数据" label-placement="top">
      <n-input-group>
        <n-input v-model:value="formData.options.url" style="flex: 1" readonly>
          <template #prefix>
            <n-gradient-text type="success" style="font-weight: 800">
              {{ formData.options.method }}
            </n-gradient-text>
          </template>
        </n-input>
        <n-button type="primary" @click="isShow = true"> 编辑 </n-button>
      </n-input-group>
    </n-form-item>
    <n-form-item label="是否重复" label-placement="left">
      <n-switch v-model:value="formData.isRepeat" @update:value="changeHandler" />
    </n-form-item>
    <n-form-item v-if="formData.isRepeat" label="请求间隔" label-placement="left">
      <n-input-number
        v-model:value="formData.interval"
        :min="300"
        :step="100"
        @update:value="changeHandler"
      >
        <template #suffix> ms </template>
      </n-input-number>
    </n-form-item>
  </n-form>
  <n-modal v-model:show="isShow" display-directive="show" :on-after-leave="changeHandler">
    <n-card
      style="width: 800px"
      title="动态数据"
      :bordered="false"
      size="small"
      role="dialog"
      aria-modal="true"
    >
      <RestView
        v-model:options="formData.options"
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
  NForm,
  NFormItem,
  NGradientText,
  NInput,
  NInputGroup,
  NInputNumber,
  NModal,
  NSwitch
} from 'naive-ui'
import { computed, onMounted, reactive, ref, useSlots, watch } from 'vue'

import type { CustomComponent } from '@/models'

import { DataType, ScriptType } from '../const'
import { RequestMethod } from '../content/requestEnums'
import Rest from '../content/rest/Rest.vue'
import type { RestOption } from '../type'
import { requestOptionsToStore, storeOptionToRequestOptions, uuid } from '../utils'
import type RestRequestData from './handler'
import DataHandler from './handler'

const props = defineProps<{
  curComponent: CustomComponent
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
const formData = reactive<{ isRepeat: boolean; interval: number; options: RestOption }>({
  isRepeat: false,
  interval: 1000,
  options: {
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
})
const changeHandler = (...data) => {
  console.log('----------', data)
  setDataConfig()
}

const setDataConfig = () => {
  const dataConfig = {
    type: DataType.REST,
    requestConfig: new DataHandler(requestOptionsToStore(formData.options)),
    otherConfig: {
      isRepeat: formData.isRepeat,
      interval: formData.interval
    }
  }
  props.curComponent.changeRequestDataConfig(dataConfig)
}

onMounted(async () => {
  initData()
})

const initData = () => {
  const dataConfig = props.curComponent.dataConfig
  if (dataConfig && dataConfig.type === DataType.REST) {
    const restRequest = props.curComponent.dataConfig?.requestConfig as RestRequestData
    const otherConfig = props.curComponent.dataConfig?.otherConfig || {}
    const { options } = restRequest.toJSON()
    formData.options = storeOptionToRequestOptions(options)
    formData.interval = otherConfig.interval || 1000
    formData.isRepeat = otherConfig.isRepeat || false
  } else {
    formData.isRepeat = false
    formData.interval = 1000
    formData.options = {
      method: RequestMethod.GET,
      url: '',
      headers: [{ key: '', value: '', disable: false, id: uuid() }],
      params: [{ key: '', value: '', disable: false, id: uuid() }],
      data: [{ key: '', value: '', disable: false, id: uuid() }],
      afterScript: {
        code: '',
        type: ScriptType.Javascript
      }
    }

    setDataConfig()
  }
}

watch(
  () => props.curComponent,
  async (value: CustomComponent) => {
    if (value) {
      initData()
    }
  },
  { immediate: true }
)
</script>

<style lang="less" scoped></style>
