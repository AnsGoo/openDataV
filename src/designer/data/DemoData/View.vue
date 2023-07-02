<template>
  <n-form-item key="data" label="示例数据">
    <n-input-group>
      <n-input placeholder="点击预览" :readonly="true" @click="isShow = true" />
      <n-button type="primary" @click="isShow = true"> 预览 </n-button>
    </n-input-group>
  </n-form-item>
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
      <OCodeEditor v-model:value="formData.data" />
    </n-card>
  </n-modal>
</template>

<script lang="ts" setup>
import { cloneDeep } from 'lodash-es'
import { NButton, NCard, NFormItem, NInput, NInputGroup, NModal } from 'naive-ui'
import { onMounted, reactive, ref, watch } from 'vue'

import type { CustomComponent } from '@/models'

import DataHandler from './handler'

const props = defineProps<{
  curComponent: CustomComponent
}>()
const isShow = ref<boolean>(false)

const formData = reactive<{
  data: string
}>({
  data: ''
})

onMounted(async () => {
  await initData()
})

const initData = async () => {
  const dataConfig = props.curComponent.dataConfig

  if (dataConfig && dataConfig.type === 'DEMO') {
    const demoRequest = props.curComponent.dataConfig?.requestConfig as DataHandler
    if (demoRequest) {
      const resp = await demoRequest.getRespData({ propValue: props.curComponent.propValue })
      formData.data = JSON.stringify(resp.data, null, '\t')
    }
  } else {
    const exampleData = props.curComponent.exampleData
    const dataConfig = {
      type: 'DEMO',
      requestConfig: new DataHandler({
        data: cloneDeep(exampleData)
      })
    }
    await props.curComponent.changeRequestDataConfig(dataConfig)
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
