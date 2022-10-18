<template>
  <n-card>
    <div class="static-data">
      <n-select
        :options="staticDataList"
        :value="formData.id"
        class="selected"
        @update:value="dataChangeHandler"
        clearable
        @clear="clear"
      />
      <n-input v-model:value="formData.title" class="title">
        <template #prefix>
          <IconPark name="data" />
        </template>
      </n-input>
      <n-space>
        <n-button-group class="save">
          <n-button @click="formData.id ? handleUpdate : handleSave" type="primary">保存</n-button>
        </n-button-group>
      </n-space>
    </div>
    <n-tabs>
      <n-tab-pane name="data" tab="处理数据" display-directive="show">
        <DataView v-model:content="formData.afterData" class="content" :disable="true" />
      </n-tab-pane>
      <n-tab-pane name="origin" tab="原始数据" display-directive="show">
        <StaticDataView
          :content="formData.originData"
          :title="formData.title"
          class="content"
          @update:content="originDataChange"
        />
      </n-tab-pane>
      <n-tab-pane name="scripts" tab="脚本" display-directive="show">
        <ScriptsEdtor :data="options.script" class="content" @update:data="scriptChangeHandler" />
      </n-tab-pane>
    </n-tabs>
  </n-card>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref, watch } from 'vue'
import { NTabs, NTabPane, NCard, NSelect, NSpace, NButtonGroup, NButton, NInput } from 'naive-ui'
import type { SelectOption } from 'naive-ui'
import { ScriptType } from '@/components/ScriptsEditor/eunm'
import ScriptsEdtor from '@/components/ScriptsEditor'
import DataView from '@/components/DataView'
import StaticDataView from '@/components/StaticDataView'
import { AfterScript } from '@/ApiView/hooks/http/type'
import { message } from '@/utils/message'
import type { StaticRequestOptions } from './type'
import {
  createStaticDataApi,
  getStaticDataApi,
  getStaticDataListApi,
  StaticDataDetail,
  updateStaticDataApi
} from '@/api/data'
import { makeFunction } from '@/utils/data'
import { useEventBus, StaticKey } from '@/bus'
import useDataSnapShot from '@/ApiView/hooks/snapshot'

const staticDataList = ref<Array<SelectOption>>([])
const props = withDefaults(
  defineProps<{
    options?: StaticRequestOptions
    mode?: 'debug' | 'use'
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
    },
    mode: 'use'
  }
)
let snapShot
if (props.mode === 'debug') {
  useEventBus(StaticKey.STATIC_KEY, async (id: any) => {
    id as unknown as string
    await dataChangeHandler(id)
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
    console.log(err || err.message)
  }
}

const formData = reactive<{
  id?: string
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

const clear = () => {
  formData.id = undefined
}

const originDataChange = (value: any) => {
  formData.originData = value
  getAfterData(props.options.script)
}
const dataChangeHandler = async (id: string) => {
  if (id) {
    const resp: StaticDataDetail | undefined = await loadStaicData(id)
    if (resp) {
      formData.originData = resp.data
      getAfterData(props.options.script)
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
      message.success('数据保存成功')
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
      message.success('数据更新成功')
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

<style lang="less" scoped>
.static-data {
  display: flex;
  .selected {
    width: 300px;
  }
}
</style>
