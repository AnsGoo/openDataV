<template>
  <div class="sidebar">
    <i :class="`icon iconfont ${sideicon}`" @click="handleHidenLeft" :style="iconStyle()"></i>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  parentSelector: string // 父级选择器
  expendWidth: number // 展开后的宽度
  shrinkWidth: number // 收起后的宽度
  expendIcon: string // 展开图标
  shrinkIcon: string // 收起图标
  position: 'left' | 'right'
}>()

const direction = ref<string>('expend')
const sideicon = ref<string>(props.expendIcon)
const position = ref<string>(props.position)

const handleHidenLeft = () => {
  const el = document.querySelector(props.parentSelector) as HTMLElement
  if (el) {
    if (direction.value === 'expend') {
      el.style.width = `${props.shrinkWidth}px`
      sideicon.value = props.shrinkIcon
      direction.value = 'shrink'
    } else {
      el.style.width = `${props.expendWidth}px`
      sideicon.value = props.expendIcon
      direction.value = 'expend'
    }
  }
}

const iconStyle = () => {
  if (props.position === 'left') {
    return {
      left: 0
    }
  } else {
    return {
      right: 0
    }
  }
}
</script>

<style scoped lang="less">
.sidebar {
  position: relative;
  height: 18px;
  width: 100%;
  background-color: #f1f1f1;
  box-shadow: inset 2px 2px 5px #f1f1f1, -2px -2px 5px #f1f1f1;
}

.sidebar i {
  position: absolute;
  font-size: 12px;
  width: 50%;
  text-align: v-bind(position);
}
</style>
