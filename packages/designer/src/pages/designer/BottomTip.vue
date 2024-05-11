<template>
  <div class="flex flex-row justify-end items-center w-full" ref="bottomTip">
    <div class="flex-nowrap flex items-center">
      <span :style="{ transition: `all 0.3s` }"> 缩放:{{ sliderValue }} % </span>
      <OSlider
        :value="sliderValue"
        :min="10"
        :max="200"
        style="width: 120px"
        @update:value="(value) => handleScale(value as number)"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { OSlider } from '@open-data-v/ui'
import { debounce } from 'lodash-es'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useCanvasState } from '../../state'
const canvasState = useCanvasState()
const sliderValue = ref<number>(100)
const selectValue = ref<string>('100%')
const handleScale = (value: number): void => {
  selectValue.value = `${value}%`
  sliderValue.value = value
  changeScale(sliderValue.value)
}

const changeScale = debounce((value: number) => {
  canvasState.setScale(value)
}, 300)
// region 按住 alt 或 command + 滚轮缩放
const bottomTip = ref<HTMLDivElement | null>(null)
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
  bottomTip.value?.addEventListener('wheel', setScaleByWheel, false)
})

onBeforeUnmount(() => {
  bottomTip.value?.removeEventListener('wheel', setScaleByWheel, false)
})
</script>
