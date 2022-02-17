<template>
  <div :style="wrapperStyle" class="vue-ruler-wrapper" onselectstart="return false;">
    <section v-show="rulerToggle">
      <div ref="horizontalRuler" class="vue-ruler-h" @mousedown.stop="horizontalDragRuler">
        <span
          v-for="(item, index) in xScale"
          :key="index"
          :style="{ left: index * 50 + 2 + 'px' }"
          class="n"
          >{{ item.id }}</span
        >
      </div>
      <div ref="verticalRuler" class="vue-ruler-v" @mousedown.stop="verticalDragRuler">
        <span
          v-for="(item, index) in yScale"
          :key="index"
          :style="{ top: index * 50 + 2 + 'px' }"
          class="n"
          >{{ item.id }}</span
        >
      </div>
      <div :style="{ top: verticalDottedTop + 'px' }" class="vue-ruler-ref-dot-h"></div>
      <div :style="{ left: horizontalDottedLeft + 'px' }" class="vue-ruler-ref-dot-v"></div>
      <div
        v-for="item in lineList"
        :title="item.title"
        :style="getLineStyle(item)"
        :key="item.id"
        :class="`vue-ruler-ref-line-${item.type}`"
        @mousedown="handleDragLine(item)"
      >
        <span>{{ item.title }}</span>
      </div>
    </section>
    <div ref="contentEl" class="vue-ruler-content" :style="contentStyle">
      <slot></slot>
    </div>
    <div v-show="isDrag" class="vue-ruler-content-mask"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch, onMounted, onUnmounted } from 'vue'
import { useBasicStoreWithOut } from '@/store/modules/basic'

interface RulerToolPostion {
  top: number
  left: number
}

interface LineType {
  type: string
  site: number
}

interface BorderStyle {
  color: string
  type: string
  width: number
}

const emits = defineEmits<{
  (e: 'update:visible', rulerToggle: boolean): void
}>()

const props = withDefaults(
  defineProps<{
    isHotKey?: boolean
    isScaleRevise?: boolean
    contentLayout?: RulerToolPostion
    parent?: HTMLDivElement | null
    visible?: boolean
    stepLength?: number
    borderStyle?: BorderStyle
    canvas?: boolean
  }>(),
  {
    isHotKey: true,
    isScaleRevise: false,
    contentLayout: { top: 0, left: 0 } as any,
    parent: undefined,
    visible: true,
    stepLength: 50, // 最好是50的倍数
    borderStyle: {
      color: '#red',
      type: 'dashed',
      width: 1
    } as any,
    canvas: true
  }
)

const cloneList = reactive<LineType[]>([])
const size = ref<number>(17)
const left_top = ref<number>(18) // 内容左上填充
const windowWidth = ref<number>(0) // 窗口宽度
const windowHeight = ref<number>(0) // 窗口高度
let xScale = reactive<any[]>([]) // 水平刻度
let yScale = reactive<any[]>([]) // 垂直刻度
const topSpacing = ref<number>(0) // 标尺与窗口上间距
const leftSpacing = ref<number>(0) //  标尺与窗口左间距
const isDrag = ref<boolean>(false)
const dragFlag = ref<string>('') // 拖动开始标记，可能值x(从水平标尺开始拖动),y(从垂直标尺开始拖动)
const horizontalDottedLeft = ref<number>(-999) // 水平虚线位置
const verticalDottedTop = ref<number>(-999) // 垂直虚线位置
const rulerWidth = ref<number>(0) // 垂直标尺的宽度
const rulerHeight = ref<number>(0) // 水平标尺的高度
const dragLineId = ref<string>('') // 被移动线的ID
const keyCode = reactive<any>({
  r: 82
}) // 快捷键参数
const rulerToggle = ref<boolean>(true) // 标尺辅助线显示开关

const contentEl = ref<HTMLDivElement | null>(null)
const verticalRuler = ref<HTMLDivElement | null>(null)
const horizontalRuler = ref<HTMLDivElement | null>(null)

const basicStore = useBasicStoreWithOut()

const wrapperStyle = computed(() => {
  return {
    width: windowWidth.value + 'px',
    height: windowHeight.value + 'px'
  }
})

const contentStyle = computed(() => {
  return {
    left: props.contentLayout.left + 'px',
    top: props.contentLayout.top + 'px',
    padding: left_top.value + 'px 0px 0px ' + left_top.value + 'px'
  }
})

const lineList = computed(() => {
  let hCount = 0
  let vCount = 0
  return cloneList.map((item) => {
    const isH = item.type === 'h'
    return {
      id: `${item.type}_${isH ? hCount++ : vCount++}`,
      type: item.type,
      title: item.site.toFixed(2) + 'px',
      [isH ? 'top' : 'left']: item.site / (props.stepLength / 50) + size.value
    }
  })
})

watch(
  () => props.visible,
  (newVal) => {
    rulerToggle.value = newVal
  },
  { immediate: true }
)

