<template>
  <RestPanel :data-instance="dataInstance">
    <template #data-select>
      <div class="flex flex-nowrap flex-row">
        <n-select
          :options="restDataList"
          :value="formData.id"
          class="selected"
          clearable
          placeholder="请选择数据"
          @update:value="selectedChange"
          @clear="clear"
        />
        <n-input v-model:value="formData.title" class="title">
          <template #prefix>
            <x-icon name="api" />
          </template>
        </n-input>
        <n-space>
          <n-button-group class="save">
            <n-button @click="formData.id ? handleUpdate() : handleSave()">保存</n-button>
          </n-button-group>
        </n-space>
      </div>
    </template>
  </RestPanel>
</template>

<script lang="ts" setup>
import type { DataInstance } from '@open-data-v/base'
import { uuid } from '@open-data-v/base'
import { KVToRecordable, recordabletoKV, RequestMethod, RestPanel } from '@open-data-v/data'
import type { SelectOption } from 'naive-ui'
import { NButton, NButtonGroup, NInput, NSelect, NSpace } from 'naive-ui'
import { onMounted, reactive, ref } from 'vue'

import {
  createRestDataApi,
  getRestDataApi,
  getRestDataListApi,
  updateRestDataApi
} from '@/api/data'
import type { RestDataDetail } from '@/api/data/type'
import { message } from '@/utils/message'
import { Logger } from '@/utils/utils'

defineProps<{
  dataInstance: DataInstance
}>()

const formData = reactive<any>({
  id: undefined,
  title: undefined,
  headers: [{ key: '', value: '', disable: false, id: uuid() }],
  params: [{ key: '', value: '', disable: false, id: uuid() }],
  data: [{ key: '', value: '', disable: false, id: uuid() }],
  method: RequestMethod.GET,
  url: ''
})

const getEmptyParams = () => {
  return [{ key: '', value: '', disable: false, id: uuid() }]
}
const restDataList = ref<Array<SelectOption>>([])
const loadRestList = async () => {
  try {
    const resp = await getRestDataListApi()
    if (resp.status === 200) {
      restDataList.value = resp.data.map((el: RestDataDetail) => {
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
const loadRestData = async (id: string) => {
  try {
    const resp = await getRestDataApi(id)
    if (resp.status === 200) {
      const data: RestDataDetail = resp.data
      formData.method = data.method
      formData.url = data.url
      const body = recordabletoKV(data.data || {})
      formData.data = body.length > 0 ? body : getEmptyParams()
      const params = recordabletoKV(data.params || {})
      formData.params = params.length > 0 ? params : getEmptyParams()
      formData.title = data.name
      formData.id = data.id!

      const headers = recordabletoKV(data.headers || {})
      formData.headers = headers.length > 0 ? headers : getEmptyParams()
    }
  } catch (err) {
    return undefined
  }
}

const clear = () => {
  formData.id = undefined
  formData.title = undefined
  formData.headers = [{ key: '', value: '', disable: false, id: uuid() }]
  formData.data = [{ key: '', value: '', disable: false, id: uuid() }]
  formData.params = [{ key: '', value: '', disable: false, id: uuid() }]
  formData.method = RequestMethod.GET
  formData.url = ''
}

const selectedChange = async (id: string) => {
  await loadRestData(id)
}
const handleSave = async () => {
  try {
    const headers = KVToRecordable(formData.headers)
    const params = KVToRecordable(formData.params)
    const data = KVToRecordable(formData.data)
    const resp = await createRestDataApi({
      data: data,
      name: formData.title || '未命名',
      url: formData.url,
      method: formData.method,
      headers: headers,
      params: params
    })
    if (resp.status === 201) {
      const data: RestDataDetail = resp.data
      formData.id = data.id!
      formData.title = data.name
      message.info('数据保存成功')
    } else {
      message.warning('数据保存失败')
    }
  } catch (err) {
    message.warning('数据保存失败')
  }
}
const handleUpdate = async () => {
  try {
    const headers = KVToRecordable(formData.headers)
    const params = KVToRecordable(formData.headers)
    const data = KVToRecordable(formData.data)
    const resp = await updateRestDataApi(formData.id!, {
      data: data,
      name: formData.title || '未命名',
      url: formData.url,
      method: formData.method,
      headers: headers,
      params: params
    })
    if (resp.status === 200) {
      message.info('数据更新成功')
    } else {
      message.warning('数据更新失败')
    }
  } catch (err) {
    message.warning('数据更新失败')
  }
}

onMounted(async () => {
  await loadRestList()
})
</script>
