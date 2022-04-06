<template>
  <div class="tab-main">
    <span
      class="tab"
      v-for="item in aboutComponents.keys()"
      :key="item"
      :class="activeKey === item ? 'active' : 'unactive'"
      @click="active(item)"
    ></span>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from 'vue'
import type { ComponentInfo } from '@/types/component'
import { useBasicStoreWithOut } from '@/store/modules/basic'
import { Tabs } from './type'

const basicStore = useBasicStoreWithOut()

const props = defineProps<{
  element: ComponentInfo
  propValue: Tabs
}>()

const width = computed<string>(() => {
  let count: number = new Set(props.propValue.componentIds.map((el) => el.id)).size
  return `${(1 / Number(count || 0)) * 100}%`
})

const aboutComponents = computed<Map<string, HTMLElement>>(() => {
  const componentIds = new Set(props.propValue.componentIds.map((el) => el.id))
  const data: Map<string, HTMLElement> = new Map()
  componentIds.forEach((id: string) => {
    let element: HTMLElement | null
    if (basicStore.isEditMode) {
      element = document.querySelector(`#shape${id}`)
    } else {
      element = document.querySelector(`#component${id}`)
    }
    if (element) {
      data.set(id, element)
    }
  })
  return data
})
const displayStyle = computed<string>(() => props.propValue.displayStyle)
const activeKey = ref<string>(props.propValue.componentIds[0]?.id)
const active = (key: string) => {
  activeKey.value = key
  if (displayStyle.value === 'display') {
    aboutComponents.value.forEach((value: HTMLElement, id: string) => {
      displayElement(value, id === key)
    })
  } else {
    aboutComponents.value.forEach((value: HTMLElement, id: string) => {
      visbleElement(value, id === key)
    })
  }
}

const visbleElement = (element: HTMLElement, isVisble: boolean) => {
  element.style.display = 'block'
  if (isVisble) {
    if (element.style.visibility !== 'visible') {
      element.style.visibility = 'visible'
    }
  } else {
    if (element.style.visibility !== 'hidden') {
      element.style.visibility = 'hidden'
    }
  }
}

const displayElement = (element: HTMLElement, isDisplay: boolean) => {
  element.style.visibility = 'inherit'
  if (isDisplay) {
    if (element.style.display !== 'block') {
      element.style.display = 'block'
    }
  } else {
    if (element.style.display !== 'none') {
      element.style.display = 'none'
    }
  }
}

onMounted(() => {
  nextTick(() => {
    active(activeKey.value)
  })
})
</script>

<style lang="less" scoped>
.tab {
  border-bottom: 2px #6b7280 solid;
  background-color: #e0e0e021;
  width: v-bind(width);
  height: 100%;
  display: inline-flex;
  &:first-child {
    border-top-left-radius: 5px;
  }
  &:last-child {
    border-top-right-radius: 5px;
  }
  &.active {
    background-color: #e0e0e000;
    border-bottom: 2px #70c0ff solid;
  }
}
</style>
