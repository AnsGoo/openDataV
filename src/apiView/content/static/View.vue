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
          :value="originData"
          :title="title"
          class="content"
          :mode="mode"
          :error="errMessage"
          @update:value="originDataChange"
        />
      </n-tab-pane>
      <n-tab-pane name="scripts" tab="脚本" display-directive="show">
        <ScriptsEdtor
          :data="script"
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
    id?: string
    title?: string
    script?: AfterScript
    data?: any
    mode?: 'debug' | 'use'
  }>(),
  {
    id: '',
    title: '',
    script: () => {
      return {
        code: '',
        type: ScriptType.Javascript
      }
    },
    mode: 'debug',
    data: ''
  }
)
const afterCallback = ref<CallbackType | undefined>(undefined)

const afterData = computed(() => {
  if (afterCallback.value && afterCallback.value.handler) {
    try {
      return JSON.stringify(afterCallback.value.handler(props.data, {}), null, '\t')
    } catch (err: any) {
      return err.message || err
    }
  } else {
    return JSON.stringify(props.data, null, '\t')
  }
})

const emits = defineEmits<{
  (e: 'dataChange', value: string): void
  (e: 'scriptChange', script: AfterScript): void
}>()

const errMessage = ref<string | undefined>(undefined)

const originData = computed<string>(() => JSON.stringify(props.data, null, '\t'))

const originDataChange = (value: any) => {
  try {
    JSON.parse(value)
    emits('dataChange', value)
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
  getScriptChangeHandler(props.script)
})
</script>
