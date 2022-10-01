<template>
  <n-form :model="formData">
    <n-form-item key="protocol" label="数据类型">
      <n-select :option="dataProtocolOptions" :value="formData.protocol" />
    </n-form-item>
    <n-form-item key="data" label="静态数据">
      <n-input-group>
        <n-input :style="{ flex: 1 }" />
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
      <n-tabs>
        <n-tab-pane name="data" tab="处理数据">
          <DataView v-model:content="formData.afterData" class="content" :disable="true" />
        </n-tab-pane>
        <n-tab-pane name="origin" tab="原始数据">
          <DataView
            v-model:content="formData.originData"
            class="content"
            @update:content="changeHandler"
          />
        </n-tab-pane>
        <n-tab-pane name="scripts" tab="脚本">
          <ScriptsEdtor :data="formData.script" class="content" @update:data="afterScriptChange" />
        </n-tab-pane>
      </n-tabs>
    </n-card>
  </n-modal>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref, watch } from 'vue'
import {
  NForm,
  NInput,
  NTabs,
  NTabPane,
  NInputGroup,
  NButton,
  NModal,
  NCard,
  NSelect,
  NFormItem
} from 'naive-ui'
import { BaseComponent, DataProtocol, DataType, StaticRequestData } from '@/resource/models'
import { ScriptType } from '@/components/ScriptsEditor/eunm'
import ScriptsEdtor from '@/components/ScriptsEditor'
import DataView from '@/components/DataView'
import { RequestAfterScript } from '@/ApiView/hooks/http/type'
const props = defineProps<{
  curComponent: BaseComponent
}>()
const isShow = ref<boolean>(false)

const dataProtocolOptions = Object.keys(DataProtocol).map((el) => {
  return {
    label: el,
    value: el
  }
})
const formData = reactive<{
  originData: string
  afterData: string
  protocol: DataProtocol
  script?: RequestAfterScript
}>({
  originData: '',
  afterData: '',
  protocol: DataProtocol.JSON,
  script: {
    code: 'return resp.filter(el => el.value > 50)',
    type: ScriptType.Javascript
  }
})

onMounted(() => {
  initData()
})

const initData = () => {
  const staticRequest = props.curComponent.dataConfig?.requestConfig as StaticRequestData
  if (props.curComponent.dataConfig) {
    const { data } = staticRequest.toJSON()
    formData.protocol = staticRequest.dataProtocol
    formData.script = staticRequest.afterScript
    formData.originData = StaticRequestData.dumps(data, staticRequest.dataProtocol, true)!
    formData.afterData = StaticRequestData.dumps(
      staticRequest.getRespData({ propValue: props.curComponent.propValue }),
      staticRequest.dataProtocol,
      true
    )!
  }
}
const changeHandler = () => {
  props.curComponent.changeRequestDataConfig(DataType.STATIC, {
    data: StaticRequestData.loads(formData.originData, formData.protocol),
    protocol: formData.protocol,
    script: formData.script
  })
  const staticRequest = props.curComponent.dataConfig?.requestConfig as StaticRequestData
  const data = staticRequest.getRespData({ propvalue: props.curComponent.propValue })
  formData.afterData = StaticRequestData.dumps(data, staticRequest.dataProtocol, true)!
}

const afterScriptChange = (data: RequestAfterScript) => {
  formData.script = data
  changeHandler()
}

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
