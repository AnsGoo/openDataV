<template>
  <!-- 线的显示 -->
  <div
    v-show="showLine"
    v-contextmenu.stop="contextmenus"
    class="line"
    :style="[offset, borderCursor]"
    @mousedown="handleDown"
  >
    <div class="action" :style="actionStyle">
      <span class="value">{{ startValue }}</span>
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { ContextmenuItem } from '@/plugins/directive/contextmenu/types'
import { ref, computed, onMounted } from 'vue'
import type { PaletteType } from '../index-types'

const props = defineProps<{
  scale: number
  thick: number
  palette: PaletteType
  index: number
  start: number
  vertical: boolean
  value: number
  isShowReferLine: boolean
}>()

const emit = defineEmits<{
  (e: 'onMouseDown'): void
  (e: 'onRelease', start: number, index: number): void
  (e: 'onRemove', index: number): void
}>()

const startValue = ref(0)
const showLine = ref(true)
onMounted(() => {
  startValue.value = props.value!
})
const setShowLine = (offset: number) => {
  showLine.value = offset >= 0
}
const offset = computed(() => {
  const offset = (startValue.value - props.start!) * props.scale!
  setShowLine(offset)
  const positionValue = offset + 'px'
  return props.vertical ? { top: positionValue } : { left: positionValue }
})
const borderCursor = computed(() => {
  const borderValue = `1px ${props.palette?.lineBoardStyle || 'dashed'} ${props.palette?.lineColor}`
  const border = props.vertical ? { borderTop: borderValue } : { borderLeft: borderValue }
  const cursorValue = props.isShowReferLine ? (props.vertical ? 'ns-resize' : 'ew-resize') : 'none'
  return {
    cursor: cursorValue,
    ...border
  }
})
const actionStyle = computed(() => {
  return props.vertical ? { left: props.thick + 'px' } : { top: props.thick + 'px' }
})

const handleDown = (e: MouseEvent) => {
  e.stopPropagation()
  const startD = props.vertical ? e.clientY : e.clientX
  const initValue = startValue.value
  emit('onMouseDown')
  const onMove = (e: MouseEvent) => {
    const currentD = props.vertical ? e.clientY : e.clientX
    const newValue = Math.round(initValue + (currentD - startD) / props.scale!)
    startValue.value = newValue
  }
  const onEnd = () => {
    emit('onRelease', startValue.value, props.index)
    document.removeEventListener('mousemove', onMove, true)
    document.removeEventListener('mouseup', onEnd)
  }
  document.addEventListener('mousemove', onMove, true)
  document.addEventListener('mouseup', onEnd)
}
const handleRemove = () => {
  emit('onRemove', props.index)
}
const contextmenus = (): ContextmenuItem[] => {
  return [
    {
      text: '删除',
      subText: '',
      handler: () => handleRemove()
    }
  ]
}
</script>

<style lang="less" scoped>
.line {
  pointer-events: auto;
  position: absolute;
  .action {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .value {
    pointer-events: none;
    transform: scale(0.83);
  }
  .del {
    padding: 3px 5px;
    cursor: pointer;
    visibility: hidden;
  }
  &:hover .del {
    visibility: visible;
  }
}
</style>
