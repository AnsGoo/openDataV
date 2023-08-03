<template>
  <n-card>
    <div class="rest-data">
      <slot name="data-select"></slot>
    </div>
    <div class="api">
      <n-input v-model:value="formData['url']" class="url" @update-value="formChange" />
      <n-space>
        <n-button-group class="send">
          <n-button type="primary" @click="connect">链接</n-button>
          <n-button @click="send">发送</n-button>
        </n-button-group>
      </n-space>
    </div>
    <div class="config">
      <n-tabs type="line" animated>
        <n-tab-pane name="query" tab="消息" display-directive="show">
          <div class="params">
            <OCodeEditor v-model:value="formData.message" class="content" height="100px" />
          </div>
        </n-tab-pane>
      </n-tabs>
    </div>
    <div class="response">
      <n-tabs>
        <n-tab-pane name="origin" tab="原始数据结果" display-directive="show">
          <OCodeEditor :value="response.data" class="content" />
        </n-tab-pane>
      </n-tabs>
    </div>
  </n-card>
</template>
<script setup lang="ts">
import { NButton, NButtonGroup, NCard, NInput, NSpace, NTabPane, NTabs } from 'naive-ui'
import { dataLogger } from 'open-data-v/apiView/utils'
import { onUnmounted, reactive, ref } from 'vue'

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
