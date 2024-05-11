<template>
  <div class="o-scroll overflow-auto">
    <div class="edit" :style="scrollbarStyle">
      <Editor v-resize="editorWindowResizeHandler" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'

import Editor from '../../editor'
import { useCanvasState } from '../../state'

const windowWidth = ref<number>(0)
const windowHeight = ref<number>(0)

const scaleValue = computed(() => canvasState.scale.toFixed(2))
const canvasState = useCanvasState()

const scrollbarStyle = computed(() => {
  return {
    width: windowWidth.value + 'px',
    height: windowHeight.value + 'px'
  }
})

const editorWindowResizeHandler = (entry: ResizeObserverEntry) => {
  const { width, height } = entry.contentRect
  windowWidth.value = width
  windowHeight.value = height - 100
}
</script>

<style lang="less" scoped>
@import '../../css/index.less';

:deep(.edit) {
  transform-origin: left top;
  transform: scale(v-bind(scaleValue));
  transition: all 0.3s;
}
</style>
