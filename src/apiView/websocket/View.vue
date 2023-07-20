<template>
  <n-form-item label="链接地址" label-placement="top" size="small">
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
      @close="isShow = false"
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

import type { Slotter } from '../type'
import type RestRequestData from './handler'
import DataHandler from './handler'
import type { WebsocketOption } from './type'
import WebsocketView from './WebsocketView.vue'

const props = defineProps<{
  slotter: Slotter
  index?: number
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
      type: 'WS',
      dataInstance: new DataHandler(formData)
    }
    if (props.slotter) {
      props.slotter.changeDataConfig(dataConfig)
    }
  }
}

onMounted(async () => {
  if (props.slotter) {
    initComponentData()
  }
})

const initComponentData = () => {
  const dataConfig = props.slotter!.dataConfig
  if (dataConfig && dataConfig.type === 'WS') {
    const restRequest = props.slotter!.dataConfig?.dataInstance as RestRequestData
    if (!restRequest) {
      return
    }
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
