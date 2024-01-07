<template>
  <o-form>
    <o-form-item label="行高度">
      <o-input-number v-model:value="formData.height" @keypress.enter.prevent="changeData" />
    </o-form-item>
    <o-form-item label="奇数行背景色">
      <o-color-picker v-model:value="formData.oddRowBGC" @complete="changeData" />
    </o-form-item>
    <o-form-item label="偶数行背景色">
      <o-color-picker v-model:value="formData.evenRowBGC" @complete="changeData" />
    </o-form-item>
  </o-form>
</template>

<script lang="ts" setup>
import { OColorPicker, OForm, OFormItem, OInputNumber } from 'open-data-v/ui'
import { reactive } from 'vue'

import type { RowType } from './type'

const props = defineProps<{
  value: RowType
  args: any
}>()

const emits = defineEmits<{
  (e: 'updateValue', value: RowType)
}>()

const formData = reactive<RowType>({
  height: props.value.height || 30,
  oddRowBGC: props.value.oddRowBGC || '#003B51',
  evenRowBGC: props.value.evenRowBGC || '#0A2732'
})

const changeData = () => {
  emits('updateValue', formData)
}
</script>