onMounted(() => {
  document.addEventListener('mousemove', dottedLineMove)
  document.addEventListener('mouseup', dottedLineUp)
  document.addEventListener('keyup', keyboard)
  init()
  window.onresize = () => {
    windowResize()
  }
})

onUnmounted(() => {
  document.removeEventListener('mousemove', dottedLineMove)
  document.removeEventListener('mouseup', dottedLineUp)
  document.removeEventListener('keyup', keyboard)
  window.onresize = null
})

const init = () => {
  box()
  scaleCalc()
}

const windowResize = () => {
  xScale = []
  yScale = []
  init()
}

const getLineStyle = ({ type, top, left }: any) => {
  const style = {
    borderWidth: props.borderStyle.width + 'px',
    borderStyle: props.borderStyle.type,
    borderColor: props.borderStyle.color
  }

  return type === 'h' ? { top: top + 'px', ...style } : { left: left + 'px', ...style }
}

const handleDragLine = ({ type, id }) => {
  return type === 'h' ? dragHorizontalLine(id) : dragVerticalLine(id)
}

const box = () => {
  if (props.isScaleRevise) {
    // 根据内容部分进行刻度修正
    const content = contentEl.value!
    const contentLeft = content.offsetLeft
    const contentTop = content.offsetTop

    getCalcRevise(xScale, contentLeft)
    getCalcRevise(yScale, contentTop)
  }
  if (props.parent) {
    const { width, height } = props.parent.getBoundingClientRect()
    windowWidth.value = width
    windowHeight.value = height
  } else if (props.canvas) {
    windowWidth.value = basicStore.canvasStyleData.width
    windowHeight.value = basicStore.canvasStyleData.height
  } else {
    windowWidth.value = document.documentElement.clientWidth - leftSpacing.value
    windowHeight.value = document.documentElement.clientHeight - topSpacing.value
  }
  rulerWidth.value = verticalRuler.value!.clientWidth
  rulerHeight.value = horizontalRuler.value!.clientHeight
  setSpacing()
}

// 获取窗口宽与高
const setSpacing = () => {
  topSpacing.value = horizontalRuler.value!.getBoundingClientRect().y //.offsetParent.offsetTop
  leftSpacing.value = verticalRuler.value!.getBoundingClientRect().x // .offsetParent.offsetLeft
}

const scaleCalc = () => {
  getCalc(xScale, windowWidth.value)
  getCalc(yScale, windowHeight.value)
}
// 计算刻度
const getCalc = (array, length) => {
  for (let i = 0; i < (length * props.stepLength) / 50; i += props.stepLength) {
    if (i % props.stepLength === 0) {
      array.push({ id: i })
    }
  }
}

// 获取刻度方法
const getCalcRevise = (array, length) => {
  for (let i = 0; i < length; i += 1) {
    if (i % props.stepLength === 0 && i + props.stepLength <= length) {
      array.push({ id: i })
    }
  }
}

// 获取矫正刻度方法
const newLine = (val) => {
  isDrag.value = true
  dragFlag.value = val
}

// 生成一个参考线
const dottedLineMove = ($event) => {
  setSpacing()
  switch (dragFlag.value) {
    case 'h':
    case 'x':
      if (isDrag.value) {
        verticalDottedTop.value = $event.pageY - topSpacing.value
      }
      break
    case 'v':
    case 'y':
      if (isDrag.value) {
        horizontalDottedLeft.value = $event.pageX - leftSpacing.value
      }
      break
    default:
      break
  }
}

// 虚线移动
const dottedLineUp = ($event) => {
  setSpacing()
  if (isDrag.value) {
    switch (dragFlag.value) {
      case 'x':
        addDottedLine({
          type: 'h',
          site: ($event.pageY - topSpacing.value - size.value) * (props.stepLength / 50)
        })
        break
      case 'y':
        addDottedLine({
          type: 'v',
          site: ($event.pageX - leftSpacing.value - size.value) * (props.stepLength / 50)
        })
        break
      case 'h':
        dragCalc(cloneList, $event.pageY, topSpacing.value, rulerHeight.value, 'h')
        break
      case 'v':
        dragCalc(cloneList, $event.pageX, leftSpacing.value, rulerWidth.value, 'v')
        break
      default:
        break
    }
    verticalDottedTop.value = horizontalDottedLeft.value = -50
    isDrag.value = false
    dragLineId.value = ''
  }
}

// 虚线松开
const dragCalc = (list, page, spacing, ruler, type) => {
  if (page - spacing < ruler) {
    lineList.value.forEach((item, index) => {
      if (item.id === dragLineId.value) {
        list.splice(index, 1)
      }
    })
  } else {
    lineList.value.forEach((item, index) => {
      if (item.id === dragLineId.value) {
        list.splice(index, 1, {
          type: type,
          site: (page - spacing - size.value) * (props.stepLength / 50)
        })
      }
    })
  }
}

