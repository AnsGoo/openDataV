<template>
  <div
    v-if="isInner"
    ref="shape"
    class="shape"
    :class="{ active: isActive || active }"
    @dblclick.exact="selectCurComponent"
    @mousedown="handleDragendShape"
    v-contextmenu="contextmenus"
  >
    <span class="error-info" v-show="isError">{{ errorInfo }}</span>
    <icon-park
      class="rotation"
      name="one-third-rotation"
      color="#fff"
      v-show="isActive"
      @mousedown="handleRotate"
    />
    <em v-show="showEm">({{ defaultStyle.left }},{{ defaultStyle.top }})</em>
    <div
      :class="['shape-point', 'lt', rotateClassName]"
      v-show="isActive"
      :style="{ top: '0%', left: '0%' }"
      @mousedown="handleStretchedShape('lt', $event)"
    ></div>
    <div
      :class="['shape-point', 't', rotateClassName]"
      v-show="isActive"
      :style="{ top: '0%', left: '50%' }"
      @mousedown="handleStretchedShape('t', $event)"
    ></div>
    <div
      :class="['shape-point', 'rt', rotateClassName]"
      v-show="isActive"
      :style="{ top: '0%', left: '100%' }"
      @mousedown="handleStretchedShape('rt', $event)"
    ></div>
    <div
      :class="['shape-point', 'r', rotateClassName]"
      v-show="isActive"
      :style="{ top: '50%', left: '100%' }"
      @mousedown="handleStretchedShape('r', $event)"
    ></div>
    <div
      :class="['shape-point', 'rb', rotateClassName]"
      v-show="isActive"
      :style="{ top: '100%', left: '100%' }"
      @mousedown="handleStretchedShape('rb', $event)"
    ></div>
    <div
      :class="['shape-point', 'b', rotateClassName]"
      v-show="isActive"
      :style="{ top: '100%', left: '50%' }"
      @mousedown="handleStretchedShape('b', $event)"
    ></div>
    <div
      class="shape-point"
      v-show="isActive"
      :class="['shape-point', 'lb', rotateClassName]"
      :style="{ top: '100%', left: '0%' }"
      @mousedown="handleStretchedShape('lb', $event)"
    ></div>
    <div
      :class="['shape-point', 'l', rotateClassName]"
      v-show="isActive"
      :style="{ top: '50%', left: '0%' }"
      @mousedown="handleStretchedShape('l', $event)"
    ></div>
    <slot></slot>
  </div>
  <div
    v-else
    ref="shape"
    class="shape"
    :class="{ active: isActive || active }"
    @click.ctrl.exact="appendComponent"
    @click.exact="selectCurComponent"
    @mousedown="handleDragendShape"
    v-contextmenu="contextmenus"
  >
    <span class="error-info" v-show="isError">{{ errorInfo }}</span>
    <icon-park
      class="rotation"
      name="one-third-rotation"
      color="#fff"
      v-show="isActive"
      @mousedown="handleRotate"
    />
    <em v-show="showEm">({{ defaultStyle.left }},{{ defaultStyle.top }})</em>
    <div
      :class="['shape-point', 'lt', rotateClassName]"
      v-show="isActive"
      :style="{ top: '0%', left: '0%' }"
      @mousedown="handleStretchedShape('lt', $event)"
    ></div>
    <div
      :class="['shape-point', 't', rotateClassName]"
      v-show="isActive"
      :style="{ top: '0%', left: '50%' }"
      @mousedown="handleStretchedShape('t', $event)"
    ></div>
    <div
      :class="['shape-point', 'rt', rotateClassName]"
      v-show="isActive"
      :style="{ top: '0%', left: '100%' }"
      @mousedown="handleStretchedShape('rt', $event)"
    ></div>
    <div
      :class="['shape-point', 'r', rotateClassName]"
      v-show="isActive"
      :style="{ top: '50%', left: '100%' }"
      @mousedown="handleStretchedShape('r', $event)"
    ></div>
    <div
      :class="['shape-point', 'rb', rotateClassName]"
      v-show="isActive"
      :style="{ top: '100%', left: '100%' }"
      @mousedown="handleStretchedShape('rb', $event)"
    ></div>
    <div
      :class="['shape-point', 'b', rotateClassName]"
      v-show="isActive"
      :style="{ top: '100%', left: '50%' }"
      @mousedown="handleStretchedShape('b', $event)"
    ></div>
    <div
      class="shape-point"
      v-show="isActive"
      :class="['shape-point', 'lb', rotateClassName]"
      :style="{ top: '100%', left: '0%' }"
      @mousedown="handleStretchedShape('lb', $event)"
    ></div>
    <div
      :class="['shape-point', 'l', rotateClassName]"
      v-show="isActive"
      :style="{ top: '50%', left: '0%' }"
      @mousedown="handleStretchedShape('l', $event)"
    ></div>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { useBasicStoreWithOut } from '@/store/modules/basic'
