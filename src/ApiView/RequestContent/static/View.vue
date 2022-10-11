<template>
  <n-tabs>
    <n-tab-pane name="data" tab="处理数据">
      <DataView v-model:content="formData.afterData" class="content" :disable="true" />
    </n-tab-pane>
    <n-tab-pane name="origin" tab="原始数据">
      <StaticDataView
        v-model:id="formData.dataId"
        :content="formData.originData"
        class="content"
        @update:id="changeHandler"
      />
    </n-tab-pane>
    <n-tab-pane name="scripts" tab="脚本">
      <ScriptsEdtor :data="formData.script" class="content" @update:data="afterScriptChange" />
    </n-tab-pane>
  </n-tabs>
</template>

<script lang="ts" setup>
import { onMounted, reactive } from 'vue'
import { NTabs, NTabPane } from 'naive-ui'
import { ScriptType } from '@/components/ScriptsEditor/eunm'
import ScriptsEdtor from '@/components/ScriptsEditor'
import DataView from '@/components/DataView'
import StaticDataView from '@/components/StaticDataView'
import { AfterScript } from '@/ApiView/hooks/http/type'
import type { StaticRequestOptions } from './type'
import { getStaticData } from '@/api/data'
import { makeFunction } from '@/utils/data'
const props = withDefaults(
  defineProps<{
    staticOptions?: StaticRequestOptions
  }>(),
  {
    staticOptions: () => {
      return {
        dataId: '',
        script: {
          code: 'return resp.filter(el => el.value > 4)',
          type: ScriptType.Javascript
        }
      }
    }
  }
)

const formData = reactive<{
  dataId: string
  originData: any
  afterData: string
  script?: AfterScript
}>({
  dataId: (props.staticOptions && props.staticOptions.dataId) || '',
  afterData: '',
  originData: '',
  script: {
    code: 'return resp.filter(el => el.value > 50)',
    type: ScriptType.Javascript
  }
})

const emits = defineEmits<{
  (e: 'update:options', options: StaticRequestOptions): void
  (e: 'change', options: StaticRequestOptions): void
}>()

const changeHandler = async (id: string) => {
  formData.dataId = id
  formData.originData = await loadStaicData(id)
  getAfterData()
}

const afterScriptChange = (script: AfterScript) => {
  formData.script = script
  getAfterData()
}

const getAfterData = () => {
  const afterCallback = formData.script
    ? makeFunction(formData.script.type, formData.script.code, ['resp', 'options'], false)
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
  }

  emits('update:options', {
    dataId: formData.dataId!,
    script: formData.script!
  })
  emits('change', {
    dataId: formData.dataId,
    script: formData.script!
  })
}

const loadStaicData = async (id: string) => {
  try {
    const resp = await getStaticData(id)
    if (resp.status === 200) {
      return resp.data
    }
  } catch (err) {
    return ''
  }
}

onMounted(async () => {
  if (props.staticOptions && props.staticOptions.dataId) {
    formData.originData = await loadStaicData(props.staticOptions.dataId)
    getAfterData()
    emits('update:options', {
      dataId: props.staticOptions.dataId!,
      script: props.staticOptions.script!
    })
  }
})
</script>

<style lang="less" scoped></style>
