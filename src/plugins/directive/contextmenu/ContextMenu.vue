<template>
  <div
    class="mask"
    @contextmenu.prevent="removeContextmenu()"
    @mousedown="removeContextmenu()"
  ></div>
  <div
    class="contextmenu"
    :style="{
      left: style.left + 'px',
      top: style.top + 'px'
    }"
    @contextmenu.prevent
  >
    <MenuContent :menus="menus" :handleClickMenuItem="handleClickMenuItem" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import MenuContent from './MenuContent.vue'
import type { Axis, ContextmenuItem } from './types'

const props = defineProps<{
  axis: Axis
  el: HTMLElement
  menus: ContextmenuItem[]
  removeContextmenu: Function
}>()

const style = computed(() => {
  const MENU_WIDTH = 170
  const MENU_HEIGHT = 30
  const DIVIDER_HEIGHT = 11
  const PADDING = 5

  const { x, y } = props.axis
  const menuCount = props.menus.filter((menu) => !(menu.divider || menu.hide)).length
  const dividerCount = props.menus.filter((menu) => menu.divider).length

  const menuWidth = MENU_WIDTH
  const menuHeight = menuCount * MENU_HEIGHT + dividerCount * DIVIDER_HEIGHT + PADDING * 2

  const screenWidth = document.body.clientWidth
  const screenHeight = document.body.clientHeight

  return {
    left: screenWidth <= x + menuWidth ? x - menuWidth : x,
    top: screenHeight <= y + menuHeight ? y - menuHeight : y
  }
})

const handleClickMenuItem = (item: ContextmenuItem, event: MouseEvent) => {
  if (item.disable) return
  if (item.children && !item.handler) return
  if (item.handler) item.handler(props.el, event)
  props.removeContextmenu()
}
</script>

<style lang="less" scoped>
.mask {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9998;
}
.contextmenu {
  position: fixed;
  z-index: 9999;
  user-select: none;
}
</style>
