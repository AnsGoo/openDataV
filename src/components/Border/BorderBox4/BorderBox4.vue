<template>
  <div class="dv-border-box-4" v-resize="resizeHandler">
    <svg
      :class="`dv-border-svg-container ${propValue.reverse && 'dv-reverse'}`"
      :width="width"
      :height="height"
    >
      <polygon
        :fill="propValue.backgroundColor"
        :points="`
          ${width - 15}, 22 170, 22 150, 7 40, 7 28, 21 32, 24
          16, 42 16, ${height - 32} 41, ${height - 7} ${width - 15}, ${height - 7}
        `"
      />

      <polyline
        class="dv-bb4-line-1"
        :stroke="propValue.colorLeft"
        :points="`145, ${height - 5} 40, ${height - 5} 10, ${height - 35}
        10, 40 40, 5 150, 5 170, 20 ${width - 15}, 20`"
      />
      <polyline
        :stroke="propValue.colorRight"
        class="dv-bb4-line-2"
        :points="`245, ${height - 1} 36, ${height - 1} 14, ${height - 23}
        14, ${height - 100}`"
      />

      <polyline
        class="dv-bb4-line-3"
        :stroke="propValue.colorLeft"
        :points="`7, ${height - 40} 7, ${height - 75}`"
      />
      <polyline
        class="dv-bb4-line-4"
        :stroke="propValue.colorLeft"
        :points="`28, 24 13, 41 13, 64`"
      />
      <polyline class="dv-bb4-line-5" :stroke="propValue.colorLeft" :points="`5, 45 5, 140`" />
      <polyline class="dv-bb4-line-6" :stroke="propValue.colorRight" :points="`14, 75 14, 180`" />
      <polyline
        class="dv-bb4-line-7"
        :stroke="propValue.colorRight"
        :points="`55, 11 147, 11 167, 26 250, 26`"
      />
      <polyline class="dv-bb4-line-8" :stroke="propValue.colorRight" :points="`158, 5 173, 16`" />
      <polyline
        class="dv-bb4-line-9"
        :stroke="propValue.colorLeft"
        :points="`200, 17 ${width - 10}, 17`"
      />
      <polyline
        class="dv-bb4-line-10"
        :stroke="propValue.colorRight"
        :points="`385, 17 ${width - 10}, 17`"
      />
    </svg>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { BorderBox4 } from './type'

const width = ref<number>(150)
const height = ref<number>(150)

defineProps<{
  propValue: BorderBox4
  componentId: string
}>()

// 监听窗口大小变化
const resizeHandler = (entries: ResizeObserverEntry[]) => {
  const entry = entries[0]
  const rect: DOMRectReadOnly = entry.contentRect
  width.value = rect.width
  height.value = rect.height
}
</script>

<style lang="less" scoped>
.dv-border-box-4 {
  // position: relative;
  width: 100%;
  height: 100%;
  pointer-events: none;

  .dv-reverse {
    transform: rotate(180deg);
  }

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

  .sw1 {
    stroke-width: 1;
  }

  .sw3 {
    stroke-width: 3px;
    stroke-linecap: round;
  }

  .dv-bb4-line-1 {
    .sw1;
  }

  .dv-bb4-line-2 {
    .sw1;
  }

  .dv-bb4-line-3 {
    .sw3;
  }

  .dv-bb4-line-4 {
    .sw3;
  }

  .dv-bb4-line-5 {
    .sw1;
  }

  .dv-bb4-line-6 {
    .sw1;
  }

  .dv-bb4-line-7 {
    .sw1;
  }

  .dv-bb4-line-8 {
    .sw3;
  }

  .dv-bb4-line-9 {
    .sw3;
    stroke-dasharray: 100 250;
  }

  .dv-bb4-line-10 {
    .sw1;
    stroke-dasharray: 80 270;
  }
}
</style>
