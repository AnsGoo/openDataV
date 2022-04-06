<template>
  <div class="dv-border-box-5" v-resize="resizeHandler">
    <svg
      :class="`dv-border-svg-container  ${propValue.reverse && 'dv-reverse'}`"
      :width="width"
      :height="height"
    >
      <polygon
        :fill="propValue.backgroundColor"
        :points="`
          10, 22 ${width - 22}, 22 ${width - 22}, ${height - 86} ${width - 84}, ${
          height - 24
        } 10, ${height - 24}
        `"
      />

      <polyline
        class="dv-bb5-line-1"
        :stroke="propValue.colorLeft"
        :points="`8, 5 ${width - 5}, 5 ${width - 5}, ${height - 100}
        ${width - 100}, ${height - 5} 8, ${height - 5} 8, 5`"
      />
      <polyline
        class="dv-bb5-line-2"
        :stroke="propValue.colorRight"
        :points="`3, 5 ${width - 20}, 5 ${width - 20}, ${height - 60}
        ${width - 74}, ${height - 5} 3, ${height - 5} 3, 5`"
      />
      <polyline
        class="dv-bb5-line-3"
        :stroke="propValue.colorRight"
        :points="`50, 13 ${width - 35}, 13`"
      />
      <polyline
        class="dv-bb5-line-4"
        :stroke="propValue.colorRight"
        :points="`15, 20 ${width - 35}, 20`"
      />
      <polyline
        class="dv-bb5-line-5"
        :stroke="propValue.colorRight"
        :points="`15, ${height - 20} ${width - 110}, ${height - 20}`"
      />
      <polyline
        class="dv-bb5-line-6"
        :stroke="propValue.colorRight"
        :points="`15, ${height - 13} ${width - 110}, ${height - 13}`"
      />
    </svg>
  </div>
</template>

<script setup lang="ts">
import type { ComponentInfo } from '@/types/component'
import { ref } from 'vue'
import type { BorderBox5 } from './type'

const width = ref<number>(150)
const height = ref<number>(150)

defineProps<{
  propValue: BorderBox5
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
.dv-border-box-5 {
  // position: relative;
  width: 100%;
  height: 100%;
  pointer-events: none;

  .dv-reverse {
    transform: rotate(180deg);
  }

  .dv-border-svg-container {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;

    & > polyline {
      fill: none;
    }
  }

  .dv-bb5-line-1,
  .dv-bb5-line-2 {
    stroke-width: 1;
  }

  .dv-bb5-line-3,
  .dv-bb5-line-6 {
    stroke-width: 5;
  }

  .dv-bb5-line-4,
  .dv-bb5-line-5 {
    stroke-width: 2;
  }
}
</style>
