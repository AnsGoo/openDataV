<template>
  <n-card>
    <div class="static-data">
      <slot name="data-select"></slot>
    </div>
    <n-form>
      <n-form-item key="channel" label="数据通道">
        <n-input v-model:value="channel" @update:value="channelChange" />
      </n-form-item>
    </n-form>
  </n-card>
</template>

<script lang="ts" setup>
import { NCard, NForm, NFormItem, NInput } from 'naive-ui'
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
