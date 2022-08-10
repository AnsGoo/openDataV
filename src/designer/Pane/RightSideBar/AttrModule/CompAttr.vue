<template>
  <n-form size="small" @submit.prevent label-placement="left" label-align="left">
    <n-form-item label="类型">
      <n-input :value="curComponent.component" :readonly="true" />
    </n-form-item>
    <n-form-item label="ID">
      <n-input :value="curComponent.id" :readonly="true" />
    </n-form-item>
    <n-form-item label="名称">
      <n-input v-model:value="labn" @change="labnChange($event)" />
    </n-form-item>
  </n-form>
</template>

<script lang="ts" setup>
import { useBasicStoreWithOut } from '@/store/modules/basic'
import type { ComponentInfo } from '@/types/component'
import { NForm, NFormItem, NInput } from 'naive-ui'
import { ref, watch } from 'vue'

const props = defineProps<{
  curComponent: ComponentInfo
}>()

const labn = ref<string>('')
const basicStore = useBasicStoreWithOut()
const labnChange = (value) => {
  basicStore.setCurComponentProps('label', value)
}

watch(
  () => props.curComponent,
  () => {
    labn.value = props.curComponent.label || ''
  },
  { immediate: true }
)
</script>
