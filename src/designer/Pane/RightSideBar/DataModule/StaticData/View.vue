<template>
  <n-form>
    <n-form-item key="title" label="静态数据">
      <n-input-group>
        <n-input
          v-model:value="formData.title"
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
      style="width: 600px"
      title="静态数据"
      :bordered="false"
      size="small"
      role="dialog"
      aria-modal="true"
      closable
      @close="isShow = false"
    >
      <Static
        v-model:options="formData"
        @data-change="dataChangeHandler"
        @script-change="scriptChangeHandler"
      />
    </n-card>
  </n-modal>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref, watch } from 'vue'
import { NForm, NInput, NInputGroup, NButton, NModal, NCard, NFormItem } from 'naive-ui'
import type { BaseComponent, StaticRequestData } from '@/resource/models'
import { DataType } from '@/resource/models'
import { ScriptType } from '@/enum'
import Static from '@/apiView/RequestContent/static'
import type { StaticRequestOptions } from '@/apiView/RequestContent/static/type'
import type { AfterScript } from '@/types/component'
import { message } from '@/utils/message'
const props = defineProps<{
  curComponent: BaseComponent
}>()
const isShow = ref<boolean>(false)

const formData = reactive<StaticRequestOptions>({
  dataId: '',
  title: '',
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
  if (dataConfig && dataConfig.type === DataType.STATIC) {
    const staticRequest = props.curComponent.dataConfig?.requestConfig as StaticRequestData
    const result = staticRequest.toJSON()
    formData.dataId = result.dataId
    formData.script = result.script!
    formData.title = result.title!
  } else {
    message.info('请配置静态数据')
    await props.curComponent.changeRequestDataConfig(DataType.STATIC, {
      id: formData.dataId,
      script: {
        code: formData.script.code,
        type: ScriptType.Javascript
      }
    })
  }
}
const changeHandler = () => {
  props.curComponent.changeRequestDataConfig(DataType.STATIC, {
    id: formData.dataId,
    script: formData.script
  })
}

const dataChangeHandler = (id: string, title: string) => {
  formData.title = title
  formData.dataId = id
  changeHandler()
}

const scriptChangeHandler = (script: AfterScript) => {
  formData.script = script
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
