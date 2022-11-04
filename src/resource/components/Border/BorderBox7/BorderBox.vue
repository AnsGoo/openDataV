<template>
  <div v-resize="resizeHandler" class="dv-border-box-11">
    <svg class="dv-border-svg-container" :width="width" :height="height">
      <defs>
        <filter :id="filterId" height="150%" width="150%" x="-25%" y="-25%">
          <feMorphology operator="dilate" radius="2" in="SourceAlpha" result="thicken" />
          <feGaussianBlur in="thicken" stdDeviation="3" result="blurred" />
          <feFlood :flood-color="mergedColor[1]" result="glowColor" />
          <feComposite in="glowColor" in2="blurred" operator="in" result="softGlowColored" />
          <feMerge>
            <feMergeNode in="softGlowColored" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <polygon
        :fill="propValue.base.backgroundColor"
        :points="`
        20, 32 ${width * 0.5 - titleWidth / 2}, 32 ${width * 0.5 - titleWidth / 2 + 20}, 53
      ${width * 0.5 + titleWidth / 2 - 20}, 53 ${width * 0.5 + titleWidth / 2}, 32
      ${width - 20}, 32 ${width - 8}, 48 ${width - 8}, ${height - 25} ${width - 20}, ${height - 8}
      20, ${height - 8} 8, ${height - 25} 8, 50
      `"
      />

      <polyline
        :stroke="mergedColor[0]"
        :filter="`url(#${filterId})`"
        :points="`
        ${(width - titleWidth) / 2}, 30
      20, 30 7, 50 7, ${50 + (height - 167) / 2}
      13, ${55 + (height - 167) / 2} 13, ${135 + (height - 167) / 2}
      7, ${140 + (height - 167) / 2} 7, ${height - 27}
      20, ${height - 7} ${width - 20}, ${height - 7} ${width - 7}, ${height - 27}
      ${width - 7}, ${140 + (height - 167) / 2} ${width - 13}, ${135 + (height - 167) / 2}
      ${width - 13}, ${55 + (height - 167) / 2} ${width - 7}, ${50 + (height - 167) / 2}
      ${width - 7}, 50 ${width - 20}, 30 ${(width + titleWidth) / 2}, 30
      ${(width + titleWidth) / 2 - 20}, 7 ${(width - titleWidth) / 2 + 20}, 7
      ${(width - titleWidth) / 2}, 30 ${(width - titleWidth) / 2 + 20}, 52
      ${(width + titleWidth) / 2 - 20}, 52 ${(width + titleWidth) / 2}, 30
      `"
      />

      <polygon
        :stroke="mergedColor[0]"
        fill="transparent"
        :points="`
        ${(width + titleWidth) / 2 - 5}, 30 ${(width + titleWidth) / 2 - 21}, 11
      ${(width + titleWidth) / 2 - 27}, 11 ${(width + titleWidth) / 2 - 8}, 34
      `"
      />

      <polygon
        :stroke="mergedColor[0]"
        fill="transparent"
        :points="`
        ${(width - titleWidth) / 2 + 5}, 30 ${(width - titleWidth) / 2 + 22}, 49
      ${(width - titleWidth) / 2 + 28}, 49 ${(width - titleWidth) / 2 + 8}, 26
      `"
      />

      <polygon
        :stroke="mergedColor[0]"
        :fill="fade(mergedColor[1], 30)"
        :filter="`url(#${filterId})`"
        :points="`
        ${(width + titleWidth) / 2 - 11}, 37 ${(width + titleWidth) / 2 - 32}, 11
      ${(width - titleWidth) / 2 + 23}, 11 ${(width - titleWidth) / 2 + 11}, 23
      ${(width - titleWidth) / 2 + 33}, 49 ${(width + titleWidth) / 2 - 22}, 49
      `"
      />

      <polygon
        :filter="`url(#${filterId})`"
        :fill="mergedColor[0]"
        opacity="1"
        :points="`
        ${(width - titleWidth) / 2 - 10}, 37 ${(width - titleWidth) / 2 - 31}, 37
      ${(width - titleWidth) / 2 - 25}, 46 ${(width - titleWidth) / 2 - 4}, 46
      `"
      >
        <animate
          attributeName="opacity"
          values="1;0.7;1"
          dur="2s"
          begin="0s"
          repeatCount="indefinite"
        />
      </polygon>

      <polygon
        :filter="`url(#${filterId})`"
        :fill="mergedColor[0]"
        opacity="0.7"
        :points="`
        ${(width - titleWidth) / 2 - 40}, 37 ${(width - titleWidth) / 2 - 61}, 37
      ${(width - titleWidth) / 2 - 55}, 46 ${(width - titleWidth) / 2 - 34}, 46
      `"
      >
        <animate
          attributeName="opacity"
          values="0.7;0.4;0.7"
          dur="2s"
          begin="0s"
          repeatCount="indefinite"
        />
      </polygon>

      <polygon
        :filter="`url(#${filterId})`"
        :fill="mergedColor[0]"
        opacity="0.5"
        :points="`
        ${(width - titleWidth) / 2 - 70}, 37 ${(width - titleWidth) / 2 - 91}, 37
      ${(width - titleWidth) / 2 - 85}, 46 ${(width - titleWidth) / 2 - 64}, 46
      `"
      >
        <animate
          attributeName="opacity"
          values="0.5;0.2;0.5"
          dur="2s"
          begin="0s"
          repeatCount="indefinite"
        />
      </polygon>

      <polygon
        :filter="`url(#${filterId})`"
        :fill="mergedColor[0]"
        opacity="1"
        :points="`
        ${(width + titleWidth) / 2 + 30}, 37 ${(width + titleWidth) / 2 + 9}, 37
      ${(width + titleWidth) / 2 + 3}, 46 ${(width + titleWidth) / 2 + 24}, 46
      `"
      >
        <animate
          attributeName="opacity"
          values="1;0.7;1"
          dur="2s"
          begin="0s"
          repeatCount="indefinite"
        />
      </polygon>

      <polygon
        :filter="`url(#${filterId})`"
        :fill="mergedColor[0]"
        opacity="0.7"
        :points="`
        ${(width + titleWidth) / 2 + 60}, 37 ${(width + titleWidth) / 2 + 39}, 37
      ${(width + titleWidth) / 2 + 33}, 46 ${(width + titleWidth) / 2 + 54}, 46
      `"
      >
        <animate
          attributeName="opacity"
          values="0.7;0.4;0.7"
          dur="2s"
          begin="0s"
          repeatCount="indefinite"
        />
      </polygon>

      <polygon
        :filter="`url(#${filterId})`"
        :fill="mergedColor[0]"
        opacity="0.5"
        :points="`
        ${(width + titleWidth) / 2 + 90}, 37 ${(width + titleWidth) / 2 + 69}, 37
      ${(width + titleWidth) / 2 + 63}, 46 ${(width + titleWidth) / 2 + 84}, 46
      `"
      >
        <animate
          attributeName="opacity"
          values="0.5;0.2;0.5"
          dur="2s"
          begin="0s"
          repeatCount="indefinite"
        />
      </polygon>

      <text
        ref="textRef"
        class="dv-border-box-11-title"
        :x="`${width / 2}`"
        y="32"
        fill="#ffffff"
        font-size="18"
        text-anchor="middle"
        dominant-baseline="middle"
      >
        {{ propValue.base.title }}
      </text>

      <polygon
        :fill="mergedColor[0]"
        :filter="`url(#${filterId})`"
        :points="`
        7, ${53 + (height - 167) / 2} 11, ${57 + (height - 167) / 2}
      11, ${133 + (height - 167) / 2} 7, ${137 + (height - 167) / 2}
      `"
      />

      <polygon
        :fill="mergedColor[0]"
        :filter="`url(#${filterId})`"
        :points="`
        ${width - 7}, ${53 + (height - 167) / 2} ${width - 11}, ${57 + (height - 167) / 2}
      ${width - 11}, ${133 + (height - 167) / 2} ${width - 7}, ${137 + (height - 167) / 2}
      `"
      />
    </svg>

    <div class="border-box-content">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useProp } from '@/resource/hooks'
import { computed, ref } from 'vue'
import type BorderBoxComponent from './config'
import TinyColor2 from 'tinycolor2'

import type { BorderBox } from './type'

function fade(color, percent) {
  const rgbType = TinyColor2(color)
  rgbType.setAlpha(percent / 100)
  return rgbType.toRgbString()
}

const props = defineProps<{
  component: BorderBoxComponent
}>()

const textRef = ref()
const { propValue } = useProp<BorderBox>(props.component)
const filterId = computed(() => props.component.id)
const titleWidth = computed(() => propValue.base.titleWidth)

const width = ref<number>(150)
const height = ref<number>(150)
const mergedColor = computed(() => [propValue.base.colorLeft, propValue.base.colorRight])

const resizeHandler = (entry: ResizeObserverEntry) => {
  const rect: DOMRectReadOnly = entry.contentRect
  width.value = rect.width
  height.value = rect.height
}
</script>

<style lang="less" scoped>
.dv-border-box-11 {
  position: relative;
  width: 100%;
  height: 100%;

  .dv-border-svg-container {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;

    & > polyline {
      fill: none;
      stroke-width: 1;
    }
  }

  .border-box-content {
    position: relative;
    width: 100%;
    height: 100%;
  }
}
</style>
