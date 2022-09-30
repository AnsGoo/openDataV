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
          <ScriptsEdtor
            v-model:data="formData.script"
            class="content"
            @update:data="changeHandler"
          />
        </n-tab-pane>
      </n-tabs>
    </n-card>
  </n-modal>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
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
const formData = reactive({
  originData: JSON.stringify(props.curComponent.exampleData, null, '\t'),
  afterData: '',
  protocol: DataProtocol.JSON,
  script: {
    code: 'return resp.filter(el => el.value > 50)',
    type: ScriptType.Javascript
  }
})

onMounted(() => {
  const staticRequest = props.curComponent.dataConfig?.requestConfig as StaticRequestData
  if (props.curComponent.dataConfig) {
    const { data } = staticRequest.toJSON()
    let instanceData = props.curComponent.exampleData
    if (data) {
      instanceData = data
    }
    formData.originData = staticRequest.dumps(instanceData, true)!
  }

  changeHandler()
})
const changeHandler = () => {
  props.curComponent.changeRequestDataConfig(DataType.STATIC, {
    data: formData.originData,
    protocol: formData.protocol,
    script: formData.script
  })
  const staticRequest = props.curComponent.dataConfig?.requestConfig as StaticRequestData
  const data = staticRequest.getRespData()
  formData.afterData = staticRequest.dumps(data, true)!
}
</script>

<style lang="less" scoped></style>
