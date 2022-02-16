<template>
  <div
    ref="shape"
    class="shape"
    :class="{ active: isActive || active, layerActive: isLayerActive }"
    @click.ctrl.exact="appendComponent"
    @click.exact="selectCurComponent"
    @mousedown="handleMouseDownOnShape"
  >
    <span class="error-info" v-show="isError">{{ errorInfo }}</span>
    <span class="iconfont icon-xuanzhuan" v-show="isActive" @mousedown="handleRotate"></span>
    <span class="iconfont icon-jiesuo" v-show="element.isLock"></span>
    <em v-show="showEm">({{ left }},{{ top }})</em>
    <div
      class="shape-point"
      v-for="item in isActive ? pointList : []"
      @mousedown="handleMouseDownOnPoint(item, $event)"
      :key="item"
      :style="getPointStyle(item)"
    ></div>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import calculateComponentPositonAndSize from '@/utils/calculateComponentInfo'
import { useBasicStoreWithOut } from '@/store/modules/basic'
import { useSnapShotStoreWithOut } from '@/store/modules/snapshot'
import { useComposeStoreWithOut } from '@/store/modules/compose'
import { reactive, nextTick, toRefs, ref, watch, computed, onMounted, onErrorCaptured } from 'vue'
import type { ComponentPublicInstance } from 'vue'
import { mod360 } from '@/utils/utils'
import { eventBus } from '@/bus/useEventBus'
import type { Vector } from '@/types/common'

const basicStore = useBasicStoreWithOut()
const snapShotStore = useSnapShotStoreWithOut()
const composeStore = useComposeStoreWithOut()

const props = withDefaults(
  defineProps<{
    active?: boolean
    element: any
    defaultStyle: any
    index: number | string
  }>(),
  {
    active: false
  }
)

const left = ref<number>(0)
const top = ref<number>(0)
const showEm = computed(() => basicStore.isShowEm)

const shape = ref<ElRef>(null)
const { element } = { ...toRefs(props) }
const pointList = reactive<Array<string>>(['lt', 't', 'rt', 'r', 'rb', 'b', 'lb', 'l'])
const initialAngle = reactive<{}>({
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
        const { id, label }: { id: string; label: string } = instance['element'] || {}
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
  return (props.active && !props.element.isLock) || composeStore.isActived(props.element)
})

const isLayerActive = computed<boolean>(() => {
  if (basicStore.layerComponent) {
    return basicStore.layerComponent.id === props.element.id
  }
  return false
})

const appendComponent = () => {
  composeStore.appendComponent(props.element)
}

const getPointStyle = (point) => {
  const { width, height } = props.defaultStyle
  const hasT = /t/.test(point)
  const hasB = /b/.test(point)
  const hasL = /l/.test(point)
  const hasR = /r/.test(point)
  let newLeft = 0
  let newTop = 0

  // 四个角的点
  if (point.length === 2) {
    newLeft = hasL ? 0 : width
    newTop = hasT ? 0 : height
  } else {
    // 上下两点的点，宽度居中
    if (hasT || hasB) {
      newLeft = width / 2
      newTop = hasT ? 0 : height
    }

    // 左右两边的点，高度居中
    if (hasL || hasR) {
      newLeft = hasL ? 0 : width
      newTop = Math.floor(height / 2)
    }
  }

  return {
    marginLeft: '-4px',
    marginTop: '-4px',
    left: `${newLeft}px`,
    top: `${newTop}px`,
    cursor: cursors.value[point]
  }
}

const handleMouseDownOnShape = (e) => {
  basicStore.setClickComponentStatus(true)
  e.preventDefault()
  e.stopPropagation()
  basicStore.setCurComponent(props.element, props.index as number)
  if (props.element.isLock) return

  cursors.value = getCursor()

  const pos = { ...props.defaultStyle }
  const startY = e.clientY
  const startX = e.clientX
  // 如果直接修改属性，值的类型会变为字符串，所以要转为数值型
  const startTop = Number(pos.top)
  const startLeft = Number(pos.left)

  // 如果元素没有移动，则不保存快照
  let hasMove = false
  const move = (moveEvent) => {
    hasMove = true
    const curX = moveEvent.clientX
    const curY = moveEvent.clientY
    pos.top = curY - startY + startTop
    pos.left = curX - startX + startLeft

    // 修改当前组件样式
    basicStore.setShapeStyle(pos)
    // 等更新完当前组件的样式并绘制到屏幕后再判断是否需要吸附
    // 如果不使用 $nextTick，吸附后将无法移动
    nextTick(() => {
      // 触发元素移动事件，用于显示标线、吸附功能
      // 后面两个参数代表鼠标移动方向
      // curY - startY > 0 true 表示向下移动 false 表示向上移动
      // curX - startX > 0 true 表示向右移动 false 表示向左移动
      eventBus.emit('move', { isDownward: curY - startY > 0, isRightward: curX - startX > 0 })
    })
  }

  const up = () => {
    hasMove && snapShotStore.recordSnapshot()
    // 触发元素停止移动事件，用于隐藏标线
    eventBus.emit('unmove')
    document.removeEventListener('mousemove', move)
    document.removeEventListener('mouseup', up)
  }

  document.addEventListener('mousemove', move)
  document.addEventListener('mouseup', up)
}

const selectCurComponent = (e) => {
  // 阻止向父组件冒泡
  e.stopPropagation()
  e.preventDefault()
}

