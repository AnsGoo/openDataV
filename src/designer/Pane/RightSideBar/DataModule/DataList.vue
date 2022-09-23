<template>
  <n-form :model="formData">
    <n-form-item label="示例数据" label-placement="top">
      <n-input type="textarea" :value="exampleData" @update:value="handleChangeData" :rows="10" />
    </n-form-item>
  </n-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { NForm, NFormItem, NInput } from 'naive-ui'
import { BaseComponent } from '@/resource/models'
import { message } from '@/utils/message'

const props = defineProps<{
  curComponent: BaseComponent
}>()

const formData = reactive({})
const exampleData = ref<string>(JSON.stringify(props.curComponent.exampleData))

const handleChangeData = (value: string) => {
  try {
    console.log(JSON.parse(value))
    props.curComponent.exampleData = JSON.parse(value)
  } catch (e) {
    console.log(e)
    message.error('数据格式错误，请检查')
  }
}
</script>

<style lang="less" scoped></style>
