<template>
  <div v-resize="resizeHandler" class="border-image"></div>
</template>

<script setup lang="ts">
import { useProp } from '@/resource/hooks'
import { computed, ref } from 'vue'
import type BorderImageComponent from '../config'
import type { BorderImage } from '../type'
const props = defineProps<{
  component: BorderImageComponent
}>()

const { propValue } = useProp<BorderImage>(props.component)

const width = ref<number>(150)
const height = ref<number>(150)
const borderImageUrl = computed(
  () => `url(${propValue.base.borderSource || '/images/border-image.png'})`
)
const borderImageSlice = computed(() => propValue.base.borderImageSlice.join(' '))
const borderWidth = computed(() => propValue.base.borderWidth.join(' '))
const backgroundColor = computed(() => propValue.base.backgroundColor || 'transparent')

// 监听窗口大小变化

const resizeHandler = (entry: ResizeObserverEntry) => {
  const rect: DOMRectReadOnly = entry.contentRect
  width.value = rect.width
  height.value = rect.height
}
</script>

<style lang="less" scoped>
.border-image {
  background-color: v-bind(backgroundColor);
  border-width: v-bind(borderWidth);
  border-image-source: v-bind(borderImageUrl);
  border-image-slice: v-bind(borderImageSlice);
}
</style>
