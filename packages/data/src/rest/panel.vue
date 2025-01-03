<template>
  <o-form-item label="动态数据" label-placement="top" size="small">
    <div class="justify-center flex-row flex-nowrap flex items-center">
      <o-input v-model:value="formData.url" readonly>
        <template #prefix>
          <span class="text-green-700" style="font-weight: 800">
            {{ formData.method }}
          </span>
        </template>
      </o-input>
      <o-button type="primary" @click="isShow = true"> 编辑 </o-button>
    </div>
  </o-form-item>
  <o-form-item label="是否重复" label-placement="top">
    <o-switch v-model:value="formData.otherConfig.isRepeat" @update:value="changeOptions" />
  </o-form-item>
  <o-form-item v-if="formData.otherConfig.isRepeat" label="请求间隔" label-placement="top">
    <o-input-number
      v-model:value="formData.otherConfig.interval"
      :min="300"
      :step="100"
      @update:value="changeOptions"
    >
      <template #suffix> ms </template>
    </o-input-number>
  </o-form-item>
  <o-modal v-model:show="isShow" :beforeClose="changeOptions">
    <o-card
      title="动态数据"
      :bordered="false"
      size="small"
      closable
      role="dialog"
      aria-modal="true"
      @close="isShow = false"
    >
      <RestView
        v-model:options="formData"
        :dataInstance="props.dataInstance"
        @update:options="changeOptions"
        @change="changeOptions"
      >
        <template #data-select>
          <slot name="data-select"> </slot>
        </template>
      </RestView>
    </o-card>
  </o-modal>
</template>

<script lang="ts" setup>
import type { DataInstance } from '@open-data-v/base'
import { uuid } from '@open-data-v/base'
import { OButton, OCard, OFormItem, OInput, OInputNumber, OModal, OSwitch } from '@open-data-v/ui'
import { computed, ref } from 'vue'

import { useDataFill } from '../base/use'
import RestView from './data-view.vue'
import { RequestMethod } from './enums'
import type { RestOption, StoreRestOption } from './type'
import { requestOptionsToStore, storeOptionToRequestOptions } from './utils'

const props = defineProps<{
  dataInstance: DataInstance
  index?: number
}>()
const isShow = ref<boolean>(false)

const formData = ref<RestOption>({
  method: RequestMethod.GET,
  url: '/demo',
  headers: [{ key: '', value: '', disable: false, id: uuid() }],
  params: [{ key: '', value: '', disable: false, id: uuid() }],
  data: [{ key: '', value: '', disable: false, id: uuid() }],
  otherConfig: {
    isRepeat: false,
    interval: 1000
  }
})

const optionData = computed({
  get: () => {
    return requestOptionsToStore(formData.value)
  },
  set: (val) => {
    formData.value = storeOptionToRequestOptions(val)
  }
})
const { changeOptions } = useDataFill<StoreRestOption>(props.dataInstance, optionData)
</script>
