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

      <polyline
        :stroke="mergedColor[0]"
        :stroke-width="`${strokeWdith}`"
        fill="transparent"
        :points="`
        ${width / 20}, 0 0, ${height / 10}  0, ${height / 4} ${width / 30}, ${(height / 10) * 3} ${
          width / 30
        } ,${(height / 10) * 7}  0, ${(height / 4) * 3} 0, ${(height / 10) * 9} ${
          width / 20
        }, ${height}  ${(width / 20) * 19}, ${height} ${width} , ${(height / 10) * 9}  ${width} , ${
          (height / 4) * 3
        } ${(width / 30) * 29}, ${(height / 10) * 7} ${(width / 30) * 29}, ${
          (height / 10) * 3
        } ${width} ,${height / 4} ${width} ,${height / 10}  ${(width / 20) * 19}, 0  ${
          width / 20
        }, 0 `"
      />
      <polygon
        :fill="mergedColor[0]"
        filter="transparent"
        :points="`
          ${width}, ${height / 4 + 8}  ${width}
          ${(height / 4) * 3 - 7}, ${(width / 30) * 29 + 5} ${(height / 10) * 7 - 5}, ${
          (width / 30) * 29 + 5
        } ${(height / 10) * 3 + 7}
        `"
      />

      <polygon
        :fill="mergedColor[0]"
        filter="transparent"
        :points="`
         0, ${height / 4 + 8} ${width / 30 - 5}, ${(height / 10) * 3 + 5}
          ${width / 30 - 5}, ${(height / 10) * 7 - 5} 0, ${(height / 4) * 3 - 8}
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

const strokeWdith = computed<number>(() => {
  if (props.propValue.strokeWdith) {
    return parseInt(props.propValue.strokeWdith)
  }

  return 4
})

const goto = () => {
  if (!basicStore.isEditMode && props.propValue.routerUrl) {
    window.open(props.propValue.routerUrl)
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
