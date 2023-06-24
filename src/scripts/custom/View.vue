<template>
  <n-form-item key="data" label="自定义脚本">
    <n-input-group>
      <n-input :value="scriptRef" />
      <n-button type="primary" @click="isShow = true"> 编辑 </n-button>
    </n-input-group>
  </n-form-item>
  <n-modal v-model:show="isShow">
    <n-card
      style="width: 600px"
      title="自定义脚本"
      :bordered="false"
      size="small"
      role="dialog"
      closable
      aria-modal="true"
      @close="isShow = false"
    >
      <ScriptEditor v-model:code="scriptRef" @change="scriptChange" />
    </n-card>
  </n-modal>
</template>

<script setup lang="ts">
import { NButton, NCard, NFormItem, NInput, NInputGroup, NModal } from 'naive-ui'
import { onMounted, ref, watch } from 'vue'

import type { CustomComponent } from '@/models'

import ScriptHandler from './handler'
import ScriptEditor from './ScriptsEditor.vue'

const isShow = ref<boolean>(false)
const scriptRef = ref<string | undefined>(undefined)

const props = defineProps<{
  curComponent: CustomComponent
}>()

const initData = async () => {
  if (props.curComponent.scriptConfig && props.curComponent.scriptConfig.type === 'Custom') {
    const scriptConfig = props.curComponent.scriptConfig as ScriptHandler
    scriptRef.value = scriptConfig.key
  } else {
    scriptRef.value = ''
  }
}

const scriptChange = (script: string) => {
  scriptRef.value = script
  setComponentScript()
}

const setComponentScript = () => {
  if (scriptRef.value && props.curComponent) {
    const scriptHandler = new ScriptHandler(scriptRef.value)
    props.curComponent.afterCallbackChange(scriptHandler)
  }
}
onMounted(async () => {
  await initData()
})

watch(
  () => props.curComponent,
  (value: CustomComponent) => {
    if (value) {
      initData()
    }
  }
)
</script>
