<template>
  <div class="dv-decoration-1" ref="mainEl">
    <svg
      :width="`${svgWH[0]}px`"
      :height="`${svgWH[1]}px`"
      :style="`transform:scale(${svgScale[0]},${svgScale[1]});`"
    >
      <template v-for="(point, i) in points" :key="i">
        <rect
          v-if="Math.random() > 0.6"
          :key="i"
          :fill="mergedColor[0]"
          :x="point[0] - halfPointSideLength"
          :y="point[1] - halfPointSideLength"
          :width="propValue.pointSideLength"
          :height="propValue.pointSideLength"
        >
          <animate
            v-if="Math.random() > 0.6"
            attributeName="fill"
            :values="`${mergedColor[0]};transparent`"
            dur="1s"
            :begin="Math.random() * 2"
            repeatCount="indefinite"
          />
        </rect>
      </template>

      <rect
        v-if="rects[0]"
        :fill="mergedColor[1]"
        :x="rects[0][0] - propValue.pointSideLength"
        :y="rects[0][1] - propValue.pointSideLength"
        :width="propValue.pointSideLength * 2"
        :height="propValue.pointSideLength * 2"
      >
        <animate
          attributeName="width"
          :values="`0;${propValue.pointSideLength * 2}`"
          dur="2s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="height"
          :values="`0;${propValue.pointSideLength * 2}`"
          dur="2s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="x"
          :values="`${rects[0][0]};${rects[0][0] - propValue.pointSideLength}`"
          dur="2s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="y"
          :values="`${rects[0][1]};${rects[0][1] - propValue.pointSideLength}`"
          dur="2s"
          repeatCount="indefinite"
        />
      </rect>

      <rect
        v-if="rects[1]"
        :fill="mergedColor[1]"
        :x="rects[1][0] - 40"
        :y="rects[1][1] - propValue.pointSideLength"
        :width="40"
        :height="propValue.pointSideLength * 2"
      >
        <animate attributeName="width" values="0;40;0" dur="2s" repeatCount="indefinite" />
        <animate
          attributeName="x"
          :values="`${rects[1][0]};${rects[1][0] - 40};${rects[1][0]}`"
          dur="2s"
          repeatCount="indefinite"
        />
      </rect>
    </svg>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useResizeObserver } from '@vueuse/core'
import type { ComponentInfo } from '@/types/component'

const props = defineProps<{
  element: ComponentInfo
  propValue: Recordable<any>
}>()

const mainEl = ref<ElRef>(null)
const width = ref<number>(200)
const height = ref<number>(60)
const svgWH = ref<number[]>([200, 50])
const svgScale = ref<number[]>([1, 1])
const rowNum = ref<number>(4)
const rowPoints = ref<number>(20)
const halfPointSideLength = ref<number>(Number(props.propValue.pointSideLength) / 2)
const points = ref<number[][]>([])
const rects = ref<number[][]>([])

useResizeObserver(mainEl, (entries) => {
  const entry = entries[0]
  const rect = entry.contentRect
  width.value = rect.width
  height.value = rect.height

  calcSVGData()
})

const mergedColor = computed(() => {
  return [props.propValue.color1, props.propValue.color2] //['#fff', '#0de7c2']
})

const calcSVGData = () => {
  calcPointsPosition()

  calcRectsPosition()

  calcScale()
}

const calcPointsPosition = () => {
  const [w, h] = svgWH.value

  const horizontalGap = w / (rowPoints.value + 1)
  const verticalGap = h / (rowNum.value + 1)

  let newPoints = new Array(rowNum.value)
    .fill(0)
    .map((_, i) =>
      new Array(rowPoints.value)
        .fill(0)
        .map((__, j) => [horizontalGap * (j + 1), verticalGap * (i + 1)])
    )

  points.value = newPoints.reduce((all, item) => [...all, ...item], [])
}

const calcRectsPosition = () => {
  const rect1 = points.value[rowPoints.value * 2 - 1]
  const rect2 = points.value[rowPoints.value * 2 - 3]

  rects.value = [rect1, rect2]
}

const calcScale = () => {
  const [w, h] = svgWH.value

  svgScale.value = [width.value / w, height.value / h]
}
</script>

<style lang="less" scoped>
.dv-decoration-1 {
  width: 100%;
  height: 100%;

  svg {
    transform-origin: left top;
  }
}
</style>
