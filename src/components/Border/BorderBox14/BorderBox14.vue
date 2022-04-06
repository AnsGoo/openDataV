<template>
  <div>
    <div class="main" ref="mainEl"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useResizeObserver } from '@vueuse/core'
import type { ComponentInfo } from '@/types/component'

const mainEl = ref<ElRef>(null)
const width = ref<number>(150)
const height = ref<number>(150)

const props = defineProps<{
  element: ComponentInfo
  propValue: Recordable<any>
}>()

useResizeObserver(mainEl, (entries) => {
  const entry = entries[0]
  const rect = entry.contentRect
  width.value = rect.width
  height.value = rect.height
})

const bcolor = computed(() => {
  return props.propValue.color
})
const bstyle = computed(() => {
  return props.propValue.style
})

const bwidth = computed(() => {
  return `${props.propValue.width}px`
})
</script>

<style lang="less" scoped>
div.main {
  // position: relative;
  width: 100%;
  height: 100%;
  border-color: v-bind(bcolor);
  border-style: v-bind(bstyle);
  border-width: v-bind(bwidth);
  pointer-events: none;
}
</style>
