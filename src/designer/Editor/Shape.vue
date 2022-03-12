<template>
  <div
    ref="shape"
    class="shape"
    :class="{ active: isActive || active, layerActive: isLayerActive }"
    @click.ctrl.exact="appendComponent"
    @click.exact="selectCurComponent"
    @mousedown="handleDragendShape"
    v-contextmenu="contextmenus"
  >
    <span class="error-info" v-show="isError">{{ errorInfo }}</span>
    <span class="iconfont icon-xuanzhuan" v-show="isActive" @mousedown="handleRotate"></span>
    <span class="iconfont icon-jiesuo" v-show="element.isLock"></span>
    <em v-show="showEm">({{ defaultStyle.left }},{{ defaultStyle.top }})</em>
    <!-- <div
      class="shape-point"
      v-for="item in isActive ? pointList : []"
      @mousedown="handleStretchedShape(item, $event)"
      :key="item"
      :style="getPointStyle(item)"
    ></div>-->
    <div
      class="shape-point top-left"
      v-show="isActive"
      :style="{ top: '0%', left: '0%', cursor: 'se-resize' }"
      @mousedown="handleStretchedShape('lt', $event)"
    ></div>
    <div
      class="shape-point"
      v-show="isActive"
      :style="{ top: '0%', left: '50%', cursor: 's-resize' }"
      @mousedown="handleStretchedShape('t', $event)"
    ></div>
    <div
      class="shape-point"
      v-show="isActive"
      :style="{ top: '0%', left: '100%', cursor: 'ne-resize' }"
      @mousedown="handleStretchedShape('rt', $event)"
    ></div>
    <div
      class="shape-point"
      v-show="isActive"
      :style="{ top: '50%', left: '100%', cursor: 'w-resize' }"
      @mousedown="handleStretchedShape('r', $event)"
    ></div>
    <div
      class="shape-point"
      v-show="isActive"
      :style="{ top: '100%', left: '100%', cursor: 'se-resize' }"
      @mousedown="handleStretchedShape('rb', $event)"
    ></div>
    <div
      class="shape-point"
      v-show="isActive"
      :style="{ top: '100%', left: '50%', cursor: 's-resize' }"
      @mousedown="handleStretchedShape('b', $event)"
    ></div>
    <div
      class="shape-point"
      v-show="isActive"
      :style="{ top: '100%', left: '0%', cursor: 'ne-resize' }"
      @mousedown="handleStretchedShape('lb', $event)"
    ></div>
    <div
      class="shape-point"
      v-show="isActive"
      :style="{ top: '50%', left: '0%', cursor: 'w-resize' }"
      @mousedown="handleStretchedShape('l', $event)"
    ></div>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { useBasicStoreWithOut } from '@/store/modules/basic'
import { useSnapShotStoreWithOut } from '@/store/modules/snapshot'
import { useComposeStoreWithOut } from '@/store/modules/compose'
import { reactive, toRefs, ref, computed, onMounted, onErrorCaptured } from 'vue'
import type { ComponentPublicInstance } from 'vue'
import { mod360, copyText } from '@/utils/utils'
import { eventBus } from '@/bus/useEventBus'
import type { Vector } from '@/types/common'
import { ContextmenuItem } from '@/plugins/directive/contextmenu/types'
import { useCopyStoreWithOut } from '@/store/modules/copy'
import { ComponentInfo, ComponentStyle } from '@/types/component'
import { stretchedComponents } from '@/utils/component'
const basicStore = useBasicStoreWithOut()
const snapShotStore = useSnapShotStoreWithOut()
const composeStore = useComposeStoreWithOut()
const copyStore = useCopyStoreWithOut()

const props = withDefaults(
  defineProps<{
    active?: boolean
    element: ComponentInfo
    defaultStyle: ComponentStyle
    index: string
  }>(),
  {
    active: false
  }
)

const copy = () => {
  copyStore.copy()
  copyText(JSON.stringify(basicStore.curComponent))
}

const deleteComponent = async () => {
  if (props.index) {
    basicStore.removeComponent(props.index)
  }
}

const upComponent = async () => {
  if (props.index) {
    basicStore.upComponent(props.index)
  }
}

const downComponent = async () => {
  if (props.index) {
    basicStore.downComponent(props.index)
  }
}

const topComponent = async () => {
  if (props.index) {
    basicStore.topComponent(props.index)
  }
}

/**
 * 复制组件ID
 */
