<template>
  <div
    v-if="hidden"
    v-contextmenu="contextMenus"
    :style="{
      left: left + 'px',
      top: top + 'px',
      width: width + 'px',
      height: height + 'px'
    }"
    class="area"
  ></div>
</template>

<script setup lang="ts">
import type { WatchStopHandle } from 'vue'
import { computed, onUnmounted, watch } from 'vue'

import { useCanvasState, useSelectionState } from '../state'
import type { ContextmenuItem } from '../type'

const selectionState = useSelectionState()!
const canvasState = useCanvasState()!
const hidden = computed<boolean>(() => selectionState.hidden)
const left = computed<number>(() => selectionState.rect.left)
const top = computed<number>(() => selectionState.rect.top)
const width = computed<number>(() => selectionState.rect.width)
const height = computed<number>(() => selectionState.rect.height)

const stopWatch: WatchStopHandle = watch(
  () => canvasState.activeComponent,
  () => {
    if (selectionState.components.length > 0) {
      selectionState.clearSelected()
    }
  }
)

const compose = () => {
  selectionState.composeSelectedComponent()
}

const handleFlushLeft = () => {
  selectionState.flushLeft()
}

const handleFlushRight = () => {
  selectionState.flushRight()
}

const handleFlushTop = () => {
  selectionState.flushTop()
}
const handleFlushBottom = () => {
  selectionState.flushBottom()
}

const handleFlushRow = () => {
  selectionState.flushRow()
}

const handleFlushColumn = () => {
  selectionState.flushColumn()
}

const batchDelete = () => {
  canvasState.batchRemoveComponent(selectionState.components)
}

const contextMenus = (): ContextmenuItem[] => {
  return [
    {
      text: '组合',
      subText: '',
      disable: !selectionState.canCompose,
      handler: compose
    },
    { divider: true },
    {
      text: '删除',
      subText: 'Ctrl + Delete',
      disable: selectionState.components.length <= 0,
      handler: batchDelete
    },
    { divider: true },
    {
      text: '左对齐',
      subText: '',
      handler: handleFlushLeft
    },
    {
      text: '右对齐',
      subText: '',
      handler: handleFlushRight
    },
    {
      text: '顶对齐',
      subText: '',
      handler: handleFlushTop
    },
    {
      text: '底对齐',
      subText: '',
      handler: handleFlushBottom
    },
    { divider: true },
    {
      text: '水平对齐',
      subText: '',
      handler: handleFlushRow
    },
    {
      text: '垂直对齐',
      subText: '',
      handler: handleFlushColumn
    }
  ]
}

onUnmounted(() => {
  if (stopWatch) {
    stopWatch()
  }
})
</script>

<style lang="less" scoped>
.area {
  @apply border border-solid border-blue-400 absolute;
}
</style>
