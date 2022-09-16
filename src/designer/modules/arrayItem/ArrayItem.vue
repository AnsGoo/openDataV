<template>
  <n-space vertical>
    <n-space v-for="(item, index) in arrayValue" :key="index" :wrap="false">
      <n-input
        v-model:value="arrayValue[index]"
        type="text"
        @change="handleChange(index)"
        placeholder="请输入数据"
      />
      <IconPark
        name="delete-one"
        color="#F76560"
        @click="handleDelete(index)"
        v-if="type === 'dynamic'"
      />
    </n-space>
    <n-space :wrap="false" v-if="type === 'dynamic' && arrayValue.length < max">
      <n-input
        ref="addInputEl"
        v-model:value="newValue"
        type="text"
        @keypress.enter="handleAdd"
        placeholder="请输入数据"
      />
      <IconPark name="add-three" color="#4CD263" @click="handleAdd" v-if="type === 'dynamic'" />
    </n-space>
  </n-space>
</template>

<script lang="ts" setup>
import { ref, reactive, nextTick } from 'vue'
import { NSpace, NInput } from 'naive-ui'
import { message } from '@/utils/message'

const props = withDefaults(
  defineProps<{
    value: string[]
    max?: number
    type?: 'static' | 'dynamic'
  }>(),
  {
    max: 1,
    type: 'static'
  }
)

const emits = defineEmits<{
  (e: 'update:value', value: string[])
  (e: 'updateValue', value: string[])
}>()

const addInputEl = ref<HTMLInputElement>()
const newValue = ref<string>('')
const arrayValue = reactive<string[]>(props.type === 'static' ? new Array(props.max).fill('') : [])
arrayValue.splice(0, props.value.length, ...props.value)

const handleAdd = () => {
  if (!newValue.value.trim()) {
    message.warning('请输入数据')
    return
  }

  arrayValue.push(newValue.value)
  emits('update:value', arrayValue)
  emits('updateValue', arrayValue)
  newValue.value = ''
  nextTick(() => {
    addInputEl.value?.focus()
  })
}

const handleDelete = (index: number) => {
  arrayValue.splice(index, 1)
  emits('update:value', arrayValue)
  emits('updateValue', arrayValue)
}

const handleChange = (index: number) => {
  if (arrayValue[index] === props.value[index]) {
    return
  }

  emits('update:value', arrayValue)
  emits('updateValue', arrayValue)
}
</script>

<style lang="less" scoped></style>
