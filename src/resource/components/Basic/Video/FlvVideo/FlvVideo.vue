<template>
  <div>
    <video
      ref="video"
      :autoplay="propValue.basic.autoplay"
      :muted="propValue.basic.muted"
      :controls="propValue.basic.controls"
    ></video>
  </div>
</template>

<script lang="ts" setup>
import flvjs from 'flv.js'
import { onMounted, ref } from 'vue'
import type { FlvVideo } from './type'
import type FlvVideoComponent from './config'
import { useProp } from '@/resource/hooks'

const props = defineProps<{
  component: FlvVideoComponent
}>()

const { propValue } = useProp<FlvVideo>(props.component, () => propChange())

const video = ref<HTMLVideoElement | null>(null)

const playVideo = () => {
  if (flvjs.isSupported()) {
    const flvPlayer = flvjs.createPlayer({
      type: propValue.basic.videoType,
      url: propValue.basic.url
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
</script>

<style lang="less" scoped>
video {
  width: 100%;
  height: 100%;
}
</style>
