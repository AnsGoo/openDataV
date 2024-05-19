<template>
  <div class="flex flex-col flex-nowrap w-full">
    <o-select v-model:value="selectOption" :options="options" class="pb-2.5 mt-1" />
    <o-color-picker
      v-if="selectOption === 'backgroundColor'"
      v-model:value="backgroundColor.backgroundColor"
      class="mt-1"
      :swatches="GlobalColorSwatches"
      @update:value="changeBackgroundColor"
    />

    <div v-else-if="selectOption === 'backgroundImage'" class="mt-1">
      <back-image v-model:value="backgroundImage" @update:value="changeBackgroundImage" />
    </div>
    <div v-else-if="selectOption === 'backgroundGradient'" class="mt-1">
      <linear-gradient v-model:value="backgroundGradient" @update:value="changeBackgroundImage" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { SelectOption } from '@open-data-v/ui'
import { OColorPicker, OSelect } from '@open-data-v/ui'
import { isNumber } from 'lodash-es'
import { ref, watch } from 'vue'

import { GlobalColorSwatches } from '../enum'
import LinearGradient from '../linearGradient'
import type { Gradient } from '../linearGradient/type'
import BackImage from './BackImage.vue'
import type { BackgroundColor, BackgroundImage } from './type'

const props = defineProps<{
  value: BackgroundColor | Gradient | BackgroundImage
}>()

const emits = defineEmits<{
  (e: 'update:value', value: any): void
  (e: 'updateValue', value: any): void
}>()

const selectOption = ref<string>('backgroundColor')
const backgroundColor = ref<BackgroundColor>({
  backgroundColor: ''
})
const backgroundImage = ref<BackgroundImage>({
  backgroundImage: '',
  backgroundRepeat: '',
  backgroundAttachment: '',
  backgroundPosition: '',
  backgroundSize: ''
})
const backgroundGradient = ref<Gradient>({ angle: 0, color1: '', color2: '' })
const options: SelectOption[] = [
  {
    label: '背景色',
    value: 'backgroundColor'
  },
  {
    label: '背景图',
    value: 'backgroundImage'
  },
  {
    label: '背景渐变',
    value: 'backgroundGradient'
  }
]

// 修改背景色的时候就清楚背景图和渐变色
const changeBackgroundColor = () => {
  const value = {
    ...backgroundColor.value,
    backgroundImage: null
  }
  emits('updateValue', value)
  emits('update:value', value)
}

const changeBackgroundImage = () => {
  if (selectOption.value === 'backgroundImage') {
    const value = {
      backgroundImage: backgroundImage.value.backgroundImage,
      backgroundRepeat: backgroundImage.value.backgroundRepeat,
      backgroundAttachment: backgroundImage.value.backgroundAttachment,
      backgroundPosition: backgroundImage.value.backgroundPosition,
      backgroundSize: backgroundImage.value.backgroundSize
    }
    emits('updateValue', value)
    emits('update:value', value)
  } else if (selectOption.value === 'backgroundGradient') {
    if (
      backgroundGradient.value.color1 &&
      backgroundGradient.value.color2 &&
      isNumber(backgroundGradient.value.angle)
    ) {
      emits('updateValue', backgroundGradient.value)
      emits('update:value', backgroundGradient.value)
    }
  }
}

watch(
  () => props.value,
  () => {
    const backGroundValue = props.value || {}
    if ('backgroundColor' in backGroundValue) {
      selectOption.value = 'backgroundColor'
      backgroundColor.value = backGroundValue
    } else if ('angle' in backGroundValue) {
      selectOption.value = 'backgroundGradient'
      backgroundGradient.value = backGroundValue
    } else if ('backgroundImage' in backGroundValue) {
      selectOption.value = 'backgroundImage'
      backgroundImage.value = backGroundValue
    }
  }
)
</script>