import { useComposeStoreWithOut } from '@/store/modules/compose'
import { reactive, ref, computed, onMounted, onErrorCaptured, watch } from 'vue'
import type { ComponentPublicInstance } from 'vue'
import { mod360, copyText } from '@/utils/utils'
import { eventBus } from '@/bus/useEventBus'
import type { Vector } from '@/types/common'
import { ContextmenuItem } from '@/plugins/directive/contextmenu/types'
import { useCopyStoreWithOut } from '@/store/modules/copy'
import { ComponentStyle } from '@/types/component'
import { stretchedComponents } from '@/utils/component'
import { BaseComponent } from '@/resource/models'

const basicStore = useBasicStoreWithOut()
const composeStore = useComposeStoreWithOut()
const copyStore = useCopyStoreWithOut()

const props = withDefaults(
  defineProps<{
    active?: boolean
    info: BaseComponent
    defaultStyle: ComponentStyle
    index: number
    isInner?: boolean
  }>(),
  {
    active: false,
    isInner: false
  }
)

const copy = () => {
  copyStore.copy()
  copyText(JSON.stringify(basicStore.curComponent?.toJson()))
}

const deleteComponent = () => {
  basicStore.removeComponent(props.index, props.info.parent)
}

const upComponent = () => {
  basicStore.upComponent(props.index, props.info.parent)
}

const downComponent = () => {
  basicStore.downComponent(props.index, props.info.parent)
}

const topComponent = () => {
  basicStore.topComponent(props.index, props.info.parent)
}

/**
 * 复制组件ID
 */
const copyComponentId = () => {
  let id = basicStore.curComponent!.id
  copyText(id as string)
}

const bottomComponent = () => {
  basicStore.bottomComponent(props.index, props.info.parent)
}

const decompose = () => {
  composeStore.decompose()
}

const contextmenus = (): ContextmenuItem[] => {
  basicStore.setCurComponent(props.info, props.index.toString())
  return [
    {
      text: '拆分',
      subText: '',
      disable: composeStore.canDecompose,
      handler: decompose
    },
    { divider: true },
    {
      text: '复制',
      subText: 'Ctrl + C',
      handler: copy
    },
    {
      text: '复制ID',
      subText: '',
      handler: copyComponentId
    },
    {
      text: '删除',
      subText: '',
      handler: deleteComponent
    },
    { divider: true },
    {
      text: '置于顶层',
      handler: topComponent,
      children: [
        { text: '置于顶层', handler: topComponent },
        { text: '上移一层', handler: upComponent }
      ]
    },
    {
      text: '置于底层',
      handler: bottomComponent,
      children: [
        { text: '置于底层', handler: bottomComponent },
        { text: '下移一层', handler: downComponent }
      ]
    }
  ]
}

const showEm = computed(() => basicStore.isShowEm)

const shape = ref<ElRef>(null)
const pointList = reactive<Array<string>>(['lt', 't', 'rt', 'r', 'rb', 'b', 'lb', 'l'])
const initialAngle = reactive<Recordable<number>>({
  // 每个点对应的初始角度
  lt: 0,
  t: 45,
  rt: 90,
  r: 135,
  rb: 180,
  b: 225,
  lb: 270,
  l: 315
})
const angleToCursor = reactive([
  // 每个范围的角度对应的光标
  { start: 338, end: 23, cursor: 'nw' },
  { start: 23, end: 68, cursor: 'n' },
  { start: 68, end: 113, cursor: 'ne' },
  { start: 113, end: 158, cursor: 'e' },
  { start: 158, end: 203, cursor: 'se' },
  { start: 203, end: 248, cursor: 's' },
  { start: 248, end: 293, cursor: 'sw' },
  { start: 293, end: 338, cursor: 'w' }
])
const cursors = ref({})

