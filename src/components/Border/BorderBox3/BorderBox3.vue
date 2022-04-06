<template>
  <div class="dv-border-box-3" v-resize="resizeHandler">
    <svg class="dv-border-svg-container" :width="width" :height="height">
      <polygon
        :fill="propValue.backgroundColor"
        :points="`
          23, 23 ${width - 24}, 23 ${width - 24}, ${height - 24} 23, ${height - 24}
        `"
      />

      <polyline
        class="dv-bb3-line1"
        :stroke="propValue.colorLeft"
        :points="`4, 4 ${width - 22} ,4 ${width - 22}, ${height - 22} 4, ${height - 22} 4, 4`"
      />
      <polyline
        class="dv-bb3-line2"
        :stroke="propValue.colorRight"
        :points="`10, 10 ${width - 16}, 10 ${width - 16}, ${height - 16} 10, ${height - 16} 10, 10`"
      />
      <polyline
        class="dv-bb3-line2"
        :stroke="propValue.colorRight"
        :points="`16, 16 ${width - 10}, 16 ${width - 10}, ${height - 10} 16, ${height - 10} 16, 16`"
      />
      <polyline
        class="dv-bb3-line2"
        :stroke="propValue.colorRight"
        :points="`22, 22 ${width - 4}, 22 ${width - 4}, ${height - 4} 22, ${height - 4} 22, 22`"
      />
    </svg>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { BorderBox3 } from './type'

const width = ref<number>(150)
const height = ref<number>(150)

defineProps<{
  propValue: BorderBox3
  componentId: string
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
.dv-border-box-3 {
  // position: relative;
  width: 100%;
  height: 100%;
  pointer-events: none;

  .dv-border-svg-container {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0px;
    left: 0px;

    & > polyline {
      fill: none;
    }
  }

  .dv-bb3-line1 {
    stroke-width: 3;
  }

  .dv-bb3-line2 {
    stroke-width: 1;
  }
}
</style>
