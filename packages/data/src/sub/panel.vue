<template>
  <o-form-item key="title" label="订阅数据">
    <div class="justify-center flex-row flex-nowrap flex items-center">
      <o-input
        v-model:value="formDataConfig.channel"
        :readonly="true"
        placeholder="编辑请点击"
        @click="isShow = true"
      />
      <o-button type="primary" @click="isShow = true"> 编辑 </o-button>
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
      <StaticView v-model:options="formDataConfig" mode="use" @channel-change="dataChangeHandler" />
    </o-card>
  </o-modal>
</template>

<script lang="ts" setup>
import type { DataInstance } from '@open-data-v/base'
import { OButton, OCard, OFormItem, OInput, OModal } from '@open-data-v/ui'
import { computed, ref, useSlots } from 'vue'

import SubDataView from './data-view.vue'

const slots = useSlots()

const StaticView = computed(() => {
  if (slots.default) {
    return slots.default()[0].type
  } else {
    return SubDataView
  }
})

const props = defineProps<{
  dataInstance: DataInstance
}>()
const isShow = ref<boolean>(false)

const formDataConfig = ref<{
  channel: string
}>({
  channel: ''
})

const changeHandler = () => {
  props.dataInstance.updateOption({ channel: formDataConfig.value.channel })
}

const dataChangeHandler = (data) => {
  formDataConfig.value.channel = data
  changeHandler()
}
</script>

<style lang="less" scoped></style>
