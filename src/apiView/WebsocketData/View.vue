<template>
  <n-form-item label="链接地址" label-placement="top">
    <n-input-group>
      <n-input v-model:value="formData.url" style="flex: 1" readonly>
        <template #prefix>
          <n-gradient-text type="success" style="font-weight: 800">
            {{ formData.url.includes(':') ? formData.url.split(':')[0] : '' }}
          </n-gradient-text>
        </template>
      </n-input>
      <n-button type="primary" @click="isShow = true"> 编辑 </n-button>
    </n-input-group>
  </n-form-item>
  <n-form-item label="超时时间" label-placement="top">
    <n-input-number
      v-model:value="formData.timeout"
      :min="300"
      :step="100"
      @update:value="changeHandler"
    >
      <template #suffix> ms </template>
    </n-input-number>
  </n-form-item>
  <n-form-item label="是否重试" label-placement="top">
    <n-switch v-model:value="formData.isRetry" @update:value="changeHandler" />
  </n-form-item>
  <n-form-item v-if="formData.isRetry" label="最大重试次数" label-placement="top">
    <n-input-number
      v-model:value="formData.maxRetryCount"
      :step="1"
      placeholder="小于等于0表示不限制重试次数"
      @update:value="changeHandler"
    />
  </n-form-item>
  <n-modal v-model:show="isShow" display-directive="show" :on-after-leave="close">
    <n-card
      style="width: 800px"
      title="WS数据"
      :bordered="false"
      closable
      size="small"
      role="dialog"
      aria-modal="true"
    >
      <WsView
        ref="wsRef"
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

import type { CustomComponent } from '@/models'

import { DataType } from '../const'
import type { WebsocketOption } from '../type'
import type RestRequestData from './handler'
import DataHandler from './handler'
import WebsocketView from './WebsocketView.vue'

const props = defineProps<{
  curComponent: CustomComponent
}>()
const slots = useSlots()

const isShow = ref<boolean>(false)
const WsView = computed(() => {
  if (slots.default) {
    return slots.default()[0].type
  } else {
    return WebsocketView
  }
})

// @ts-ignore
const wsRef = ref<InstanceType<typeof WsView> | null>(null)
const close = () => {
  changeHandler()
  if (wsRef.value && wsRef.value.close) {
    wsRef.value.close()
  }
}
const formData = reactive<WebsocketOption>({
  url: '',
  message: '',
  timeout: 3000,
  isRetry: false,
  maxRetryCount: 0
})
const changeHandler = () => {
  setDataConfig()
}

const setDataConfig = () => {
  if (formData.url) {
    const dataConfig = {
      type: DataType.WS,
      requestConfig: new DataHandler(formData)
    }
    props.curComponent.changeRequestDataConfig(dataConfig)
  }
}

onMounted(async () => {
  initData()
})

const initData = () => {
  const dataConfig = props.curComponent.dataConfig
  if (dataConfig && dataConfig.type === DataType.WS) {
    const restRequest = props.curComponent.dataConfig?.requestConfig as RestRequestData
    const { options } = restRequest.toJSON()
    Object.assign(formData, options)
  } else {
    Object.assign(formData, {
      url: '',
      message: '',
      isRetry: false,
      retryCount: 0
    })
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
