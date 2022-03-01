<template>
  <div ref="mainEl" class="main">
    <span v-if="displayType === 'text'">{{ displayContext }}</span>
    <span v-else-if="displayType === 'symbol'" :class="customeSymbol"></span>
    <img v-else-if="displayType === 'image'" :src="displayContext" />
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
  propValue: Recordable<any>
}>()

const mainEl = ref<ElRef>(null)
const conditionList = computed<Array<any>>(() => props.propValue.condition)

const displayType = ref<string>('text')
const displayContext = ref<string>('测试')
const color = ref<string>('#ffffff')
const fontSize = ref<string>('10px')
const iconFit = ref<string>('contain')

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
  for (let item of conditionList.value) {
    const result: boolean = compare(curValue, item.symbol, item.value)
    if (result) {
      displayContext.value = item.displayContext
      color.value = item.color
      fontSize.value = `${item.fontSize}px`
      displayType.value = item.displayType
      iconFit.value = item.iconFit
      return
    }
  }

  displayContext.value = ''
  color.value = '#ffffff'
  fontSize.value = '10px'
  displayType.value = 'text'
  iconFit.value = 'contain'
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

const initData = async () => {
  if (conditionList.value.length > 0) {
    switchDisplay(conditionList.value[0].value)
  }
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
  await initData()
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

img {
  width: 100%;
  height: 100%;
  object-fit: v-bind(iconFit);
}
</style>
