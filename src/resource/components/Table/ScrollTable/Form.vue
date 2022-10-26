<template>
  <n-form :model="formData" size="small" label-placement="left">
    <n-form-item label="行高度">
      <n-input-number v-model:value="formData.height" @keypress.enter.prevent="changeData" />
    </n-form-item>
    <n-form-item label="背景色">
      <div class="backcolor">
        <n-color-picker v-model:value="formData.oddRowBGC" @complete="changeData" />
        <span class="title">奇数行</span>
      </div>
      <div class="backcolor">
        <n-color-picker v-model:value="formData.evenRowBGC" @complete="changeData" />
        <span class="title">偶数行</span>
      </div>
    </n-form-item>
  </n-form>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { NForm, NFormItem, NInputNumber, NColorPicker } from 'naive-ui'
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

<style lang="less" scoped>
.title {
  color: gray;
}

.backcolor {
  width: 49%;
  margin-right: 1%;
}
</style>
