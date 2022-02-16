<template>
  <div ref="mainEl" class="main">
    <div class="tooltip">{{ tooltip }}</div>
    <span v-if="displayType === 'text'">{{ displayContext }}</span>
    <span v-if="displayType === 'symbol'" :class="customeSymbol"></span>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, toRaw } from 'vue'
import { useEventBus } from '@/bus/useEventBus'
import type { ComponentInfo } from '@/types/component'
import type { TagType } from '@/types/wsTypes'
import { useBasicStoreWithOut } from '@/store/modules/basic'
import { http } from '@/utils/http'

const basicStore = useBasicStoreWithOut()

const props = defineProps<{
  element: ComponentInfo
  propValue: Recordable<string>
}>()

const mainEl = ref<ElRef>(null)
const propValue = toRaw(props.propValue)
const displayType = ref<string>(propValue.displayType1)

const displayContext = ref<string>(propValue.displayContext1)
let tagName: string = propValue.tagName

const customeSymbol = computed<string>(() => {
  return `icon iconfont ${displayContext.value}`
})

const handler = (_: any) => {
  const value: string = props.propValue.value
  switchDisplay(value)
}

const tooltip = ref<string>(props.propValue.tooltip1 || '')

const color = ref<string>(props.propValue.color1 || '#ffffff')
const fontSize = ref<string>(props.propValue.fontSize1 ? `${props.propValue.fontSize1}px` : '10px')

const dataHandler = (event: any) => {
  const item: TagType = event as TagType
  if (tagName && item.TagName === tagName) {
    const curValue = item.TagValue
    switchDisplay(curValue)
  }
}

const switchDisplay = (curValue: string) => {
  const myPropValue: Recordable<string> = props.propValue
  const symbol: string = myPropValue.symbol
  const value: string = myPropValue.value
  const result: boolean = compare(curValue, symbol, value)
  if (result) {
    displayContext.value = myPropValue.displayContext1
    color.value = myPropValue.color1
    tooltip.value = myPropValue.tooltip1
    fontSize.value = `${myPropValue.fontSize1}px`
    displayType.value = myPropValue.displayType1
  } else {
    color.value = myPropValue.color2
    fontSize.value = `${myPropValue.fontSize2}px`
    tooltip.value = myPropValue.tooltip2
    displayContext.value = myPropValue.displayContext2
    displayType.value = myPropValue.displayType2
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

onMounted(async () => {
  await init()
})

if (basicStore.isEditMode) {
  useEventBus(props.element.component + props.element.id, handler)
}
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
  font-size: v-bind(fontSize);
  color: v-bind(color);
  pointer-events: none;
}

.main {
  // position: relative;
  overflow: hidden;
  pointer-events: none;
  &:hover {
    overflow: visible;
  }
  .tooltip {
    position: absolute;
    color: #fff;
    left: auto;
    top: -50%;
    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
    font-size: medium;
    height: max-content;
    background-color: black;
    border-radius: 10%;
    width: max-content;
    pointer-events: none;
  }
}
</style>
