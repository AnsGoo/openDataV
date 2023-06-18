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
        <n-tab-pane name="data" tab="脚本处理结果" display-directive="show">
          <OCodeEditor :value="response.afterData" class="content" />
        </n-tab-pane>
        <n-tab-pane name="origin" tab="原始数据结果" display-directive="show">
          <OCodeEditor :value="response.data" class="content" />
        </n-tab-pane>
        <n-tab-pane name="scripts" tab="脚本" display-directive="show">
          <ScriptsEditor
            :data="formData.afterScript"
            :mode="mode"
            class="content"
            @update:data="afterScriptChange"
          />
        </n-tab-pane>
      </n-tabs>
    </div>
  </n-card>
</template>
<script setup lang="ts">
import { NButton, NButtonGroup, NCard, NInput, NSpace, NTabPane, NTabs } from 'naive-ui'
import { onUnmounted, reactive, ref } from 'vue'

import type { CallbackType } from '@/utils/data'
import { makeFunction } from '@/utils/data'

import ScriptsEditor from '../components/ScriptsEditor.vue'
import { ScriptType } from '../const'
import type { AfterScript, WebsocketOption } from '../type'
import { Logger } from '../utils'

const props = withDefaults(
  defineProps<{
    options?: WebsocketOption
    mode?: 'debug' | 'use'
  }>(),
  {
    options: () => {
      return {
        url: '',
        message: '',
        afterScript: {
          code: '',
          type: ScriptType.Javascript
        },
        timeout: 3000,
        isRetry: false,
        retryCount: 0
      }
    },
    mode: 'use'
  }
)

const emits = defineEmits<{
  (e: 'update:options', value: WebsocketOption): void
  (e: 'change', value: WebsocketOption): void
}>()
let callback: CallbackType | undefined
const formData = reactive<WebsocketOption>(props.options)
const response = ref({
  data: '',
  afterData: ''
})
let wsInstance: WebSocket

const connect = () => {
  if (wsInstance) {
    wsInstance.close()
  }
  wsInstance = new WebSocket(formData.url)
  wsInstance.onopen = () => {
    Logger.info('wsOpen')
  }
  const handlerData = (message) => {
    if (callback && callback.handler) {
      response.value.data = message.data
      const data = JSON.parse(message.data)
      const afterData = callback.handler(data, {})
      response.value.afterData = JSON.stringify(afterData, null, '\t')
    }
  }
  wsInstance.onmessage = handlerData
  wsInstance.onerror = (err) => {
    Logger.error(err)
    wsInstance.close()
  }
}
const send = () => {
  wsInstance.send(formData.message)
}
const formChange = () => {
  emits('change', formData)
  emits('update:options', formData)
}

const close = () => {
  wsInstance.close()
}

defineExpose({ close })
const afterScriptChange = (data: AfterScript) => {
  formData.afterScript = data
  callback =
    data && data.code ? makeFunction(data.type, data.code, ['resp', 'options'], false) : undefined
  formChange()
}

onUnmounted(() => {
  wsInstance.close()
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
