<template>
  <div v-resize="resizeHandler" class="dv-border-box-1">
    <svg class="border" :width="width" :height="height">
      <polygon
        :fill="propValue.base.backgroundColor"
        :points="`10, 27 10, ${height - 27} 13, ${height - 24} 13, ${height - 21} 24, ${height - 11}
                                                                              38, ${
                                                                                height - 11
                                                                              } 41, ${
          height - 8
        } 73, ${height - 8} 75, ${height - 10} 81, ${height - 10}
                                                                              85, ${height - 6} ${
          width - 85
        }, ${height - 6} ${width - 81}, ${height - 10} ${width - 75}, ${height - 10}
                                                                              ${width - 73}, ${
          height - 8
        } ${width - 41}, ${height - 8} ${width - 38}, ${height - 11}
                                                                              ${width - 24}, ${
          height - 11
        } ${width - 13}, ${height - 21} ${width - 13}, ${height - 24}
                                                                              ${width - 10}, ${
          height - 27
        } ${width - 10}, 27 ${width - 13}, 25 ${width - 13}, 21
                                                                              ${width - 24}, 11 ${
          width - 38
        }, 11 ${width - 41}, 8 ${width - 73}, 8 ${width - 75}, 10
                                                                              ${width - 81}, 10 ${
          width - 85
        }, 6 85, 6 81, 10 75, 10 73, 8 41, 8 38, 11 24, 11 13, 21 13, 24`"
      />
    </svg>

    <svg v-for="item in border" :key="item" width="150px" height="150px" :class="`${item} border`">
      <polygon
        :fill="propValue.base.colorLeft"
        points="6,66 6,18 12,12 18,12 24,6 27,6 30,9 36,9 39,6 84,6 81,9 75,9 73.2,7 40.8,7 37.8,10.2 24,10.2 12,21 12,24 9,27 9,51 7.8,54 7.8,63"
      >
        <animate
          attributeName="fill"
          :values="`${propValue.base.colorLeft};${propValue.base.colorRight};${propValue.base.colorLeft}`"
          dur="0.5s"
          begin="0s"
          repeatCount="indefinite"
        />
      </polygon>
      <polygon
        :fill="propValue.base.colorRight"
        points="27.599999999999998,4.8 38.4,4.8 35.4,7.8 30.599999999999998,7.8"
      >
        <animate
          attributeName="fill"
          :values="`${propValue.base.colorRight};${propValue.base.colorLeft};${propValue.base.colorRight}`"
          dur="0.5s"
          begin="0s"
          repeatCount="indefinite"
        />
      </polygon>
      <polygon
        :fill="propValue.base.colorLeft"
        points="9,54 9,63 7.199999999999999,66 7.199999999999999,75 7.8,78 7.8,110 8.4,110 8.4,66 9.6,66 9.6,54"
      >
        <animate
          attributeName="fill"
          :values="`${propValue.base.colorLeft};${propValue.base.colorRight};transparent`"
          dur="1s"
          begin="0s"
          repeatCount="indefinite"
        />
      </polygon>
    </svg>
  </div>
</template>

<script setup lang="ts">
import { useProp } from '@/resource/hooks'
import { ref } from 'vue'
import type BorderBoxComponent from './config'
import type { BorderBox } from './type'
const props = defineProps<{
  component: BorderBoxComponent
}>()

const { propValue } = useProp<BorderBox>(props.component)

const width = ref<number>(150)
const height = ref<number>(150)

// 监听窗口大小变化

const resizeHandler = (entry: ResizeObserverEntry) => {
  const rect: DOMRectReadOnly = entry.contentRect
  width.value = rect.width
  height.value = rect.height
}

const border: string[] = ['left-top', 'right-top', 'left-bottom', 'right-bottom']
</script>

<style lang="less" scoped>
.dv-border-box-1 {
  // position: relative;
  width: 100%;
  height: 100%;
  pointer-events: none;

  .border {
    position: absolute;
    display: block;
    width: 100%;
    height: 100%;
    border: 0;
  }

  .right-top {
    right: 0;
    transform: rotateY(180deg);
  }

  .left-bottom {
    bottom: 0;
    transform: rotateX(180deg);
  }

  .right-bottom {
    right: 0;
    bottom: 0;
    transform: rotateX(180deg) rotateY(180deg);
  }

  .border-box-content {
    position: relative;
    width: 100%;
    height: 100%;
  }
}
</style>
