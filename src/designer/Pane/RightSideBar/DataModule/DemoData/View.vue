<template>
  <n-form :model="formData">
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
      aria-modal="true"
    >
      <n-tabs>
        <n-tab-pane name="data" tab="示例数据" display-directive="show">
          <DataView v-model:content="formData.afterData" class="content" :disable="true" />
        </n-tab-pane>
      </n-tabs>
    </n-card>
  </n-modal>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref, watch } from 'vue'
import {
  NForm,
  NInput,
  NTabs,
  NTabPane,
  NInputGroup,
  NButton,
  NModal,
  NCard,
  NFormItem
} from 'naive-ui'
import type { BaseComponent, DemoRequestData } from '@/resource/models'
import { DataType } from '@/resource/models'

import DataView from '@/components/DataView'
import { cloneDeep } from 'lodash-es'
import { message } from '@/utils/message'

const props = defineProps<{
  curComponent: BaseComponent
}>()
const isShow = ref<boolean>(false)

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
      data: cloneDeep(exampleData)
    })
  }
}

watch(
  () => props.curComponent,
  (value: BaseComponent) => {
    if (value) {
      initData()
    }
  },
  { immediate: true }
)
</script>

<style lang="less" scoped></style>
