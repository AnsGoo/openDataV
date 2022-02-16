<template>
  <span
    :class="['scale', propValue.fontClass]"
    :style="{ color: propValue.fontColor, fontSize: propValue.fontSize + 'px' }"
    @mouseup="mouseUpBtn()"
    @mousedown="mouseDownBtn()"
  ></span>
</template>
<script setup lang="ts">
import type { BasicFetchResult } from '@/types/apiTypes'
import { http } from '@/utils/http'
import type { ComponentInfo } from '@/types/component'
const props = defineProps<{
  element: ComponentInfo
  propValue: Recordable<any>
}>()

const mouseUpBtn = async () => {
  let data = {
    TagName: props.propValue.tagName,
    TagValue: String(props.propValue.upValue)
  }

  try {
    await http.post<BasicFetchResult<string>>({
      url: props.propValue.url,
      data: data
    })
  } catch (err) {
    console.log(err)
  }
}

const mouseDownBtn = async () => {
  let data = {
    TagName: props.propValue.tagName,
    TagValue: String(props.propValue.downValue)
  }

  try {
    await http.post<BasicFetchResult<string>>({
      url: props.propValue.url,
      data: data
    })
  } catch (err) {
    console.log(err)
  }
}
</script>

<style lang="less" scoped>
.scale:active {
  transform: scale(1.2);
}
</style>
