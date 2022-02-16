<template>
  <div
    class="button3d"
    :class="{ active: isActive }"
    :style="buttonStyle"
    @mousedown="handleMouseDown"
    @mouseup="handleMouseUp"
  >
    <span class="custome-text">{{ tooltip }}</span>
    <span :class="`icon iconfont ${pressClass}`" :style="pressStyle"></span>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { http } from '@/utils/http'
import type { ComponentInfo } from '@/types/component'

const props = defineProps<{
  element: ComponentInfo
  propValue: Recordable<string>
}>()

const switchStatus = ref<boolean>(false)
const isActive = ref<boolean>(false)

const handleMouseDown = () => {
  isActive.value = true
  if (props.propValue.dataTag && props.propValue.downData) {
    http.post({
      url: props.propValue.optUrl,
      data: {
        TagName: props.propValue.dataTag,
        TagValue: String(props.propValue.downData)
      }
    })
  }
}

const handleMouseUp = () => {
  isActive.value = false
  if (props.propValue.dataTag && props.propValue.upData) {
    http.post({
      url: props.propValue.optUrl,
      data: {
        TagName: props.propValue.dataTag,
        TagValue: String(props.propValue.upData)
      }
    })
  }
}

const pressClass = computed<string>(() => {
  return switchStatus.value ? props.propValue.on : props.propValue.off
})

const tooltip = computed<string>(() => {
  return props.propValue.tooltip || ''
})

const pressStyle = computed(() => {
  return {
    left: `${props.propValue.left}px`,
    top: `${props.propValue.top}px`,
    fontSize: `${props.propValue.fontSize}px`,
    color: props.propValue.color
  }
})

const buttonStyle = computed(() => {
  const style: Recordable<string> = {
    transform: 'translateY(0px)',
    boxShadow: `0px 10px 5px ${props.propValue.shadow}px ${props.propValue.shadowColor}`,
    backgroundColor: props.propValue.backgroundColor,
    borderRadius: props.propValue.radius.endsWith('%')
      ? props.propValue.radius
      : props.propValue.radius + 'px'
  }

  if (isActive.value) {
    style['transform'] = 'translateY(3px)'
    style[
      'boxShadow'
    ] = `0px 7px 5px ${props.propValue.activeShadow}px ${props.propValue.activeShadowColor}`
  }
  return style
})
</script>

<style lang="less" scoped>
.button3d {
  // position: relative;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #fff;
  box-shadow: 0px 10px 5px rgba(179, 166, 166, 0.8);
  transition: all 0.3s;
  overflow: hidden;

  &:hover {
    overflow: visible;
  }

  .custome-text {
    position: absolute;
    color: #fff;
    left: auto;
    top: -50%;
    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
    font-size: medium;
    height: max-content;
    background-color: black;
    border-radius: 10%;
    width: max-content;
  }

  .icon.iconfont,
  span {
    position: absolute;
    display: block;
    width: 100%;
    height: 100%;
    text-align: center;
    line-height: 100%;
    font-size: 30px;
  }
}
</style>
