<template>
  <div>
    <div class="control" @click="handleClick" :style="borderStyle"></div>
    <teleport to="body">
      <div class="mask" v-show="showVideo">
        <span @click="handleClick">X</span>
        <video
          ref="video"
          :width="propValue.videoWidth"
          :height="propValue.videoHeight"
          autoplay
        ></video>
      </div>
    </teleport>
  </div>
</template>

<script lang="ts" setup>
import flvjs from 'flv.js'
import { ref, computed } from 'vue'
import { useEventBus } from '@/bus/useEventBus'
import type { ComponentInfo } from '@/types/component'
import { useBasicStoreWithOut } from '@/store/modules/basic'

const props = defineProps<{
  propValue: Recordable<any>
  element: ComponentInfo
}>()

const basicStore = useBasicStoreWithOut()
const video = ref<HTMLVideoElement | null>(null)
const showVideo = ref<boolean>(false)
const flvPlayer = ref<flvjs.Player | null>(null)

const borderStyle = computed(() => {
  if (basicStore.isEditMode) {
    return {
      border: '1px solid #fff'
    }
  }
  return { border: 'none' }
})

const handleClick = () => {
  console.log('click')
  if (!basicStore.isEditMode) {
    showVideo.value = !showVideo.value
    playVideo(showVideo.value)
  }
}

const playVideo = (show: boolean) => {
  if (show && flvjs.isSupported()) {
    flvPlayer.value = flvjs.createPlayer({
      type: props.propValue.videoType,
      url: props.propValue.url
    })
    flvPlayer.value.attachMediaElement(video.value!)
    flvPlayer.value.load()
    flvPlayer.value.play()
  } else if (flvPlayer.value) {
    flvPlayer.value.pause()
    flvPlayer.value.unload()
    flvPlayer.value.detachMediaElement()
  }
}

const propChange = () => {
  playVideo(showVideo.value)
}

if (basicStore.isEditMode) {
  useEventBus(props.element.component + props.element.id, propChange)
}
</script>

<style lang="less" scoped>
.control {
  width: 100%;
  height: 100%;
}

div.mask {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background-color: rgba(170, 170, 170, 0.3);

  video {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  span {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 20px;
    color: #fff;
    cursor: pointer;
  }
}
</style>
