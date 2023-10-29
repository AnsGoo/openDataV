<!-- Created by 337547038 on $. -->
<template>
  <div ref="el" class="color-panel" :style="{ background: background }" @mousedown="bgClick">
    <div class="color-white-panel"></div>
    <div class="color-block-panel"></div>
    <div
      class="color-cursor"
      :style="{ left: state.style.left + 'px', top: state.style.top + 'px' }"
      @mousedown.stop="onMouseDown"
    ></div>
  </div>
</template>

<script lang="ts" setup>
import { computed, reactive, ref, watch } from 'vue'

import type { Color } from './types'

const props = withDefaults(
  defineProps<{
    bgColor: Color
    showColor: Color
  }>(),
  {}
)

const el = ref()
const state = reactive({
  style: {
    left: 0,
    top: 0
  },
  panelBgInfo: {
    w: 0,
    x: 0,
    y: 0,
    h: 0
  } // 颜色面板的信息left,top,width,height
})
const background = computed(() => {
  const { r, g, b } = props.bgColor
  return `rgba(${r}, ${g}, ${b})`
})
watch(
  () => props.bgColor,
  () => {
    changeShowColor()
  }
)
const bgClick = (e: any) => {
  // 防止滑块触发背景点击事件
  if (e.target.className === 'color-cursor') return

  const { offsetX, offsetY } = e
  const { w } = state.panelBgInfo

  // 基于点击的位置给滑块定位
  state.style = {
    left: offsetX,
    top: offsetY
  }
  // 因为是基于右上角给推断颜色，所以将颜色的原点设在右上角
  // 所以此处x需要用宽度减去滑块的left
  const x = w - offsetX
  calcWidthColor(x, offsetY)

  // 点击背景后，滑块移动到指针处，在未松开鼠标时依然可拖动
  onMouseDown(e)
  e.stopPropagation()
}
const calcWidthColor = (x: number, y: number) => {
  const { w, h } = state.panelBgInfo

  const newColor = JSON.parse(JSON.stringify(props.bgColor))

  for (const key in newColor) {
    // hue => 色相、三原色
    const hue = newColor[key]
    newColor[key] = ((255 - hue) * x + hue * w) / w
  }

  calcHeightColor(x, y, w, h, newColor)
}
// 通过右边界交点计算原点的坐标
const calcHeightColor = (_x: number, y: number, _w: number, h: number, color: any) => {
  for (const key in color) {
    // hue => 色相、三原色
    const hue = color[key]
    const value = ((h - y) * hue) / h
    // eslint-disable-next-line vue/no-mutating-props
    props.showColor[key] = parseInt(value.toString())
  }
}
// 滑块被点击时
const onMouseDown = (e: MouseEvent) => {
  console.log('_onMouseDown')
  const { w, h } = state.panelBgInfo
  const l = e.pageX - state.style.left
  const t = e.pageY - state.style.top

  document.onmousemove = (res) => {
    const { pageX, pageY } = res
    let left = pageX - l
    let top = pageY - t
    if (left <= 0) left = 0
    if (left >= w) left = w
    if (top <= 0) top = 0
    if (top >= h) top = h
    state.style = {
      left: left,
      top: top
    }
    const x = w - left
    const y = top
    calcWidthColor(x, y)
  }

  document.onmouseup = () => {
    document.onmousemove = null
    document.onmouseup = null
  }
  e.stopPropagation()
}
// 根据当前显示的颜色定位滑块位置
const calcXY = () => {
  const w = el.value.offsetWidth
  const h = el.value.offsetHeight
  // state.panelBgInfo = {w, h}
  state.panelBgInfo.w = w
  state.panelBgInfo.h = h

  const { r, g, b } = props.showColor
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let x = (min / max) * w
  if (max === 0) {
    // 0不能作除数
    x = 0
  }
  const y = h - (max / 255) * h
  state.style.left = w - x
  state.style.top = y
}
// 背景颜色修改时，需基于当前滑块重新计算当前选中的颜色
const changeShowColor = () => {
  const { w } = state.panelBgInfo
  const { left, top } = state.style
  calcWidthColor(w - left, top)
}
defineExpose({ calcXY })
</script>
<style lang="less" scoped>
.color-white-panel {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: linear-gradient(90deg, #fff, hsla(0, 0%, 100%, 0));
}
.color-block-panel {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: linear-gradient(0deg, #000, transparent);
}
.color-cursor {
  position: absolute;
  width: 5px;
  height: 5px;
  box-shadow: 0 0 0 1.5px #fff, inset 0 0 1px 1px rgba(0, 0, 0, 0.3), 0 0 1px 2px rgba(0, 0, 0, 0.4);
  border-radius: 50%;
  transform: translate(-2px, -2px);
  cursor: pointer;
  z-index: 10;
}
</style>
