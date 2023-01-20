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
        <DataView v-model:content="formData.afterData" class="content" :disable="true" />
      </n-tab-pane>
      <n-tab-pane name="origin" tab="原始数据" display-directive="show">
        <StaticDataView
          :content="formData.originData"
          :title="formData.title"
          class="content"
          :mode="mode"
          @update:content="originDataChange"
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
import { onMounted, reactive, ref, watch } from 'vue'
import { NTabs, NTabPane, NCard, NSelect, NSpace, NButtonGroup, NButton, NInput } from 'naive-ui'
import type { SelectOption } from 'naive-ui'
import { ScriptType } from '@/enum'
import ScriptsEdtor from '../modules/ScriptsEditor'
import DataView from '@/components/DataView'
import StaticDataView from '@/components/StaticDataView'
import { message } from '@/utils/message'
import type { StaticRequestOptions } from './type'
import type { StaticDataDetail } from '@/api/data'
import {
  createStaticDataApi,
  getStaticDataApi,
  getStaticDataListApi,
  updateStaticDataApi
} from '@/api/data'
import { makeFunction } from '@/utils/data'
import { useEventBus, StaticKey } from '@/bus'
import useDataSnapShot from '@/apiView/hooks/snapshot'
import type { AfterScript } from '@/types/component'

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
    const resp: StaticDataDetail | undefined = await loadStaticData(id)
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
  await init()
})

const init = async () => {
  if (props.options && props.options.dataId) {
    const resp: StaticDataDetail | undefined = await loadStaticData(props.options.dataId)
    if (resp) {
      formData.id = resp.id!
      formData.title = resp.name
      formData.originData = resp.data
      getAfterData(props.options.script)
      emits('dataChange', props.options.dataId, resp.name)
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
