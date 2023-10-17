<template>
  <div
    :class="{
      [`o-menu`]: true,
      [mode]: true,
      [theme]: true,
      ['o-collapsed']: collapsed && mode === 'vertical'
    }"
  >
    <MenuLi :items="options" @click="click" @select="select" />
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, provide, ref } from 'vue'

import MenuLi from './MenuLi.vue'
import type { Items } from './types'

const props = withDefaults(
  defineProps<{
    mode?: 'horizontal' | 'vertical'
    options: Items[]
    trigger?: 'hover' | 'click' // 子菜单打开的触发方式，只在 mode 为 horizontal 时有效
    theme?: 'light' | 'dark'
    liHeight?: number // 子菜单项高，仅在mode为vertical时，用于计算高度平滑动画效果
    openKeys?: string[]
    selectedKey?: string
    router?: boolean
    collapsed?: boolean
  }>(),
  {
    mode: 'vertical',
    trigger: 'hover',
    theme: 'light',
    liHeight: 40,
    openKeys: () => {
      return []
    },
    selectedKey: ''
  }
)
const emits = defineEmits<{
  (e: 'click', item: Items): void
  (e: 'select', item: Items): void
}>()
provide(`OMenuProps`, props)
// 展开的项集合
const visibleList = ref<string[]>(props.openKeys)
provide(`OMenuVisibleList`, visibleList)
provide(`OMenuVisibleListChange`, (key: string, add: boolean) => {
  if (add) {
    visibleList.value.push(key)
  } else {
    const index = visibleList.value.indexOf(key)
    visibleList.value.splice(index, 1)
  }
})
// 当前选中的项
const selectKey = ref<string>(props.selectedKey)
provide(`OMenuSelectKey`, selectKey)
provide(`OMenuSelectKeyChange`, (val: string) => {
  selectKey.value = val
})
// 收起全部
const slideUp = () => {
  visibleList.value = []
  selectKey.value = ''
}
const click = (item: Items) => {
  emits('click', item)
}
const select = (item: Items) => {
  emits('select', item)
}
onMounted(() => {
  if (props.trigger === 'click' && props.mode === 'horizontal') {
    document.addEventListener('click', slideUp, false)
  }
})
onBeforeUnmount(() => {
  if (props.trigger === 'click' && props.mode === 'horizontal') {
    document.removeEventListener('click', slideUp, false)
  }
})
</script>
<style lang="less" scoped>
@import 'menu.less';
</style>
