<template>
  <n-form>
    <n-form-item key="title" label="静态数据">
      <n-input-group>
        <n-input
          style="flex: 1"
          @click="() => (isShow = true)"
          :readonly="true"
          placeholder="编辑请点击"
          v-model:value="formData.title"
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
      closable
      @close="() => (isShow = false)"
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
import { nextTick, onMounted, reactive, ref, watch } from 'vue'
import { NForm, NInput, NInputGroup, NButton, NModal, NCard, NFormItem } from 'naive-ui'
import { BaseComponent, DataType, StaticRequestData } from '@/resource/models'
import { ScriptType } from '@/components/ScriptsEditor/eunm'
import Static from '@/apiView/RequestContent/static'
import { StaticRequestOptions } from '@/apiView/RequestContent/static/type'
import { AfterScript } from '@/apiView/hooks/http/type'
const props = defineProps<{
  curComponent: BaseComponent
}>()
const isShow = ref<boolean>(false)

const formData = reactive<StaticRequestOptions>({
  dataId: '',
  title: '',
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
  if (staticRequest) {
    await nextTick(() => {
      const result = staticRequest.toJSON()
      formData.dataId = result.dataId
      formData.script = result.script!
      formData.title = result.title!
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
  async (value: BaseComponent) => {
    if (value) {
      await initData()
    }
  },
  { immediate: true }
)
</script>

<style lang="less" scoped></style>
