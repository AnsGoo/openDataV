<template>
  <n-card title="静态数据" :bordered="false" size="small" role="dialog" aria-modal="true">
    <n-tabs>
      <n-tab-pane name="data" tab="处理数据">
        <DataView v-model:content="formData.afterData" class="content" :disable="true" />
      </n-tab-pane>
      <n-tab-pane name="origin" tab="原始数据">
        <StaticDataView
          v-model:content="formData.originData"
          class="content"
          @update:content="changeHandler"
        />
      </n-tab-pane>
      <n-tab-pane name="scripts" tab="脚本">
        <ScriptsEdtor :data="formData.script" class="content" @update:data="afterScriptChange" />
      </n-tab-pane>
    </n-tabs>
  </n-card>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { NTabs, NTabPane, NCard } from 'naive-ui'
import { ScriptType } from '@/components/ScriptsEditor/eunm'
import ScriptsEdtor from '@/components/ScriptsEditor'
import DataView from '@/components/DataView'
import StaticDataView from '@/components/StaticDataView'
import { AfterScript } from '@/ApiView/hooks/http/type'
const formData = reactive<{
  originData: string
  afterData: string
  script?: AfterScript
}>({
  originData: '',
  afterData: '',
  script: {
    code: 'return resp.filter(el => el.value > 50)',
    type: ScriptType.Javascript
  }
})

const changeHandler = () => {}
const afterScriptChange = () => {}
</script>

<style lang="less" scoped></style>
