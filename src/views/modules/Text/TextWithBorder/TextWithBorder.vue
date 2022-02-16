<template>
  <div
    class="textBorder"
    :style="{
      color: propValue.color,
      borderStyle: propValue.borderStyle,
      borderWidth: propValue.borderWidth + 'px',
      borderColor: propValue.borderColor,
      justifyContent: propValue.justifyContent,
      fontSize: propValue.fontSize + 'px'
    }"
  >
    {{ textValue }}
  </div>
</template>
<script setup lang="ts">
import { useEventBus } from '@/bus/useEventBus'
import { http } from '@/utils/http'
import type { ComponentInfo } from '@/types/component'
import { onMounted, ref } from 'vue'

const props = defineProps<{ element: ComponentInfo; propValue: Recordable<any> }>()

const textValue = ref<string>(props.propValue.TextValue || '')

const handler = (event) => {
  const item: { TagName: string; TagValue: string } = event as {
    TagName: string
    TagValue: string
  }
  if (props.propValue.datatag && item.TagName === props.propValue.datatag) {
    textValue.value = item.TagValue
  }
}

onMounted(() => {
  if (props.propValue.history) {
    getData()
  }
})
if (props.propValue.history) {
  useEventBus('actual', handler)
}

function getData() {
  http
    .post({ url: props.propValue.history, data: [props.propValue.dataTag] })
    .then((resp) => {
      textValue.value = resp.TagValue
    })
    .catch((err) => {
      console.log(err)
    })
}
</script>
<style lang="less" scoped>
.textBorder {
  display: flex;
  align-items: center; //垂直居中
}
</style>
