<template>
  <o-card>
    <div class="flex flex-col flex-nowrap">
      <slot name="data-select"></slot>
    </div>
    <div class="flex flex-row flex-nowrap">
      <o-input v-model:value="formData['url']" class="flex-1" @update-value="formChange" />
      <div>
        <o-button-group>
          <o-button type="primary" @click="connect">链接</o-button>
          <o-button @click="send">发送</o-button>
        </o-button-group>
      </div>
    </div>
    <o-card name="query" title="消息">
      <OCodeEditor v-model:value="formData.message" height="100px" />
    </o-card>
    <o-card name="origin" title="原始数据结果">
      <OCodeEditor :value="response.data" />
    </o-card>
  </o-card>
</template>
<script setup lang="ts">
import { useWebsocket } from 'open-data-v/data/hooks'
import type WebsocketData from 'open-data-v/data/websocket/handler'
import { OButton, OButtonGroup, OCard, OInput } from 'open-data-v/ui'
import { onUnmounted, reactive, ref } from 'vue'

import type { WebsocketOption } from './type'

const props = withDefaults(
  defineProps<{
    options?: WebsocketOption
    mode?: 'debug' | 'use'
    index?: number
    dataInstance?: WebsocketData
  }>(),
  {
    options: () => {
      return {
        url: '',
        message: '',
        timeout: 3000,
        isRetry: false,
        maxRetryCount: 0
      }
    },
    handler: () => {
      return useWebsocket()
    },
    mode: 'use'
  }
)

const emits = defineEmits<{
  (e: 'update:options', value: WebsocketOption): void
  (e: 'change', value: WebsocketOption): void
}>()
const formData = reactive<WebsocketOption>(props.options)
const response = ref({
  data: ''
})
let wsInstance: WebsocketData

const close = () => {
  if (wsInstance) {
    wsInstance.close()
  }
}

const connect = () => {
  wsInstance = props.dataInstance
  if (!wsInstance) {
    return
  }
  const acceptor = (message) => {
    response.value.data = message.data
  }
  wsInstance.debug(acceptor)
}
const send = () => {
  wsInstance.send(formData.message)
}
const formChange = () => {
  emits('change', formData)
  emits('update:options', formData)
}

defineExpose({ close })

onUnmounted(() => {
  if (!wsInstance) {
    return
  }
  wsInstance.cancelDebug()
})
</script>
