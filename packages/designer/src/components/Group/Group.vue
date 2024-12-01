<template>
  <div v-if="!editMode" class="group">
    <template v-for="item in component.subComponents || []" :key="item.id">
      <component
        :is="item.component"
        :id="'component' + item.id"
        class="component absolute"
        :style="getComponentStyle(item)"
        :component="item"
      />
    </template>
  </div>
  <div v-else class="group" :class="{ dotted: isActive }">
    <template v-for="(item, i) in component.subComponents || []" :key="item.id">
      <Shape
        v-if="isShow(item.display)"
        :id="'shape' + item.id"
        :defaultStyle="item.style"
        :style="getShapeStyle(item)"
        :active="item.id === (curComponent || {}).id"
        :info="item"
        :class="{ lock: item.locked }"
        :isInner="true"
        :index="i"
      >
        <component
          :is="item.component"
          :id="'component' + item.id"
          class="component absolute"
          :style="getInnerComponentShapeStyle(item)"
          :component="item"
        />
      </Shape>
    </template>
  </div>
</template>

<script setup lang="ts">
import type { CustomComponent, Hooks } from '@open-data-v/base'
import { channels, eventBus } from '@open-data-v/base'
import { computed, inject, reactive } from 'vue'

import { HOOKS } from '../../const'
import Shape from '../../editor/Shape'
import useCanvasState from '../../state/canvas'
import { filterStyle, getComponentStyle, getInnerComponentShapeStyle } from '../../utils'
import { getDefaultValue } from './config'
import type { Group } from './type'

const props = defineProps<{
  component: CustomComponent
}>()

const defaultPropValue = reactive<Group>(getDefaultValue())

const useMessage = (
  { channel, isRegExp, isListen }: { channel: string; isRegExp: boolean; isListen: boolean },
  callback: (...args) => void
) => {
  if (isRegExp && channel) {
    const keys = Object.keys(channels)
    const matchReg = new RegExp(channel)
    const call = isListen
      ? (name) => eventBus.on(name, callback)
      : (name) => eventBus.off(name, callback)
    keys.forEach((el) => {
      if (matchReg.test(el)) {
        call(el)
      }
    })
  } else {
    const myChannel = channel ? channel : props.component.id
    call(myChannel)
  }
}

function pubMessgae({ channel, isRegExp }: { channel: string; isRegExp: boolean }, data) {
  if (isRegExp && channel) {
    const keys = Object.keys(channels)
    const matchReg = new RegExp(channel)
    keys.forEach((el) => {
      if (matchReg.test(el)) {
        eventBus.emit(el, data)
      }
    })
  } else {
    const myChannel = channel ? channel : props.component.id
    eventBus(myChannel, data)
  }
}
const dataChange = (resp: any, _?: string) => {
  if (resp.status === 'SUCCESS') {
    const data = resp.afterData
    const propValue = props.component.propValue
    pubMessgae({ channel, isRegExp: propValue.isRegExp }, data)
  }
}
const { useData, useProp } = inject<Hooks>(HOOKS) || {}

if (useProp) {
  useProp(props.component, (propsKey: Array<string>, value: any) => {
    useMessage({ ...defaultPropValue.dataOption, isListen: false }, dataChange)
    set(defaultPropValue, propsKey.join('.'), value)
    useMessage({ ...defaultPropValue, isListen: true }, dataChange)
  })
}

if (useData) {
  useData(props.component, dataChange)
}

const canvasState = useCanvasState()
const editMode = computed<boolean>(() => canvasState.isEditMode)

const curComponent = computed(() => canvasState.activeComponent)
const isActive = computed(() => {
  let curComponent = canvasState.activeComponent
  while (curComponent) {
    if (curComponent.parent?.id === props.component.id) {
      return true
    }
    curComponent = curComponent.parent
  }

  return false
})

const isShow = (display: boolean): boolean => {
  return !(canvasState.isEditMode && !display)
}
const getShapeStyle = (item: CustomComponent) => {
  if (item.groupStyle?.gheight) {
    return filterStyle(item.groupStyle, ['gtop', 'gleft', 'gwidth', 'gheight', 'grotate'])
  } else {
    return filterStyle(item.style, ['top', 'left', 'width', 'height', 'rotate'])
  }
}
</script>

<style lang="less" scoped>
.group {
  & > div {
    position: absolute;
    width: 100%;
    height: 100%;
  }
}
.component {
  position: absolute;
}

.dotted {
  outline: 1px dotted #70c0ff;
}
</style>
