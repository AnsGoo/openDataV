<template>
  <div class="dv-border-box-8" v-resize="resizeHandler">
    <svg class="dv-border-svg-container" :width="width" :height="height">
      <defs>
        <path :id="path" :d="pathD" fill="transparent" />
        <radialGradient :id="gradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#fff" stop-opacity="1" />
          <stop offset="100%" stop-color="#fff" stop-opacity="0" />
        </radialGradient>

        <mask :id="mask">
          <circle cx="0" cy="0" r="150" :fill="`url(#${gradient})`">
            <animateMotion :dur="`${dur}s`" :path="pathD" rotate="auto" repeatCount="indefinite" />
          </circle>
        </mask>
      </defs>

      <polygon
        :fill="propValue.backgroundColor"
        :points="`5, 5 ${width - 5}, 5 ${width - 5} ${height - 5} 5, ${height - 5}`"
      />

      <use :stroke="propValue.colorLeft" stroke-width="1" :xlink:href="`#${path}`" />

      <use
        :stroke="propValue.colorRight"
        stroke-width="3"
        :xlink:href="`#${path}`"
        :mask="`url(#${mask})`"
      >
        <animate
          attributeName="stroke-dasharray"
          :from="`0, ${length}`"
          :to="`${length}, 0`"
          :dur="`${dur}s`"
          repeatCount="indefinite"
        />
      </use>
    </svg>
  </div>
</template>

<script setup lang="ts">
import type { ComponentInfo } from '@/types/component'
import { uuid } from '@/utils/utils'
import { computed, ref } from 'vue'
import type { BorderBox8 } from './type'

const width = ref<number>(150)
const height = ref<number>(150)
const path = ref<string>(`border-box-8-path-${uuid()}`)
const gradient = ref<string>(`border-box-8-gradient-${uuid()}`)
const mask = ref<string>(`border-box-8-mask-${uuid()}`)

const props = defineProps<{
  propValue: BorderBox8
  element: ComponentInfo
}>()

// 监听窗口大小变化
const resizeHandler = (entries) => {
  const entry = entries[0]
  const rect = entry.contentRect
  width.value = rect.width
  height.value = rect.height
}

const dur = computed(() => {
  if (props.propValue.dur) {
    return props.propValue.dur
  }
  return 3
})

const length = computed(() => {
  return (width.value + height.value - 5) * 2
})

const pathD = computed(() => {
  if (props.propValue.reverse) {
    return `M 2.5, 2.5 L 2.5, ${height.value - 2.5} L ${width.value - 2.5}, ${
      height.value - 2.5
    } L ${width.value - 2.5}, 2.5 L 2.5, 2.5`
  }

  return `M2.5, 2.5 L${width.value - 2.5}, 2.5 L${width.value - 2.5}, ${height.value - 2.5} L2.5, ${
    height.value - 2.5
  } L2.5, 2.5`
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