const borderWidth = ref<string>('0px')
const borderColor = ref<string>('#fff0')
const borderStyle = ref<string>('none')
const isError = ref<boolean>(false)
const errorInfo = ref<string>('')

onErrorCaptured((err: Error, instance: ComponentPublicInstance | null, info: string) => {
  console.log(err)
  if (info === 'render function') {
    if (basicStore.isEditMode) {
      if (instance) {
        const { id, label }: { id: string; label: string } = instance['info'] || {}
        errorInfo.value = `组件[${label}][${id}]渲染异常`
      } else {
        errorInfo.value = `组件渲染异常`
      }
      borderWidth.value = '5px'
      borderColor.value = 'red'
      borderStyle.value = 'dashed'
      isError.value = true
    }
    return false
  } else {
    return true
  }
})

const isActive = computed<boolean>(() => {
  return (props.active && !props.info.locked) || composeStore.isActived(props.info)
})

const appendComponent = () => {
  composeStore.appendComponent(props.info)
}

/**
 * 拖动组件
 */
const handleDragendShape = (e: MouseEvent) => {
  if (e.button === 0) {
    e.preventDefault()
    if (!basicStore.curComponent) {
      e.stopPropagation()
      return
    }
    if (props.info.id !== basicStore.curComponent.id) return

    e.stopPropagation()
    cursors.value = getCursor()

    let { top, left } = props.defaultStyle
    const startY = e.clientY
    const startX = e.clientX
    // 如果直接修改属性，值的类型会变为字符串，所以要转为数值型
    const startTop = top
    const startLeft = left

    // 如果元素没有移动，则不保存快照
    const move = (moveEvent) => {
      const curX = moveEvent.clientX
      const curY = moveEvent.clientY
      top = curY - startY + startTop
      left = curX - startX + startLeft

      // // 修改当前组件样式
      basicStore.syncComponentLoction({ top, left }, props.info.parent, false)
    }
    const up = () => {
      // 触发元素停止移动事件，用于隐藏标线
      eventBus.emit('unmove')
      document.removeEventListener('mousemove', move)
      document.removeEventListener('mouseup', up)
      if (props.info && props.info.parent) {
        basicStore.resizeAutoComponent(props.info.parent)
      }
      basicStore.saveComponentData()
    }

    document.addEventListener('mousemove', move)
    document.addEventListener('mouseup', up)
  }
}

const selectCurComponent = (e: MouseEvent) => {
  // 阻止向父组件冒泡
  e.preventDefault()
  e.stopPropagation()
  basicStore.setCurComponent(props.info, props.index.toString())
}

/**
 * 拉伸组件
 */
const handleStretchedShape = (point: string, e: MouseEvent) => {
  if (e.button === 0) {
    if (!(basicStore.curComponent && props.info.id === basicStore.curComponent.id)) return
    e.stopPropagation()
    e.preventDefault()

    const position = {
      top: props.defaultStyle.top,
      left: props.defaultStyle.left,
      height: props.defaultStyle.height,
      width: props.defaultStyle.width,
      rotate: props.defaultStyle.rotate
    }
    // 获取画布位移信息
    const editorRectInfo = document.querySelector('#editor')!.getBoundingClientRect()

    // 获取 point 与实际拖动基准点的差值 @justJokee
    // fix https://github.com/woai3c/visual-drag-demo/issues/26#issue-937686285

    const move = (moveEvent) => {
      // 第一次点击时也会触发 move，所以会有“刚点击组件但未移动，组件的大小却改变了”的情况发生
      // 因此第一次点击时不触发 move 事件
      const curPositon: Vector = {
        x: moveEvent.clientX - editorRectInfo.left,
        y: moveEvent.clientY - editorRectInfo.top
      }

      const { top, left, width, height } = stretchedComponents(point, position, curPositon)
      basicStore.syncComponentLoction({ top, left, width, height }, props.info.parent, false)
    }

    const up = () => {
      document.removeEventListener('mousemove', move)
      document.removeEventListener('mouseup', up)
      if (props.info) {
        basicStore.resizeAutoComponent(props.info.parent)
      }
      basicStore.saveComponentData()
    }

    document.addEventListener('mousemove', move)
    document.addEventListener('mouseup', up)
  }
}

