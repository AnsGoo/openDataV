<template>
  <span v-resize="resizeHandler">
    {{ propValue.base.label ? `${propValue.base.label}:` : '' }}
    {{ customeText }}
    {{ propValue.base.unit }}
  </span>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useEventBus } from '@/bus'
import { http } from '@/utils/http'
import type { SubTextType } from './type'
import { useProp } from '@/resource/hooks'
import type SubTextComponent from './config'

const props = defineProps<{
  component: SubTextComponent
}>()

const { propValue } = useProp<SubTextType>(props.component)
const customeText = ref<string>('0')

const lineHeight = ref<string>('20px')
const resizeHandler = (entry: ResizeObserverEntry) => {
  const { height } = entry.contentRect
  lineHeight.value = `${height}px`
}

const dataHandler = (event) => {
  const item: Recordable = event as Recordable
  if (propValue.base.tag && item[propValue.base.tag] !== undefined) {
    customeText.value = item[propValue.base.tag]
  }
}
onMounted(async () => {
  try {
    const queryParems = { tag: propValue.base.tag }
    const res = await http.get({ url: propValue.base.url, params: queryParems })

    if (res.status === 200 && Object.keys(res.data).includes(propValue.base.tag)) {
      dataHandler(res.data)
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