const handleMouseDownOnPoint = (point, e) => {
  basicStore.setClickComponentStatus(true)
  e.stopPropagation()
  e.preventDefault()

  const style = { ...props.defaultStyle }

  // 组件宽高比
  const proportion: number = style.width / style.height

  // 组件中心点
  const center: Vector = {
    x: style.left + style.width / 2,
    y: style.top + style.height / 2
  }

  if (!basicStore.editor) {
    return
  }

  // 获取画布位移信息
  const editorRectInfo = basicStore.editor.getBoundingClientRect()

  // 获取 point 与实际拖动基准点的差值 @justJokee
  // fix https://github.com/woai3c/visual-drag-demo/issues/26#issue-937686285
  const pointRect = e.target.getBoundingClientRect()
  // 当前点击圆点相对于画布的中心坐标
  const curPoint: Vector = {
    x: Math.round(pointRect.left - editorRectInfo.left + e.target.offsetWidth / 2),
    y: Math.round(pointRect.top - editorRectInfo.top + e.target.offsetHeight / 2)
  }

  // 获取对称点的坐标
  const symmetricPoint: Vector = {
    x: center.x - (curPoint.x - center.x),
    y: center.y - (curPoint.y - center.y)
  }

  // 是否需要保存快照
  let needSave = false
  let isFirst = true

  const needLockProportion: boolean = isNeedLockProportion()
  const move = (moveEvent) => {
    // 第一次点击时也会触发 move，所以会有“刚点击组件但未移动，组件的大小却改变了”的情况发生
    // 因此第一次点击时不触发 move 事件
    if (isFirst) {
      isFirst = false
      return
    }

    needSave = true
    const curPositon: Vector = {
      x: moveEvent.clientX - editorRectInfo.left,
      y: moveEvent.clientY - editorRectInfo.top
    }

    calculateComponentPositonAndSize(point, style, curPositon, proportion, needLockProportion, {
      center,
      curPoint,
      symmetricPoint
    })

    basicStore.setShapeStyle(style)
  }

  const up = () => {
    document.removeEventListener('mousemove', move)
    document.removeEventListener('mouseup', up)
    needSave && snapShotStore.recordSnapshot()
  }

  document.addEventListener('mousemove', move)
  document.addEventListener('mouseup', up)
}

const isNeedLockProportion = (): boolean => {
  if (props.element.component != 'Group') return false
  const ratates = [0, 90, 180, 360]
  for (const component of props.element.subComponents) {
    if (!ratates.includes(mod360(parseInt(component.style.rotate)))) {
      return true
    }
  }

  return false
}

// 处理旋转
const handleRotate = (e) => {
  if (!shape.value) {
    return
  }

  basicStore.setClickComponentStatus(true)
  e.preventDefault()
  e.stopPropagation()
  // 初始坐标和初始角度
  const pos = { ...props.defaultStyle }
  const startY: number = e.clientY
  const startX: number = e.clientX
  const startRotate: number = pos.rotate

  // 获取元素中心点位置
  const rect: DOMRect = shape.value.getBoundingClientRect()
  const centerX: number = rect.left + rect.width / 2
  const centerY: number = rect.top + rect.height / 2

  // 旋转前的角度
  const rotateDegreeBefore = Math.atan2(startY - centerY, startX - centerX) / (Math.PI / 180)

  // 如果元素没有移动，则不保存快照
  let hasMove = false
  const move = (moveEvent) => {
    hasMove = true
    const curX = moveEvent.clientX
    const curY = moveEvent.clientY
    // 旋转后的角度
    const rotateDegreeAfter = Math.atan2(curY - centerY, curX - centerX) / (Math.PI / 180)
    // 获取旋转的角度值
    pos.rotate = startRotate + rotateDegreeAfter - rotateDegreeBefore

    // 修改当前组件样式
    basicStore.setShapeStyle(pos)
  }

  const up = () => {
    hasMove && snapShotStore.recordSnapshot()
    document.removeEventListener('mousemove', move)
    document.removeEventListener('mouseup', up)
    cursors.value = getCursor() // 根据旋转角度获取光标位置
  }

  document.addEventListener('mousemove', move)
  document.addEventListener('mouseup', up)
}

const getCursor = () => {
  if (!basicStore.curComponent) {
    return {}
  }

  const rotate: number = mod360(basicStore.curComponent.style.rotate) // 取余 360
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

onMounted(() => {
  cursors.value = getCursor()
})

watch(
  () => props.defaultStyle,
  (newVal) => {
    left.value = newVal.left
    top.value = newVal.top
  },
  { deep: true, immediate: true }
)
</script>

<style lang="less" scoped>
@layer components {
  .shape {
    @apply absolute hover:cursor-move;
    border-width: v-bind(borderWidth);
    border-color: v-bind(borderColor);
    border-style: v-bind(borderStyle);

    .error-info {
      color: red;
      font-size: 20px;
      white-space: nowrap;
    }
  }

  .active {
    @apply select-none;

    outline: 1px solid #70c0ff;
  }

  .layerActive {
    @apply select-none;

    outline: 1px solid red;
  }

  .shape-point {
    @apply absolute bg-white border border-solid border-blue-400 w-2 h-2 rounded-full z-10;
  }

  .icon-xuanzhuan {
    position: absolute;
    top: -34px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 16px;
    font-weight: 600;
    cursor: grab;
    color: #59c7f9;
    font-size: 20px;
    font-weight: 600;

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
</style>
