<template>
  <template v-for="(item, i) in components" :key="i">
    <el-sub-menu
      v-if="item.component === 'Group'"
      :index="caculIndex(i)"
      draggable="true"
      @dragstart="handleDragStart($event, caculIndex(i))"
      @drop="handleDrop($event, caculIndex(i))"
      @dragover="handleDragOver($event, caculIndex(i), true)"
      @contextmenu.prevent="showContextmenu($event as PointerEvent, caculIndex(i))"
    >
      <template #title>
        <span class="icon iconfont icon-zu"></span>
        <span>{{ item.label || '分组' }}</span>
      </template>
      <LayerItem
        v-if="item.subComponents && item.subComponents.length > 0"
        :components="item.subComponents"
        :index="caculIndex(i)"
      />
    </el-sub-menu>
    <el-menu-item
      v-else
      draggable="true"
      :index="caculIndex(i)"
      @drop="handleDrop($event, caculIndex(i))"
      @dragover="handleDragOver($event, caculIndex(i))"
      @dragstart="handleDragStart($event, caculIndex(i))"
      @contextmenu.prevent="showContextmenu($event as PointerEvent, caculIndex(i))"
    >
      <template #title>
        <span :class="`icon iconfont ${iconMap[item.group as string]}`"></span>
        <span v-show="isShowText">{{ item.label }}</span>
      </template>
    </el-menu-item>
  </template>
  <LayerContextMenu
    v-model:display="displayContexyMenu"
    :menuTop="menuTop"
    :menuLeft="menuLeft"
    :index="curIndex"
    ref="contextMenu"
  />
</template>

<script lang="ts" setup>
import type { ComponentInfo, ComponentStyle, DOMRectStyle } from '@/types/component'
import { ref } from 'vue'
import iconMap from '../icon'
import LayerContextMenu from './LayerContextMenu.vue'
import { ElMenuItem, ElSubMenu } from 'element-plus'

import { onClickOutside } from '@vueuse/core'
import { eventBus } from '@/bus/useEventBus'
import { useBasicStoreWithOut } from '@/store/modules/basic'
import { calcContextMenuLoccation, decomposeComponent } from '@/utils/utils'
import { Vector } from '@/types/common'
import { useEventBus } from '@/bus/useEventBus'

const props = defineProps<{
  components: ComponentInfo[]
  index?: string
  activeKey?: string
}>()

const emits = defineEmits<{ (e: 'select', index: string): void }>()
const contextMenu = ref<ElRef>(null)
const isShowText = ref<boolean>(true)
const basicStore = useBasicStoreWithOut()
onClickOutside(contextMenu, () => close())
let displayContexyMenu = ref<boolean>(false)
let menuTop = ref<number>(0)
let menuLeft = ref<number>(0)
let curIndex = ref<string>('')

const open = (key: any) => {
  const result = key as string
  if (result === 'expend') {
    isShowText.value = true
  } else {
    isShowText.value = false
  }
}
useEventBus('collapse', open)

const caculIndex = (index: number) => {
  let fatherIndex: string | undefined = props.index
  if (fatherIndex) {
    return `${fatherIndex}-${index}`
  } else {
    return index.toString()
  }
}

const close = (): void => {
  displayContexyMenu.value = false
}

const showContextmenu = (event: PointerEvent, index: string) => {
  const point: Vector = calcContextMenuLoccation(
    {
      x: event.clientX,
      y: event.clientY
    },
    80,
    192
  )
  menuTop.value = point.y
  menuLeft.value = point.x
  displayContexyMenu.value = false
  event.stopPropagation()
  emits('select', index)
  displayContexyMenu.value = true
  curIndex.value = index
}

const handleDragStart = (event: DragEvent, index: string) => {
  // event.preventDefault()
  event.dataTransfer?.setData('compomentIndex', index)
  event.stopPropagation()
}

const handleDragOver = (event: DragEvent, index: string, isEmit = false) => {
  event.preventDefault()
  event.stopPropagation()
  if (isEmit && index !== props.activeKey) {
    eventBus.emit('ActiveMenu', index)
  }
}

