<template>
  <div
    :class="{ active: visible }"
    class="overflow-hidden border-b dark:border-b-zinc-500 border-b-zinc-200"
  >
    <div class="collapse-title" @click="slideToggle(1)">
      <i class="icon-arrow arrow" :class="{ down: visible }">
        <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M5.64645 3.14645C5.45118 3.34171 5.45118 3.65829 5.64645 3.85355L9.79289 8L5.64645 12.1464C5.45118 12.3417 5.45118 12.6583 5.64645 12.8536C5.84171 13.0488 6.15829 13.0488 6.35355 12.8536L10.8536 8.35355C11.0488 8.15829 11.0488 7.84171 10.8536 7.64645L6.35355 3.14645C6.15829 2.95118 5.84171 2.95118 5.64645 3.14645Z"
            fill="currentColor"
          />
        </svg>
      </i>
      <span> {{ title }}</span>
      <span v-if="$slots.trigger" @click="slideToggle()">
        <slot name="trigger"></slot>
      </span>
    </div>
    <collapse-transition>
      <div v-show="visible" ref="content" :class="{ active: visible }" class="collapse-content">
        <slot></slot>
      </div>
    </collapse-transition>
  </div>
</template>
<script lang="ts" setup>
import { computed, inject, onMounted, useSlots } from 'vue'

import CollapseTransition from '../Transition'

const props = withDefaults(
  defineProps<{
    name?: string
    title?: string
  }>(),
  {}
)
const slots = useSlots()
const randomName = props.name || Math.random().toString(36).substr(2, 8)
const parentProps: any = inject('OProps')
const changePanel: any = inject('OChangePanel')
const visible = computed(() => {
  return parentProps.modelValue.indexOf(randomName) !== -1
})
const slideToggle = (type?: number) => {
  if (type === 1 && slots.trigger) {
    return
  }
  const modelValue = parentProps.modelValue
  const index = modelValue.indexOf(randomName)
  if (parentProps.accordion) {
    // 每次只能展开一个面板
    if (index !== -1) {
      modelValue.splice(index, 1)
    } else {
      modelValue.splice(index, 1, randomName)
    }
  } else {
    // 点击展开，再点关闭
    if (index !== -1) {
      modelValue.splice(index, 1)
    } else {
      modelValue.push(randomName)
    }
  }
  // 点事件
  changePanel && changePanel(visible.value)
}
onMounted(() => {
  // parentProps.panelName.push(randomName)
})
</script>
<style lang="less">
@import './collapse.less';
</style>
