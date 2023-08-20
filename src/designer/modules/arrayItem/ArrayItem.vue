<template>
  <div class="container">
    <div v-for="(_, index) in arrayValue" :key="index" class="item">
      <n-input
        v-model:value="arrayValue[index]"
        type="text"
        style="width: 100%"
        placeholder="请输入数据"
        @change="handleChange(index)"
      />
      <XIcon
        v-if="type === 'dynamic'"
        :size="18"
        name="delete"
        color="#F76560"
        @click="handleDelete(index)"
      />
    </div>
    <div v-if="type === 'dynamic'" class="item">
      <n-input
        ref="addInputEl"
        v-model:value="newValue"
        type="text"
        placeholder="请输入数据"
        @keypress.enter="handleAdd"
      />
      <XIcon name="add" color="#4CD263" :size="18" @click="handleAdd" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { isNumber } from 'lodash-es'
import { NInput } from 'naive-ui'
import { nextTick, reactive, ref } from 'vue'

const props = withDefaults(
  defineProps<{
    value: string[]
    count?: number
    type?: 'static' | 'dynamic'
    maxItem?: number
    minItem?: number
  }>(),
  {
    count: 1,
    type: 'static',
    minItem: 0
  }
)

const emits = defineEmits<{
  (e: 'updateValue', value: string[]): void
}>()

const addInputEl = ref<HTMLInputElement>()
const newValue = ref<string>('')
const arrayValue = reactive<string[]>(
  props.type === 'static' ? new Array(props.count).fill('') : []
)
arrayValue.splice(0, props.value.length, ...props.value)

const handleAdd = () => {
  if (!newValue.value.trim()) {
    return
  }

  const { maxItem } = props
  if (isNumber(maxItem) && arrayValue.length >= maxItem) {
    return
  }

  arrayValue.push(newValue.value)
  emits('updateValue', arrayValue)
  newValue.value = ''
  nextTick(() => {
    addInputEl.value?.focus()
  })
}

const handleDelete = (index: number) => {
  // minItem 有默认值，默认值为数值，不用再判断
  if (arrayValue.length <= props.minItem) {
    return
  }
  arrayValue.splice(index, 1)
  emits('updateValue', arrayValue)
}

const handleChange = (index: number) => {
  if (arrayValue[index] === props.value[index]) {
    return
  }

  emits('updateValue', arrayValue)
}
</script>

<style lang="less" scoped>
.container {
  @apply flex-col;
  .item {
    @apply flex flex-row p-1 items-center;
  }
}
</style>
