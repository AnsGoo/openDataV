<template>
  <CodeEditor
    :language="json"
    :config="config"
    :theme="projectStore.darkTheme ? 'dark' : 'light'"
    :code="code"
  />
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import CodeEditor from '@/components/CodeEditor'
import { CodemirrorOption } from '@/components/CodeEditor/type'
import { json } from '@codemirror/lang-json'
import { useProjectSettingStoreWithOut } from '@/store/modules/projectSetting'

const projectStore = useProjectSettingStoreWithOut()
const props = defineProps<{
  data: string
}>()
const config = ref<CodemirrorOption>({
  height: 'fit-content',
  tabSize: 4,
  indentWithTab: true,
  autofocus: true,
  disabled: false,
  preview: false
})
const code = ref<string>(props.data)
watch(
  () => props.data,
  () => {
    code.value = props.data
  }
)
</script>
