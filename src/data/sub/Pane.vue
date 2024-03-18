<template>
  <o-form-item key="title" label="订阅数据">
    <div class="justify-center flex-row flex-nowrap flex items-center">
      <o-input
        v-model:value="formDataConfig.channel"
        :readonly="true"
        placeholder="编辑请点击"
        @click="isShow = true"
      />
      <o-button type="primary" @click.prevent="isShow = true"> 编辑 </o-button>
    </div>
  </o-form-item>
  <o-modal v-model:show="isShow">
    <o-card
      title="订阅通道"
      :bordered="false"
      size="small"
      role="dialog"
      aria-modal="true"
      closable
      @close="isShow = false"
    >
      <StaticView
        v-model:options="formDataConfig"
        mode="use"
        :hanlder="handler"
        @channel-change="dataChangeHandler"
      />
    </o-card>
  </o-modal>
</template>

<script lang="ts" setup>
import type { DataHandler, Slotter } from 'open-data-v/base'
import { OButton, OCard, OFormItem, OInput, OModal } from 'open-data-v/ui'
import { computed, onMounted, reactive, ref, useSlots, watch } from 'vue'

import type SubRequestData from './handler'
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
  handler: DataHandler
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
    changeHandler()
  }
}
const changeHandler = () => {
  if (!props.handler) {
    return
  }
  const dataConfig = {
    type: 'SUB',
    dataInstance: new props.handler({
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
