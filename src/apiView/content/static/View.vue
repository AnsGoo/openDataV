<template>
  <n-card>
    <div class="static-data">
      <slot name="data-select"></slot>
    </div>
    <n-tabs>
      <n-tab-pane name="data" tab="处理数据" display-directive="show">
        <OCodeEditor v-model:value="afterData" :disabled="true" />
      </n-tab-pane>
      <n-tab-pane name="origin" tab="原始数据" display-directive="show">
        <StaticDataView
          :data="originData"
          :title="title"
          class="content"
          :mode="mode"
          :error="errMessage"
          @update:data="originDataChange"
        />
      </n-tab-pane>
      <n-tab-pane name="scripts" tab="脚本" display-directive="show">
        <ScriptsEdtor
          :data="options.script"
          class="content"
          :mode="mode"
          @update:data="scriptChangeHandler"
        />
      </n-tab-pane>
    </n-tabs>
  </n-card>
</template>

<script lang="ts" setup>
import { NCard, NTabPane, NTabs } from 'naive-ui'
import { computed, onMounted, ref } from 'vue'

import { ScriptType } from '@/enum'
import type { CallbackType } from '@/utils/data'
import { makeFunction } from '@/utils/data'

import ScriptsEdtor from '../../components/ScriptsEditor.vue'
import type { AfterScript } from '../../type'
import StaticDataView from './StaticDataView.vue'

const props = withDefaults(
  defineProps<{
    options?: {
      script: AfterScript
      data: string
    }
    title?: string
    mode?: 'debug' | 'use'
  }>(),
  {
    title: '',
    options: () => {
      return {
        data: '',
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

const afterData = computed(() => {
  let parseData
  try {
    parseData = JSON.parse(props.options.data)
  } catch (err: any) {
    return props.options.data
  }
  if (afterCallback.value && afterCallback.value.handler) {
    try {
      return JSON.stringify(afterCallback.value.handler(parseData, {}), null, '\t')
    } catch (err: any) {
      return (err.message || err).toString()
    }
  } else {
    return JSON.stringify(parseData, null, '\t')
  }
})

const emits = defineEmits<{
  (e: 'update:options', value: { script?: AfterScript; data: string }): void
  (e: 'dataChange', value: string): void
  (e: 'scriptChange', script: AfterScript): void
}>()

const errMessage = ref<string | undefined>(undefined)

const originData = computed<string>(() => {
  return props.options.data
})

const originDataChange = (value: string) => {
  emits('dataChange', value)
  errMessage.value = undefined
  try {
    JSON.parse(value)
  } catch (err) {
    errMessage.value = '语法错误'
    return
  }
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
