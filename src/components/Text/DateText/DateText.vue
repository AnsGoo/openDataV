<template>
  <span>{{ customeText }}</span>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import moment from 'moment'
import type { ComponentInfo } from '@/types/component'

const props = defineProps<{
  element: ComponentInfo
  propValue: Recordable<string>
}>()
let intervalId: IntervalHandle
const customeText = ref<string>(moment(Date.now()).format(props.propValue.format))

const updateData = () => {
  const newformat: string = props.propValue.format
  customeText.value = moment(Date.now()).format(newformat)
}
onMounted(() => {
  intervalId = setInterval(updateData, 1000)
})

onUnmounted(() => {
  clearInterval(intervalId)
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
