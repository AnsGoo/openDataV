<template>
  <n-form :model="formData" size="small" label-align="right" :show-label="false">
    <n-form-item label="行高度">
      <n-space vertical>
        <n-input-number v-model:value="formData.height" @keypress.enter.prevent="changeData" />
        <span class="title">行高度</span>
      </n-space>
    </n-form-item>
    <n-form-item label="奇数行背景色">
      <n-space justify="space-between">
        <n-space vertical>
          <n-color-picker v-model:value="formData.oddRowBGC" @complete="changeData" />
          <span class="title">奇数行背景色</span>
        </n-space>
        <n-space vertical>
          <n-color-picker v-model:value="formData.evenRowBGC" @complete="changeData" />
          <span class="title">偶数行背景色</span>
        </n-space>
      </n-space>
    </n-form-item>
  </n-form>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { NForm, NFormItem, NInputNumber, NColorPicker, NSpace } from 'naive-ui'
import { RowType } from './type'

const props = defineProps<{
  value: RowType
  args: any
}>()

const emits = defineEmits<{
  (e: 'change', value: RowType)
}>()

const formData = reactive<RowType>({
  height: props.value.height || 30,
  oddRowBGC: props.value.oddRowBGC || '#003B51',
  evenRowBGC: props.value.evenRowBGC || '#0A2732'
})

const changeData = () => {
  emits('change', formData)
}
</script>

<style lang="less" scoped>
.title {
  color: gray;
}
</style>