const handleDrop = (event: DragEvent, index: string) => {
  event.preventDefault()
  event.stopPropagation()
  const compomentIndex: string = event.dataTransfer?.getData('compomentIndex') as string
  const toIndex: string = calcDragIndex(compomentIndex, index)
  const result: boolean = isSameLayer(compomentIndex, index)
  const compoment: ComponentInfo | undefined = cutComponent(compomentIndex, result)
  if (compoment && toIndex) {
    pasteComponent(toIndex, compoment, result)
  }
}
const cutComponent = (index: string, isMyLayer: boolean): ComponentInfo | undefined => {
  const indexs: number[] = index.split('-').map((i) => Number(i))
  const myindex: number = indexs.pop() as number
  const fatherComponent: ComponentInfo | undefined = getFatherComponentData(indexs)
  if (fatherComponent && fatherComponent.subComponents) {
    const components: ComponentInfo[] = fatherComponent.subComponents.splice(myindex, 1)
    const component: ComponentInfo = components[0]
    if (isMyLayer || fatherComponent.component === 'Root') {
      return component
    } else if (fatherComponent.component === 'Group') {
      const parentStyle: ComponentStyle = fatherComponent.style
      decomposeComponent(component, parentStyle)
      return component
    }
  }
}
const calcDragIndex = (fromIndex: string, toIndex: string): string => {
  const fromIndexs: number[] = fromIndex.split('-').map((el: string) => parseInt(el))
  const toIndexs: number[] = toIndex.split('-').map((el: string) => parseInt(el))
  const fromLength: number = fromIndexs.length
  for (let i = 0; i < fromLength; i++) {
    if (fromIndexs[i] === toIndexs[i]) {
      continue
    } else if (fromIndexs[i] > toIndexs[i]) {
      return toIndex
    } else if (fromIndexs[i] < toIndexs[i]) {
      if (i + 1 == fromLength) {
        toIndexs[i] = toIndexs[i] - 1
        return toIndexs.join('-')
      } else {
        return toIndex
      }
    }
  }
  return toIndex
}

const isSameLayer = (fromIndex: string, toIndex: string): boolean => {
  const fromIndexs: number[] = fromIndex.split('-').map((el: string) => parseInt(el))
  const toIndexs: number[] = toIndex.split('-').map((el: string) => parseInt(el))
  fromIndexs.pop()
  toIndexs.pop()
  const fromParentIndex: string = fromIndexs.join('-')
  const toParentIndex: string = toIndexs.join('-')
  return fromParentIndex === toParentIndex
}

const pasteComponent = (index: string, component: ComponentInfo, isMyLayer: boolean): void => {
  const indexs: number[] = index.split('-').map((i) => Number(i))
  const myindex: number = indexs.pop() as number
  const fatherComponent: ComponentInfo | undefined = getFatherComponentData(indexs)
  if (fatherComponent && fatherComponent.subComponents) {
    if (fatherComponent.component === 'Root' || isMyLayer) {
      fatherComponent.subComponents.splice(myindex, 0, component)
    } else if (fatherComponent.component === 'Group') {
      const parentStyle = fatherComponent.style
      const style = { ...component.style } as DOMRectStyle
      component.groupStyle = {
        gtop: 1.1,
        gleft: 1.1,
        grotate: component.style.rotate as number,
        gheight: parseFloat(((style.height * 100) / (parentStyle!.height as number)).toFixed(4)),
        gwidth: parseFloat(((style.width * 100) / (parentStyle!.width as number)).toFixed(4))
      }
      fatherComponent.subComponents.splice(myindex, 0, component)
      emits('select', index)
    }
  }
}

const getFatherComponentData = (indexs: number[]): ComponentInfo => {
  let rootComponent: ComponentInfo = {
    subComponents: basicStore.componentData,
    component: 'Root',
    style: {
      width: 0,
      height: 0,
      left: 0,
      top: 0,
      rotate: 0
    },
    id: '',
    label: '',
    icon: ''
  }
  indexs.forEach((el: number) => {
    rootComponent = rootComponent.subComponents ? rootComponent.subComponents[el] : rootComponent
  })
  return rootComponent
}
</script>

<style lang="less" scoped>
.iconfont {
  @apply mr-1 text-xl;
  color: rgba(30, 144, 255, 1);
}
</style>
