<template>
  <span v-resize="resizeHandler" :style="fontStyle">
    {{ propValue.base.label ? `${propValue.base.label}:` : '' }}
    {{ customeText }}
    {{ propValue.base.unit }}
  </span>
</template>

<script setup lang="ts">
import type { CustomComponent } from '@open-data-v/base'
import { useData, useEventBus, useProp } from '@open-data-v/base'
import { set } from 'lodash-es'
import { computed, reactive, ref } from 'vue'

import { getDefaultValue } from './config'
import type { SubTextType } from './type'

const props = defineProps<{
  component: CustomComponent
}>()
const propValue = reactive<SubTextType>(getDefaultValue())
useProp<SubTextType>(props.component, propValueChange)
const customeText = ref<string>('0')

function dataChange(...args) {
  console.log(args)
}

useData(props.component, dataChange)

function propValueChange(propKeys: Array<string>, value: string) {
  set(propValue, propKeys.join('.'), value)
}

const fontStyle = computed<Record<string, any>>(() => {
  const { color, fontSize, fontWeight } = propValue.font
  return {
    color: color,
    fontSize: `${fontSize}px`,
    fontWeight: `${fontWeight}px`
  }
})

const lineHeight = ref<string>('20px')
const resizeHandler = (entry: ResizeObserverEntry) => {
  const { height } = entry.contentRect
  lineHeight.value = `${height}px`
}

const dataHandler = (event) => {
  const item: Record<string, any> = event as Record<string, any>
  if (propValue.base.tag && item[propValue.base.tag] !== undefined) {
    customeText.value = item[propValue.base.tag]
  }
}
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