/**
 * 旋转组件
 */
const handleRotate = (e: MouseEvent) => {
  if (e.button === 0) {
    if (!shape.value) {
      return
    }
    e.preventDefault()
    e.stopPropagation()
    if (!(basicStore.curComponent && props.info.id === basicStore.curComponent.id)) return
    if (props.info.locked) return

    // 初始坐标和初始角度
    let { rotate } = { ...props.defaultStyle }
    const startY: number = e.clientY
    const startX: number = e.clientX
    const startRotate: number = rotate

    // 获取元素中心点位置
    const rect: DOMRect = shape.value.getBoundingClientRect()
    const centerX: number = rect.left + rect.width / 2
    const centerY: number = rect.top + rect.height / 2

    // 旋转前的角度
    const rotateDegreeBefore = Math.atan2(startY - centerY, startX - centerX) / (Math.PI / 180)

    // 如果元素没有移动，则不保存快照
    // let hasMove = false
    const move = (moveEvent) => {
      // hasMove = true
      const curX = moveEvent.clientX
      const curY = moveEvent.clientY
      // 旋转后的角度
      const rotateDegreeAfter = Math.atan2(curY - centerY, curX - centerX) / (Math.PI / 180)
      // 获取旋转的角度值
      rotate = startRotate + rotateDegreeAfter - rotateDegreeBefore
      // 修改当前组件样式
      basicStore.syncComponentLoction({ rotate }, props.info.parent, false)
    }

    const up = () => {
      document.removeEventListener('mousemove', move)
      document.removeEventListener('mouseup', up)
      if (props.info) {
        basicStore.resizeAutoComponent(props.info.parent)
      }
      basicStore.saveComponentData()
    }

    document.addEventListener('mousemove', move)
    document.addEventListener('mouseup', up)
  }
}

const getCursor = () => {
  if (!basicStore.curComponent) {
    return {}
  }

  const rotate: number = mod360(basicStore.curComponent!.style.rotate) // 取余 360
  const result = {}
  let lastMatchIndex = -1 // 从上一个命中的角度的索引开始匹配下一个，降低时间复杂度

  pointList.forEach((point) => {
    const angle: number = mod360(initialAngle[point] + rotate)
    const len: number = angleToCursor.length
    while (true) {
      lastMatchIndex = (lastMatchIndex + 1) % len
      const angleLimit = angleToCursor[lastMatchIndex]
      if (angle < 23 || angle >= 338) {
        result[point] = 'nw-resize'
        return
      }

      if (angleLimit.start <= angle && angle < angleLimit.end) {
        result[point] = angleLimit.cursor + '-resize'
        return
      }
    }
  })
  return result
}

const rotateClassName = computed(() => {
  const prefix = 'rotate-'
  const rotate = props.defaultStyle.rotate
  if (rotate > -22.5 && rotate <= 22.5) return prefix + 0
  else if (rotate > 22.5 && rotate <= 67.5) return prefix + 45
  else if (rotate > 67.5 && rotate <= 112.5) return prefix + 90
  else if (rotate > 112.5 && rotate <= 157.5) return prefix + 135
  else if (rotate > 157.5 || rotate <= -157.5) return prefix + 0
  else if (rotate > -157.5 && rotate <= -112.5) return prefix + 45
  else if (rotate > -112.5 && rotate <= -67.5) return prefix + 90
  else if (rotate > -67.5 && rotate <= -22.5) return prefix + 135
  return prefix + 0
})

/**
 * 方向键控制组件移动
 */
