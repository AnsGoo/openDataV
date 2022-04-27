<template>
  <div ref="codemirror" class="codemirror"></div>
</template>

<script lang="ts" setup>
import { basicSetup, EditorView } from '@codemirror/basic-setup'
import { EditorState, Compartment, Transaction } from '@codemirror/state'
import { standardKeymap, insertTab, indentWithTab } from '@codemirror/commands'
import { python } from '@codemirror/lang-python'
import { oneDark } from '@codemirror/theme-one-dark'
import { autocompletion } from '@codemirror/autocomplete'
import { onMounted, onUnmounted, ref } from 'vue'
import { keymap } from '@codemirror/view'

const props = withDefaults(
  defineProps<{
    code?: string
    initHeight?: string
  }>(),
  {
    code: 'import os',
    initHeight: '900px'
  }
)

const emits = defineEmits<{
  (e: 'update:code', code: string): void
  (e: 'change', code: string): void
}>()

const codemirror = ref<ElRef>(null)
let language = new Compartment(),
  tabSize = new Compartment()
let view: EditorView

let state = EditorState.create({
  doc: props.code,
  extensions: [
    basicSetup,
    oneDark,
    keymap.of([
      ...standardKeymap,
      // ...historyKeymap,
      indentWithTab,
      {
        key: 'Tab',
        run: insertTab
      }
    ]),
    language.of(python()),
    // lineNumbers(),
    autocompletion({ activateOnTyping: true }),
    tabSize.of(EditorState.tabSize.of(8))
  ]
})

onMounted(() => {
  view = new EditorView({
    state,
    parent: codemirror.value!,
    dispatch: (tr: Transaction) => {
      view.update([tr])
      if (tr.changes.empty) return
      const code: string = view.state.doc.toString()
      emits('update:code', code)
      emits('change', code)
    }
  })
})

onUnmounted(() => view.destroy())
</script>
<style lang="less" scoped>
/* 这个$props没有写错,不要改 */
:deep(.cm-editor) {
  height: v-bind('$props.initHeight');
  font-size: 18px;
  font-family: ui-monospace;
}
:deep(.cm-content) {
  font-family: ui-monospace;
}
</style>
