<template>
  <o-card>
    <div>
      <slot name="data-select"></slot>
    </div>
    <o-form>
      <o-form-item key="channel" label="数据通道">
        <div class="justify-center flex-row flex-nowrap flex items-center w-full">
          <o-input v-model:value="channel" class="flex-1" @update:value="channelChange" />
          <o-button type="primary" @click="lister">监听</o-button>
        </div>
      </o-form-item>
    </o-form>
    <o-card name="origin" title="原始数据结果">
      <OCodeEditor :value="response.data" :readonly="true" />
    </o-card>
  </o-card>
</template>

<script lang="ts" setup>
import type { DataInstance } from '@open-data-v/base'
import { OButton, OCard, OForm, OFormItem, OInput } from '@open-data-v/ui'
import { onUnmounted, ref } from 'vue'

const props = withDefaults(
  defineProps<{
    options?: {
      channel: string
    }
    title?: string
    mode?: 'debug' | 'use'
    dataInstance?: DataInstance
  }>(),
  {
    title: '',
    options: () => {
      return {
        channel: ''
      }
    },
    mode: 'debug'
  }
)
const response = ref({
  data: ''
})
const channel = ref<string>(props.options.channel)
const emits = defineEmits<{
  (e: 'update:options', value: { channel: string }): void
  (e: 'channelChange', value: { channel: string }): void
}>()
const channelChange = (value: string) => {
  channel.value = value
  emits('channelChange', { channel: value })
}

const lister = () => {
  if (!props.dataInstance) {
    return
  }
  props.dataInstance.debug((data) => {
    response.value.data = JSON.stringify(data)
  })
}

onUnmounted(() => {
  if (props.dataInstance) {
    props.dataInstance.disposeDebug()
  }
})
</script>
