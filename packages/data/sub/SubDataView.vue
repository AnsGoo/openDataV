<template>
  <o-card>
    <div>
      <slot name="data-select"></slot>
    </div>
    <o-form>
      <o-form-item key="channel" label="数据通道">
        <o-input v-model:value="channel" @update:value="channelChange" />
      </o-form-item>
    </o-form>
  </o-card>
</template>

<script lang="ts" setup>
import { OCard, OForm, OFormItem, OInput } from '@open-data-v/ui'
import { ref } from 'vue'

const props = withDefaults(
  defineProps<{
    options?: {
      channel: string
    }
    title?: string
    mode?: 'debug' | 'use'
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
const channel = ref<string>(props.options.channel)
const emits = defineEmits<{
  (e: 'update:options', value: { data: string }): void
  (e: 'channelChange', value: string): void
}>()
const channelChange = (value: string) => {
  channel.value = value
  emits('channelChange', value)
}
</script>
