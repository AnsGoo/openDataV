<template>
  <Editor class="o-scroll overflow-auto" />
</template>

<script lang="ts" setup>
import { computed } from 'vue'

import Editor from '../../editor'
import { useCanvasState } from '../../state'

const scaleValue = computed(() => canvasState.scale.toFixed(2))
const canvasState = useCanvasState()
</script>

<style lang="less" scoped>
@import '../../css/index.less';

:deep(.edit) {
  transform-origin: left top;
  transform: scale(v-bind(scaleValue));
  transition: all 0.3s;
}
</style>
