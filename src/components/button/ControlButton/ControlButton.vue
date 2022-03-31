<template>
  <div class="main">
    <div
      :class="['icon', 'iconfont', propValue.label, 'tooltip']"
      @click="clickBtn()"
      :style="buttonStyle"
    >
      <span class="tooltiptext">{{ propValue.tooltip }}</span>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { ComponentInfo } from '@/types/component'
import { computed, ref, onMounted } from 'vue'
import { useEventBus } from '@/bus/useEventBus'
import { useBasicStoreWithOut } from '@/store/modules/basic'
import type { ControlButton } from './type';

const basicStore = useBasicStoreWithOut()

const props = defineProps<{
  element: ComponentInfo
  propValue: ControlButton
}>()

const fontColor = computed<string>(() => {
  return props.propValue.fontColor
})

let boardStyle = ref<string>('none')

if (basicStore.isEditMode) {
  boardStyle.value = '1px red dashed'
}

const fontSize = computed<string>(() => {
  return `${props.propValue.fontSize}px`
})

const toolTipSize = computed<string>(() => {
  return `-${parseInt((Number(props.propValue.fontSize) / 2).toString())}px`
})

onMounted(() => {
  if (element.value) {
    const displayStyle: string = props.propValue.displayStyle
    if (displayStyle === 'display') {
      displayElement(element.value, false)
    } else {
      visbleElement(element.value, false)
    }
  }
})

const element = computed<HTMLElement | null>(() => {
  const componmentId: string = props.propValue.componentId
  if (basicStore.isEditMode) {
    return document.querySelector(`#shape${componmentId}`)
  } else {
    return document.querySelector(`#component${componmentId}`)
  }
})

const isShow = (event): void => {
  const curComponmentId: string = event.componmentId
  const componmentId: string = props.propValue.componentId
  const displayStyle: string = props.propValue.displayStyle
  if (element.value) {
    if (displayStyle === 'display') {
      if (curComponmentId === componmentId) {
        displayElement(element.value, true)
      } else {
        displayElement(element.value, false)
      }
    } else {
      if (curComponmentId === componmentId) {
        visbleElement(element.value, true)
      } else {
        visbleElement(element.value, false)
      }
    }
  }
}

const emit = useEventBus('buttonGroup', isShow)

function clickBtn() {
  isActive.value = true
  const componmentId: string = props.propValue.componentId
  emit({ componmentId })
  setTimeout(() => (isActive.value = false), 100)
}

const visbleElement = (curElement: HTMLElement, isVisble: boolean) => {
  curElement.style.display = 'block'
  if (isVisble) {
    if (curElement.style.visibility !== 'visible') {
      curElement.style.visibility = 'visible'
    }
  } else {
    if (curElement.style.visibility !== 'hidden') {
      curElement.style.visibility = 'hidden'
    }
  }
}

const displayElement = (curElement: HTMLElement, isDisplay: boolean) => {
  curElement.style.visibility = 'inherit'
  if (isDisplay) {
    if (curElement.style.display !== 'block') {
      curElement.style.display = 'block'
    }
  } else {
    if (curElement.style.display !== 'none') {
      curElement.style.display = 'none'
    }
  }
}

const isActive = ref<boolean>(false)
const buttonStyle = computed(() => {
  const style: Recordable<string> = {
    fontSize: `${props.propValue.fontSize}px`
  }
  if (isActive.value) {
    style['fontSize'] = `${Number(props.propValue.fontSize) + 1}px`
  }
  return style
})
</script>

<style lang="less" scoped>
.main {
  border: v-bind(boardStyle);
  .tooltip {
    position: relative;
    display: inline-block;
    color: v-bind(fontColor);
    font-size: v-bind(fontSize);
    line-height: v-bind(fontSize);
    z-index: 1;
    .tooltiptext {
      visibility: hidden;
      line-height: 15px;
      width: 100%;
      bottom: 100%;
      left: 50%;
      margin-left: v-bind(toolTipSize);
      background-color: black;
      color: #fff;
      text-align: center;
      border-radius: 6px;
      padding: 5px 0;
      font-size: 15px;

      /* 定位 */
      position: absolute;
      z-index: 999;
      &::after {
        content: " ";
        position: absolute;
        top: 100%; /* 提示工具底部 */
        left: 50%;
        margin-left: -5px;
        border-width: 5px;
        border-style: solid;
        border-color: black transparent transparent transparent;
      }
    }
  }

  .tooltip:hover .tooltiptext {
    visibility: visible;
    z-index: 999;
  }
}
</style>
