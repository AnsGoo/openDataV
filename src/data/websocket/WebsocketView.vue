<template>
  <o-card>
    <div class="rest-data">
      <slot name="data-select"></slot>
    </div>
    <div class="api">
      <o-input v-model:value="formData['url']" class="url" @update-value="formChange" />
      <o-space>
        <o-button-group class="send">
          <o-button type="primary" @click="connect">链接</o-button>
          <o-button @click="send">发送</o-button>
        </o-button-group>
      </o-space>
    </div>
    <div class="config">
      <o-tabs type="line" animated>
        <o-tab-pane name="query" tab="消息" display-directive="show">
          <div class="params">
            <OCodeEditor v-model:value="formData.message" class="content" height="100px" />
          </div>
        </o-tab-pane>
      </o-tabs>
    </div>
    <div class="response">
      <o-tabs>
        <o-tab-pane name="origin" tab="原始数据结果" display-directive="show">
          <OCodeEditor :value="response.data" class="content" />
        </o-tab-pane>
      </o-tabs>
    </div>
  </o-card>
</template>
<script setup lang="ts">
import { OButton, OButtonGroup, OCard, OInput, OSpace, OTabPane, OTabs } from 'open-data-v/ui'
import { onUnmounted, reactive, ref } from 'vue'

import { dataLogger } from '../utils'
import type { WebsocketOption } from './type'

const props = withDefaults(
  defineProps<{
    options?: WebsocketOption
    mode?: 'debug' | 'use'
    index?: number
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
let wsInstance: WebSocket

const close = () => {
  if (wsInstance) {
    wsInstance.close()
  }
}

const connect = () => {
  close()
  wsInstance = new WebSocket(formData.url)
  wsInstance.onopen = () => {
    dataLogger.info('wsOpen')
  }
  wsInstance.onmessage = (message) => {
    response.value.data = message.data
  }
  wsInstance.onerror = (_err) => {
    dataLogger.error('wsClose')
    close()
  }
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
  close()
})
</script>

<style scoped lang="less">
.rest-data {
  display: flex;
  margin-bottom: 5px;
  .selected {
    flex: 4;
  }
  .title {
    flex: 8;
  }
}
.api {
  display: flex;
  .method {
    min-width: 110px;
    flex: 8;
  }
  .url {
    flex: 90;
  }
}
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