const horizontalDragRuler = () => {
  newLine('x')
}

// 水平标尺处按下鼠标
const verticalDragRuler = () => {
  newLine('y')
}

// 垂直标尺处按下鼠标
const dragHorizontalLine = (id) => {
  isDrag.value = true
  dragFlag.value = 'h'
  dragLineId.value = id
}

// 水平线处按下鼠标
const dragVerticalLine = (id) => {
  isDrag.value = true
  dragFlag.value = 'v'
  dragLineId.value = id
}

// 添加水平线
const addDottedLine = (item: { type: string; site: number }) => {
  if (item.site > size.value) {
    cloneList.push(item)
  }
}
// 垂直线处按下鼠标
const keyboard = ($event) => {
  if (props.isHotKey && $event.keyCode === keyCode.r) {
    rulerToggle.value = !rulerToggle.value
    emits('update:visible', rulerToggle.value)
    if (rulerToggle.value) {
      left_top.value = 18
    } else {
      left_top.value = 0
    }
  }
} // 键盘事件
</script>

<style lang="less" scoped>
.vue-ruler-wrapper {
  position: relative;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  overflow: hidden;
  user-select: none;
}

.vue-ruler-h,
.vue-ruler-v,
.vue-ruler-ref-line-v,
.vue-ruler-ref-line-h,
.vue-ruler-ref-dot-h,
.vue-ruler-ref-dot-v {
  position: absolute;
  left: 0;
  top: 0;
  overflow: hidden;
  z-index: 999;
}

.vue-ruler-h {
  width: 100%;
  height: 18px;
  left: 18px;
  opacity: 0.6;
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAASCAMAAAAuTX21AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAAlQTFRFMzMzAAAA////BqjYlAAAACNJREFUeNpiYCAdMDKRCka1jGoBA2JZZGshiaCXFpIBQIABAAplBkCmQpujAAAAAElFTkSuQmCC)
    repeat-x; /*./image/ruler_h.png*/
}

.vue-ruler-v {
  width: 18px;
  height: 100%;
  top: 18px;
  opacity: 0.6;
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAyCAMAAABmvHtTAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAAlQTFRFMzMzAAAA////BqjYlAAAACBJREFUeNpiYGBEBwwMTGiAakI0NX7U9aOuHyGuBwgwAH6bBkAR6jkzAAAAAElFTkSuQmCC)
    repeat-y; /*./image/ruler_v.png*/
}

.vue-ruler-v .n,
.vue-ruler-h .n {
  position: absolute;
  font: 10px/1 Arial, sans-serif;
  color: #333;
  cursor: default;
}

.vue-ruler-v .n {
  width: 8px;
  left: 3px;
  word-wrap: break-word;
}

.vue-ruler-h .n {
  top: 1px;
}

.vue-ruler-ref-line-v,
.vue-ruler-ref-line-h,
.vue-ruler-ref-dot-h,
.vue-ruler-ref-dot-v {
  z-index: 998;
}

.vue-ruler-ref-line-h {
  width: 100%;
  height: 0px;
  cursor: n-resize; /*url(./image/cur_move_h.cur), move*/
  overflow: visible;

  span {
    font-size: 12px;
    left: 16px;
    position: absolute;
    background-color: #ddd;
  }
}

.vue-ruler-ref-line-v {
  width: 0px;
  height: 100%;
  cursor: w-resize; /*url(./image/cur_move_v.cur), move*/
  overflow: visible;
  span {
    font-size: 12px;
    top: 16px;
    position: absolute;
    background-color: #ddd;
  }
}

.vue-ruler-ref-dot-h {
  width: 100%;
  height: 3px;
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAMAAABFaP0WAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAAZQTFRFf39/////F3PnHQAAAAJ0Uk5T/wDltzBKAAAAEElEQVR42mJgYGRgZAQIMAAADQAExkizYQAAAABJRU5ErkJggg==)
    repeat-x left 1px; /*./image/line_dot.png*/
  cursor: n-resize; /*url(./image/cur_move_h.cur), move*/
  top: -10px;
}

.vue-ruler-ref-dot-v {
  width: 3px;
  height: 100%;
  _height: 9999px;
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAMAAABFaP0WAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAAZQTFRFf39/////F3PnHQAAAAJ0Uk5T/wDltzBKAAAAEElEQVR42mJgYGRgZAQIMAAADQAExkizYQAAAABJRU5ErkJggg==)
    repeat-y 1px top; /*./image/line_dot.png*/
  cursor: w-resize; /*url(./image/cur_move_v.cur), move*/
  left: -10px;
}
.vue-ruler-content {
  position: absolute;
  z-index: 997;
}

.vue-ruler-content-mask {
  position: absolute;
  width: 100%;
  height: 100%;
  background: transparent;
  z-index: 998;
}
</style>
