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
    <ScriptsEdtor
      :data="options.script"
      class="content"
      :mode="mode"
      @update:data="scriptChangeHandler"
    />
  </n-card>
</template>

<script lang="ts" setup>
import { NCard, NForm, NFormItem, NInput } from 'naive-ui'
import { onMounted, ref } from 'vue'

import { ScriptType } from '@/enum'
import type { CallbackType } from '@/utils/data'
import { makeFunction } from '@/utils/data'

import ScriptsEdtor from '../components/ScriptsEditor.vue'
import type { AfterScript } from '../type'

const props = withDefaults(
  defineProps<{
    options?: {
      script: AfterScript
      channel: string
    }
    title?: string
    mode?: 'debug' | 'use'
  }>(),
  {
    title: '',
    options: () => {
      return {
        channel: '',
        script: {
          code: '',
          type: ScriptType.Javascript
        }
      }
    },
    mode: 'debug'
  }
)
const afterCallback = ref<CallbackType | undefined>(undefined)

const channel = ref<string>(props.options.channel)
const emits = defineEmits<{
  (e: 'update:options', value: { script?: AfterScript; data: string }): void
  (e: 'channelChange', value: string): void
  (e: 'scriptChange', script: AfterScript): void
}>()
const channelChange = (value: string) => {
  channel.value = value
  emits('channelChange', value)
}

const scriptChangeHandler = async (script: AfterScript) => {
  getScriptChangeHandler(script)
  emits('scriptChange', script)
}

const getScriptChangeHandler = (script: AfterScript) => {
  afterCallback.value =
    script && script.code
      ? makeFunction(script.type, script.code, ['resp', 'options'], false)
      : undefined
}

onMounted(() => {
  getScriptChangeHandler(props.options.script)
})
</script>
