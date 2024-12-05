<template>
  <span v-if="propValue.base.type === 'text'" v-resize="resizeHandler" :style="fontStyle">{{
    customeText
  }}</span>
  <span
    v-else-if="propValue.base.type === 'symbol'"
    v-resize="resizeHandler"
    :class="['icon', 'iconfont', customeText]"
    :style="fontStyle"
  ></span>
</template>

<script setup lang="ts">
import type { CustomComponent } from '@open-data-v/base'
import { useProp } from '@open-data-v/base'
import { computed, reactive, ref } from 'vue'

import { getDefaultValue } from './config'
import type { StaticTextType } from './type'

const props = defineProps<{
  component: CustomComponent
}>()
const propValue = reactive<StaticTextType>(getDefaultValue())
useProp<StaticTextType>(props.component, { defaultPropValue: propValue })

const customeText = computed<string>(() => {
  return propValue.base.text
})

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
</script>

<style lang="less" scoped>
span {
  display: inline-block;
  width: 100%;
  text-align: center;
  pointer-events: none;
  line-height: v-bind(lineHeight);
}
</style>
