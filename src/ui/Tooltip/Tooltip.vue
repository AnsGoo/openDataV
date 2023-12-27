<template>
  <span ref="el" class="inline-block relative">
    <slot></slot>
    <transition :name="`tooltip-${transition}`">
      <div
        v-show="state.visible"
        ref="tooltipEl"
        :class="[`tooltip`, placement]"
        :style="state.tooltipStyle"
      >
        <i class="arrow"></i>
        <span v-if="content"> {{ content }}</span>
        <slot v-else name="content"></slot>
      </div>
    </transition>
  </span>
</template>
<script lang="ts" setup>
import { nextTick, onBeforeUnmount, onMounted, reactive, ref } from 'vue'

import { getOffset, getWindow } from '../util/dom'

interface CssStyle {
  maxWidth: string
  left?: string
  bottom?: string
  transform?: string
  top?: string
  right?: string
}

const props = withDefaults(
  defineProps<{
    content?: string
    placement?: string
    maxWidth?: number
    delay?: number // 鼠标移开后延时移除时间，主要能够让鼠标移动提示文字上，单位毫秒
    appendToBody?: boolean
    transition?: string
    x?: number // x轴微调
    y?: number // 当前标签与提示语之间的距离，用于微调/
    trigger?: 'hover' | 'click'
  }>(),
  {
    placement: 'bottom-left',
    maxWidth: 500,
    delay: 0,
    appendToBody: true, // 这个样式及定位没兼容，设置false时需自定义样式
    transition: 'fade',
    x: 0,
    y: 0,
    trigger: 'hover'
  }
)
const emits = defineEmits<{
  (e: 'click', val: boolean): void
}>()
const tooltipEl = ref()
const state = reactive({
  clearTime: 0,
  visible: false,
  tooltipStyle: {}
})
const el = ref()
const hasAppendToBody = ref(false)

