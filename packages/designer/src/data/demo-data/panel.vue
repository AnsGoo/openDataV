<template>
  <o-form-item key="data" label="示例数据">
    <div class="justify-center flex-row flex-nowrap flex items-center">
      <o-input
        placeholder="点击预览"
        :readonly="true"
        :value="formData.data"
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
import type { Slotter } from '@open-data-v/base'
import { OButton, OCard, OFormItem, OInput, OModal } from '@open-data-v/ui'
import { onMounted, reactive, ref, watch } from 'vue'

const props = defineProps<{
  slotter: Slotter
}>()
const isShow = ref<boolean>(false)

const formData = reactive<{
  data: string
}>({
  data: '[]'
})
onMounted(async () => {
  await initData()
})

const initData = async () => {
  const exampleData = { key: 123 }
  formData.data = JSON.stringify(exampleData, null, '\t')
  const acceptor = (resp) => {
    formData.data = JSON.stringify(resp.data, null, '\t')
  }
  const instance = dataConfig.dataInstance
  instance.debug(acceptor)
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
