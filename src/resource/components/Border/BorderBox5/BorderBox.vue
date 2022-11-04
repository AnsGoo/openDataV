<template>
  <div v-resize="resizeHandler" class="dv-border-box-9">
    <svg class="dv-border-svg-container" :width="width" :height="height">
      <defs>
        <linearGradient :id="gradientId" x1="0%" y1="0%" x2="100%" y2="100%">
          <animate
            attributeName="x1"
            values="0%;100%;0%"
            dur="10s"
            begin="0s"
            repeatCount="indefinite"
          />

          <animate
            attributeName="x2"
            values="100%;0%;100%"
            dur="10s"
            begin="0s"
            repeatCount="indefinite"
          />

          <stop offset="0%" :stop-color="propValue.base.colorLeft">
            <animate
              attributeName="stop-color"
              :values="`${propValue.base.colorLeft};${propValue.base.colorRight};${propValue.base.colorLeft}`"
              dur="10s"
              begin="0s"
              repeatCount="indefinite"
            />
          </stop>
          <stop offset="100%" :stop-color="propValue.base.colorRight">
            <animate
              attributeName="stop-color"
              :values="`${propValue.base.colorRight};${propValue.base.colorLeft};${propValue.base.colorRight}`"
              dur="10s"
              begin="0s"
              repeatCount="indefinite"
            />
          </stop>
        </linearGradient>

        <mask :id="maskId">
          <polyline
            stroke="#fff"
            stroke-width="3"
            fill="transparent"
            :points="`8, ${height * 0.4} 8, 3, ${width * 0.4 + 7}, 3`"
          />
          <polyline
            fill="#fff"
            :points="`8, ${height * 0.15} 8, 3, ${width * 0.1 + 7}, 3
              ${width * 0.1}, 8 14, 8 14, ${height * 0.15 - 7}
            `"
          />

          <polyline
            stroke="#fff"
            stroke-width="3"
            fill="transparent"
            :points="`${width * 0.5}, 3 ${width - 3}, 3, ${width - 3}, ${height * 0.25}`"
          />
          <polyline
            fill="#fff"
            :points="`
              ${width * 0.52}, 3 ${width * 0.58}, 3
              ${width * 0.58 - 7}, 9 ${width * 0.52 + 7}, 9
            `"
          />
          <polyline
            fill="#fff"
            :points="`
              ${width * 0.9}, 3 ${width - 3}, 3 ${width - 3}, ${height * 0.1}
              ${width - 9}, ${height * 0.1 - 7} ${width - 9}, 9 ${width * 0.9 + 7}, 9
            `"
          />

          <polyline
            stroke="#fff"
            stroke-width="3"
            fill="transparent"
            :points="`8, ${height * 0.5} 8, ${height - 3} ${width * 0.3 + 7}, ${height - 3}`"
          />
          <polyline
            fill="#fff"
            :points="`
              8, ${height * 0.55} 8, ${height * 0.7}
              2, ${height * 0.7 - 7} 2, ${height * 0.55 + 7}
            `"
          />

          <polyline
            stroke="#fff"
            stroke-width="3"
            fill="transparent"
            :points="`${width * 0.35}, ${height - 3} ${width - 3}, ${height - 3} ${width - 3}, ${
              height * 0.35
            }`"
          />
          <polyline
            fill="#fff"
            :points="`
              ${width * 0.92}, ${height - 3} ${width - 3}, ${height - 3} ${width - 3}, ${
              height * 0.8
            }
              ${width - 9}, ${height * 0.8 + 7} ${width - 9}, ${height - 9} ${width * 0.92 + 7}, ${
              height - 9
            }
            `"
          />
        </mask>
      </defs>

      <polygon
        :fill="propValue.base.backgroundColor"
        :points="`
          15, 9 ${width * 0.1 + 1}, 9 ${width * 0.1 + 4}, 6 ${width * 0.52 + 2}, 6
          ${width * 0.52 + 6}, 10 ${width * 0.58 - 7}, 10 ${width * 0.58 - 2}, 6
          ${width * 0.9 + 2}, 6 ${width * 0.9 + 6}, 10 ${width - 10}, 10 ${width - 10}, ${
          height * 0.1 - 6
        }
          ${width - 6}, ${height * 0.1 - 1} ${width - 6}, ${height * 0.8 + 1} ${width - 10}, ${
          height * 0.8 + 6
        }
          ${width - 10}, ${height - 10} ${width * 0.92 + 7}, ${height - 10}  ${width * 0.92 + 2}, ${
          height - 6
        }
          11, ${height - 6} 11, ${height * 0.15 - 2} 15, ${height * 0.15 - 7}
        `"
      />

      <rect
        x="0"
        y="0"
        :width="width"
        :height="height"
        :fill="`url(#${gradientId})`"
        :mask="`url(#${maskId})`"
      />
    </svg>
  </div>
</template>

<script setup lang="ts">
import { useProp } from '@/resource/hooks'
import { uuid } from '@/utils/utils'
import { ref } from 'vue'
import type BorderBoxComponent from './config'
import type { BorderBox } from './type'

const props = defineProps<{
  component: BorderBoxComponent
}>()

const { propValue } = useProp<BorderBox>(props.component)
const width = ref<number>(150)
const height = ref<number>(150)
const gradientId = ref<string>(`border-box-9-gradient-${uuid()}`)
const maskId = ref<string>(`border-box-9-mask-${uuid()}`)

// 监听窗口大小变化
const resizeHandler = (entry: ResizeObserverEntry) => {
  const rect: DOMRectReadOnly = entry.contentRect
  width.value = rect.width
  height.value = rect.height
}
</script>

<style lang="less" scoped>
.dv-border-box-8 {
  // position: relative;
  width: 100%;
  height: 100%;
  pointer-events: none;

  .dv-border-svg-container {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
  }
}
</style>
