<template>
  <StaticPanel :data-instance="dataInstance">
    <template #data-select>
      <n-select
        v-model:value="formData.dataId"
        :options="staticDataList"
        class="selected mb-1"
        clearable
        placeholder="请选择数据"
        @update:value="dataChangeHandler"
        @clear="clear"
      >
        <template #arrow>
          <x-icon name="data" />
        </template>
      </n-select>
      <n-input-group>
        <n-input v-model:value="formData.title" class="title">
          <template #prefix>
            <x-icon name="data" />
          </template>
        </n-input>
        <n-button type="primary" @click="handleSaveOrUpdate">保存</n-button>
      </n-input-group>
    </template>
  </StaticPanel>
</template>

<script lang="ts" setup>
import type { DataInstance } from '@open-data-v/base'
import { StaticPanel } from '@open-data-v/data'
import { NButton, NInput, NInputGroup, NSelect } from 'naive-ui'
import { computed, onMounted, reactive, ref } from 'vue'

import type { StaticDataDetail } from '@/api/data'
import {
  createStaticDataApi,
  getStaticDataApi,
  getStaticDataListApi,
  updateStaticDataApi
} from '@/api/data'
import { message } from '@/utils/message'

const Logger = console

const props = defineProps<{
  dataInstance: DataInstance
}>()

const staticDataList = ref<Array<SelectOption>>([])

const formData = reactive<{
  dataId: string
  title: string
  data: string
}>({
  dataId: '',
  title: '',
  data: ''
})
const dataInstance = computed(() => props.dataInstance)

const clear = () => {
  formData.dataId = undefined
}

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

const handleSave = async () => {
  try {
    const resp = await createStaticDataApi({
      data: formData.originData,
      name: formData.title || '未命名'
    })
    if (resp.status === 201) {
      const data = resp.data as StaticDataDetail
      formData.dataId = data.id.toString()
      formData.title = data.name
      formData.originData = data.data
      staticDataOptions.data = JSON.stringify(data.data, null, '\t')
      message.info('数据保存成功')
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
    const resp = await updateStaticDataApi(formData.dataId!, {
      data: formData.originData,
      name: formData.title || '未命名'
    })
    if (resp.status === 200) {
      message.info('数据更新成功')
      await loadStaticList()
    } else {
      message.warning('数据更新失败')
    }
  } catch (err) {
    message.warning('数据更新失败')
  }
}
const handleSaveOrUpdate = async () => {
  formData.dataId ? handleSave() : handleUpdate()
}

const changeHandler = () => {
  props.dataInstance?.setData({ dataId: formData.dataId, title: formData.title })
}

const dataChangeHandler = (id: string, title: string) => {
  formData.dataId = id
  formData.title = title
  changeHandler()
}

onMounted(() => {
  loadStaticList()
})
</script>

<style lang="less" scoped></style>
