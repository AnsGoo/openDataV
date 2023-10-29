<!-- Created by 337547038 on $. -->
<template>
  <div class="color-slider" @mousedown="barClick">
    <span class="color-slier-thumb" :style="{ top: topStyle + 'px' }" @mousedown="mouseDown"></span>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'

import type { Color } from './types'

const props = withDefaults(
  defineProps<{
    value: Color // rgb格式，初始值
    sideBarHeight: number
  }>(),
  {}
)
const emits = defineEmits<{
  (e: 'update:value', modelValue: any): void
}>()

const topStyle = ref<number>(0)
watch(
  () => props.sideBarHeight,
  () => {
    calcTop()
  }
)
const mouseDown = (e: MouseEvent) => {
  const h = props.sideBarHeight
  const t = e.pageY - topStyle.value
  document.onmousemove = (ev) => {
    let top = ev.pageY - t
    if (top >= h) top = h
    if (top <= 0) top = 0
    changeBg(top, h)
  }
  document.onmouseup = () => {
    document.onmousemove = null
    document.onmouseup = null
  }
  e.stopPropagation()
}
// 修改背景图
const changeBg = (top: number, h: number) => {
  // 侧栏一共分为六个区域，每块区域的长度
  topStyle.value = top
  const total = h / 6
  let rgb: number[] = []
  if (top <= h / 6) {
    const g = getValue(top, total, 0)
    rgb = [255, g, 0]
  } else if (top <= (h * 2) / 6) {
    const r = getValue(top, total, 1)
    rgb = [255 - r, 255, 0]
  } else if (top <= (h * 3) / 6) {
    const b = getValue(top, total, 2)
    rgb = [0, 255, b]
  } else if (top <= (h * 4) / 6) {
    const g = getValue(top, total, 3)
    rgb = [0, 255 - g, 255]
  } else if (top < (h * 5) / 6) {
    const r = getValue(top, total, 4)
    rgb = [r, 0, 255]
  } else if (top <= (h * 6) / 6) {
    const b = getValue(top, total, 5)
    rgb = [255, 0, 255 - b]
  }
  // 通知父级组件调用ColorPanel修改当前选中的颜色
  // this.change && this.change(rgb)
  const bgColor = {
    r: rgb[0],
    g: rgb[1],
    b: rgb[2]
  }
  emits('update:value', bgColor)
}
const barClick = (e: MouseEvent) => {
  const height = props.sideBarHeight
  changeBg(e.offsetY, height)
  // 点击背景后，滑块移动到指针处，在未松开鼠标时依然可拖动
  mouseDown(e)
}
const getValue = (top: number, total: number, index: number) => {
  const value = ((top - total * index) / total) * 255
  return parseInt(value.toString())
}
// 通过选择或输入背景颜色修改时，重新计算滑块位置
const calcTop = () => {
  const { r, g, b } = props.value
  let top = 0
  const total = props.sideBarHeight / 6
  if (r === 255 && b === 0) top = (g / 255) * total
  if (g === 255 && b === 0) top = (r / 255 + 1) * total
  if (g === 255 && r === 0) top = (b / 255 + 2) * total
  if (b === 255 && r === 0) top = (g / 255 + 3) * total
  if (b === 255 && g === 0) top = (r / 255 + 4) * total
  if (r === 255 && g === 0) top = (b / 255 + 5) * total
  topStyle.value = top
}
defineExpose({ calcTop })
</script>
<style scoped>
.color-slier-thumb {
  position: absolute;
  cursor: pointer;
  box-sizing: border-box;
  left: 0;
  top: 0;
  width: 12px;
  height: 4px;
  border-radius: 1px;
  background: #fff;
  border: 1px solid #f0f0f0;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.6);
}
</style>
