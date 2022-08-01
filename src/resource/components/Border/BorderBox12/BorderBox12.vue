<template>
  <div class="dv-border-box-12" v-resize="resizeHandler">
    <svg class="dv-border-svg-container" :width="width" :height="height">
      <defs>
        <filter :id="filterId" height="150%" width="150%" x="-25%" y="-25%">
          <feMorphology operator="dilate" radius="1" in="SourceAlpha" result="thicken" />
          <feGaussianBlur in="thicken" stdDeviation="2" result="blurred" />
          <feFlood :flood-color="propValue.colorRight" result="glowColor">
            <animate
              attributeName="flood-color"
              :values="`
                ${propValue.colorRight};
                ${propValue.colorRight};
                ${propValue.colorRight};
              `"
              dur="3s"
              begin="0s"
              repeatCount="indefinite"
            />
          </feFlood>
          <feComposite in="glowColor" in2="blurred" operator="in" result="softGlowColored" />
          <feMerge>
            <feMergeNode in="softGlowColored" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <path
        v-if="width && height"
        :fill="propValue.backgroundColor"
        stroke-width="2"
        :stroke="propValue.colorLeft"
        :d="`
          M15 5 L ${width - 15} 5 Q ${width - 5} 5, ${width - 5} 15
          L ${width - 5} ${height - 15} Q ${width - 5} ${height - 5}, ${width - 15} ${height - 5}
          L 15, ${height - 5} Q 5 ${height - 5} 5 ${height - 15} L 5 15
          Q 5 5 15 5
        `"
      />

      <path
        stroke-width="2"
        fill="transparent"
        stroke-linecap="round"
        :filter="`url(#${filterId})`"
        :stroke="propValue.colorRight"
        :d="`M 20 5 L 15 5 Q 5 5 5 15 L 5 20`"
      />

      <path
        stroke-width="2"
        fill="transparent"
        stroke-linecap="round"
        :filter="`url(#${filterId})`"
        :stroke="propValue.colorRight"
        :d="`M ${width - 20} 5 L ${width - 15} 5 Q ${width - 5} 5 ${width - 5} 15 L ${
          width - 5
        } 20`"
      />

      <path
        stroke-width="2"
        fill="transparent"
        stroke-linecap="round"
        :filter="`url(#${filterId})`"
        :stroke="propValue.colorRight"
        :d="`
          M ${width - 20} ${height - 5} L ${width - 15} ${height - 5}
          Q ${width - 5} ${height - 5} ${width - 5} ${height - 15}
          L ${width - 5} ${height - 20}
        `"
      />

      <path
        stroke-width="2"
        fill="transparent"
        stroke-linecap="round"
        :filter="`url(#${filterId})`"
        :stroke="propValue.colorRight"
        :d="`
          M 20 ${height - 5} L 15 ${height - 5}
          Q 5 ${height - 5} 5 ${height - 15}
          L 5 ${height - 20}
        `"
      />
    </svg>

    <div class="border-box-content">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

import { uuid } from '@/utils/utils'
import type { BorderBox12 } from './type'

const width = ref<number>(150)
const height = ref<number>(150)
const filterId = ref<string>(`borderr-box-12-filterId-${uuid()}`)

defineProps<{
  componentId: string
  propValue: BorderBox12
}>()

const resizeHandler = (entries: ResizeObserverEntry[]) => {
  const entry = entries[0]
  const rect: DOMRectReadOnly = entry.contentRect
  width.value = rect.width
  height.value = rect.height
}
</script>
<style lang="less" scoped>
.dv-border-box-12 {
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
  }

  .border-box-content {
    position: relative;
    width: 100%;
    height: 100%;
  }
}
</style>
