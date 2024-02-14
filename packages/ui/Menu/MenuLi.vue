<template>
  <Transition
    name="menu"
    @before-enter="beforeEvent"
    @after-enter="afterEvent"
    @after-leave="afterEvent"
    @before-leave="beforeEvent"
  >
    <ul
      v-show="!itemUl || visibleList.includes(itemUl.key)"
      :class="{ ['layer-' + layer]: true, 'is-child': itemUl }"
      :data-height="getUlHeight(itemUl)"
    >
      <li
        v-for="item in items"
        :key="item.key"
        :class="{
          disabled: item.disabled,
          'is-down': visibleList.includes(item.key),
          selected: item.key === selectedKey
        }"
        @mouseenter="mouseenter(item)"
        @mouseleave="mouseleave(item)"
        @click="click(item, $event)"
      >
        <span class="menu-title">
          <i v-if="item.icon" class="icon">
            <component
              :is="item.icon!()"
              :disabled="!(layer === 0 && !item.children && menuProps.collapsed)"
          /></i>
          <span v-if="isString(item.label())" class="name">{{ item.label() }}</span>
          <span v-else class="name"><component :is="item.label()" /></span>
          <i v-if="(item.children || []).length > 0" class="icon-arrow"><ChevronDown /></i>
        </span>
        <MenuLi
          v-if="item.children"
          :items="item.children"
          :itemUl="item"
          :layer="layer + 1"
          @click="clickEmit"
          @select="select"
        />
      </li>
    </ul>
  </Transition>
</template>

<script lang="ts" setup>
import { isString } from 'lodash-es'
import { inject } from 'vue'

import { ChevronDown } from '../Icon'
import type { MenuOption } from './types'

withDefaults(
  defineProps<{
    items: MenuOption[]
    itemUl?: MenuOption
    layer?: number
  }>(),
  {
    layer: 0
  }
)
const emits = defineEmits<{
  (e: 'click', item: MenuOption): void
  (e: 'select', item: MenuOption): void
}>()
// 处理所有展开的项
const visibleList: any = inject(`OMenuVisibleList`, [])
const menuVisibleListChange: any = inject(`OMenuVisibleListChange`)
// 当前选中的项
const selectedKey = inject(`OMenuSelectKey`, '')
const selectedKeyChange: any = inject(`OMenuSelectKeyChange`)
const menuProps: any = inject(`OMenuProps`, {})
const mouseenter = (item: MenuOption) => {
  if (item.children && item?.children.length > 0) {
    onMouseEvent(item, true)
  }
}
const mouseleave = (item: MenuOption) => {
  if (item.children && item?.children.length > 0) {
    onMouseEvent(item, false)
  }
}
const onMouseEvent = (item: MenuOption, add: boolean) => {
  if (
    (menuProps.trigger === 'hover' && menuProps.mode === 'horizontal') ||
    (menuProps.mode === 'vertical' && menuProps.collapsed)
  ) {
    pushOrSplice(item, add)
  }
}
const click = (item: MenuOption, evt: MouseEvent) => {
  if (item.disabled) {
    return
  }
  if (menuProps.trigger === 'click' || menuProps.mode === 'vertical') {
    pushOrSplice(item, !visibleList.value.includes(item.key))
  }
  // 如果没有子级，设置当前选中项
  if (!item.children) {
    selectedKeyChange && selectedKeyChange(item.key)
    emits('select', item)
  }
  emits('click', item)
  evt.stopPropagation()
}
const pushOrSplice = (item: MenuOption, add: boolean) => {
  if (item.disabled) {
    return
  }
  if (add) {
    // 有子级时才处理
    if (item.children && !visibleList.value.includes(item.key)) {
      menuVisibleListChange && menuVisibleListChange(item.key, add)
    }
  } else {
    menuVisibleListChange && menuVisibleListChange(item.key, add)
  }
}
const getUlHeight = (item?: MenuOption) => {
  if (item && item.children) {
    return item.children.length * menuProps.liHeight + (item.childHeight || 0)
  }
  return null
}
const select = (item: MenuOption) => {
  emits('select', item)
}
const clickEmit = (item: MenuOption) => {
  emits('click', item)
}
// 高度展开动画
const beforeEvent = (el): void => {
  const height = el.getAttribute('data-height')
  if (height) {
    el.style.height = height + 'px'
    el.style.overflow = 'hidden'
  }
}
const afterEvent = (el): void => {
  el.style.height = ''
  el.style.overflow = ''
}
</script>
<style lang="less" scoped>
@import 'menu.less';
</style>
