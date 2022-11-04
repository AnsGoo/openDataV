<template>
  <div v-resize="resizeHandler" class="dv-percent-pond">
    <svg>
      <defs>
        <linearGradient :id="gradientId1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop
            v-for="(lc, index) in linearGradients"
            :key="index"
            :offset="`${lc[0]}%`"
            :stop-color="lc[1] as string"
          />
        </linearGradient>

        <linearGradient :id="gradientId2" x1="0%" y1="0%" :x2="gradient2XPos" y2="0%">
          <stop
            v-for="(lc, index) in linearGradients"
            :key="index"
            :offset="`${lc[0]}%`"
            :stop-color="(lc[1] as string)"
          />
        </linearGradient>
      </defs>
      <rect
        :x="mergedConfig ? mergedConfig.borderWidth / 2 : '0'"
        :y="mergedConfig ? mergedConfig.borderWidth / 2 : '0'"
        :rx="mergedConfig ? mergedConfig.borderRadius : '0'"
        :ry="mergedConfig ? mergedConfig.borderRadius : '0'"
        fill="transparent"
        :stroke-width="mergedConfig ? mergedConfig.borderWidth : '0'"
        :stroke="`url(#${gradientId1})`"
        :width="rectWidth > 0 ? rectWidth : 0"
        :height="rectHeight > 0 ? rectHeight : 0"
      />
      <polyline
        :stroke-width="polylineWidth"
        :stroke-dasharray="
          mergedConfig ? [mergedConfig.lineDash, mergedConfig.gapWeight].join(',') : '0'
        "
        :stroke="`url(#${polylineGradient})`"
        :points="points"
      />
      <text
        :style="textSize"
        :stroke="mergedConfig ? mergedConfig.textColor : '#fff'"
        :fill="mergedConfig ? mergedConfig.textColor : '#fff'"
        :x="width / 2"
        :y="height / 2"
      >
        {{ details }}
      </text>
    </svg>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { http } from '@/utils/http'
import { useProp } from '@/resource/hooks'
import { uuid } from '@/utils/utils'
import { useEventBus } from '@/bus'
import type { Progress } from './type'
import type { BaseComponent } from '@/resource/models'

const props = defineProps<{
  component: BaseComponent
}>()

const { propValue } = useProp<Progress>(props.component)

const width = ref<number>(150)
const height = ref<number>(150)
const dataValue = ref<number>(60)
const gradientId1 = ref<string>(`percent-pond-gradientId1-${uuid()}`)
const gradientId2 = ref<string>(`percent-pond-gradientId2-${uuid()}`)

const resizeHandler = (entry: ResizeObserverEntry) => {
  const rect: DOMRectReadOnly = entry.contentRect
  width.value = rect.width
  height.value = rect.height
}

const handler = (event) => {
  const item: Recordable = event as Recordable

  if (propValue.data.datatag && item.TagName === propValue.data.datatag) {
    dataValue.value = Number(
      ((Number(item.TagValue) * 100) / Number(propValue.data.maxValue)).toFixed(2)
    )
  }
}

onMounted(async () => {
  await initData()
})

const initData = async () => {
  if (propValue.data.history) {
    try {
      const resp = await http.post({
        url: propValue.data.history,
        data: [propValue.data.datatag]
      })
      if (resp.status === 200) {
        dataValue.value =
          ((Number(resp.data.TagValue) || 0) * 100) / Number(propValue.data.maxValue)
      }
    } catch (err: any) {
      console.log(err.message || err)
    }
  }
}

const mergedConfig = computed(() => {
  return {
    colors: [propValue.attr.color1, propValue.attr.color2], //['#3DE7C9', '#00BAFF'],
    borderWidth: Number(propValue.attr.borderWidth),
    borderGap: Number(propValue.attr.borderGap),
    lineDash: propValue.attr.lineDash,
    gapWeight: propValue.attr.gapWeight,
    textColor: propValue.attr.textColor,
    fontSize: Number(propValue.attr.fontSize),
    borderRadius: Number(propValue.attr.borderRadius),
    localGradient: Boolean(propValue.attr.localGradient),
    formatter: propValue.attr.formatter
  }
})

const rectWidth = computed(() => {
  if (!mergedConfig.value.borderWidth) {
    return 0
  }

  return width.value - mergedConfig.value.borderWidth
})

const rectHeight = computed(() => {
  if (!mergedConfig.value.borderWidth) {
    return 0
  }

  return height.value - mergedConfig.value.borderWidth
})

const polylineWidth = computed(() => {
  if (!mergedConfig.value) {
    return 0
  }
  return height.value - (mergedConfig.value.borderWidth + mergedConfig.value.borderGap) * 2
})

const polylineGradient = computed(() => {
  if (!mergedConfig.value) {
    return gradientId2.value
  }

  if (mergedConfig.value.localGradient) {
    return gradientId1.value
  }

  return gradientId2.value
})

const points = computed(() => {
  const halfHeight = height.value / 2

  if (!mergedConfig.value) {
    return `0, ${halfHeight} 0, ${halfHeight}`
  }

  const polylineLength =
    ((width.value - (mergedConfig.value.borderWidth + mergedConfig.value.borderGap) * 2) / 100) *
    dataValue.value

  return `
        ${mergedConfig.value.borderWidth + mergedConfig.value.borderGap}, ${halfHeight}
        ${mergedConfig.value.borderWidth + mergedConfig.value.borderGap + polylineLength}, ${
    halfHeight + 0.001
  }`
})

const linearGradients = computed(() => {
  if (!mergedConfig.value.colors) {
    return []
  }

  const colorNum = mergedConfig.value.colors.length

  const colorOffsetGap = 100 / (colorNum - 1)

  return mergedConfig.value.colors.map((c, i) => [colorOffsetGap * i, c])
})

const gradient2XPos = computed(() => {
  if (!mergedConfig.value) {
    return '100%'
  } else {
    return '200%'
  }
})

const details = computed(() => {
  if (!mergedConfig.value.formatter) {
    return ''
  }

  return mergedConfig.value.formatter.replace('{value}', dataValue.value.toString())
})

const textSize = computed(() => {
  return { fontSize: (propValue.attr.fontSize || 12) + 'px' }
})

useEventBus('actual', handler)
</script>

<style lang="less" scoped>
.dv-percent-pond {
  // position: relative;
  display: flex;
  flex-direction: column;

  svg {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }

  polyline {
    transition: all 0.3s;
  }

  text {
    font-size: 25px;
    font-weight: bold;
    text-anchor: middle;
    dominant-baseline: middle;
  }
}
</style>
