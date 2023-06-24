<template>
  <n-form-item key="title" label="快速数据">
    <n-input-group>
      <n-input
        v-model:value="formDataConfig.title"
        :readonly="true"
        placeholder="编辑请点击"
        @click="isShow = true"
      />
      <n-button type="primary" @click="isShow = true"> 编辑 </n-button>
    </n-input-group>
  </n-form-item>
  <n-modal v-model:show="isShow" display-directive="show">
    <n-card
      style="width: 800px"
      title="快速数据"
      :bordered="false"
      size="small"
      role="dialog"
      aria-modal="true"
      closable
      @close="isShow = false"
    >
      <StaticContent v-model:options="formDataConfig" mode="use" @data-change="dataChangeHandler" />
    </n-card>
  </n-modal>
</template>

<script lang="ts" setup>
import { NButton, NCard, NFormItem, NInput, NInputGroup, NModal } from 'naive-ui'
import { onMounted, reactive, ref, watch } from 'vue'

import type { CustomComponent } from '@/models'

import DataHandler, { QUICK_TYPE } from './handler'
import StaticContent from './Quick.vue'

const props = defineProps<{
  curComponent: CustomComponent
}>()
const isShow = ref<boolean>(false)

const formDataConfig = reactive<{
  id: string
  title: string
  data: string
}>({
  id: '',
  title: '',
  data: ''
})

onMounted(async () => {
  await initData()
})

const initData = async () => {
  const dataConfig = props.curComponent.dataConfig
  if (dataConfig && dataConfig.type === QUICK_TYPE) {
    const staticRequest = props.curComponent.dataConfig?.requestConfig as DataHandler
    const { options } = staticRequest.toJSON()
    formDataConfig.id = options.id
    formDataConfig.title = options.title!
  } else {
    const dataConfig = {
      type: QUICK_TYPE,
      requestConfig: new DataHandler({
        id: formDataConfig.id
      })
    }
    await props.curComponent.changeRequestDataConfig(dataConfig)
  }
}
const changeHandler = () => {
  const dataConfig = {
    type: QUICK_TYPE,
    requestConfig: new DataHandler({
      id: formDataConfig.id
    })
  }
  props.curComponent.changeRequestDataConfig(dataConfig)
}

const dataChangeHandler = (id: string, title: string) => {
  formDataConfig.id = id
  formDataConfig.title = title
  changeHandler()
}

watch(
  () => props.curComponent,
  async () => {
    if (props.curComponent) {
      await initData()
    }
  },
  { immediate: true }
)
</script>

<style lang="less" scoped></style>
