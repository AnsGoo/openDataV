<template>
  <div class="editor">
    <div class="tool-bar">
      <slot name="tool-bar"> </slot>
    </div>
    <div class="main" :style="{ maxHeight: height }">
      <OInput
        :value="value"
        type="textarea"
        :style="{ height }"
        :readonly="mode === 'use'"
        @change="change"
        @update:value="change"
      />
    </div>
    <div class="footer"><slot name="footer"></slot></div>
  </div>
</template>

<script setup lang="ts">
import { OInput } from '@open-data-v/ui'

withDefaults(
  defineProps<{
    value: string
    height?: string
    disabled?: boolean
    mode?: 'debug' | 'use'
  }>(),
  {
    height: '600px',
    disabled: false,
    mode: 'use'
  }
)

const emits = defineEmits<{
  (e: 'update:value', value: string): void
  (e: 'change', value: string): void
}>()

const change = (value: string) => {
  emits('update:value', value)
  emits('change', value)
}
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
  }
}
</style>
