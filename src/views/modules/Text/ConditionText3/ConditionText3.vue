<template>
  <div ref="mainEl" class="main">
    <span v-if="displayType === 'text'">{{ displayContext }}</span>
    <span v-if="displayType === 'symbol'" :class="customeSymbol"></span>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
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
const conditionList = computed<Array<any>>(() => [
  {
    symbol: props.propValue.symbol1,
    value: props.propValue.value1,
    displayType: props.propValue.displayType1,
    displayContext: props.propValue.displayContext1,
    color: props.propValue.color1,
    fontSize: props.propValue.fontSize1
  },
  {
    symbol: props.propValue.symbol2,
    value: props.propValue.value2,
    displayType: props.propValue.displayType2,
    displayContext: props.propValue.displayContext2,
    color: props.propValue.color2,
    fontSize: props.propValue.fontSize2
  },
  {
    symbol: props.propValue.symbol3,
    value: props.propValue.value3,
    displayType: props.propValue.displayType3,
    displayContext: props.propValue.displayContext3,
    color: props.propValue.color3,
    fontSize: props.propValue.fontSize3
  },
  {
    symbol: props.propValue.symbol4,
    value: props.propValue.value4,
    displayType: props.propValue.displayType4,
    displayContext: props.propValue.displayContext4,
    color: props.propValue.color4,
    fontSize: props.propValue.fontSize4
  }
])

const displayType = ref<string>('text')
const displayContext = ref<string>('测试')
const color = ref<string>('#ffffff')
const fontSize = ref<string>('10px')

const customeSymbol = computed<string>(() => {
  return `icon iconfont ${displayContext.value}`
})

const handler = (_: any) => {
  console.log('handler')
  switchDisplay('1')
}

const dataHandler = (event: any) => {
  const item: TagType = event as TagType
  if (props.propValue.tagName && item.TagName === props.propValue.tagName) {
    const curValue = item.TagValue
    switchDisplay(curValue)
  }
}

const switchDisplay = (curValue: string) => {
  // 如果当前值等于条件值，则取当前条件作为判断
  let curItem = conditionList.value.find((item: any) => String(item.value) === String(curValue))
  if (!curItem) {
    displayContext.value = ''
    color.value = '#ffffff'
    fontSize.value = '10px'
    displayType.value = 'text'
    return
  }

  const result: boolean = compare(curValue, curItem.symbol, curItem.value)
  if (result) {
    displayContext.value = curItem.displayContext
    color.value = curItem.color
    fontSize.value = `${curItem.fontSize}px`
    displayType.value = curItem.displayType
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

if (basicStore.isEditMode) {
  useEventBus(props.element.component + props.element.id, handler)
}
useEventBus('actual', dataHandler)

const init = async () => {
  const propValue: Recordable<string> = props.propValue
  try {
    const res = await http.post({ url: propValue.history, data: [propValue.tagName] })
    if (res.ErrorCode === 200) {
      const curValue = res.Results[0].TagValue
      switchDisplay(curValue)
    }
  } catch (e: any) {
    console.log(e?.message)
  }
}

onMounted(async () => {
  await init()
})
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
  pointer-events: none;
  // position: relative;
  overflow: hidden;
  &:hover {
    overflow: visible;
  }
}
</style>