const copyComponentId = () => {
  if (props.index) {
    let id = basicStore.curComponent!.id
    copyText(id as string)
  }
}

const bottomComponent = async () => {
  if (props.index) {
    basicStore.bottomComponent(props.index)
  }
}

const decompose = async () => {
  composeStore.decompose()
}

const contextmenus = (): ContextmenuItem[] => {
  basicStore.setCurComponent(props.element)
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
const { element } = { ...toRefs(props) }
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

/**
 * 拖动组件
 */
const handleDragendShape = (e: MouseEvent) => {
  if (e.button === 0) {
    basicStore.setClickComponentStatus(true)
    e.preventDefault()
    e.stopPropagation()
    basicStore.setCurComponent(props.element)
    if (props.element.isLock) return

    cursors.value = getCursor()

    let { top, left } = props.defaultStyle
    const startY = e.clientY
    const startX = e.clientX
    // 如果直接修改属性，值的类型会变为字符串，所以要转为数值型
    const startTop = top
    const startLeft = left

    // 如果元素没有移动，则不保存快照
    // let hasMove = false
    const move = (moveEvent) => {
      // hasMove = true
      const curX = moveEvent.clientX
      const curY = moveEvent.clientY
      top = curY - startY + startTop
      left = curX - startX + startLeft

      // 修改当前组件样式
      basicStore.syncComponentLoction({ top, left })
      // 等更新完当前组件的样式并绘制到屏幕后再判断是否需要吸附
      // 如果不使用 $nextTick，吸附后将无法移动
      // nextTick(() => {
      //   // 触发元素移动事件，用于显示标线、吸附功能
      //   // 后面两个参数代表鼠标移动方向
      //   // curY - startY > 0 true 表示向下移动 false 表示向上移动
      //   // curX - startX > 0 true 表示向右移动 false 表示向左移动
      //   eventBus.emit('move', { isDownward: curY - startY > 0, isRightward: curX - startX > 0 })
      // })
    }

    const up = () => {
      // hasMove && (await snapShotStore.recordSnapshot())
      // 触发元素停止移动事件，用于隐藏标线
      eventBus.emit('unmove')
      document.removeEventListener('mousemove', move)
      document.removeEventListener('mouseup', up)
    }

    document.addEventListener('mousemove', move)
    document.addEventListener('mouseup', up)
  }
}

const selectCurComponent = (e) => {
  // 阻止向父组件冒泡
  e.stopPropagation()
  e.preventDefault()
  basicStore.setCurComponent(props.element)
}

/**
 * 拉伸组件
 */
const handleStretchedShape = (point: string, e: MouseEvent) => {
  if (e.button === 0) {
    basicStore.setClickComponentStatus(true)
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

    // 是否需要保存快照
    let needSave = false
    // const needLockProportion: boolean = isNeedLockProportion()
    const move = (moveEvent) => {
      // 第一次点击时也会触发 move，所以会有“刚点击组件但未移动，组件的大小却改变了”的情况发生
      // 因此第一次点击时不触发 move 事件

      needSave = true
      const curPositon: Vector = {
        x: moveEvent.clientX - editorRectInfo.left,
        y: moveEvent.clientY - editorRectInfo.top
      }

      const { top, left, width, height } = stretchedComponents(point, position, curPositon)
      basicStore.syncComponentLoction({ top, left, width, height })
    }

    const up = async () => {
      document.removeEventListener('mousemove', move)
      document.removeEventListener('mouseup', up)
      needSave && (await snapShotStore.recordSnapshot())
    }

    document.addEventListener('mousemove', move)
    document.addEventListener('mouseup', up)
  }
}

/**
 * 旋转组件
 */
const handleRotate = (e: MouseEvent) => {
  basicStore.setCurComponent(props.element)
  if (e.button === 0) {
    if (!shape.value) {
      return
    }

    basicStore.setClickComponentStatus(true)
    e.preventDefault()
    e.stopPropagation()
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
      basicStore.syncComponentLoction({ rotate })
    }

    const up = () => {
      // hasMove && (await snapShotStore.recordSnapshot())
      document.removeEventListener('mousemove', move)
      document.removeEventListener('mouseup', up)
      // cursors.value = getCursor() // 根据旋转角度获取光标位置
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

onMounted(() => {
  cursors.value = getCursor()
})
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
    margin-left: -4px;
    margin-top: -4px;
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

// div.top-left {
//   cursor: url("/cursor/ResizeRight.cur"), auto;
// }
</style>
