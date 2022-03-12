<template>
  <template v-for="(item, i) in components" :key="i">
    <el-sub-menu
      v-if="item.component === 'Group'"
      :index="caculIndex(i)"
      draggable="true"
      @dragstart="handleDragStart($event, caculIndex(i))"
      @drop="handleDrop($event, caculIndex(i))"
      @dragover="handleDragOver($event, caculIndex(i), true)"
      v-contextmenu="() => contextmenus($el, caculIndex(i))"
    >
      <template #title>
        <span class="icon iconfont icon-zu"></span>
        <span>{{ item.label || '分组' }}</span>
        <el-icon style="vertical-align: middle">
          <icon-preview-open theme="outline" size="24" fill="#1e90ff" v-if="item.display" />
          <icon-preview-close-one theme="outline" size="24" fill="#1e90ff" v-else />
        </el-icon>
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
      v-contextmenu="() => contextmenus($el, caculIndex(i))"
    >
      <template #title>
        <span :class="`icon iconfont ${iconMap[item.group as string]}`"></span>
        <span v-show="isShowText">{{ item.label }}</span>
        <el-icon style="vertical-align: middle">
          <icon-preview-open theme="outline" size="24" fill="#1e90ff" v-if="item.display" />
          <icon-preview-close-one theme="outline" size="24" fill="#1e90ff" v-else />
        </el-icon>
      </template>
    </el-menu-item>
  </template>
</template>

<script lang="ts" setup>
import type { ComponentInfo, ComponentStyle, DOMRectStyle } from '@/types/component'
import { ref } from 'vue'
import iconMap from '../icon'
import { ElMenuItem, ElSubMenu, ElIcon } from 'element-plus'

import { eventBus } from '@/bus/useEventBus'
import { useBasicStoreWithOut } from '@/store/modules/basic'
import { decomposeComponent, copyText } from '@/utils/utils'
import { useEventBus } from '@/bus/useEventBus'
import { useCopyStoreWithOut } from '@/store/modules/copy'
import { ContextmenuItem } from '@/plugins/directive/contextmenu/types'

const props = defineProps<{
  components: ComponentInfo[]
  index?: string
  activeKey?: string
}>()

const emits = defineEmits<{ (e: 'select', index: string): void }>()
const isShowText = ref<boolean>(true)
const basicStore = useBasicStoreWithOut()
const copyStore = useCopyStoreWithOut()

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

const copy = (index: string) => {
  const indexs: number[] = index.split('-').map((i) => Number(i))
  const component: ComponentInfo = basicStore.getComponentByIndex(indexs)
  if (component) {
    copyText(JSON.stringify(component))
    copyStore.copy()
  }
}

const deleteComponent = async (index: string) => {
  emits('select', index)
  basicStore.removeComponent(index)
}

const upComponent = async (index: string) => {
  emits('select', index)
  basicStore.upComponent(index)
}

const downComponent = async (index: string) => {
  emits('select', index)
  basicStore.downComponent(index)
}

const topComponent = async (index: string) => {
  emits('select', index)
  basicStore.topComponent(index)
}

const bottomComponent = async (index: string) => {
  emits('select', index)
  basicStore.bottomComponent(index)
}

const hiddenComponent = (index: string) => {
  console.log(index)
  emits('select', index)
  basicStore.hiddenComponent(index)
}

const displayComponent = (index: string) => {
  console.log(index)
  emits('select', index)
  basicStore.showComponent(index)
}

const contextmenus = (_, index: string): ContextmenuItem[] => {
  const indexs = index.split('-').map((el) => parseInt(el))
  return [
    {
      text: '复制',
      subText: 'Ctrl + C',
      handler: () => copy(index)
    },
    {
      text: '删除',
      subText: '',
      handler: () => deleteComponent(index)
    },
    { divider: true },
    {
      text: '置于顶层',
      handler: () => topComponent(index),
      children: [
        { text: '置于顶层', handler: () => topComponent(index) },
        { text: '上移一层', handler: () => upComponent(index) }
      ]
    },
    {
      text: '置于底层',
      handler: () => bottomComponent(index),
      children: [
        { text: '置于底层', handler: () => bottomComponent(index) },
        { text: '下移一层', handler: () => downComponent(index) }
      ]
    },
    { divider: true },
    {
      text: '显示',
      disable: basicStore.getComponentByIndex(indexs).display,
      subText: '',
      handler: () => displayComponent(index)
    },
    {
      text: '隐藏',
      disable: !basicStore.getComponentByIndex(indexs).display,
      subText: '',
      handler: () => hiddenComponent(index)
    }
  ]
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
  const fatherComponent: ComponentInfo = basicStore.getComponentByIndex(indexs)
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
  const fatherComponent: ComponentInfo = basicStore.getComponentByIndex(indexs)
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
</script>

<style lang="less" scoped>
.iconfont {
  @apply mr-1 text-xl;
  color: rgba(30, 144, 255, 1);
}
</style>
