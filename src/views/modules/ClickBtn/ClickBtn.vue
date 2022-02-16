<template>
  <div>
    <span :class="['scale', propValue.fontClass]" @click="clickBtn()" :style="buttonStyle"></span>
  </div>
</template>
<script setup lang="ts">
import type { BasicFetchResult } from '@/types/apiTypes'
import { http } from '@/utils/http'
import type { ComponentInfo } from '@/types/component'
import { computed, ref } from 'vue'
const props = defineProps<{
  element: ComponentInfo
  propValue: Recordable<any>
}>()

const fontColor = computed<string>(() => {
  return props.propValue.fontColor
})

const fontSize = computed<string>(() => {
  return `${props.propValue.fontSize}px`
})

function clickBtn() {
  let data = {
    TagName: props.propValue.tagName,
    TagValue: String(props.propValue.sendValue)
  }
  isActive.value = true
  http
    .post<BasicFetchResult<string>>({
      url: props.propValue.url,
      data: data
    })
    .then((resp) => {
      console.log(resp)
    })
    .catch((_) => {
      console.log('init diagram data error')
    })
  setTimeout(() => (isActive.value = false), 100)
}
const isActive = ref<boolean>(false)
const buttonStyle = computed(() => {
  const style: Recordable<string> = {
    fontSize: `${props.propValue.fontSize}px`
  }
  if (isActive.value) {
    style['fontSize'] = `${Number(props.propValue.fontSize) + 1}px`
  }
  return style
})
</script>

<style lang="less" scoped>
span {
  color: v-bind(fontColor);
  font-size: v-bind(fontSize);
  :active {
    transform: scale(1.2);
  }
}
</style>
