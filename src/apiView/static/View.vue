<template>
  <n-form-item key="title" label="静态数据">
    <n-input-group>
      <n-input
        v-model:value="formDataConfig.data"
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
      title="静态数据"
      :bordered="false"
      size="small"
      role="dialog"
      aria-modal="true"
      closable
      @close="isShow = false"
    >
      <StaticView v-model:options="formDataConfig" mode="use" @data-change="dataChangeHandler" />
    </n-card>
  </n-modal>
</template>

<script lang="ts" setup>
import { NButton, NCard, NFormItem, NInput, NInputGroup, NModal } from 'naive-ui'
import { computed, onMounted, reactive, ref, useSlots, watch } from 'vue'

import type { Slotter } from '@/apiView/type'

import StaticContent from './DataView.vue'
import type StaticRequestData from './handler'
import DataHandler from './handler'

const slots = useSlots()

const StaticView = computed(() => {
  if (slots.default) {
    return slots.default()[0].type
  } else {
    return StaticContent
  }
})

const props = defineProps<{
  slotter: Slotter
}>()
const isShow = ref<boolean>(false)

const formDataConfig = reactive<{
  data: string
}>({
  data: ''
})

onMounted(async () => {
  await initData()
})

const initData = async () => {
  const dataConfig = props.slotter.dataConfig
  if (dataConfig && dataConfig.type === 'STATIC') {
    const staticRequest = props.slotter.dataConfig?.dataInstance as StaticRequestData
    const { options } = staticRequest.toJSON()
    formDataConfig.data = JSON.stringify(options.data, null, '\t')
  } else {
    const dataConfig = {
      type: 'STATIC',
      dataInstance: new DataHandler({
        data: formDataConfig.data
      })
    }
    await props.slotter.changeDataConfig(dataConfig)
  }
}
const changeHandler = () => {
  const dataConfig = {
    type: 'STATIC',
    dataInstance: new DataHandler({
      data: formDataConfig.data
    })
  }
  props.slotter.changeDataConfig(dataConfig)
}

const dataChangeHandler = (data) => {
  formDataConfig.data = data
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
