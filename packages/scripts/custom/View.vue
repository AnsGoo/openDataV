<template>
  <o-form-item key="data" label="自定义脚本">
    <div class="justify-center flex-row flex-nowrap flex items-center">
      <o-input :value="scriptRef" />
      <o-button type="primary" @click="isShow = true"> 编辑 </o-button>
    </div>
  </o-form-item>
  <o-modal v-model:show="isShow">
    <o-card
      title="自定义脚本"
      :bordered="false"
      size="small"
      role="dialog"
      closable
      aria-modal="true"
      @close="isShow = false"
    >
      <ScriptEditor v-model:code="scriptRef" @change="scriptChange" />
    </o-card>
  </o-modal>
</template>

<script setup lang="ts">
import { OButton, OCard, OFormItem, OInput, OModal } from 'open-data-v/ui'
import { onMounted, ref, watch } from 'vue'

import type { Slotter } from '../type'
import ScriptHandler from './handler'
import ScriptEditor from './ScriptsEditor.vue'

const isShow = ref<boolean>(false)
const scriptRef = ref<string | undefined>(undefined)

const props = defineProps<{
  slotter: Slotter
}>()

const initData = async () => {
  if (props.slotter.scriptConfig && props.slotter.scriptConfig.type === 'Custom') {
    const scriptConfig = props.slotter.scriptConfig as ScriptHandler
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
  if (scriptRef.value && props.slotter) {
    const scriptHandler = new ScriptHandler(scriptRef.value)
    props.slotter.afterCallbackChange(scriptHandler)
  }
}
onMounted(async () => {
  await initData()
})

watch(
  () => props.slotter,
  (value: Slotter) => {
    if (value) {
      initData()
    }
  }
)
</script>
