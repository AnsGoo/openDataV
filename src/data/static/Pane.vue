<template>
  <o-form-item key="title" label="静态数据">
    <div class="justify-center flex-row flex-nowrap flex items-center">
      <o-input
        :value="previewData"
        :readonly="true"
        placeholder="编辑请点击"
        @click="isShow = true"
      />
      <o-button type="primary" @click="isShow = true"> 编辑 </o-button>
    </div>
  </o-form-item>
  <o-modal v-model:show="isShow">
    <o-card
      title="静态数据"
      :bordered="false"
      size="small"
      role="dialog"
      aria-modal="true"
      closable
      @close="isShow = false"
    >
      <StaticView
        v-model:options="formData"
        mode="use"
        :hanlder="handler"
        @data-change="dataChangeHandler"
      />
    </o-card>
  </o-modal>
</template>

<script lang="ts" setup>
import { OButton, OCard, OFormItem, OInput, OModal } from 'open-data-v/ui'
import { computed, onMounted, onUnmounted, reactive, ref, useSlots, watch } from 'vue'

import type { DataHandler, DataInstance, Slotter } from '../type'
import StaticContent from './DataView.vue'

const slots = useSlots()

const StaticView = computed(() => {
  if (slots.default) {
    return slots.default()[0].type
  } else {
    return StaticContent
  }
})

const props = defineProps<{
  slotter: Slotter
  handler: DataHandler
}>()
const isShow = ref<boolean>(false)

const formData = reactive<{
  data: string
}>({
  data: '[]'
})

const previewData = computed<string>(() => {
  try {
    return JSON.stringify(JSON.parse(formData.data || '[]'))
  } catch (e) {
    return ''
  }
})

onMounted(async () => {
  await initData()
})

let dataInstance: DataInstance

const initData = async () => {
  const dataConfig = props.slotter.dataConfig
  if (dataConfig && dataConfig.type === 'STATIC') {
    const acceptor = (resp: any) => {
      formData.data = JSON.stringify(resp.data, null, '\t')
    }
    if (dataInstance) {
      dataInstance.close()
    }
    dataInstance = new props.handler()
    dataInstance.debug(formData, acceptor)
  } else {
    changeHandler()
  }
}
const changeHandler = () => {
  const dataConfig = {
    type: 'STATIC',
    dataInstance: new props.handler({
      data: formData.data
    })
  }
  props.slotter.changeDataConfig(dataConfig)
}

const dataChangeHandler = (data) => {
  formData.data = data
  changeHandler()
}
onUnmounted(() => {
  if (dataInstance) {
    dataInstance.close()
  }
})
watch(
  () => props.slotter,
  async () => {
    if (props.slotter) {
      await initData()
    }
  },
  { immediate: true }
)
</script>

<style lang="less" scoped></style>
