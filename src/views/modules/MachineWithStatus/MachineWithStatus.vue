<template>
  <div class="machine" :style="['border-color:' + propValue.borderColor + ';']">
    <img :src="imgSrc" alt="" />
  </div>
</template>
<script setup lang="ts">
import type { ComponentInfo } from '@/types/component'
import { onMounted, ref } from 'vue'
import pumpBlue from '@/assets/img/pumpBlue.png'
import pumpGray from '@/assets/img/pumpGray.png'
import pumpRed from '@/assets/img/pumpRed.png'
import { http } from '@/utils/http'

import { useEventBus } from '@/bus/useEventBus'
const props = defineProps<{
  element: ComponentInfo
  propValue: Recordable<any>
}>()
let propValue = ref<any>(props.propValue)
let imgSrc: string = pumpBlue
const handler = (event) => {
  const item: { TagName: string; TagValue: string } = event as {
    TagName: string
    TagValue: string
  }
  if (propValue.value.tagName && item.TagName === propValue.value.tagName) {
    let value = Number(item.TagValue)
    judgeImg(value)
  }
}
onMounted(() => {
  getData()
})
function getData() {
  http
    .post({ url: propValue.value.history, data: [propValue.value.tagName] })
    .then((resp) => {
      let res = resp.Results[0].TagValue
      judgeImg(res)
    })
    .catch((err: any) => {
      console.log(err.message || err)
    })
}
useEventBus('actual', handler)
function judgeImg(img) {
  switch (img) {
    case 0:
      imgSrc = pumpGray
      break
    case 1:
      imgSrc = pumpBlue
      break
    case 2:
    case 3:
      imgSrc = pumpRed
      break
  }
}
</script>
<style lang="less" scoped>
.machine {
  width: 100%;
  height: 100%;
  border-style: solid;
  border-width: 1px;
  // position: relative;
  img {
    width: 60%;
    position: absolute;
    transform: translate(-50%, -50%);
    left: 50%;
    top: 50%;
  }
}
</style>
