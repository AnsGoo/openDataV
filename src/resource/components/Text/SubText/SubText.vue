<template>
  <span v-resize="resizeHandler">{{ customeText }}{{ propValue.base.unit }}</span>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useEventBus } from '@/bus/useEventBus'
import { http } from '@/utils/http'
import type { SubTextType } from './type'
import { useProp } from '@/resource/hooks'
import SubTextComponent from './config'

const props = defineProps<{
  componentId: string
  component: SubTextComponent
}>()

const { propValue } = useProp<SubTextType>(props.component)
const customeText = ref<string>('0')

const lineHeight = ref<string>('20px')
const resizeHandler = (entries: ResizeObserverEntry[]) => {
  const entry = entries[0]
  const { height } = entry.contentRect
  lineHeight.value = `${height}px`
}

const dataHandler = (event) => {
  const item: Recordable = event as Recordable
  if (propValue.base.tagName && item.TagName === propValue.base.tagName) {
    const value = item.TagValue
    customeText.value = value
  }
}
onMounted(async () => {
  try {
    const queryParems = { tagName: propValue.base.tagName }
    const res = await http.get({ url: propValue.base.url, params: queryParems })
    if (Object.keys(res).includes(propValue.base.tagName)) {
      dataHandler(res[propValue.base.tagName])
    }
  } catch (error: any) {
    console.log(error?.message)
  }
})

useEventBus('globalData', dataHandler)
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
