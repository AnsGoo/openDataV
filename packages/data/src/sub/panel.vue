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
      <SubDataView
        v-model:options="formDataConfig"
        mode="use"
        :data-instance="props.dataInstance"
        @channel-change="changeOptions"
      />
    </o-card>
  </o-modal>
</template>

<script lang="ts" setup>
import type { DataInstance } from '@open-data-v/base'
import { OButton, OCard, OFormItem, OInput, OModal } from '@open-data-v/ui'
import { ref } from 'vue'

import { useDataFill } from '../base/use'
import SubDataView from './data-view.vue'
import type { SubOption } from './handler'

const props = defineProps<{
  dataInstance: DataInstance
}>()
const isShow = ref<boolean>(false)
const formDataConfig = ref<SubOption>({
  channel: ''
})

const { changeOptions } = useDataFill<SubOption>(props.dataInstance, formDataConfig)
</script>

<style lang="less" scoped></style>
