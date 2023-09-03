<template>
  <o-form-item label="链接地址" label-placement="top" size="small">
    <o-input-group>
      <o-input v-model:value="formData.url" style="flex: 1" readonly>
        <template #prefix>
          <span class="success-text" style="font-weight: 800">
            {{ formData.url.includes(':') ? formData.url.split(':')[0] : '' }}
          </span>
        </template>
      </o-input>
      <o-button type="primary" @click="isShow = true"> 编辑 </o-button>
    </o-input-group>
  </o-form-item>
  <o-form-item label="超时时间" label-placement="top">
    <o-input-number
      v-model:value="formData.timeout"
      :min="300"
      :step="100"
      @update:value="changeHandler"
    >
      <template #suffix> ms </template>
    </o-input-number>
  </o-form-item>
  <o-form-item label="是否重试" label-placement="top">
    <o-switch v-model:value="formData.isRetry" @update:value="changeHandler" />
  </o-form-item>
  <o-form-item v-if="formData.isRetry" label="最大重试次数" label-placement="top">
    <o-input-number
      v-model:value="formData.maxRetryCount"
      :step="1"
      placeholder="小于等于0表示不限制重试次数"
      @update:value="changeHandler"
    />
  </o-form-item>
  <o-modal v-model:show="isShow" display-directive="show" :on-after-leave="close">
    <o-card
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

<style lang="less" scoped>
.success-text {
  color: #18a058;
}
</style>
