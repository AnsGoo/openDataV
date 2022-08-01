<template>
  <div>
    <video
      ref="video"
      :autoplay="propValue.autoplay"
      :muted="propValue.muted"
      :controls="propValue.controls"
    ></video>
  </div>
</template>

<script lang="ts" setup>
import flvjs from 'flv.js'
import { onMounted, ref } from 'vue'
import { useEventBus } from '@/bus/useEventBus'
import { useBasicStoreWithOut } from '@/store/modules/basic'
import type { FlvVideo } from './type'

const props = defineProps<{
  propValue: FlvVideo
  componentId: string
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
  useEventBus(props.componentId, propChange)
}
</script>

<style lang="less" scoped>
video {
  width: 100%;
  height: 100%;
}
</style>
