<template>
  <n-form :model="formData">
    <n-form-item key="data" label="静态数据">
      <n-input-group>
        <n-input
          :style="{ flex: 1 }"
          @click="() => (isShow = true)"
          :readonly="true"
          v-model:value="formData.dataName"
          placeholder="编辑请点击"
        />
        <n-button type="primary" @click="() => (isShow = true)"> 编辑 </n-button>
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
    >
      <Static v-model:options="formData" @change="changeHandler" />
    </n-card>
  </n-modal>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref, watch } from 'vue'
import { NForm, NInput, NInputGroup, NButton, NModal, NCard, NFormItem } from 'naive-ui'
import { BaseComponent, DataType, StaticRequestData } from '@/resource/models'
import { ScriptType } from '@/components/ScriptsEditor/eunm'
import { AfterScript } from '@/ApiView/hooks/http/type'
import Static from '@/ApiView/RequestContent/static'
import { StaticRequestOptions } from '@/ApiView/RequestContent/static/type'
const props = defineProps<{
  curComponent: BaseComponent
}>()
const isShow = ref<boolean>(false)

const formData = reactive<{
  dataId: string
  script?: AfterScript
  dataName?: string
}>({
  dataId: '',
  script: {
    code: 'return resp.filter(el => el.value > 50)',
    type: ScriptType.Javascript
  },
  dataName: undefined
})

onMounted(async () => {
  await initData()
})

const initData = async () => {
  const staticRequest = props.curComponent.dataConfig?.requestConfig as StaticRequestData
  if (staticRequest) {
    const result = staticRequest.toJSON()
    formData.dataId = result.dataId
    formData.script = result.script
  }
}
const changeHandler = async (options: StaticRequestOptions, title?: string) => {
  console.log(title)
  formData.dataName = title
  props.curComponent.changeRequestDataConfig(DataType.STATIC, {
    id: options.dataId,
    script: options.script
  })
}

watch(
  () => props.curComponent,
  async (value: BaseComponent) => {
    if (value) {
      await initData()
    }
  },
  { immediate: true }
)
</script>

<style lang="less" scoped></style>
