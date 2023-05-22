<template>
  <div class="editor">
    <div class="tool-bar">
      <slot name="tool-bar"> </slot>
    </div>
    <div class="main" :style="{ maxHeight: codemirrorConfig.height }">
      <codemirror
        :model-value="value || ''"
        :style="{
          width: '100%',
          height: codemirrorConfig.height,
          backgroundColor: '#fff',
          color: '#333'
        }"
        placeholder="Please enter the code."
        :extensions="extensions"
        :autofocus="codemirrorConfig.autofocus"
        :disabled="codemirrorConfig.disabled"
        :indent-with-tab="codemirrorConfig.indentWithTab"
        :tab-size="codemirrorConfig.tabSize"
        @ready="handleReady"
        @focus="log('focus', $event)"
        @blur="log('blur', $event)"
        @update:model-value="codeChange"
      />
    </div>
    <div class="footer"><slot name="footer"></slot></div>
  </div>
</template>

<script lang="ts" setup>
import { redo, undo } from '@codemirror/commands'
import { javascript } from '@codemirror/lang-javascript'
import type { EditorState, Extension } from '@codemirror/state'
import { oneDark } from '@codemirror/theme-one-dark'
import type { EditorView, ViewUpdate } from '@codemirror/view'
import type { ComputedRef } from 'vue'
import { computed, inject } from 'vue'
import { Codemirror } from 'vue-codemirror'

import type { CodemirrorOption } from './type'

const Logger = console

const props = withDefaults(
  defineProps<{
    value?: string
    height?: string
    disabled?: boolean
    mode?: 'debug' | 'use'
  }>(),
  {
    value: '',
    height: '600px',
    disabled: false,
    mode: 'use'
  }
)

const codemirrorConfig = computed<CodemirrorOption>(() => {
  return {
    height: props.height,
    tabSize: 4,
    indentWithTab: true,
    autofocus: true,
    disabled: props.disabled,
    line: false
  }
})
const emits = defineEmits<{
  (e: 'update:value', value: string): void
  (e: 'change', value: string, viewUpdate: ViewUpdate): void
}>()

let cmView: EditorView
const darkTheme = inject<ComputedRef<boolean>>(
  'DarkTheme',
  computed(() => true)
)
const extensions = computed(() => {
  const result: Extension[] = [javascript()]
  if (darkTheme.value) {
    result.push(oneDark)
  }
  return result
})

const handleReady = ({
  view,
  state: _state,
  container: _container
}: {
  view: EditorView
  state: EditorState
  container: HTMLDivElement
}) => {
  cmView = view
  return true
}
const log = Logger.log
const codeChange = (value: string, viewUpdate: ViewUpdate) => {
  emits('update:value', value)
  emits('change', value, viewUpdate)
  return true
}

const handleRedo = () => {
  if (cmView) {
    redo({
      state: cmView.state,
      dispatch: cmView.dispatch
    })
  }
}
const handleUndo = () => {
  if (cmView) {
    undo({
      state: cmView.state,
      dispatch: cmView.dispatch
    })
  }
}
defineExpose({ handleRedo, handleUndo })
</script>

<style lang="less" scoped>
.editor {
  .main {
    display: flex;
    overflow: hidden;
    ::-webkit-scrollbar {
      /*滚动条整体样式*/
      width: 6px; /*高宽分别对应横竖滚动条的尺寸*/
      height: 6px;
    }
    ::-webkit-scrollbar-thumb {
      background-color: #8b8b8b;
      -webkit-border-radius: 2em;
      -moz-border-radius: 2em;
      border-radius: 2em;
    }
    ::-webkit-scrollbar-track {
      background-color: #ccc;
    }

    .code {
      width: 30%;
      height: 100px;
      margin: 0;
      padding: 0.4em;
      font-family: monospace;
    }
  }
}
</style>
