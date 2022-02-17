<template>
  <span>{{ customeText }}</span>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useEventBus } from '@/bus/useEventBus'
import type { ComponentInfo } from '@/types/component'
import type { TagType } from '@/types/wsTypes'
import { http } from '@/utils/http'

const props = defineProps<{
  element: ComponentInfo
  propValue: Recordable<string>
}>()
const customeText = ref<string>('0')

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
      customeText.value = res.Results[0].TagValue
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
}
</style>
