<template>
  <div ref="centerCanvas" class="middle">
    <div class="canvas o-scroll overflow-auto">
      <div class="edit" :style="scrollbarStyle">
        <Editor v-resize="editorWindowResizeHandler" />
      </div>
    </div>
    <div class="flex flex-row justify-end items-center w-full">
      <div class="flex-nowrap flex items-center">
        <span :style="{ transition: `all 0.3s ${cubicBezierEaseInOut}` }">缩放：</span>

        <o-slider
          :value="sliderValue"
          :min="10"
          :max="200"
          style="width: 120px"
          @update:value="(value) => handleScale(value as number)"
        />
        <o-select
          :value="selectValue"
          :options="options"
          size="tiny"
          class="ml-2"
          style="width: 90px"
          @update:value="handleScale"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { debounce } from 'lodash-es'
import { useThemeVars } from 'naive-ui'
import { useCanvasState } from 'open-data-v/designer'
import type { SelectOption } from 'open-data-v/ui'
import { OSelect, OSlider } from 'open-data-v/ui'
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

import Editor from '../../Editor'

const windowWidth = ref<number>(0)
const windowHeight = ref<number>(0)

const sliderValue = ref<number>(100)
const selectValue = ref<string>('100%')
const scaleValue = ref<number>(1)
const canvasState = useCanvasState()
const options: SelectOption[] = [
  {
    value: 200,
    label: '200%'
  },
  {
    value: 150,
    label: '150%'
  },
  {
    value: 100,
    label: '100%'
  },
  {
    value: 80,
    label: '80%'
  },
  {
    value: 50,
    label: '50%'
  }
]

const themeVars = useThemeVars()
const { cubicBezierEaseInOut } = themeVars.value

const scrollbarStyle = computed(() => {
  return {
    width: windowWidth.value + 'px',
    height: windowHeight.value + 'px'
  }
})

const editorWindowResizeHandler = (entry: ResizeObserverEntry) => {
  const { width, height } = entry.contentRect
  windowWidth.value = width
  windowHeight.value = height - 100
}

const handleScale = (value: number): void => {
  selectValue.value = `${value}%`
  sliderValue.value = value
  changeScale(sliderValue.value)
}

const changeScale = debounce((value: number) => {
  canvasState.setScale(value)
  scaleValue.value = value / 100
}, 300)

// region 按住 alt 或 command + 滚轮缩放
const centerCanvas = ref<HTMLDivElement | null>(null)
function setScaleByWheel(e: WheelEvent) {
  const max = 200
  const min = 10
  const limit = 10

  const { altKey, metaKey, deltaY } = e
  let scale = sliderValue.value
  if (altKey || metaKey) {
    e.preventDefault()
    if (min < scale && scale < max) {
      scale = deltaY > 0 ? scale + limit : scale - limit
    } else if (scale <= min && deltaY > 0) {
      scale += limit
    } else if (scale >= max && deltaY < 0) {
      scale -= limit
    }
    handleScale(scale)
  }
}

onMounted(() => {
  centerCanvas.value?.addEventListener('wheel', setScaleByWheel, false)
})

onBeforeUnmount(() => {
  centerCanvas.value?.removeEventListener('wheel', setScaleByWheel, false)
})
</script>

<style scoped lang="less">
@import 'open-data-v/css/index.less';
.middle {
  height: 100%;
  .canvas {
    height: calc(100% - 36px);
  }
  .edit {
    transform-origin: left top;
    transform: scale(v-bind(scaleValue));
    transition: all 0.3s;
  }
}
</style>
