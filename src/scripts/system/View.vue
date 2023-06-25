<template>
  <n-form-item key="data" label="系统脚本">
    <n-input-group>
      <n-select v-model:value="scriptRef" :options="scriptOptions" @update:value="scriptChange" />
      <n-button type="primary" @click="isShow = true"> 文档 </n-button>
    </n-input-group>
  </n-form-item>
  <DynamicForm v-model:data="extendParam" :items="extendParamItems" @change="extendParamChange" />
  <n-modal v-model:show="isShow">
    <n-card
      style="width: 600px"
      title="文档"
      :bordered="false"
      size="small"
      role="dialog"
      closable
      aria-modal="true"
      @close="isShow = false"
      >我还没有写文档</n-card
    >
  </n-modal>
</template>

<script lang="ts" setup>
import type { SelectOption } from 'naive-ui'
import { NButton, NCard, NFormItem, NInputGroup, NModal, NSelect } from 'naive-ui'
import { computed, onMounted, ref, watch } from 'vue'

import type { CustomComponent } from '@/models'
import type { ScriptForm } from '@/scripts/system/type'

import DynamicForm from './DynamicFormItem'
import ScriptHandler from './handler'
import funcs from './scripts'

const props = defineProps<{
  curComponent: CustomComponent
}>()
const isShow = ref<boolean>(false)

const scriptOptions = computed<Array<SelectOption>>(() => {
  const keys = Object.keys(funcs)
  return keys.map((el) => {
    const item = funcs[el]
    return {
      label: item.name,
      value: item.key
    }
  })
})

const extendParamItems = ref<Array<ScriptForm>>([])
const extendParam = ref<Recordable<any>>({})
const scriptRef = ref<string | null>(null)

const extendParamChange = (_key: string, _value: any) => {
  setComponentScript()
}
const scriptChange = (script: string) => {
  scriptRef.value = script
  extendParamItems.value = funcs[script]?.extendParams || []
  const data = {}
  extendParamItems.value.forEach((el) => {
    data[el.prop] = el.props?.defaultValue
  })
  extendParam.value = data
  setComponentScript()
}
onMounted(async () => {
  await initData()
})
const setComponentScript = () => {
  if (scriptRef.value && props.curComponent) {
    const scriptHandler = new ScriptHandler(scriptRef.value, extendParam.value)
    props.curComponent.afterCallbackChange(scriptHandler)
  }
}

const initData = async () => {
  if (props.curComponent.scriptConfig && props.curComponent.scriptConfig.type === 'System') {
    const scriptConfig = props.curComponent.scriptConfig as ScriptHandler
    const key = scriptConfig.key
    scriptRef.value = key
    extendParamItems.value = funcs[key]?.extendParams || []
    extendParam.value = scriptConfig.extendParams || {}
  } else {
    scriptRef.value = null
    extendParamItems.value = []
    extendParam.value = {}
  }
}

watch(
  () => props.curComponent,
  (value: CustomComponent) => {
    if (value) {
      initData()
    }
  }
)
</script>

<style lang="less" scoped></style>
