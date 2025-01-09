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

import { useActionState, useCanvasState } from '../state'
import type { ContextmenuItem } from '../type'

const actionState = useActionState()!
const canvasState = useCanvasState()!
const hidden = computed<boolean>(() => actionState.hidden)
const left = computed<number>(() => actionState.rect.left)
const top = computed<number>(() => actionState.rect.top)
const width = computed<number>(() => actionState.rect.width)
const height = computed<number>(() => actionState.rect.height)

const stopWatch: WatchStopHandle = watch(
  () => canvasState.activeComponent,
  () => {
    if (actionState.components.length > 0) {
      actionState.clearSelected()
    }
  }
)

const compose = () => {
  actionState.composeSelectedComponent()
}

const handleFlushLeft = () => {
  actionState.flushLeft()
}

const handleFlushRight = () => {
  actionState.flushRight()
}

const handleFlushTop = () => {
  actionState.flushTop()
}
const handleFlushBottom = () => {
  actionState.flushBottom()
}

const handleFlushRow = () => {
  actionState.flushRow()
}

const handleFlushColumn = () => {
  actionState.flushColumn()
}

const batchDelete = () => {
  canvasState.batchRemoveComponent(actionState.components)
}

const contextMenus = (): ContextmenuItem[] => {
  return [
    {
      text: '组合',
      subText: '',
      disable: !actionState.canCompose,
      handler: compose
    },
    { divider: true },
    {
      text: '删除',
      subText: 'Ctrl + Delete',
      disable: actionState.components.length <= 0,
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
