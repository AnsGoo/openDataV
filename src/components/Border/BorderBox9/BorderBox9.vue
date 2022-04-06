<template>
  <div class="dv-border-box-9" ref="mainEl">
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

          <stop offset="0%" :stop-color="mergedColor[0]">
            <animate
              attributeName="stop-color"
              :values="`${mergedColor[0]};${mergedColor[1]};${mergedColor[0]}`"
              dur="10s"
              begin="0s"
              repeatCount="indefinite"
            />
          </stop>
          <stop offset="100%" :stop-color="mergedColor[1]">
            <animate
              attributeName="stop-color"
              :values="`${mergedColor[1]};${mergedColor[0]};${mergedColor[1]}`"
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
        :fill="backgroundColor"
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
import type { ComponentInfo } from '@/types/component'
import { useResizeObserver } from '@vueuse/core'
import { uuid } from '@/utils/utils'
import { computed, ref } from 'vue'

const mainEl = ref<ElRef>(null)
const width = ref<number>(150)
const height = ref<number>(150)
const gradientId = ref<string>(`border-box-9-gradient-${uuid()}`)
const maskId = ref<string>(`border-box-9-mask-${uuid()}`)

const props = defineProps<{
  propValue: Recordable<string>
  element: ComponentInfo
}>()

// 监听窗口大小变化
useResizeObserver(mainEl, (entries) => {
  const entry = entries[0]
  const rect = entry.contentRect
  width.value = rect.width
  height.value = rect.height
})

const mergedColor = computed(() => {
  const colorLeft = props.propValue.colorLeft
  const colorRight = props.propValue.colorRight
  if (colorLeft && colorRight) {
    return [colorLeft, colorRight]
  } else if (colorLeft) {
    return [colorLeft, colorLeft]
  } else if (colorRight) {
    return [colorRight, colorRight]
  }

  return ['#11eefd', '#0078d2']
})

const backgroundColor = computed(() => {
  if (props.propValue.backgroundColor) {
    return props.propValue.backgroundColor
  }

  return 'transparent'
})
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
    left: 0px;
    top: 0px;
  }
}
</style>
