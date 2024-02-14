<template>
  <n-form-item key="title" label="快速数据">
    <n-input-group>
      <n-input
        v-model:value="formData.title"
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
      <StaticContent
        v-model:options="formData"
        mode="use"
        :data-instance="dataInstance"
        @data-change="dataChangeHandler"
      />
    </n-card>
  </n-modal>
</template>

<script lang="ts" setup>
import type { DataHandler, Slotter } from '@open-data-v/base'
import { NButton, NCard, NFormItem, NInput, NInputGroup, NModal } from 'naive-ui'
import { computed, onMounted, reactive, ref, watch } from 'vue'

import StaticContent from './Content.vue'
import type QuickRequestData from './handler'
import { QUICK_TYPE } from './handler'

const props = defineProps<{
  slotter: Slotter
  handler?: DataHandler
}>()
const isShow = ref<boolean>(false)

const formData = reactive<{
  id: string
  title: string
  data: string
}>({
  id: '',
  title: '',
  data: ''
})
const dataInstance = computed(() => props.slotter.dataConfig.dataInstance)
onMounted(async () => {
  await initData()
})
const initData = async () => {
  const dataConfig = props.slotter.dataConfig
  if (dataConfig && dataConfig.type === QUICK_TYPE) {
    const dataInstance = props.slotter.dataConfig?.dataInstance as QuickRequestData
    const { options } = dataInstance.toJSON()

    formData.id = options.id
    formData.title = options.title!
    const acceptor = (resp) => {
      formData.id = resp.id
      formData.title = resp.title!
      formData.data = resp.data
    }
    dataInstance.debug(acceptor)
  } else {
    changeHandler()
  }
}
const changeHandler = () => {
  if (!props.handler) {
    return
  }
  const dataConfig = {
    type: QUICK_TYPE,
    dataInstance: new props.handler({
      id: formData.id
    })
  }
  props.slotter.changeDataConfig(dataConfig)
}

const dataChangeHandler = (id: string, title: string) => {
  formData.id = id
  formData.title = title
  changeHandler()
}

watch(
  () => props.slotter,
  async () => {
    if (props.slotter) {
      await initData()
    }
  },
  { immediate: true }
)
</script>

<style lang="less" scoped></style>
