<template>
  <n-form-item key="title" label="订阅数据">
    <n-input-group>
      <n-input
        v-model:value="formDataConfig.channel"
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
      title="订阅通道"
      :bordered="false"
      size="small"
      role="dialog"
      aria-modal="true"
      closable
      @close="isShow = false"
    >
      <StaticView v-model:options="formDataConfig" mode="use" @channel-change="dataChangeHandler" />
    </n-card>
  </n-modal>
</template>

<script lang="ts" setup>
import { NButton, NCard, NFormItem, NInput, NInputGroup, NModal } from 'naive-ui'
import { computed, onMounted, reactive, ref, useSlots, watch } from 'vue'

import type { Slotter } from '../type'
import type SubRequestData from './handler'
import DataHandler from './handler'
import SubDataView from './SubDataView.vue'

const slots = useSlots()

const StaticView = computed(() => {
  if (slots.default) {
    return slots.default()[0].type
  } else {
    return SubDataView
  }
})

const props = defineProps<{
  slotter: Slotter
}>()
const isShow = ref<boolean>(false)

const formDataConfig = reactive<{
  channel: string
}>({
  channel: ''
})

onMounted(async () => {
  await initData()
})

const initData = async () => {
  const dataConfig = props.slotter.dataConfig
  if (dataConfig && dataConfig.type === 'SUB') {
    const staticRequest = props.slotter.dataConfig?.dataInstance as SubRequestData
    const { options } = staticRequest.toJSON()
    formDataConfig.channel = options.channel
  } else {
    const dataConfig = {
      type: 'SUB',
      dataInstance: new DataHandler({
        channel: formDataConfig.channel
      })
    }
    await props.slotter.changeDataConfig(dataConfig)
  }
}
const changeHandler = () => {
  const dataConfig = {
    type: 'SUB',
    dataInstance: new DataHandler({
      channel: formDataConfig.channel
    })
  }
  props.slotter.changeDataConfig(dataConfig)
}

const dataChangeHandler = (data) => {
  formDataConfig.channel = data
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
