<template>
  <div class="dv-percent-pond" v-resize="resizeHandler">
    <svg>
      <defs>
        <linearGradient :id="gradientId1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop
            v-for="lc in linearGradient"
            :key="lc[0]"
            :offset="`${lc[0]}%`"
            :stop-color="lc[1]"
          />
        </linearGradient>

        <linearGradient :id="gradientId2" x1="0%" y1="0%" :x2="gradient2XPos" y2="0%">
          <stop
            v-for="lc in linearGradient"
            :key="lc[0]"
            :offset="`${lc[0]}%`"
            :stop-color="lc[1]"
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
        :stroke-dasharray="mergedConfig ? [mergedConfig.lineDash, mergedConfig.gapWeight].join(',') : '0'"
        :stroke="`url(#${polylineGradient})`"
        :points="points"
      />
      <text
        :style="textSize"
        :stroke="mergedConfig ? mergedConfig.textColor : '#fff'"
        :fill="mergedConfig ? mergedConfig.textColor : '#fff'"
        :x="width / 2"
        :y="height / 2"
      >{{ details }}</text>
    </svg>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { http } from '@/utils/http'
import type { ComponentInfo } from '@/types/component'
import type { TagType } from '@/types/wsTypes'
import { uuid } from '@/utils/utils'
import { useEventBus } from '@/bus/useEventBus'
import type { Progress } from './type'

const props = defineProps<{
  element: ComponentInfo
  propValue: Progress
}>()

const width = ref<number>(150)
const height = ref<number>(150)
const dataValue = ref<number>(60)
const gradientId1 = ref<string>(`percent-pond-gradientId1-${uuid()}`)
const gradientId2 = ref<string>(`percent-pond-gradientId2-${uuid()}`)

const resizeHandler = (entries) => {
  const entry = entries[0]
  const rect = entry.contentRect
  width.value = rect.width
  height.value = rect.height
}


const handler = (event) => {
  const item: TagType = event as TagType

  if (props.propValue.datatag && item.TagName === props.propValue.datatag) {
    dataValue.value = Number(
      ((Number(item.TagValue) * 100) / Number(props.propValue.maxValue)).toFixed(2)
    )
  }
}

onMounted(async () => {
  await initData()
})

const initData = async () => {
  if (props.propValue.history) {
    try {
      const resp = await http.post({
        url: props.propValue.history,
        data: [props.propValue.datatag]
      })
      if (resp.ErrorCode === 200) {
        dataValue.value =
          ((Number(resp.Results[0].TagValue) || 0) * 100) / Number(props.propValue.maxValue)
      }
    } catch (err: any) {
      console.log(err.message || err)
    }
  }
}

const mergedConfig = computed(() => {
  return {
    colors: [props.propValue.color1, props.propValue.color1], //['#3DE7C9', '#00BAFF'],
    borderWidth: Number(props.propValue.borderWidth),
    borderGap: Number(props.propValue.borderGap),
    lineDash: props.propValue.lineDash,
    gapWeight: props.propValue.gapWeight,
    textColor: props.propValue.textColor,
    fontSize: Number(props.propValue.fontSize),
    borderRadius: Number(props.propValue.borderRadius),
    localGradient: Boolean(props.propValue.localGradient),
    formatter: props.propValue.formatter
  }
})


const rectWidth = computed(() => {
  if (!mergedConfig.value) {
    return 0
  }

  return width.value - mergedConfig.value.borderWidth
})

const rectHeight = computed(() => {
  if (!mergedConfig.value) {
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
        ${mergedConfig.value.borderWidth + mergedConfig.value.borderGap + polylineLength}, ${halfHeight + 0.001
    }`
})

const linearGradient = computed(() => {
  if (!mergedConfig.value) {
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
  return { fontSize: (props.propValue.fontSize || 12) + 'px' }
})

const handerPropValue = (event: any) => {
  if (event.key === 'maxValue') {
    dataValue.value = Number(
      ((Number(event.value) * 100) / Number(props.propValue.maxValue)).toFixed(2)
    )
  }
}

useEventBus(props.element.component + props.element.id, handerPropValue)
useEventBus('actual', handler)
</script>

<style lang="less" scoped>
.dv-percent-pond {
  // position: relative;
  display: flex;
  flex-direction: column;

  svg {
    position: absolute;
    left: 0px;
    top: 0px;
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
