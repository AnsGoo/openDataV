<template>
  <o-form-item key="data" label="示例数据">
    <div class="justify-center flex-row flex-nowrap flex items-center">
      <o-input
        placeholder="点击预览"
        :readonly="true"
        :value="previewData"
        @click="isShow = true"
      />
      <o-button type="primary" @click="isShow = true"> 预览 </o-button>
    </div>
  </o-form-item>
  <o-modal v-model:show="isShow">
    <o-card
      title="示例数据"
      :bordered="false"
      size="small"
      role="dialog"
      closable
      aria-modal="true"
      @close="isShow = false"
    >
      <OCodeEditor v-model:value="formData.data" />
    </o-card>
  </o-modal>
</template>

<script lang="ts" setup>
import type { DataHandler, Slotter } from '@open-data-v/base'
import { OButton, OCard, OFormItem, OInput, OModal } from '@open-data-v/ui'
import { cloneDeep } from 'lodash-es'
import { computed, onMounted, reactive, ref, watch } from 'vue'

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
const previewData = computed<string>(() => JSON.stringify(JSON.parse(formData.data || '[]')))
onMounted(async () => {
  await initData()
})

const initData = async () => {
  const dataConfig = props.slotter.dataConfig
  const exampleData = (await props.slotter.getExampleData()) || {}
  if (dataConfig && dataConfig.type === 'DEMO') {
    const acceptor = (resp) => {
      formData.data = JSON.stringify(resp.data, null, '\t')
    }
    const instance = dataConfig.dataInstance
    instance.debug(acceptor)
  } else {
    formData.data = JSON.stringify(exampleData, null, '\t')
    const dataConfig = {
      type: 'DEMO',
      dataInstance: new props.handler({
        data: cloneDeep(exampleData)
      })
    }
    await props.slotter.changeDataConfig(dataConfig)
  }
}

watch(
  () => props.slotter,
  (value) => {
    if (value) {
      initData()
    }
  },
  { immediate: true }
)
</script>
