<template>
  <div><video ref="video" autoplay></video></div>
</template>

<script lang="ts" setup>
import flvjs from 'flv.js'
import { onMounted, ref } from 'vue'
import { useEventBus } from '@/bus/useEventBus'
import type { ComponentInfo } from '@/types/component'
import { useBasicStoreWithOut } from '@/store/modules/basic'

const props = defineProps<{
  propValue: Recordable<any>
  element: ComponentInfo
}>()

const basicStore = useBasicStoreWithOut()
const video = ref<HTMLVideoElement | null>(null)

const playVideo = () => {
  if (flvjs.isSupported()) {
    const flvPlayer = flvjs.createPlayer({
      type: props.propValue.videoType,
      url: props.propValue.url
    })
    flvPlayer.attachMediaElement(video.value!)
    flvPlayer.load()
    flvPlayer.play()
  }
}

onMounted(() => {
  playVideo()
})

const propChange = () => {
  playVideo()
}

if (basicStore.isEditMode) {
  useEventBus(props.element.component + props.element.id, propChange)
}
</script>

<style lang="less" scoped>
video {
  width: 100%;
  height: 100%;
}
</style>
