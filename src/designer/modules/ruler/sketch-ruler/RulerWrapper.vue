<template>
  <div :class="rwClassName" :style="rwStyle">
    <CanvasRuler
      v-model:valueNum="valueNum"
      v-model:showIndicator="showIndicator"
      :vertical="vertical"
      :scale="scale"
      :width="width"
      :height="height"
      :start="start"
      :ratio="ratio"
      :select-start="selectStart"
      :select-length="selectLength"
      :palette="palette"
      @on-add-line="handleNewLine"
    />
    <div v-show="isShowReferLine" class="lines">
      <RulerLine
        v-for="(v, i) in lines"
        :key="v + i"
        :index="i"
        :value="v >> 0"
        :scale="scale"
        :start="start"
        :thick="thick"
        :palette="palette"
        :vertical="vertical"
        :is-show-refer-line="isShowReferLine"
        @on-remove="handleLineRemove"
        @on-release="handleLineRelease"
      />
    </div>
    <div v-show="showIndicator" class="indicator" :style="indicatorStyle">
      <div class="value">{{ valueNum }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import RulerLine from './RulerLine.vue'
import CanvasRuler from '../canvas-ruler/index.vue'
import { ref, computed } from 'vue'
import type { PaletteType } from '../index-types'
const props = withDefaults(
  defineProps<{
    scale: number
    ratio: number
    thick: number
    selectStart: number
    selectLength: number
    isShowReferLine: boolean
    palette: PaletteType
    canvasHeight?: number
    canvasWidth?: number
    vertical?: boolean
    width?: number
    height?: number
    start?: number
  }>(),
  {
    vertical: true,
    width: 200,
    height: 200,
    start: 0
  }
)

const showIndicator = ref(false)
const valueNum = ref(0)
const lines = ref<number[]>([])
const rwClassName = computed(() => {
  return props.vertical ? 'v-container' : 'h-container'
})

const clearLines = () => {
  lines.value = []
}

defineExpose({ clearLines })
const rwStyle = computed(() => {
  const hContainer = {
    width: `calc(100% - ${props.thick}px)`,
    height: `${props.thick! + 1}px`,
    left: `${props.start}` + 'px'
  }
  const vContainer = {
    width: `${props.thick && props.thick + 1}px`,
    height: `calc(100% - ${props.thick}px)`,
    top: `${props.start}` + 'px'
  }
  return props.vertical ? vContainer : hContainer
})

const realHeight = computed(() => {
  if (!props.vertical) {
    return `${props.canvasHeight}px`
  } else {
    return `100vh`
  }
})

const realWidth = computed<string>(() => {
  if (!props.vertical) {
    return '100vw'
  } else {
    return `${props.canvasWidth}px`
  }
})
const indicatorStyle = computed(() => {
  const indicatorOffset = (valueNum.value - (props.start || 0)) * props.scale!
  const positionKey = props.vertical ? 'top' : 'left'
  const borderKey = props.vertical ? 'borderBottom' : 'borderLeft'
  return {
    [positionKey]: indicatorOffset + 'px',
    [borderKey]: `1px ${props.palette?.lineBoardStyle || 'dashed'} ${props.palette?.lineColor}`
  }
})

const handleNewLine = (value: number) => {
  lines.value.push(value)
}
const handleLineRelease = (value: number, index: number) => {
  // 左右或上下超出时, 删除该条对齐线
  const offset = value - (props.start || 0)
  const maxOffset = (props.vertical ? props.height || 200 : props.width || 200) / props.scale!
  if (offset < 0 || offset > maxOffset) {
    handleLineRemove(index)
  } else {
    lines.value[index] = value
  }
}
const handleLineRemove = (index: any) => {
  lines.value.splice(index, 1)
}
</script>

<style lang="less" scoped>
.line {
  position: absolute;
}
.h-container,
.v-container {
  position: absolute;
  .lines {
    pointer-events: none;
  }
  &:hover .lines {
    pointer-events: auto;
  }
}
.h-container {
  top: 0;
  .line {
    top: 0;
    height: v-bind(realHeight);
    padding-left: 5px;
    .action {
      transform: translateX(-24px);
      .value {
        margin-left: 4px;
      }
    }
  }
  .indicator {
    top: 0;
    height: 100vw;
    .value {
      width: auto;
      padding: 0 2px;
      margin-top: 4px;
      margin-left: 4px;
    }
  }
}

.v-container {
  left: 0;
  .line {
    left: 0;
    width: v-bind(realWidth);
    padding-top: 5px;
    .action {
      transform: translateY(-24px);
      flex-direction: column;
      .value {
        margin-top: 4px;
      }
    }
  }
  .indicator {
    width: 100vw;
    .value {
      left: 0;
      width: auto;
      padding: 0 2px;
      margin-top: -5px;
      margin-left: 2px;
      transform: rotate(-90deg);
      transform-origin: 0 0;
    }
  }
}
</style>
