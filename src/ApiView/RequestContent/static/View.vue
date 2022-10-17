<template>
  <NCard>
    <n-tabs>
      <n-tab-pane name="data" tab="处理数据" display-directive="show">
        <DataView v-model:content="formData.afterData" class="content" :disable="true" />
      </n-tab-pane>
      <n-tab-pane name="origin" tab="原始数据" display-directive="show">
        <StaticDataView
          :id="formData.id"
          :content="formData.originData"
          :title="options.title"
          class="content"
          @change="dataChangeHandler"
        />
      </n-tab-pane>
      <n-tab-pane name="scripts" tab="脚本" display-directive="show">
        <ScriptsEdtor :data="options.script" class="content" @update:data="scriptChangeHandler" />
      </n-tab-pane>
    </n-tabs>
  </NCard>
</template>

<script lang="ts" setup>
import { onMounted, reactive, watch } from 'vue'
import { NTabs, NTabPane, NCard } from 'naive-ui'
import { ScriptType } from '@/components/ScriptsEditor/eunm'
import ScriptsEdtor from '@/components/ScriptsEditor'
import DataView from '@/components/DataView'
import StaticDataView from '@/components/StaticDataView'
import { AfterScript } from '@/apiView/hooks/http/type'
import type { StaticRequestOptions } from './type'
import { getStaticDataApi, StaticDataDetail } from '@/api/data'
import { makeFunction } from '@/utils/data'
const props = withDefaults(
  defineProps<{
    options?: StaticRequestOptions
  }>(),
  {
    options: () => {
      return {
        dataId: '',
        title: '',
        script: {
          code: '',
          type: ScriptType.Javascript
        }
      }
    }
  }
)

const formData = reactive<{
  id: string
  title: string
  originData: any
  afterData: string
}>({
  id: props.options.dataId,
  title: props.options.title || '',
  afterData: '',
  originData: ''
})

const emits = defineEmits<{
  (e: 'dataChange', id: string, title: string): void
  (e: 'scriptChange', script: AfterScript): void
}>()

const dataChangeHandler = async (id: string, title: string) => {
  if (id) {
    const resp: StaticDataDetail | undefined = await loadStaicData(id)
    if (resp) {
      formData.originData = resp.data
      getAfterData(props.options.script)
    }
  } else {
    formData.originData = ''
    formData.afterData = ''
  }
  formData.id = id
  formData.title = title
  emits('dataChange', id, title)
}

const scriptChangeHandler = async (script: AfterScript) => {
  getAfterData(script)
  emits('scriptChange', script)
}

const getAfterData = (script: AfterScript) => {
  const afterCallback =
    script && script.code
      ? makeFunction(script.type, script.code, ['resp', 'options'], false)
      : undefined
  if (afterCallback && afterCallback.handler) {
    try {
      formData.afterData = JSON.stringify(
        afterCallback.handler(formData.originData, {}),
        null,
        '\t'
      )
    } catch (err: any) {
      formData.afterData = err.message || err
    }
  } else {
    formData.afterData = JSON.stringify(formData.originData, null, '\t')
  }
}

const loadStaicData = async (id: string): Promise<StaticDataDetail | undefined> => {
  try {
    const resp = await getStaticDataApi(id)
    if (resp.status === 200) {
      return resp.data
    }
  } catch (err) {
    return undefined
  }
}

onMounted(async () => {
  if (props.options && props.options.dataId) {
    const resp: StaticDataDetail | undefined = await loadStaicData(props.options.dataId)
    if (resp) {
      formData.id = resp.id!
      formData.title = resp.name
      formData.originData = resp.data
      getAfterData(props.options.script)
      emits('dataChange', props.options.dataId, resp.name)
    }
  }
})

watch(
  () => props.options,
  () => {
    if (props.options && props.options.dataId) {
      formData.id = props.options.dataId
      formData.title = props.options.title || ''
    }
  }
)
</script>

<style lang="less" scoped></style>
