<template>
  <CodeEditor
    :language="json"
    :config="config"
    :theme="darkTheme ? 'dark' : 'light'"
    :code="code"
  />
</template>

<script lang="ts" setup>
import { inject, ref, watch, computed } from 'vue'
import type { ComputedRef } from 'vue'
import CodeEditor from '@/components/CodeEditor'
import type { CodemirrorOption } from '@/components/CodeEditor/type'
import { json } from '@codemirror/lang-json'

const darkTheme = inject<ComputedRef<boolean>>(
  'DarkTheme',
  computed(() => true)
)
const props = defineProps<{
  data: string
}>()
const config = ref<CodemirrorOption>({
  height: '600px',
  tabSize: 4,
  indentWithTab: true,
  autofocus: true,
  disabled: true
})
const code = ref<string>(props.data)
watch(
  () => props.data,
  () => {
    code.value = props.data
  }
)
</script>
