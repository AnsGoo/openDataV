<template>
  <span v-if="propValue.type === 'text'">{{ customeText }}</span>
  <span v-else-if="propValue.type === 'symbol'" :class="['icon', 'iconfont', customeText]"></span>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { StaticText } from './type'

const props = defineProps<{
  componentId: string
  propValue: StaticText
}>()

const customeText = computed<string>(() => {
  return props.propValue.text
})
</script>

<style lang="less" scoped>
span {
  display: inline-block;
  width: 100%;
  text-align: center;
  pointer-events: none;
}
</style>
