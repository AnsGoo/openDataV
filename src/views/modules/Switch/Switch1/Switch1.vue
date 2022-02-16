<template>
  <div class="switch">
    <input type="checkbox" :checked="checked" />
    <div class="button">
      <div class="light"></div>
      <div class="dots"></div>
      <div class="characters"></div>
      <div class="shine"></div>
      <div class="shadow"></div>
    </div>
    <div @click="handleSwitch" class="switchBtn" v-if="propValue.operation"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { http } from '@/utils/http'
import type { ComponentInfo } from '@/types/component'
import type { TagType } from '@/types/wsTypes'
import { useEventBus } from '@/bus/useEventBus'

const props = defineProps<{
  element: ComponentInfo
  propValue: Recordable<string>
}>()

const checked = ref(false)

const handleSwitch = () => {
  checked.value = !checked.value
  const data = {
    TagName: props.propValue.optTagName,
    TagValue: ''
  }
  if (checked.value) {
    data.TagValue = String(props.propValue.on)
  } else {
    data.TagValue = String(props.propValue.off)
  }

  // 发送开关消息
  http.post({
    url: props.propValue.optUrl,
    data: data
  })
}

const dataHandler = (event) => {
  const item: TagType = event as TagType
  if (props.propValue.dataTag === item.TagName) {
    checked.value = Number(item.TagValue) === Number(props.propValue.on)
  }
}

onMounted(() => {
  initData()
})

useEventBus('actual', dataHandler)

const initData = () => {
  http
    .post({ url: props.propValue.history, data: [props.propValue.dataTag] })
    .then((resp) => {
      if (resp.ErrorCode === 200) {
        checked.value = Number(resp.Results[0].TagValue) === 1
      }
    })
    .catch((err) => {
      console.log(err)
      checked.value = false
    })
}
</script>

<style scoped lang="less">
.switch {
  min-width: 35px;
  max-width: 50px;
  min-height: 50px;
  max-height: 65px;
  background-color: black;
  box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.2), 0 0 1px 2px black, inset 0 2px 2px -2px white,
    inset 0 0 2px 15px #47434c, inset 0 0 2px 22px black;
  border-radius: 5px;
  padding: 10px;
  perspective: 700px;
}
.switchBtn {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
}
.switch input {
  display: none;
}
.switch input:checked + .button {
  transform: translateZ(10px) rotateX(7deg);
  box-shadow: 0 -10px 20px #ff1818;
}
.switch input:checked + .button .light {
  animation: flicker 0.2s infinite 0.3s;
}
.switch input:checked + .button .shine {
  opacity: 1;
}
.switch input:checked + .button .shadow {
  opacity: 0;
}
.switch .button {
  transition: all 0.3s cubic-bezier(1, 0, 1, 1);
  transform-origin: center center -15px;
  transform: translateZ(10px) rotateX(-15deg);
  transform-style: preserve-3d;
  width: 100%;
  height: 100%;
  position: relative;
  cursor: pointer;
  background: linear-gradient(#980000 0%, #6f0000 30%, #6f0000 70%, #980000 100%);
  background-repeat: no-repeat;
}
.switch .button::before {
  content: '';
  background: linear-gradient(
        rgba(255, 255, 255, 0.8) 10%,
        rgba(255, 255, 255, 0.3) 30%,
        #650000 75%,
        #320000
      )
      50% 50%/97% 97%,
    #b10000;
  background-repeat: no-repeat;
  width: 100%;
  height: 30px;
  transform-origin: top;
  transform: rotateX(-90deg);
  position: absolute;
  top: 0;
}
.switch .button::after {
  content: '';
  background-image: linear-gradient(#650000, #320000);
  width: 100%;
  height: 50px;
  transform-origin: top;
  transform: translateY(50px) rotateX(-90deg);
  position: absolute;
  bottom: 0;
  box-shadow: 0 50px 8px 0px black, 0 80px 20px 0px rgba(0, 0, 0, 0.5);
}
.switch .light {
  opacity: 0;
  animation: light-off 1s;
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: radial-gradient(#ffc97e, transparent 40%),
    radial-gradient(circle, #ff1818 50%, transparent 80%);
}
.switch .dots {
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: radial-gradient(transparent 30%, rgba(101, 0, 0, 0.7) 70%);
  background-size: 10px 10px;
}
.switch .characters {
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(white, white) 50% 20%/5% 20%,
    radial-gradient(circle, transparent 50%, white 52%, white 70%, transparent 72%) 50% 80%/33% 25%;
  background-repeat: no-repeat;
}
.switch .shine {
  transition: all 0.3s cubic-bezier(1, 0, 1, 1);
  opacity: 0.3;
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(white, transparent 3%) 50% 50%/97% 97%,
    linear-gradient(
        rgba(255, 255, 255, 0.5),
        transparent 50%,
        transparent 80%,
        rgba(255, 255, 255, 0.5)
      )
      50% 50%/97% 97%;
  background-repeat: no-repeat;
}
.switch .shadow {
  transition: all 0.3s cubic-bezier(1, 0, 1, 1);
  opacity: 1;
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(transparent 70%, rgba(0, 0, 0, 0.8));
  background-repeat: no-repeat;
}

@keyframes flicker {
  0% {
    opacity: 1;
  }
  80% {
    opacity: 0.8;
  }
  100% {
    opacity: 1;
  }
}
@keyframes light-off {
  0% {
    opacity: 1;
  }
  80% {
    opacity: 0;
  }
}
</style>
