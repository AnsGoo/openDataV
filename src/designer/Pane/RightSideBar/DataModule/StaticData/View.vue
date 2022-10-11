<template>
  <n-form :model="formData">
    <n-form-item key="data" label="静态数据">
      <n-input-group>
        <n-input
          :style="{ flex: 1 }"
          @click="() => (isShow = true)"
          :readonly="true"
          placeholder="编辑请点击"
        />
        <n-button type="primary" @click="() => (isShow = true)"> 编辑 </n-button>
      </n-input-group>
    </n-form-item>
  </n-form>
  <n-modal v-model:show="isShow">
    <n-card
      style="width: 600px"
      title="静态数据"
      :bordered="false"
      size="small"
      role="dialog"
      aria-modal="true"
    >
      <Static />
    </n-card>
  </n-modal>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref, watch } from 'vue'
import { NForm, NInput, NInputGroup, NButton, NModal, NCard, NFormItem } from 'naive-ui'
import { BaseComponent, StaticRequestData } from '@/resource/models'
import { ScriptType } from '@/components/ScriptsEditor/eunm'
import { AfterScript } from '@/ApiView/hooks/http/type'
import Static from '@/ApiView/RequestContent/static'
const props = defineProps<{
  curComponent: BaseComponent
}>()
const isShow = ref<boolean>(false)

const formData = reactive<{
  originData: string
  afterData: string
  script?: AfterScript
}>({
  originData: '',
  afterData: '',
  script: {
    code: 'return resp.filter(el => el.value > 50)',
    type: ScriptType.Javascript
  }
})

onMounted(async () => {
  await initData()
})

const initData = async () => {
  const staticRequest = props.curComponent.dataConfig?.requestConfig as StaticRequestData
  if (props.curComponent.dataConfig) {
    const resp = await staticRequest.getRespData({ propValue: props.curComponent.propValue })
    formData.script = staticRequest.afterScript
    formData.originData = StaticRequestData.dumps(resp.data, true)!
    formData.afterData = StaticRequestData.dumps(resp.afterData, true)!
  }
}
// const changeHandler = async () => {
//   props.curComponent.changeRequestDataConfig(DataType.STATIC, {
//     data: StaticRequestData.loads(formData.originData),
//     script: formData.script
//   })
//   const staticRequest = props.curComponent.dataConfig?.requestConfig as StaticRequestData
//   const resp = await staticRequest.getRespData({ propValue: props.curComponent.propValue })
//   formData.afterData = StaticRequestData.dumps(resp.afterData, true)!
// }

// const afterScriptChange = (data: AfterScript) => {
//   formData.script = data
//   changeHandler()
// }

watch(
  () => props.curComponent,
  (value: BaseComponent) => {
    if (value) {
      initData()
    }
  },
  { immediate: true }
)
</script>

<style lang="less" scoped></style>
