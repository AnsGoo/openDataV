<template>
  <span v-resize="resizeHandler">{{ customeText }}{{ propValue.unit }}</span>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useEventBus } from '@/bus/useEventBus'

import type { TagType } from '@/types/wsTypes'
import { http } from '@/utils/http'
import type { SubText } from './type'

const props = defineProps<{
  componentId: string
  propValue: SubText
}>()
const customeText = ref<string>('0')

const lineHeight = ref<string>('20px')
const resizeHandler = (entries: ResizeObserverEntry[]) => {
  const entry = entries[0]
  const { height } = entry.contentRect
  lineHeight.value = `${height}px`
}

const dataHandler = (event) => {
  const item: TagType = event as TagType
  if (props.propValue.tagName && item.TagName === props.propValue.tagName) {
    const value = item.TagValue
    customeText.value = value
  }
}
onMounted(async () => {
  try {
    const res = await http.post({ url: props.propValue.history, data: [props.propValue.tagName] })
    if (res.ErrorCode === 200) {
      dataHandler(res.Results[0])
    }
  } catch (error: any) {
    console.log(error?.message)
  }
})

useEventBus('actual', dataHandler)
</script>

<style lang="less" scoped>
span {
  pointer-events: none;
  display: inline-block;
  width: 100%;
  text-align: center;
  line-height: v-bind(lineHeight);
}
</style>
