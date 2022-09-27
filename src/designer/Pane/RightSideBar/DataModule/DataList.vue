<template>
  <n-form :model="formData">
    <n-form-item label="示例数据" label-placement="top">
      <n-input type="textarea" :value="exampleData" :rows="6" />
    </n-form-item>
  </n-form>
</template>

<script lang="ts" setup>
import { reactive, computed } from 'vue'
import { NForm, NFormItem, NInput } from 'naive-ui'
import { BaseComponent } from '@/resource/models'

const props = defineProps<{
  curComponent: BaseComponent
}>()

const formData = reactive({})
const exampleData = computed<string>(() => JSON.stringify(props.curComponent.exampleData))
</script>

<style lang="less" scoped></style>
