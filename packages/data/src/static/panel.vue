<template>
  <o-form-item key="title" label="静态数据">
    <div class="justify-center flex-row flex-nowrap flex items-center">
      <o-input
        :value="previewData"
        :readonly="true"
        placeholder="编辑请点击"
        @click="isShow = true"
      />
      <o-button type="primary" @click="isShow = true"> 编辑 </o-button>
    </div>
  </o-form-item>
  <o-modal v-model:show="isShow">
    <o-card
      title="静态数据"
      :bordered="false"
      size="small"
      role="dialog"
      aria-modal="true"
      closable
      @close="isShow = false"
    >
      <static-view
        v-model:options="formData"
        :data-instance="dataInstance"
        mode="use"
        @submit="changeOptions"
      >
        <template #data-select>
          <slot name="data-select"> </slot>
        </template>
      </static-view>
    </o-card>
  </o-modal>
</template>

<script lang="ts" setup>
import type { DataInstance } from '@open-data-v/base'
import { OButton, OCard, OFormItem, OInput, OModal } from '@open-data-v/ui'
import { computed, ref } from 'vue'

import { useDataFill } from '../base/use'
import StaticView from './data-view.vue'
import type { StaticOption } from './handler'

const props = defineProps<{
  dataInstance: DataInstance
}>()
const isShow = ref<boolean>(false)

const formData = ref<{ data: string }>({
  data: '[]'
})

const previewData = computed<string>(() => {
  try {
    return JSON.stringify(JSON.parse(formData.value.data || '[]'))
  } catch (e) {
    return ''
  }
})

const optionData = computed({
  get() {
    return { data: JSON.parse(formData.value.data) }
  },
  set(value: StaticOption) {
    formData.value.data = JSON.stringify(value.data || '[]')
  }
})

const { changeOptions } = useDataFill<StaticOption>(props.dataInstance, optionData)
</script>
