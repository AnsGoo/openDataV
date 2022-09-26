<template>
  <n-space vertical style="width: 100%">
    <n-select v-model:value="selectOption" :options="options" />

    <n-color-picker
      v-if="selectOption === 'backgroundColor'"
      v-model:value="backgroundColor.backgroundColor"
      :swatches="GlobalColorSwatches"
      @update:value="changeBackgroundColor"
      :modes="['hex', 'rgb', 'hsl']"
    />

    <n-space v-else-if="selectOption === 'backgroundImage'">
      <back-image v-model:value="backgroundImage" @update:value="changeBackgroundImage" />
    </n-space>
    <n-space v-else-if="selectOption === 'backgroundGradient'">
      <linear-gradient v-model:value="backgroundGradient" @update:value="changeBackgroundImage" />
    </n-space>
  </n-space>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { NSpace, NSelect, SelectOption, NColorPicker } from 'naive-ui'
import { GlobalColorSwatches } from '@/enum'
import LinearGradient from '../linearGradient'
import type { Gradient } from '../linearGradient/type'
import { BackgroundImage, BackgroundColor } from '@/types/common'
import BackImage from './BackImage.vue'
import { isNumber } from 'lodash-es'

const props = defineProps<{
  value: BackgroundColor | Gradient | BackgroundImage
}>()

const emits = defineEmits<{
  (e: 'update:value', value: any): void
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
  emits('update:value', {
    ...backgroundColor.value,
    backgroundImage: null
  })
}

const changeBackgroundImage = () => {
  if (selectOption.value === 'backgroundImage') {
    emits('update:value', {
      backgroundImage: backgroundImage.value.backgroundImage,
      backgroundRepeat: backgroundImage.value.backgroundRepeat,
      backgroundAttachment: backgroundImage.value.backgroundAttachment,
      backgroundPosition: backgroundImage.value.backgroundPosition,
      backgroundSize: backgroundImage.value.backgroundSize
    })
  } else if (selectOption.value === 'backgroundGradient') {
    if (
      backgroundGradient.value.color1 &&
      backgroundGradient.value.color2 &&
      isNumber(backgroundGradient.value.angle)
    ) {
      emits('update:value', {
        backgroundImage: backgroundGradient.value
      })
    }
  }
}

onMounted(() => {
  if ('backgroundColor' in props.value) {
    selectOption.value = 'backgroundColor'
    backgroundColor.value = props.value
  } else if ('angle' in props.value) {
    selectOption.value = 'backgroundGradient'
    backgroundGradient.value = props.value
  } else if ('backgroundImage' in props.value) {
    selectOption.value = 'backgroundImage'
    backgroundImage.value = props.value
  }
})
</script>

<style lang="less" scoped></style>
