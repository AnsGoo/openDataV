<template>
  <div v-resize="resizeHandler" class="dv-decoration-10">
    <svg :width="width" :height="height">
      <polyline
        :stroke="mergedColor[1]"
        stroke-width="2"
        :points="`0, ${height / 2} ${width}, ${height / 2}`"
      />

      <polyline
        :stroke="mergedColor[0]"
        stroke-width="2"
        :points="`5, ${height / 2} ${width * 0.2 - 3}, ${height / 2}`"
        :stroke-dasharray="`0, ${width * 0.2}`"
        fill="freeze"
      >
        <animate
          id="d10ani2"
          attributeName="stroke-dasharray"
          :values="`0, ${width * 0.2};${width * 0.2}, 0;`"
          dur="3s"
          :begin="`d10ani1.end`"
          fill="freeze"
        />
        <animate
          attributeName="stroke-dasharray"
          :values="`${width * 0.2}, 0;0, ${width * 0.2}`"
          dur="0.01s"
          :begin="`d10ani7.end`"
          fill="freeze"
        />
      </polyline>

      <polyline
        :stroke="mergedColor[0]"
        stroke-width="2"
        :points="`${width * 0.2 + 3}, ${height / 2} ${width * 0.8 - 3}, ${height / 2}`"
        :stroke-dasharray="`0, ${width * 0.6}`"
      >
        <animate
          id="d10ani4"
          attributeName="stroke-dasharray"
          :values="`0, ${width * 0.6};${width * 0.6}, 0`"
          dur="3s"
          :begin="`d10ani3.end + 1s`"
          fill="freeze"
        />
        <animate
          attributeName="stroke-dasharray"
          :values="`${width * 0.6}, 0;0, ${width * 0.6}`"
          dur="0.01s"
          :begin="`d10ani7.end`"
          fill="freeze"
        />
      </polyline>

      <polyline
        :stroke="mergedColor[0]"
        stroke-width="2"
        :points="`${width * 0.8 + 3}, ${height / 2} ${width - 5}, ${height / 2}`"
        :stroke-dasharray="`0, ${width * 0.2}`"
      >
        <animate
          id="d10ani6"
          attributeName="stroke-dasharray"
          :values="`0, ${width * 0.2};${width * 0.2}, 0`"
          dur="3s"
          :begin="`d10ani5.end + 1s`"
          fill="freeze"
        />
        <animate
          attributeName="stroke-dasharray"
          :values="`${width * 0.2}, 0;0, ${width * 0.3}`"
          dur="0.01s"
          :begin="`d10ani7.end`"
          fill="freeze"
        />
      </polyline>

      <circle cx="2" :cy="height / 2" r="2" :fill="mergedColor[1]">
        <animate
          id="d10ani1"
          attributeName="fill"
          :values="`${mergedColor[1]};${mergedColor[0]}`"
          :begin="`0s;d10ani7.end`"
          dur="0.3s"
          fill="freeze"
        />
      </circle>

      <circle :cx="width * 0.2" :cy="height / 2" r="2" :fill="mergedColor[1]">
        <animate
          id="d10ani3"
          attributeName="fill"
          :values="`${mergedColor[1]};${mergedColor[0]}`"
          :begin="`d10ani2.end`"
          dur="0.3s"
          fill="freeze"
        />
        <animate
          attributeName="fill"
          :values="`${mergedColor[1]};${mergedColor[1]}`"
          dur="0.01s"
          :begin="`d10ani7.end`"
          fill="freeze"
        />
      </circle>

      <circle :cx="width * 0.8" :cy="height / 2" r="2" :fill="mergedColor[1]">
        <animate
          id="d10ani5"
          attributeName="fill"
          :values="`${mergedColor[1]};${mergedColor[0]}`"
          :begin="`d10ani4.end`"
          dur="0.3s"
          fill="freeze"
        />
        <animate
          attributeName="fill"
          :values="`${mergedColor[1]};${mergedColor[1]}`"
          dur="0.01s"
          :begin="`d10ani7.end`"
          fill="freeze"
        />
      </circle>

      <circle :cx="width - 2" :cy="height / 2" r="2" :fill="mergedColor[1]">
        <animate
          id="d10ani7"
          attributeName="fill"
          :values="`${mergedColor[1]};${mergedColor[0]}`"
          :begin="`d10ani6.end`"
          dur="0.3s"
          fill="freeze"
        />
        <animate
          attributeName="fill"
          :values="`${mergedColor[1]};${mergedColor[1]}`"
          dur="0.01s"
          :begin="`d10ani7.end`"
          fill="freeze"
        />
      </circle>
    </svg>
  </div>
</template>

<script setup lang="ts">
import { useProp } from '@/resource/hooks'
import { ref } from 'vue'
import type DecorationComponent from './config'
import type { Decoration } from './type'

const props = defineProps<{
  component: DecorationComponent
}>()

const propChange = (prop: string, key: string, value: any) => {
  if (prop === 'base' && key === 'color1') mergedColor.value[0] = value
  if (prop === 'base' && key === 'color2') mergedColor.value[1] = value
}

const { propValue } = useProp<Decoration>(props.component, propChange)

const width = ref<number>(300)
const height = ref<number>(35)

const resizeHandler = (entry: ResizeObserverEntry) => {
  const rect: DOMRectReadOnly = entry.contentRect
  width.value = rect.width
  height.value = rect.height
}

const mergedColor = ref<string[]>([propValue.base.color1, propValue.base.color2])
</script>

<style lang="less" scoped>
.dv-decoration-10 {
  width: 100%;
  height: 100%;
  display: flex;
}
</style>
