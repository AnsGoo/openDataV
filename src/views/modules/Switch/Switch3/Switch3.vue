<template>
  <el-switch v-model="curStatus" disabled active-color="#13ce66" inactive-color="#ff4949" />
</template>

<script setup lang="ts">
import type { BasicFetchResult } from '@/types/apiTypes'
import { useEventBus } from '@/bus/useEventBus'
import { http } from '@/utils/http'
import type { ComponentInfo } from '@/types/component'
import { onMounted, ref } from 'vue'
import { ElSwitch } from 'element-plus'

const props = defineProps<{
  element: ComponentInfo
  propValue: Recordable<any>
}>()

const curStatus = ref<boolean>(false)

const handler = (event) => {
  const item: { TagName: string; TagValue: string } = event as {
    TagName: string
    TagValue: string
  }
  if (props.propValue.tagName && item.TagName === props.propValue.tagName) {
    const value = Number(item.TagValue)
    if (value == 0) {
      curStatus.value = false
    } else if (value == 1) {
      curStatus.value = true
    }
  }
}

onMounted(() => {
  if (props.propValue.url) {
    getData()
  }
})

useEventBus('actual', handler)
function getData() {
  http
    .get<BasicFetchResult<Recordable<any>[]>>({
      url: props.propValue.url + props.propValue.tagName
    })
    .then((resp) => {
      if (resp.TagValue == 0) {
        curStatus.value = false
      } else if (resp.TagValue == 1) {
        curStatus.value = true
      }
    })
    .catch(() => {})
}
</script>
