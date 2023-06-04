<template>
  <n-form size="small">
    <n-form-item key="title" label="静态数据">
      <n-input-group>
        <n-input
          v-model:value="formDataConfig.title"
          :readonly="true"
          placeholder="编辑请点击"
          @click="isShow = true"
        />
        <n-button type="primary" @click="isShow = true"> 编辑 </n-button>
      </n-input-group>
    </n-form-item>
  </n-form>
  <n-modal v-model:show="isShow" display-directive="show">
    <n-card
      style="width: 800px"
      title="快速数据"
      :bordered="false"
      size="small"
      role="dialog"
      aria-modal="true"
      closable
      @close="isShow = false"
    >
      <StaticView
        v-model:options="formDataConfig"
        mode="use"
        @data-change="dataChangeHandler"
        @script-change="scriptChangeHandler"
      />
    </n-card>
  </n-modal>
</template>

<script lang="ts" setup>
import { NButton, NCard, NForm, NFormItem, NInput, NInputGroup, NModal } from 'naive-ui'
import { computed, onMounted, reactive, ref, useSlots, watch } from 'vue'

import { ScriptType } from '@/apiView/const'
import type { CustomComponent } from '@/models'
import type { AfterScript } from '@/types/component'

import type StaticRequestData from './handler'
import DataHandler, { QUICK_TYPE } from './handler'
import StaticContent from './Quick.vue'

const slots = useSlots()

const StaticView = computed(() => {
  if (slots.default) {
    return slots.default()[0].type
  } else {
    return StaticContent
  }
})

const props = defineProps<{
  curComponent: CustomComponent
}>()
const isShow = ref<boolean>(false)

const formDataConfig = reactive<{
  id: string
  title: string
  data: string
  script: AfterScript
}>({
  id: '',
  title: '',
  data: '',
  script: {
    code: '',
    type: ScriptType.Javascript
  }
})

onMounted(async () => {
  await initData()
})

const initData = async () => {
  const dataConfig = props.curComponent.dataConfig
  if (dataConfig && dataConfig.type === QUICK_TYPE) {
    const staticRequest = props.curComponent.dataConfig?.requestConfig as StaticRequestData
    const { options } = staticRequest.toJSON()
    formDataConfig.id = options.id
    formDataConfig.script = options.script!
    formDataConfig.title = options.title!
  } else {
    const dataConfig = {
      type: QUICK_TYPE,
      requestConfig: new DataHandler({
        id: formDataConfig.id,
        script: {
          code: formDataConfig.script!.code,
          type: ScriptType.Javascript
        }
      })
    }
    await props.curComponent.changeRequestDataConfig(dataConfig)
  }
}
const changeHandler = () => {
  const dataConfig = {
    type: QUICK_TYPE,
    requestConfig: new DataHandler({
      id: formDataConfig.id,
      script: formDataConfig.script
    })
  }
  props.curComponent.changeRequestDataConfig(dataConfig)
}

const dataChangeHandler = (id: string, title: string) => {
  formDataConfig.id = id
  formDataConfig.title = title
  changeHandler()
}

const scriptChangeHandler = (script: AfterScript) => {
  formDataConfig.script = script
  changeHandler()
}

watch(
  () => props.curComponent,
  async () => {
    if (props.curComponent) {
      await initData()
    }
  },
  { immediate: true }
)
</script>

<style lang="less" scoped></style>
