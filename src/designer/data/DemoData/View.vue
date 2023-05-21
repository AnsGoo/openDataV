<template>
  <n-form :model="formData" size="small">
    <n-form-item key="data" label="示例数据">
      <n-input-group>
        <n-input placeholder="点击预览" :readonly="true" @click="isShow = true" />
        <n-button type="primary" @click="isShow = true"> 预览 </n-button>
      </n-input-group>
    </n-form-item>
  </n-form>
  <n-modal v-model:show="isShow">
    <n-card
      style="width: 600px"
      title="示例数据"
      :bordered="false"
      size="small"
      role="dialog"
      closable
      aria-modal="true"
      @close="isShow = false"
    >
      <DataView v-model:value="formData.afterData" />
    </n-card>
  </n-modal>
</template>

<script lang="ts" setup>
import { cloneDeep } from 'lodash-es'
import { NButton, NCard, NForm, NFormItem, NInput, NInputGroup, NModal } from 'naive-ui'
import { onMounted, reactive, ref, watch } from 'vue'

import { DataType } from '@/enum/data'
import type { CustomComponent, DemoRequestData } from '@/models'
import { message } from '@/utils/message'

import TextareaDataView from '../CodeEditor.vue'

const props = defineProps<{
  curComponent: CustomComponent
}>()
const isShow = ref<boolean>(false)

const DataView = TextareaDataView
const formData = reactive<{
  afterData: string
}>({
  afterData: ''
})

onMounted(async () => {
  await initData()
})

const initData = async () => {
  const dataConfig = props.curComponent.dataConfig

  if (dataConfig && dataConfig.type === DataType.DEMO) {
    const demoRequest = props.curComponent.dataConfig?.requestConfig as DemoRequestData
    if (props.curComponent.dataConfig) {
      const resp = await demoRequest.getRespData({ propValue: props.curComponent.propValue })
      formData.afterData = JSON.stringify(resp.afterData, null, '\t')
    }
  } else {
    message.info('正在使用示例数据')
    const exampleData = props.curComponent.exampleData
    await props.curComponent.changeRequestDataConfig(DataType.DEMO, {
      options: {
        data: cloneDeep(exampleData)
      }
    })
  }
}

watch(
  () => props.curComponent,
  (value: CustomComponent) => {
    if (value) {
      initData()
    }
  },
  { immediate: true }
)
</script>

<style lang="less" scoped></style>
