<template>
  <n-card>
    <div class="static-data">
      <n-select
        :options="staticDataList"
        :value="formData.id"
        class="selected"
        clearable
        placeholder="请选择数据"
        @update:value="dataChangeHandler"
        @clear="clear"
      />
      <n-input v-if="mode === 'debug'" v-model:value="formData.title" class="title">
        <template #prefix>
          <x-icon name="data" />
        </template>
      </n-input>
      <n-space v-if="mode === 'debug'">
        <n-button-group class="save">
          <n-button type="primary" @click="formData.id ? handleUpdate() : handleSave()"
            >保存</n-button
          >
        </n-button-group>
      </n-space>
    </div>
    <n-tabs>
      <n-tab-pane name="data" tab="处理数据" display-directive="show">
        <DataView v-model:value="formData.afterData" />
      </n-tab-pane>
      <n-tab-pane name="origin" tab="原始数据" display-directive="show">
        <StaticDataView
          v-model:value="originData"
          :title="formData.title"
          class="content"
          :mode="mode"
          :error="errMessage"
          @update:value="originDataChange"
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
import type { SelectOption } from 'naive-ui'
import { NButton, NButtonGroup, NCard, NInput, NSelect, NSpace, NTabPane, NTabs } from 'naive-ui'
import { onMounted, reactive, ref, watch } from 'vue'

import type { StaticDataDetail } from '@/api/data'
import {
  createStaticDataApi,
  getStaticDataApi,
  getStaticDataListApi,
  updateStaticDataApi
} from '@/api/data'
import useDataSnapShot from '@/apiView/hooks/snapshot'
import { StaticKey, useEventBus } from '@/bus'
import TextareaDataView from '@/designer/data/CodeEditor.vue'
import { ScriptType } from '@/enum'
import { makeFunction } from '@/utils/data'
import { message } from '@/utils/message'

import type { AfterScript, StoreStaticOption } from '../../type'
import { Logger } from '../../utils'
import ScriptsEdtor from '../modules/ScriptsEditor'
import StaticDataView from './StaticDataView.vue'

const DataView = TextareaDataView
const staticDataList = ref<Array<SelectOption>>([])
const props = withDefaults(
  defineProps<{
    options?: StoreStaticOption
    mode?: 'debug' | 'use'
  }>(),
  {
    options: () => {
      return {
        id: '',
        title: '',
        script: {
          code: '',
          type: ScriptType.Javascript
        }
      }
    },
    mode: 'use'
  }
)
let snapShot
if (props.mode === 'debug') {
  useEventBus(StaticKey.STATIC_KEY, async (id) => {
    await dataChangeHandler(id as string)
  })
  snapShot = useDataSnapShot('STATIC', true)
}

const loadStaticList = async () => {
  try {
    const resp = await getStaticDataListApi()
    if (resp.status === 200) {
      staticDataList.value = resp.data.map((el: StaticDataDetail) => {
        return {
          label: el.name,
          value: el.id
        }
      })
    }
  } catch (err: any) {
    Logger.log(err || err.message)
  }
}

const formData = reactive<{
  id?: string
  title: string
  originData: any
  afterData: string
}>({
  id: props.options.id,
  title: props.options.title || '',
  afterData: '',
  originData: ''
})

const emits = defineEmits<{
  (e: 'dataChange', id: string, title: string): void
  (e: 'scriptChange', script: AfterScript): void
}>()

const clear = () => {
  formData.id = undefined
}
const errMessage = ref<string | undefined>(undefined)

const originDataChange = (value: any) => {
  try {
    formData.originData = JSON.parse(value)
    getAfterData(props.options.script!)
  } catch (err) {
    errMessage.value = '语法错误'
    return
  }
  originData.value = value
}

const originData = ref<string>('')
const dataChangeHandler = async (id: string) => {
  if (id) {
    const resp: StaticDataDetail | undefined = await loadStaticData(id)
    if (resp) {
      originData.value = JSON.stringify(resp.data, null, '\t')
      formData.originData = resp.data
      getAfterData(props.options.script!)
      formData.id = id
      formData.title = resp.name
      snapShot && snapShot.save({ id: id, name: resp.name })
    }
  } else {
    formData.originData = ''
    formData.afterData = ''
  }
  emits('dataChange', formData.id!, formData.title)
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

const loadStaticData = async (id: string): Promise<StaticDataDetail | undefined> => {
  try {
    const resp = await getStaticDataApi(id)
    if (resp.status === 200) {
      return resp.data
    }
  } catch (err) {
    return undefined
  }
}

const handleSave = async () => {
  try {
    const resp = await createStaticDataApi({
      data: formData.originData,
      name: formData.title || '未命名'
    })
    if (resp.status === 201) {
      const data = resp.data as StaticDataDetail
      formData.id = data.id
      formData.title = data.name
      formData.originData = data.data
      Logger.info('数据保存成功')
      await loadStaticList()
    } else {
      message.warning('数据保存失败')
    }
  } catch (err) {
    message.warning('数据保存失败')
  }
}
const handleUpdate = async () => {
  try {
    const resp = await updateStaticDataApi(formData.id!, {
      data: formData.originData,
      name: formData.title || '未命名'
    })
    if (resp.status === 200) {
      Logger.info('数据更新成功')
      await loadStaticList()
    } else {
      message.warning('数据更新失败')
    }
  } catch (err) {
    message.warning('数据更新失败')
  }
}

onMounted(async () => {
  await loadStaticList()
  await init()
})

const init = async () => {
  if (props.options && props.options.id) {
    const resp: StaticDataDetail | undefined = await loadStaticData(props.options.id)
    if (resp) {
      formData.id = resp.id!
      formData.title = resp.name
      formData.originData = resp.data
      getAfterData(props.options.script!)
      emits('dataChange', props.options.id, resp.name)
    }
  } else {
    formData.id = ''
    formData.title = ''
    formData.originData = ''
    formData.afterData = ''
  }
}

watch(
  () => props.options,
  async () => {
    await init()
  },
  {
    deep: true
  }
)
</script>

<style lang="less" scoped>
.static-data {
  display: flex;
  .selected {
    flex: 4;
  }
  .title {
    flex: 8;
  }
}
</style>
