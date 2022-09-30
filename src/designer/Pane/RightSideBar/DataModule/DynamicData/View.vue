<template>
  <n-form :model="formData">
    <n-form-item label="动态数据" label-placement="top">
      <n-input-group>
        <n-input :style="{ flex: 1 }" v-model:value="formData.restOptions.url" readonly>
          <template #prefix>
            <n-gradient-text type="success" style="font-weight: 800">
              {{ formData.restOptions.method }}
            </n-gradient-text>
          </template>
        </n-input>
        <n-button type="primary" @click="() => (isShow = true)"> 编辑 </n-button>
      </n-input-group>
    </n-form-item>
    <n-form-item label="是否重复" label-placement="left">
      <n-switch v-model:value="formData.isRepeat" @update:value="changeHandler" />
    </n-form-item>
    <n-form-item label="请求间隔" label-placement="left" v-if="formData.isRepeat">
      <n-input-number
        v-model:value="formData.interval"
        :min="300"
        :step="100"
        @update:value="changeHandler"
      >
        <template #suffix> ms </template>
      </n-input-number>
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
      <Rest v-model:restOptions="formData.restOptions" @update:rest-options="changeHandler" />
    </n-card>
  </n-modal>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
import {
  NForm,
  NInput,
  NInputGroup,
  NButton,
  NModal,
  NCard,
  NSwitch,
  NInputNumber,
  NFormItem,
  NGradientText
} from 'naive-ui'
import { BaseComponent, DataType } from '@/resource/models'
import Rest from '@/ApiView/RequestContent/rest'
import { RequestOption } from '@/ApiView/hooks/http/type'
import { RequestMethod } from '@/ApiView/RequestContent/requestEnums'
import { uuid } from '@/utils/utils'
import { ScriptType } from '@/components/ScriptsEditor/eunm'
const props = defineProps<{
  curComponent: BaseComponent
}>()

const isShow = ref<boolean>(false)

const formData = reactive<{ isRepeat: boolean; interval: number; restOptions: RequestOption }>({
  isRepeat: true,
  interval: 300,
  restOptions: {
    method: RequestMethod.GET,
    url: '/getNoSymptom',
    headers: [{ key: '', value: '', disable: false, id: uuid() }],
    params: [{ key: '', value: '', disable: false, id: uuid() }],
    data: [{ key: '', value: '', disable: false, id: uuid() }],
    afterScript: {
      code: 'return resp.filter(el => el.value > 50)',
      type: ScriptType.Javascript
    }
  }
})
// const restRequest = props.curComponent.dataConfig?.requestConfig as RestRequestData
const changeHandler = () => {
  props.curComponent.changeRequestDataConfig(DataType.REST, {
    options: formData.restOptions,
    otherConfig: {
      isRepeat: formData.isRepeat,
      interval: formData.interval
    }
  })
}

onMounted(() => {
  changeHandler()
})
</script>

<style lang="less" scoped></style>
