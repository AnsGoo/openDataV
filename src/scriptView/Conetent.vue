<template>
  <n-card>
    <div class="static-data">
      <n-input v-model:value="formData.title" class="title">
        <template #prefix>
          <x-icon name="code" />
        </template>
      </n-input>
      <n-space>
        <n-button-group class="save">
          <n-button type="success" @click="run">运行</n-button>
        </n-button-group>
      </n-space>
      <n-space>
        <n-button-group class="save">
          <n-button @click="formData.id ? handleUpdate() : handleSave()">保存</n-button>
        </n-button-group>
      </n-space>
    </div>
    <n-card>
      <n-tabs>
        <n-tab-pane name="脚本">
          <Editor
            :data="scriptData"
            class="content"
            :config="config"
            @update:data="scriptChangeHandler"
          />
        </n-tab-pane>
        <n-tab-pane name="入参">
          <DataView
            v-model:content="params"
            class="content"
            :config="config"
            @update:content="paramsChange"
          />
        </n-tab-pane>
      </n-tabs>
      <n-divider title-placement="left"> 输出 </n-divider>
      <DataView v-model:content="stdOut" class="content" :disable="true" :config="config" />
    </n-card>
  </n-card>
</template>

<script lang="ts" setup>
import { computed, reactive, ref } from 'vue'
import { NCard, NSpace, NButtonGroup, NButton, NInput, NDivider, NTabs, NTabPane } from 'naive-ui'
import DataView from '@/components/DataView'
import { message } from '@/utils/message'
import Editor from './Editor.vue'
import { useEventBus, StaticKey } from '@/bus'
import {
  getAfterScriptApi,
  updateAfterScriptApi,
  createAfterScriptApi
} from '@/api/data/afterScript'
import { makeFunction } from '@/utils/data'
import type { AfterScriptDetail } from '@/api/data/type'
import { ScriptType } from '@/enum'
import type { AfterScript } from '@/types/component'

const config = ref({
  height: '300px',
  tabSize: 4,
  indentWithTab: true,
  autofocus: true,
  disabled: false
})

const formData = reactive<{
  id?: string
  title: string
  code: any
  type: ScriptType
}>({
  id: '',
  title: '' || '',
  code: '',
  type: ScriptType.Javascript
})

const params = ref<string>(JSON.stringify({}, null, '\t'))
const paramsChange = (content: string) => {
  params.value = content
}

const scriptChangeHandler = async (script: AfterScript) => {
  formData.code = script.code
  formData.type = script.type
}

useEventBus(StaticKey.SRCIPT_KEY, async (id) => {
  await loadAfterScript(id as string)
})

const stdOut = ref<string>('')
const scriptData = computed<AfterScript>(() => {
  return {
    code: formData.code,
    type: formData.type
  }
})

const run = () => {
  const afterCallback = formData.code
    ? makeFunction(formData.type, formData.code, ['resp', 'options'], false)
    : undefined
  if (afterCallback && afterCallback.handler) {
    try {
      stdOut.value = JSON.stringify(afterCallback.handler(JSON.parse(params.value), {}), null, '\t')
    } catch (err: any) {
      stdOut.value = err.message || err
    }
  } else {
    stdOut.value = JSON.stringify(formData.code, null, '\t')
  }
}

const loadAfterScript = async (id: string) => {
  try {
    const resp = await getAfterScriptApi(id)
    if (resp.status === 200) {
      const data = resp.data
      formData.id = data.id
      formData.title = data.name
      formData.code = data.code
      formData.type = data.type
    }
  } catch (err: any) {
    console.log(err || err.message)
  }
}
const handleSave = async () => {
  try {
    const resp = await createAfterScriptApi({
      code: formData.code,
      name: formData.title || '未命名',
      type: formData.type
    })
    if (resp.status === 201) {
      const data = resp.data as AfterScriptDetail
      formData.id = data.id
      formData.title = data.name
      formData.code = data.code
      formData.type = data.type
      message.success('数据保存成功')
    } else {
      message.warning('数据保存失败')
    }
  } catch (err) {
    message.warning('数据保存失败')
  }
}
const handleUpdate = async () => {
  try {
    const resp = await updateAfterScriptApi(formData.id!, {
      code: formData.code,
      name: formData.title || '未命名',
      type: formData.type
    })
    if (resp.status === 200) {
      message.success('数据更新成功')
    } else {
      message.warning('数据更新失败')
    }
  } catch (err) {
    message.warning('数据更新失败')
  }
}
</script>

<style lang="less" scoped>
.static-data {
  display: flex;
  .selected {
    width: 300px;
  }
}
</style>
