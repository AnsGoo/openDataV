<template>
  <StaticContent
    :title="formData.title"
    :options="staticDataOptions"
    :mode="mode"
    @save="handleSaveOrUpdate"
  >
    <template #data-select>
      <n-select
        v-model:value="formData.id"
        :options="staticDataList"
        class="selected"
        clearable
        placeholder="请选择数据"
        @update:value="dataChangeHandler"
        @clear="clear"
      />
      <n-input-group v-if="mode === 'debug'">
        <n-input v-model:value="formData.title" class="title">
          <template #prefix>
            <x-icon name="data" />
          </template>
        </n-input>
        <n-button type="primary" @click="handleSave">保存</n-button>
      </n-input-group>
    </template>
  </StaticContent>
</template>

<script lang="ts" setup>
import type { SelectOption } from 'naive-ui'
import { NButton, NInput, NInputGroup, NSelect } from 'naive-ui'
import { onMounted, reactive, ref, watch } from 'vue'

import type { StaticDataDetail } from '@/api/data'
import {
  createStaticDataApi,
  getStaticDataApi,
  getStaticDataListApi,
  updateStaticDataApi
} from '@/api/data'
import StaticContent from '@/apiView/static/DataView.vue'
import type { StoreStaticOption } from '@/apiView/type'
import { StaticKey, useEventBus } from '@/bus'
import { message } from '@/utils/message'

const Logger = console
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
          type: 'Javascript'
        }
      }
    },
    mode: 'debug'
  }
)
if (props.mode === 'debug') {
  useEventBus(StaticKey.STATIC_KEY, async (id) => {
    await dataChangeHandler(id as string)
  })
}

const staticDataOptions = reactive<{ data: string }>({
  data: ''
})

const loadStaticList = async () => {
  try {
    const resp = await getStaticDataListApi()
    if (resp.status === 200) {
      staticDataList.value = resp.data.map((el: StaticDataDetail) => {
        return {
          label: el.name,
          value: el.id.toString()
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
}>({
  id: props.options.id,
  title: props.options.title || '',
  originData: ''
})

const emits = defineEmits<{
  (e: 'dataChange', id: string, title: string): void
}>()

const clear = () => {
  formData.id = undefined
}

const dataChangeHandler = async (id: string) => {
  if (id) {
    const resp: StaticDataDetail | undefined = await loadStaticData(id)
    if (resp) {
      staticDataOptions.data = JSON.stringify(resp.data, null, '\t')
      formData.originData = resp.data
      formData.id = id
      formData.title = resp.name
    }
  } else {
    staticDataOptions.data = ''
    formData.originData = ''
  }
  emits('dataChange', formData.id!, formData.title)
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
      formData.id = data.id.toString()
      formData.title = data.name
      formData.originData = data.data
      staticDataOptions.data = JSON.stringify(data.data, null, '\t')
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

const handleSaveOrUpdate = async () => {
  formData.id ? handleSave() : handleUpdate()
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
      staticDataOptions.data = JSON.stringify(formData.originData, null, '\t')
      emits('dataChange', props.options.id, resp.name)
    }
  } else {
    formData.id = ''
    formData.title = ''
    formData.originData = ''
    staticDataOptions.data = ''
  }
}

watch(
  () => props.options.id,
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
