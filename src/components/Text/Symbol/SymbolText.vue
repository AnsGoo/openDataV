<template>
  <span :class="customeSymbol"></span>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import type { SymbolText } from './type'

const props = defineProps<{
  componentId: string
  propValue: SymbolText
}>()

const customeSymbol = computed<string>(() => {
  return `icon iconfont ${props.propValue.symbol}`
})
</script>

<style lang="less" scoped>
span {
  pointer-events: none;
  display: inline-block;
  width: 100%;
  text-align: center;
}
</style>
