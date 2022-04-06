<template>
  <div class="navigation-1" ref="mainEl" @click="goto">
    <svg class="navigation-svg-container" :width="width" :height="height">
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
        :fill="backgroundColor"
        :points="`
        20, 32 ${width * 0.5 - titleWidth / 2}, 32 ${width * 0.5 - titleWidth / 2 + 20}, 53
        ${width * 0.5 + titleWidth / 2 - 20}, 53 ${width * 0.5 + titleWidth / 2}, 32
        ${width - 20}, 32 ${width - 8}, 48 ${width - 8}, ${height - 25} ${width - 20}, ${height - 8}
        20, ${height - 8} 8, ${height - 25} 8, 50
      `"
      />

      <polyline
        :stroke="mergedColor[0]"
        :stroke-width="`${strokeWdith}`"
        fill="transparent"
        :points="`
          ${(width - titleWidth) / 2}, 30
          22, 30 7, 50 7, ${50 + (height - 167) / 2}
          13, ${55 + (height - 167) / 2} 13, ${135 + (height - 167) / 2}
          7, ${140 + (height - 167) / 2} 7, ${height - 27}
          20, ${height - 7} ${width - 20}, ${height - 7} ${width - 7}, ${height - 27}
          ${width - 7}, ${140 + (height - 167) / 2} ${width - 13}, ${135 + (height - 167) / 2}
          ${width - 13}, ${55 + (height - 167) / 2} ${width - 7}, ${50 + (height - 167) / 2}
          ${width - 7}, 50 ${width - 20}, 30 ${(width + titleWidth) / 2 - 14}, 30
        `"
      />
      <polygon
        :stroke="mergedColor[0]"
        fill="transparent"
        :points="`
          ${(width - titleWidth) / 2}, 10 ${(width - titleWidth) / 2}, 50
          ${(width + titleWidth) / 2 - 14}, 50 ${(width + titleWidth) / 2 - 14}, 10
        `"
      />
      <polygon
        :fill="mergedColor[0]"
        filter="transparent"
        :points="`
          7, ${53 + (height - 167) / 2} 11, ${57 + (height - 167) / 2}
          11, ${133 + (height - 167) / 2} 7, ${137 + (height - 167) / 2}
        `"
      />

      <polygon
        :fill="mergedColor[0]"
        filter="transparent"
        :points="`
          ${width - 7}, ${53 + (height - 167) / 2} ${width - 11}, ${57 + (height - 167) / 2}
          ${width - 11}, ${133 + (height - 167) / 2} ${width - 7}, ${137 + (height - 167) / 2}
        `"
      />
    </svg>
  </div>
</template>

<script setup lang="ts">
import type { ComponentInfo } from '@/types/component'
import { useResizeObserver } from '@vueuse/core'
import { uuid } from '@/utils/utils'
import { computed, ref } from 'vue'
import { useBasicStoreWithOut } from '@/store/modules/basic'

const mainEl = ref<ElRef>(null)
const width = ref<number>(150)
const height = ref<number>(150)

const filterId = ref<string>(`border-box-11-filterId-${uuid()}`)
const props = defineProps<{
  propValue: Recordable<string>
  element: ComponentInfo
}>()
const basicStore = useBasicStoreWithOut()

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

const backgroundColor = computed<string>(() => {
  if (props.propValue.backgroundColor) {
    return props.propValue.backgroundColor
  }

  return 'transparent'
})

const titleWidth = computed(() => {
  if (props.propValue.titleWidth) {
    return parseInt(props.propValue.titleWidth)
  }

  return 250
})

const strokeWdith = computed<number>(() => {
  if (props.propValue.strokeWdith) {
    return parseInt(props.propValue.strokeWdith)
  }

  return 4
})

const goto = () => {
  if (!basicStore.isEditMode) {
    const routerUrl: string = props.propValue.routerUrl
    if (routerUrl) {
      window.open(routerUrl)
    }
  }
}
</script>

<style lang="less" scoped>
.navigation-1 {
  // position: relative;
  width: 100%;
  height: 100%;

  .navigation-svg-container {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0px;
    left: 0px;
  }
}
</style>