onMounted(() => {
  nextTick(() => {
    if (props.trigger === 'click') {
      document.addEventListener('click', mouseClick, false)
    } else {
      el.value.addEventListener('mouseenter', mouseEnter, false)
      el.value.addEventListener('mouseleave', mouseLeave, false)
    }
    if (props.appendToBody && tooltipEl.value) {
      document.body.appendChild(tooltipEl.value)
      hasAppendToBody.value = true
    }
  })
})
onBeforeUnmount(() => {
  if (props.trigger === 'click') {
    document.removeEventListener('click', mouseClick, false)
  } else {
    el.value.removeEventListener('mouseenter', mouseEnter, false)
    el.value.removeEventListener('mouseleave', mouseLeave, false)
  }
  if (props.appendToBody && tooltipEl.value) {
    document.body.removeChild(tooltipEl.value)
  }
})
const translate = (px: number) => {
  // 通过transform平移标签时，如平移的单位为非偶数，会出现字体模糊，这里强制取偶
  if (px % 2 === 0) {
    // 偶数
    return px
  } else {
    return px + 1
  }
}
const setPosition = () => {
  const offset = getOffset(el.value)
  const windowWidth = getWindow().width
  const space = props.y + 8 // 当前标签与提示语之间的距离
  const style: CssStyle = {
    maxWidth: props.maxWidth + 'px'
  }
  if (props.appendToBody) {
    const windowHeight = getWindow().height
    const bottom = windowHeight - offset.top + space + 'px'
    switch (props.placement) {
      case 'top-left':
        style.left = offset.left + props.x + 'px'
        style.bottom = bottom
        break
      case 'top':
        // 先让提示左边和当前标签中间对齐（偏移位置+标签宽的一半），再向左移50%
        style.transform = 'translateX(-50%)'
        style.left = translate(offset.left + offset.width / 2 + props.x) + 'px'
        style.bottom = bottom
        break
      case 'top-right':
        style.right = windowWidth - (offset.left + offset.width + props.x) + 'px'
        style.bottom = bottom
        break
      case 'left':
        // top先让提示语顶部跟标签中间对齐，再上移50%
        style.right = windowWidth - (offset.left - 8 + props.x) + 'px'
        style.top = translate(offset.top + offset.height / 2) + 'px'
        style.transform = 'translateY(-50%)'
        break
      case 'right':
        // top和左边一样
        style.left = offset.left + offset.width + 8 + props.x + 'px'
        style.top = translate(offset.top + offset.height / 2) + 'px'
        style.transform = 'translateY(-50%)'
        break
      case 'bottom-left':
        style.left = offset.left + props.x + 'px'
        style.top = offset.top + offset.height + space + 'px'
        break
      case 'bottom':
        style.left = translate(offset.left + offset.width / 2 + props.x) + 'px'
        style.transform = 'translateX(-50%)'
        style.top = offset.top + offset.height + space + 'px'
        break
      case 'bottom-right':
        style.right = windowWidth - (offset.left + offset.width + props.x) + 'px'
        style.top = offset.top + offset.height + space + 'px'
        break
    }
  }
  state.tooltipStyle = Object.assign({}, style)
}
const mouseEnter = () => {
  setPosition()
  window.clearTimeout(state.clearTime)
  state.visible = true
  // 提示内容上添加鼠标事件
  if (props.delay && tooltipEl.value) {
    tooltipEl.value.addEventListener('mouseenter', toolTipEnter, false)
    tooltipEl.value.addEventListener('mouseleave', toolTipLeave, false)
  }
}
const mouseLeave = () => {
  state.clearTime = window.setTimeout(() => {
    state.visible = false
  }, props.delay)
}
const toolTipEnter = () => {
  window.clearTimeout(state.clearTime)
}
const toolTipLeave = () => {
  mouseLeave()
  // 同时移除事件
  tooltipEl.value.removeEventListener('mouseenter', toolTipEnter, false)
  tooltipEl.value.removeEventListener('mouseleave', toolTipLeave, false)
}
const mouseClick = (e: MouseEvent) => {
  if (e && el.value.contains(e.target)) {
    setPosition()
    state.visible = true
  } else {
    state.visible = false
  }
  emits('click', state.visible)
}
// 提供一个关闭的方法
const close = () => {
  state.visible = false
}
defineExpose({ close })
</script>
<style scoped lang="less">
.tooltip {
  position: absolute;
  z-index: 100;
  padding: 8px 12px;
  line-height: 20px;
  border-radius: 5px;
  box-sizing: border-box;
  border: 0 solid;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.12);
  background-color: #000e1c;
  text-align: left;
  color: white;
  .arrow {
    position: absolute;
    display: block;
    width: 0;
    height: 0;
    border-color: transparent;
    border-style: solid;
    border-width: 5px;
    filter: drop-shadow(0 2px 12px rgba(0, 0, 0, 0.03));
    border-top-width: 0;
    background-color: #000e1c;
    &:before {
      content: '';
      position: absolute;
      display: block;
      width: 0;
      height: 0;
      border-color: transparent;
      border-style: solid;
      border-width: 5px;
      border-top-width: 0;
      top: 1px;
      left: -5px;
    }
  }
  /*&:before { content: ''; display: inline-block; border: 5px solid transparent; position: absolute; }*/
  /*处理下箭头方向*/
  &.top-left {
    .arrow {
      left: 15px;
      bottom: -6px;
      transform: rotate(180deg);
    }
  }
  &.top {
    .arrow {
      left: 50%;
      bottom: -6px;
      margin-left: -5px;
      transform: rotate(180deg);
    }
  }
  &.top-right {
    .arrow {
      right: 15px;
      bottom: -6px;
      transform: rotate(180deg);
    }
  }
  &.left {
    .arrow {
      right: -8px;
      top: 50%;
      margin-top: -3px;
      transform: rotate(90deg);
    }
  }
  &.right {
    .arrow {
      left: -8px;
      top: 50%;
      transform: rotate(-90deg);
      margin-top: -3px;
    }
  }
  &.bottom-left {
    .arrow {
      left: 15px;
      top: -6px;
    }
  }
  &.bottom {
    .arrow {
      left: 50%;
      top: -6px;
      margin-left: -3px;
    }
  }
  &.bottom-right {
    .arrow {
      right: 15px;
      top: -6px;
    }
  }
}
.tooltip-fade-enter-active {
  animation: tooltip-fade-in 0.3s;
  &.top,
  &.bottom {
    //translateX
    animation: tooltip-fade-inX 0.3s;
  }
  &.left,
  &.right {
    //translateY
    animation: tooltip-fade-inY 0.3s;
  }
}
.tooltip-fade-leave-active {
  animation: tooltip-fade-out 0.3s;
}
@keyframes tooltip-fade-in {
  0% {
    transform: scale(0.8);
    opacity: 0;
  }
}
@keyframes tooltip-fade-out {
  100% {
    opacity: 0;
    transform: scale(0.8);
  }
}
@keyframes tooltip-fade-inX {
  0% {
    transform: translateX(-50%) scale(0.8);
    opacity: 0;
  }
}
</style>
