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
import { OButton, OButtonGroup, OCard, OInput } from '@open-data-v/ui'
import { onUnmounted, reactive, ref } from 'vue'

import type WebsocketData from './handler'
import type { WebsocketOption } from './type'

const props = withDefaults(
  defineProps<{
    dataInstance: dataInstance
    options?: WebsocketOption
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
    }
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

const close = () => {
  if (props.dataInstance) {
    props.dataInstance.close()
  }
}

const connect = () => {
  if (!props.dataInstance) {
    return
  }
  props.dataInstance.debug((data) => {
    response.value.data = JSON.stringify(data)
  })
}
const send = () => {
  props.dataInstance.send(formData.message)
}
const formChange = () => {
  emits('change', formData)
  emits('update:options', formData)
}

defineExpose({ close })

onUnmounted(() => {
  if (!props.dataInstance) {
    return
  }
  props.dataInstance.cancelDebug()
})
</script>