const keyDown = (e: KeyboardEvent): void => {
  document.addEventListener('keyup', keyUp)
  if (!(basicStore.curComponent && props.info.id === basicStore.curComponent.id)) return

  e.stopPropagation()
  if (props.info && e.ctrlKey) {
    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault()
        basicStore.syncComponentLoction(
          { left: props.info.positionStyle.left - 1 },
          props.info.parent,
          false
        )
        break
      case 'ArrowUp':
        e.preventDefault()
        basicStore.syncComponentLoction(
          { top: props.info.positionStyle.top - 1 },
          props.info.parent,
          false
        )
        break
      case 'ArrowRight':
        e.preventDefault()
        basicStore.syncComponentLoction(
          { left: props.info.positionStyle.left + 1 },
          props.info.parent,
          false
        )
        break
      case 'ArrowDown':
        e.preventDefault()
        basicStore.syncComponentLoction(
          { top: props.info.positionStyle.top + 1 },
          props.info.parent,
          false
        )
        break
      default:
        return
    }
  }
}

const keyUp = (e: KeyboardEvent): void => {
  if (!(basicStore.curComponent && props.info.id === basicStore.curComponent.id)) return

  e.stopPropagation()
  if (props.info) {
    basicStore.resizeAutoComponent(props.info.parent)
  }
  basicStore.saveComponentData()
  document.removeEventListener('keyup', keyUp)
}

onMounted(() => {
  cursors.value = getCursor()
})

watch(
  () => basicStore.curComponent,
  (newValue: BaseComponent | undefined) => {
    if (newValue && props.info.id === newValue.id) {
      document.addEventListener('keydown', keyDown)
    } else {
      document.removeEventListener('keydown', keyDown)
    }
  }
)
</script>

<style lang="less" scoped>
@layer components {
  .shape {
    border-width: v-bind(borderWidth);
    border-color: v-bind(borderColor);
    border-style: v-bind(borderStyle);
    position: absolute;

    .error-info {
      color: red;
      font-size: 20px;
      white-space: nowrap;
    }
  }

  .active {
    @apply select-none hover:cursor-move;

    outline: 1px solid #70c0ff;
  }

  .shape-point {
    @apply absolute bg-white border border-solid border-blue-400 w-2 h-2 rounded-full z-10;
    margin-left: -4px;
    margin-top: -4px;
  }

  .rotation {
    position: absolute;
    top: -24px;
    left: 50%;
    transform: translateX(-50%);
    font-weight: 600;
    height: 20px;
    cursor: grab;

    &:active {
      cursor: grabbing;
    }
  }

  .icon-jiesuo {
    @apply absolute top-0 right-0;
  }

  div em {
    @apply absolute -top-6 left-0 text-red-600;
  }
}

.shape-point.lt.rotate-0,
.shape-point.rb.rotate-0,
.shape-point.l.rotate-45,
.shape-point.r.rotate-45,
.shape-point.lb.rotate-90,
.shape-point.rt.rotate-90,
.shape-point.t.rotate-135,
.shape-point.b.rotate-135 {
  cursor: nwse-resize;
}
.shape-point.t.rotate-0,
.shape-point.b.rotate-0,
.shape-point.lt.rotate-45,
.shape-point.rb.rotate-45,
.shape-point.l.rotate-90,
.shape-point.r.rotate-90,
.shape-point.lb.rotate-135,
.shape-point.rt.rotate-135 {
  cursor: ns-resize;
}
.shape-point.lb.rotate-0,
.shape-point.rt.rotate-0,
.shape-point.t.rotate-45,
.shape-point.b.rotate-45,
.shape-point.lt.rotate-90,
.shape-point.rb.rotate-90,
.shape-point.l.rotate-135,
.shape-point.r.rotate-135 {
  cursor: nesw-resize;
}
.shape-point.l.rotate-0,
.shape-point.r.rotate-0,
.shape-point.lb.rotate-45,
.shape-point.rt.rotate-45,
.shape-point.t.rotate-90,
.shape-point.b.rotate-90,
.shape-point.lt.rotate-135,
.shape-point.rb.rotate-135 {
  cursor: ew-resize;
}

// div.top-left {
//   cursor: url("/cursor/ResizeRight.cur"), auto;
// }
</style>
