<template>
  <div
    class="dv-border-box-10"
    v-resize="resizeHandler"
    :style="`box-shadow: inset 0 0 25px 3px ${propValue.colorLeft}`"
  >
    <svg class="dv-border-svg-container" :width="width" :height="height">
      <polygon
        :fill="propValue.backgroundColor"
        :points="`
          4, 0 ${width - 4}, 0 ${width}, 4 ${width}, ${height - 4} ${width - 4}, ${height}
          4, ${height} 0, ${height - 4} 0, 4
        `"
      />
    </svg>

    <svg
      :width="width"
      :height="height"
      :key="item"
      v-for="item in border"
      :class="`${item} dv-border-svg-container`"
    >
      <polygon :fill="propValue.colorRight" points="40, 0 5, 0 0, 5 0, 16 3, 19 3, 7 7, 3 35, 3" />
    </svg>
  </div>
</template>

<script setup lang="ts">
import type { ComponentInfo } from '@/types/component'
import { ref } from 'vue'
import type { BorderBox10 } from './type'

const width = ref<number>(150)
const height = ref<number>(150)

const border = ref<string[]>(['left-top', 'right-top', 'left-bottom', 'right-bottom'])
defineProps<{
  propValue: BorderBox10
  element: ComponentInfo
}>()

// 监听窗口大小变化
const resizeHandler = (entries) => {
  const entry = entries[0]
  const rect = entry.contentRect
  width.value = rect.width
  height.value = rect.height
}
</script>

<style lang="less" scoped>
.dv-border-box-10 {
  // position: relative;
  width: 100%;
  height: 100%;
  border-radius: 6px;
  pointer-events: none;

  .dv-border-svg-container {
    position: absolute;
    display: block;
  }

  .right-top {
    right: 0px;
    transform: rotateY(180deg);
  }

  .left-bottom {
    bottom: 0px;
    transform: rotateX(180deg);
  }

  .right-bottom {
    right: 0px;
    bottom: 0px;
    transform: rotateX(180deg) rotateY(180deg);
  }
}
</style>
