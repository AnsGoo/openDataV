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
import { BaseComponent, DataProtocol } from '@/resource/models'
import { ScriptType } from '@/components/ScriptsEdtor/eunm'
import ScriptsEdtor from '@/components/ScriptsEdtor'
import DataView from '@/components/DataView'
import { makeFunction } from '@/utils/data'

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
console.log(dataProtocolOptions)
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
  formData.originData = JSON.stringify(props.curComponent.exampleData, null, '\t')
  changeHandler()
})
const changeHandler = () => {
  const callback = makeFunction(formData.script.type, formData.script.code, ['resp', 'options'])
  if (callback?.handler) {
    const originData = JSON.parse(formData.originData)
    formData.afterData = JSON.stringify(
      callback.handler(originData, {
        propValue: props.curComponent.propValue
      }),
      null,
      '\t'
    )
  }
  // props.curComponent.changeRequestDataConfig(DataType.Static)
}
</script>

<style lang="less" scoped></style>
