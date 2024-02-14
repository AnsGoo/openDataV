<template>
  <transition :name="animation">
    <div
      v-show="state.visible"
      ref="el"
      :class="{
        [`o-dialog-modal`]: true,
        modal: !modal,
        center: center
      }"
      :style="{ zIndex: zIndex }"
      @click="btnClick('modal')"
    >
      <div
        ref="dialogEl"
        :class="{
          ['o-dialog']: true,
          ['o-dialog-isAlert']: isAlert
        }"
        :style="{
          width: width,
          top: state.top,
          left: state.left,
          'transition-duration': state.moveFlag ? '0s' : ''
        }"
        @click.stop
      >
        <a v-if="showClose" :class="`o-dialog-close icon-close`" @click="btnClick('close')">
          <Clear />
        </a>
        <div v-if="autoClose > 0" :class="`o-dialog-auto-close`">
          <span>{{ closeTips.replace('S', state.autoTime.toString()) }}</span>
        </div>
        <div
          v-if="title || $slots.title"
          ref="headEl"
          :class="{ [`o-dialog-header`]: true, move: move }"
          @mousedown="mouseDown"
        >
          <template v-if="title">{{ title }}</template>
          <slot v-else name="title"></slot>
        </div>
        <div
          v-if="content || $slots.default"
          :style="{ height: height }"
          :class="{
            ['o-dialog-alert']: isAlert,
            ['o-dialog-content']: true
          }"
        >
          <i v-if="icon" :class="[{ ['icon-' + iconName]: icon }]"></i>
          <div v-if="content" :class="['o-dialog-text']">
            {{ content }}
          </div>
          <slot v-else></slot>
        </div>
        <div v-if="$slots.footer" :class="`o-dialog-footer`">
          <slot name="footer"></slot>
        </div>
        <div v-if="confirm || cancel" :class="`o-dialog-footer`">
          <o-button v-if="cancel" type="cancel" @click="btnClick('cancel')">{{ cancel }} </o-button>
          <o-button v-if="confirm" type="primary" @click="btnClick('confirm')"
            >{{ confirm }}
          </o-button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import { computed, nextTick, onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue'

import OButton from '../Button/Button.vue'
import { Clear } from '../Icon'
import { getOffset, getWindow } from '../util/dom'

const scrollTop = () => {
  // 滚动条的位置
  return document.documentElement.scrollTop || document.body.scrollTop
}

const getScrollbarWidth = (bool?: boolean) => {
  // 取滚动条的宽
  const hasScroll =
    document.body.scrollHeight > (window.innerHeight || document.documentElement.clientHeight)
  const scrollDiv: HTMLDivElement = document.createElement('div')
  scrollDiv.style.cssText =
    'width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;'
  document.body.appendChild(scrollDiv)
  const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
  document.body.removeChild(scrollDiv)
  if (bool) {
    return { hasScroll: hasScroll, width: scrollbarWidth }
  } else {
    return scrollbarWidth
  }
}
export interface StateStyle {
  //[propName: string]: any
  autoTime: number
  visible: boolean
  left?: string
  top?: string
  moveFlag: boolean
  scrollbar: any
  isDestroy: boolean
}

const props = withDefaults(
  defineProps<{
    zIndex?: number
    show?: boolean
    title?: string // 标题，也可通过具名 slot 传入，title优先
    content?: string
    appendToBody?: boolean // Dialog 自身是否插入至 body 元素上
    top?: string // 默认弹出时距离顶部的距离
    width?: string
    height?: string // 内容区域的高度
    center?: string // 垂直对齐
    modal?: boolean // 是否需要遮罩层
    closeModal?: boolean // 是否可以通过点击 modal 关闭 Dialog
    lockScroll?: boolean // 是否在 Dialog 出现时将 body 滚动锁定
    showClose?: boolean // 是否显示关闭按钮
    confirm?: string // 确认按钮
    cancel?: string // 取消按钮
    callback?: Function
    move?: boolean // 允许拖动窗口
    autoClose?: number // 自动关闭时间
    closeTips?: string // 自动关闭时提示语,大写S会被替换为具体时间
    beforeClose?: Function // 关闭前的回调
    animation?: string
    isAlert?: boolean // 用于区别引用形式，组件或者是插件，不需要通过外部传参。true时关闭弹窗时同时从body移除
    remove?: Function // 用于移动message弹窗
    icon?: string | number // 主要用于this.$dialog中常见的几种提示
    close?: Function // 关闭动画完成时回调
  }>(),
  {
    zIndex: 999,
    show: false,
    appendToBody: true, // Dialog 自身是否插入至 body 元素上
    modal: true, // 是否需要遮罩层
    closeModal: true, // 是否可以通过点击 modal 关闭 Dialog
    lockScroll: false, // 是否在 Dialog 出现时将 body 滚动锁定
    showClose: true, // 是否显示关闭按钮
    move: false, // 允许拖动窗口
    autoClose: 0, // 自动关闭时间
    closeTips: 'S秒后自动关闭', // 自动关闭时提示语,大写S会被替换为具体时间
    animation: 'fade',
    icon: 0 // 主要用于this.$dialog中常见的几种提示
  }
)

const emits = defineEmits<{
  (e: 'update:show', show: boolean): void
}>()
const el = ref()
const headEl = ref()
const dialogEl = ref()
const state = reactive<StateStyle>({
  autoTime: props.autoClose, // 自动关闭时间
  visible: props.show, // 控制窗口显示隐藏
  left: '',
  top: props.top,
  moveFlag: false,
  scrollbar: {},
  isDestroy: false
})
let clearTime = 0
watch(
  () => props.show,
  (bool: boolean) => {
    state.visible = bool
    bool && autoCloseFn() // 调用自动关闭
    setScrollBarLock(bool) // 锁住
  }
)
const iconName = computed(() => {
  let icon = props.icon
  switch (props.icon) {
    case 1:
      icon = 'success'
      break
    case 2:
      icon = 'failure'
      break
    case 3:
      icon = 'tips'
      break
  }
  return icon
})
const autoCloseFn = () => {
  // 自动关闭
  if (props.autoClose > 0) {
    state.autoTime = props.autoClose
    clearTime = window.setInterval(() => {
      if (state.autoTime > 1) {
        state.autoTime--
      } else {
        // emit('callback')
        props.callback && props.callback()
        close()
      }
    }, 1000)
  }
}
const open = () => {
  state.visible = true
  autoCloseFn() // 调用自动关闭
  setScrollBarLock(true) // 锁住
}
const duration = 500 // 动画完成时间，由css控制，这里设个500
const close = () => {
  state.visible = false
  if (props.autoClose) {
    window.clearInterval(clearTime)
  }
  // message方法时移除，延时移除可保留过渡动画
  if (props.isAlert && props.remove) {
    window.setTimeout(() => {
      props.remove && props.remove()
    }, duration)
  }
  emits('update:show', false)
  setScrollBarLock(false) // 解锁
  if (typeof props.close === 'function') {
    // 动画完成后回调，动画时间由css控制目前设置都为300
    window.setTimeout(() => {
      props.close && props.close()
    }, duration)
  }

  props.beforeClose && !props.beforeClose()
}
defineExpose({ open, close })
const btnClick = (type: string) => {
  close()
  // 点击遮罩层不允许操作时
  if (!props.closeModal && type === 'modal') {
    return false
  }
  // 点确定并且绑定了回调事件时，由确定回调关闭
  // 自动关闭时不处理，即时间没到也可以点确定取消直接关闭
  if (!props.autoClose && type === 'confirm' && props.callback) {
    // emit('callback', close) // 将关闭方法传出去
    props.callback() // 回调时使用return true关闭
  }
  props.beforeClose && !props.beforeClose()
}
const mouseDown = (evt: MouseEvent) => {
  if (props.move && headEl.value) {
    state.moveFlag = false
    const offSet = getOffset(headEl.value)
    const x = evt.pageX - offSet.left
    const y = evt.pageY - offSet.top
    const scrollT = scrollTop()
    state.moveFlag = true
    document.onmousemove = (evt: MouseEvent) => {
      if (state.moveFlag) {
        let left = evt.pageX - x
        let top = evt.pageY - y - scrollT
        const windowWH = getWindow()
        const dialogHeight = dialogEl.value.offsetHeight
        const dialogWidth = dialogEl.value.offsetWidth
        if (left <= 0) {
          left = 0 // 最左边
        } else if (left > windowWH.width - dialogWidth) {
          // 最右边，窗口宽－弹层宽
          left = windowWH.width - dialogWidth
        }
        if (top <= 0) {
          top = 0
        } else if (top > windowWH.height - dialogHeight) {
          top = windowWH.height - dialogHeight
        }
        state.left = left + 'px'
        state.top = top + 'px'
        // this.$el.style.transitionDuration = '0s' // 拖动时要设为0，否则拖动很慢的感觉
      }
      return false
    }
    document.onmouseup = function () {
      document.onmousemove = null
      document.onmouseup = null
      state.moveFlag = false
    }
  }
}
const setScrollBarLock = (bool: boolean) => {
  if (props.lockScroll) {
    // 滚动body滚动
    const { hasScroll, width } = state.scrollbar
    if (hasScroll && bool) {
      // 当前页面有滚动条
      document.body.style.overflow = 'hidden'
      document.body.style.paddingRight = width + 'px' // 滚动条的宽，防抖动
    }
    if (!bool && hasScroll) {
      // 解锁
      document.body.style.overflow = ''
      document.body.style.paddingRight = '' // 滚动条的宽，防抖动
    }
  }
}
onMounted(() => {
  nextTick(() => {
    if (props.appendToBody && el.value) {
      document.body.appendChild(el.value)
    }
    if (props.lockScroll) {
      state.scrollbar = getScrollbarWidth(true) // 滚动条宽
    }
  })
})
onBeforeUnmount(() => {
  if (props.appendToBody && el.value.parentNode) {
    el.value.parentNode.removeChild(el.value)
  }
  clearTime && window.clearInterval(clearTime)
})
</script>
<style lang="less" scoped>
@import './modal.less';
</style>
