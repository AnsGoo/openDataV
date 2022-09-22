<template>
  <div class="editor">
    <div class="main" :style="{ maxHeight: config.height }">
      <codemirror
        :model-value="code"
        :style="{
          width: previewAction ? '50%' : '100%',
          height: config.height,
          backgroundColor: '#fff',
          color: '#333'
        }"
        placeholder="Please enter the code."
        :extensions="extensions"
        :autofocus="config.autofocus"
        :disabled="config.disabled"
        :indent-with-tab="config.indentWithTab"
        :tab-size="config.tabSize"
        @ready="handleReady"
        @focus="log('focus', $event)"
        @blur="log('blur', $event)"
        @update:model-value="codeChange"
      />
      <pre
        v-if="previewAction"
        class="code"
        :style="{ height: config.height, width: previewAction ? '50%' : '0px' }"
        >{{ code }}</pre
      >
    </div>
    <!-- <div class="footer">
      <div class="buttons">
        <icon-park
          class="item"
          :name="previewAction ? 'preview-open' : 'preview-close-one'"
          v-if="config.preview"
          @click="togglePreview"
        />
        <icon-park class="item" name="back" @click="handleUndo" />
        <icon-park class="item" name="next" @click="handleRedo" />
      </div>
      <div class="infos">
        <span class="item">空格: {{ config.tabSize }}</span>
        <span class="item"
          >当前/累计 {{ state.selected ? '(已选择)' : '' }}: {{ state.cursor }}/{{ state.length }}
          {{ state.selected ? `(${state.selected})` : '' }}</span
        >
        <span class="item">总行数: {{ state.lines }}</span>
      </div>
    </div> -->
  </div>
</template>

<script lang="ts" setup>
import { reactive, shallowRef, computed, ref } from 'vue'
import { EditorView, ViewUpdate } from '@codemirror/view'
import { redo, undo } from '@codemirror/commands'
import { Codemirror } from 'vue-codemirror'
import { json } from '@codemirror/lang-json'
import { oneDark } from '@codemirror/theme-one-dark'
import { CodemirrorOption } from './type'
import { Extension } from '@codemirror/state'

const props = withDefaults(
  defineProps<{
    config?: CodemirrorOption
    code?: string
    language?: Function
    theme?: string
  }>(),
  {
    config: () => ({
      height: '200px',
      tabSize: 4,
      indentWithTab: true,
      autofocus: true,
      disabled: false,
      preview: false
    }),
    code: '',
    language: json,
    theme: 'dark'
  }
)

const emits = defineEmits<{
  (e: 'update:code', value: string): void
}>()

const extensions = computed(() => {
  const result: Extension[] = []
  if (props.language) {
    console.log(props.language())
    result.push(props.language())
  }
  if (props.theme === 'dark') {
    result.push(oneDark)
  }
  return result
})

const previewAction = ref<boolean>(false)

const togglePreview = () => {
  previewAction.value = !previewAction.value
}

const cmView = shallowRef<EditorView>()
const handleReady = ({ view }: any) => {
  cmView.value = view
}

const log = console.log
// https://github.com/codemirror/commands/blob/main/test/test-history.ts
const handleUndo = () => {
  console.log(cmView.value?.state)
  undo({
    state: cmView.value!.state,
    dispatch: cmView.value!.dispatch
  })
}

const handleRedo = () => {
  console.log(cmView.value?.state)
  redo({
    state: cmView.value!.state,
    dispatch: cmView.value!.dispatch
  })
}

const state = reactive({
  lines: null as null | number,
  cursor: null as null | number,
  selected: null as null | number,
  length: null as null | number
})

const codeChange = (value: string, viewUpdate: ViewUpdate) => {
  const ranges = viewUpdate.state.selection.ranges
  state.selected = ranges.reduce((plus, range) => plus + range.to - range.from, 0)
  state.cursor = ranges[0].anchor
  // length
  state.length = viewUpdate.state.doc.length
  state.lines = viewUpdate.state.doc.lines
  emits('update:code', value)
}
</script>

<style lang="less" scoped>
.editor {
  .main {
    display: flex;
    width: max-width;
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

  // .footer {
  //   height: 3rem;
  //   padding: 0 1em;
  //   display: flex;
  //   justify-content: space-between;
  //   align-items: center;
  //   font-size: 90%;

  //   .buttons {
  //     .item {
  //       margin-right: 1em;
  //       display: inline-flex;
  //       justify-content: center;
  //       align-items: center;
  //       background-color: transparent;
  //       cursor: pointer;
  //     }
  //   }

  //   .infos {
  //     .item {
  //       margin-left: 2em;
  //       display: inline-block;
  //       font-feature-settings: 'tnum';
  //     }
  //   }
  // }
}
</style>
