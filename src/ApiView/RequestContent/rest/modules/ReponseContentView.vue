<template>
  <CodeEditor
    :language="json"
    :config="config"
    :theme="projectStore.darkTheme ? 'dark' : 'light'"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import CodeEditor from '@/components/CodeEditor'
import { CodemirrorOption } from '@/components/CodeEditor/type'
import { json } from '@codemirror/lang-json'
import { useProjectSettingStoreWithOut } from '@/store/modules/projectSetting'

const projectStore = useProjectSettingStoreWithOut()
const config = ref<CodemirrorOption>({
  height: 'fit-content',
  tabSize: 4,
  indentWithTab: true,
  autofocus: true,
  disabled: false,
  preview: false
})
</script>
