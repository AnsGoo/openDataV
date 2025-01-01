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
        :data-instance="dataInstance"
        mode="use"
        @submit="dataChangeHandler"
      />
    </o-card>
  </o-modal>
</template>

<script lang="ts" setup>
import type { DataInstance } from '@open-data-v/base'
import { OButton, OCard, OFormItem, OInput, OModal } from '@open-data-v/ui'
import { computed, onMounted, onUnmounted, ref, useSlots } from 'vue'

import StaticContent from './data-view.vue'

const slots = useSlots()

const StaticView = computed(() => {
  if (slots.default) {
    return slots.default()[0].type
  } else {
    return StaticContent
  }
})

const props = defineProps<{
  dataInstance: DataInstance
}>()
const isShow = ref<boolean>(false)

const formData = ref<{
  data: string
}>({
  data: '[]'
})

const previewData = computed<string>(() => {
  try {
    return JSON.stringify(JSON.parse(formData.value.data || '[]'))
  } catch (e) {
    return ''
  }
})

onMounted(async () => {
  await initData()
})

const initData = async () => {
  const dataInstance = props.dataInstance
  const acceptor = ({ data }) => {
    formData.value.data = JSON.stringify(data)
  }
  dataInstance.debug(acceptor)
}
const dataChangeHandler = () => {
  props.dataInstance.updateOption({ data: formData.value.data })
}

onUnmounted(() => {
  if (props.dataInstance) {
    props.dataInstance.close()
  }
})
</script>
