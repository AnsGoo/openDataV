<template>
  <div class="main_belt subbkg">
    <div class="main_belt3 main_belt4">
      <img :src="imgSrc" alt="皮带" class="belt_img" />
    </div>
  </div>
</template>
<script setup lang="ts">
import BlowingMachineLR from '@/assets/img/BlowingMachineLR.png'
import BlowingMachineLR_static from '@/assets/img/BlowingMachineLR_static.png'
import { onMounted } from 'vue'
import type { ComponentInfo } from '@/types/component'
import { http } from '@/utils/http'
const props = defineProps<{
  element: ComponentInfo
  propValue: Recordable<any>
}>()
let imgSrc: string = BlowingMachineLR_static
onMounted(() => {
  getData()
})

function getData() {
  http
    .post({ url: props.propValue.url, data: [props.propValue.tagName1, props.propValue.tagName1] })
    .then((resp) => {
      let res = resp.Results[0].TagValue
      if (res == 0) {
        imgSrc = BlowingMachineLR_static
      } else if (res == 1) {
        imgSrc = BlowingMachineLR
      }
    })
}

// const handler = (event) => {
//   const item: { TagName: string; TagValue: string } = event as {
//     TagName: string
//     TagValue: string
//   }
//   if (propValue.tagName && item.TagName === propValue.tagName) {
//     let value = Number(item.TagValue)
//     if (value == 0) {
//       imgSrc = BlowingMachineLR_static
//     } else if (value == 1) {
//       imgSrc = BlowingMachineLR
//     }
//   }
// }
</script>
<style lang="less" scoped>
img {
  height: 100%;
}
</style>
