<template>
  <div>
    <span
      v-if="propValue.displayType === 'text'"
      :style="{ color: propValue.color, fontSize: `${propValue.fontSize}px` }"
      >{{ displayContext }}</span
    >
    <span
      v-if="propValue.displayType === 'symbol'"
      :class="customeSymbol"
      :style="{ color: propValue.color, fontSize: `${propValue.fontSize}px` }"
    ></span>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useEventBus } from '@/bus/useEventBus'
import type { ComponentInfo } from '@/types/component'
import type { TagType } from '@/types/wsTypes'
import { http } from '@/utils/http'

const props = defineProps<{
  element: ComponentInfo
  propValue: Recordable<string>
}>()

const displayContext = ref<string>(props.propValue.displayContext1)

const customeSymbol = computed<string>(() => {
  return `icon iconfont ${displayContext.value}`
})

const dataHandler = (event: any) => {
  const item: TagType = event as TagType
  if (props.propValue.tagName && item.TagName === props.propValue.tagName) {
    const curValue = item.TagValue
    switchDisplay(curValue)
  }
}

const switchDisplay = (curValue: string) => {
  const result: boolean = compare(curValue, props.propValue.symbol, props.propValue.value)
  if (result) {
    displayContext.value = props.propValue.displayContext1
  } else {
    displayContext.value = props.propValue.displayContext2
  }
}

const compare = (curValue: string, symbol: string, value: string): boolean => {
  let newValue: string | number = curValue
  let oldValue: string | number = value
  if (Number(value).toString() !== 'NaN') {
    newValue = Number(curValue)
    oldValue = Number(value)
  }
  switch (symbol) {
    case '=':
      return newValue === oldValue
    case '>':
      return newValue > oldValue
    case '>=':
      return newValue >= oldValue
    case '<=':
      return newValue <= oldValue
    case '!=':
      return newValue != oldValue
    default:
      return false
  }
}

onMounted(() => {
  init()
})

useEventBus('actual', dataHandler)

const init = async () => {
  try {
    const res = await http.post({ url: props.propValue.history, data: [props.propValue.tagName] })
    if (res.ErrorCode === 200) {
      const curValue = res.Results[0].TagValue
      switchDisplay(curValue)
    }
  } catch (e: any) {
    console.log(e?.message)
  }
}
</script>

<style lang="less" scoped>
span {
  display: inline-block;
  width: 100%;
  text-align: center;
  pointer-events: none;
}
</style>
