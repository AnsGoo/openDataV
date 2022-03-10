<template>
  <div
    v-contextmenu="contextmenus"
    :style="{
      left: start.x + 'px',
      top: start.y + 'px',
      width: width + 'px',
      height: height + 'px'
    }"
    class="area"
  ></div>
</template>

<script setup lang="ts">
import { ContextmenuItem } from '@/plugins/directive/contextmenu/types'
import { useComposeStoreWithOut } from '@/store/modules/compose'
import { useSnapShotStoreWithOut } from '@/store/modules/snapshot'
import { eventBus } from '@/bus/useEventBus'
import { Vector } from '@/types/common'

defineProps<{
  start: Vector
  width: number
  height: number
}>()

const snapShotStore = useSnapShotStoreWithOut()
const composeStore = useComposeStoreWithOut()

const compose = async () => {
  await snapShotStore.recordSnapshot()
  composeStore.compose()
  eventBus.emit('hideArea')
}

const decompose = async () => {
  await snapShotStore.recordSnapshot()
  composeStore.decompose()
  eventBus.emit('hideArea')
}

const handleFlushLeft = () => {
  composeStore.flushLeft()
  eventBus.emit('hideArea')
}

const handleFlushRight = () => {
  composeStore.flushRight()
  eventBus.emit('hideArea')
}

const handleFlushTop = () => {
  composeStore.flushTop()
  eventBus.emit('hideArea')
}
const handleFlushBottom = () => {
  composeStore.flushBottom()
  eventBus.emit('hideArea')
}

const handleFlushRow = () => {
  composeStore.flushRow()
  eventBus.emit('hideArea')
}

const handleFlushColumn = () => {
  composeStore.flushColumn()
  eventBus.emit('hideArea')
}

const contextmenus = (): ContextmenuItem[] => {
  return [
    {
      text: '组合',
      subText: '',
      handler: compose
    },
    {
      text: '拆分',
      subText: '',
      handler: decompose
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
    {
      text: '水平居中',
      subText: '',
      handler: handleFlushRow
    },
    {
      text: '垂直居中',
      subText: '',
      handler: handleFlushColumn
    }
  ]
}
</script>

<style lang="less" scoped>
@layer components {
  .area {
    @apply border border-solid border-blue-400 absolute;
  }
}
</style>
