<template>
  <o-form-item label="链接地址" label-placement="top" size="small">
    <div class="justify-center flex-row flex-nowrap flex items-center">
      <o-input v-model:value="formData.url" readonly>
        <template #prefix>
          <span class="accent-green-500 font-extrabold">
            {{ formData.url.includes(':') ? formData.url.split(':')[0] : '' }}
          </span>
        </template>
      </o-input>
      <o-button type="primary" @click="isShow = true"> 编辑</o-button>
    </div>
  </o-form-item>
  <o-form-item label="超时时间" label-placement="top">
    <o-input-number
      v-model:value="formData.timeout"
      :min="300"
      :step="100"
      @update:value="changeOptions"
    >
      <template #suffix> ms</template>
    </o-input-number>
  </o-form-item>
  <o-form-item label="是否重试" label-placement="top">
    <o-switch v-model:value="formData.isRetry" @update:value="changeOptions" />
  </o-form-item>
  <o-form-item v-if="formData.isRetry" label="最大重试次数" label-placement="top">
    <o-input-number
      v-model:value="formData.maxRetryCount"
      :step="1"
      placeholder="小于等于0表示不限制重试次数"
      @update:value="changeOptions"
    />
  </o-form-item>
  <o-modal v-model:show="isShow" :beforeClose="close">
    <o-card
      title="WS数据"
      :bordered="false"
      closable
      size="small"
      role="dialog"
      aria-modal="true"
      @close="isShow = false"
    >
      <WebsocketView
        ref="wsRef"
        v-model:options="formData"
        :dataInstance="dataInstance"
        @change="changeOptions"
        @update:options="changeOptions"
      />
    </o-card>
  </o-modal>
</template>

<script lang="ts" setup>
import { OButton, OCard, OFormItem, OInput, OInputNumber, OModal, OSwitch } from '@open-data-v/ui'
import { ref } from 'vue'

import { useDataFill } from '../base/use'
import type WebsocketDataHander from './handler'
import type { WebsocketOption } from './type'
import WebsocketView from './ws-view.vue'

const props = defineProps<{
  dataInstance: WebsocketDataHander
}>()

const isShow = ref<boolean>(false)

// @ts-ignore
const wsRef = ref<InstanceType<typeof WsView> | null>(null)
const close = () => {
  changeOptions()
  if (wsRef.value && wsRef.value.close) {
    wsRef.value.close()
  }
}
const formData = ref<WebsocketOption>({
  url: '',
  message: '',
  timeout: 3000,
  isRetry: false,
  maxRetryCount: 0
})

const { changeOptions } = useDataFill<WebsocketOption>(props.dataInstance, formData)
</script>
