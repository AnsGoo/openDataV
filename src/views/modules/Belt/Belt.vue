<template>
  <div class="main_belt subbkg">
    <div class="main_belt3 main_belt4">
      <img :src="imgSrcBelt" alt="皮带" class="belt_img" />
    </div>
    <div class="main_belt3 main_belt2">
      <img :src="imgSrcGb" alt="刮板机" class="belt_img" />
    </div>
  </div>
</template>
<script setup lang="ts">
import BlowingMachineUD from '@/assets/img/BlowingMachineUD.png'
import BlowingMachineUD_static from '@/assets/img/BlowingMachineUD_static.png'
import belt from '@/assets/img/belt.png'
import { onMounted } from 'vue'
import { useEventBus } from '@/bus/useEventBus'
import { http } from '@/utils/http'
import type { ComponentInfo } from '@/types/component'
import belt_static from '@/assets/img/belt_static.png'
const props = defineProps<{
  element: ComponentInfo
  propValue: Recordable<any>
}>()
let imgSrcBelt: string = belt_static
let imgSrcGb: string = BlowingMachineUD_static

function getData() {
  http
    .post({ url: props.propValue.url, data: [props.propValue.tagName1, props.propValue.tagName1] })
    .then((resp) => {
      let res = resp.Results
      for (let i in res) {
        if (props.propValue.tagName1 == res[i].TagName) {
          if (res[i].TagValue == 0) {
            imgSrcBelt = belt_static
          } else if (res[i].TagValue == 1) {
            imgSrcBelt = belt
          }
        } else if (props.propValue.tagName2 == res[i].TagName) {
          if (res[i].TagValue == 0) {
            imgSrcGb = BlowingMachineUD_static
          } else if (res[i].TagValue == 1) {
            imgSrcGb = BlowingMachineUD
          }
        }
      }
    })
    .catch((err) => {
      console.log(err)
    })
}
const handler = (event) => {
  const item: { TagName: string; TagValue: string } = event as {
    TagName: string
    TagValue: string
  }
  if (props.propValue.tagName1 && item.TagName === props.propValue.tagName1) {
    let value = Number(item.TagValue)
    if (value == 0) {
      imgSrcBelt = belt_static
    } else if (value == 1) {
      imgSrcBelt = belt
    }
  } else if (props.propValue.tagName2 && item.TagName === props.propValue.tagName2) {
    let value = Number(item.TagValue)
    if (value == 0) {
      imgSrcGb = BlowingMachineUD_static
    } else if (value == 1) {
      imgSrcGb = BlowingMachineUD
    }
  }
}

onMounted(() => {
  getData()
})
useEventBus('actual', handler)
</script>
<style lang="less" scoped>
.main_belt {
  text-align: center;
  font-size: 12.39px;
  margin-right: 3px;
  color: #ffffff;
  letter-spacing: 0.06px;
  padding: 0 18.3px 0 25.7px;
  height: 100%;
  overflow: hidden;
  // background-image: linear-gradient(142deg, #001321 0%, #071931 49%);
  .main_belt3 {
    width: 95%;
    overflow: hidden;
    text-align: center;
    .belt_img {
      height: 100%;
      margin: 0 auto;
    }
  }
  .main_belt2 {
    height: 40%;
  }
  .main_belt4 {
    width: 82%;
    height: 60%;
    // height: 35.5vh;
  }
}
</style>
