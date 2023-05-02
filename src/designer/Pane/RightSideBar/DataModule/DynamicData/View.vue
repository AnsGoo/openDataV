<template>
  <n-form :model="formData">
    <n-form-item label="动态数据" label-placement="top">
      <n-input-group>
        <n-input v-model:value="formData.options.url" style="flex: 1" readonly>
          <template #prefix>
            <n-gradient-text type="success" style="font-weight: 800">
              {{ formData.options.method }}
            </n-gradient-text>
          </template>
        </n-input>
        <n-button type="primary" @click="isShow = true"> 编辑 </n-button>
      </n-input-group>
    </n-form-item>
    <n-form-item label="是否重复" label-placement="left">
      <n-switch v-model:value="formData.isRepeat" @update:value="changeHandler" />
    </n-form-item>
    <n-form-item v-if="formData.isRepeat" label="请求间隔" label-placement="left">
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
  <n-modal v-model:show="isShow" display-directive="show">
    <n-card
      style="width: 600px"
      title="动态数据"
      :bordered="false"
      size="small"
      role="dialog"
      aria-modal="true"
    >
      <Rest v-model:options="formData.options" @update:rest-options="changeHandler" />
    </n-card>
  </n-modal>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref, watch } from 'vue'
import {
  NButton,
  NCard,
  NForm,
  NFormItem,
  NGradientText,
  NInput,
  NInputGroup,
  NInputNumber,
  NModal,
  NSwitch
} from 'naive-ui'
import type { RestRequestData } from '@/models'
import { DataType } from '@/enum/data'
import Rest from '@/apiView/RequestContent/rest'
import type { RequestOption } from '@/apiView/hooks/http/type'
import { RequestMethod } from '@/apiView/RequestContent/requestEnums'
import { uuid } from '@/utils/utils'
import { ScriptType } from '@/enum'
import { requestOptionsToStore, storeOptionToRequestOptions } from '@/apiView/hooks/http/utils'
import { message } from '@/utils/message'
import type { CustomComponent } from '@/models'

const props = defineProps<{
  curComponent: CustomComponent
}>()

const isShow = ref<boolean>(false)

const formData = reactive<{ isRepeat: boolean; interval: number; options: RequestOption }>({
  isRepeat: false,
  interval: 1000,
  options: {
    method: RequestMethod.GET,
    url: '',
    headers: [{ key: '', value: '', disable: false, id: uuid() }],
    params: [{ key: '', value: '', disable: false, id: uuid() }],
    data: [{ key: '', value: '', disable: false, id: uuid() }],
    afterScript: {
      code: '',
      type: ScriptType.Javascript
    }
  }
})
const changeHandler = () => {
  setDataConfig()
}

const setDataConfig = () => {
  props.curComponent.changeRequestDataConfig(DataType.REST, {
    options: requestOptionsToStore(formData.options),
    otherConfig: {
      isRepeat: formData.isRepeat,
      interval: formData.interval
    }
  })
}

onMounted(async () => {
  initData()
})

const initData = () => {
  const dataConfig = props.curComponent.dataConfig
  if (dataConfig && dataConfig.type === DataType.REST) {
    const restRequest = props.curComponent.dataConfig?.requestConfig as RestRequestData
    const otherConfig = props.curComponent.dataConfig?.otherConfig || {}
    const { options } = restRequest.toJSON()
    formData.options = storeOptionToRequestOptions(options)
    formData.interval = otherConfig.interval || 1000
    formData.isRepeat = otherConfig.isRepeat || false
  } else {
    message.info('请配置动态数据')
    formData.isRepeat = false
    formData.interval = 1000
    formData.options = {
      method: RequestMethod.GET,
      url: '',
      headers: [{ key: '', value: '', disable: false, id: uuid() }],
      params: [{ key: '', value: '', disable: false, id: uuid() }],
      data: [{ key: '', value: '', disable: false, id: uuid() }],
      afterScript: {
        code: '',
        type: ScriptType.Javascript
      }
    }

    setDataConfig()
  }
}

watch(
  () => props.curComponent,
  async (value: CustomComponent) => {
    if (value) {
      initData()
    }
  },
  { immediate: true }
)
</script>

<style lang="less" scoped></style>
