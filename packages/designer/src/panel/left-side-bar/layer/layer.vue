<template>
  <o-menu
    v-if="componentData.length > 0"
    class="h-full o-scroll overflow-auto"
    :options="menuOptions"
    :root-indent="1"
    :indent="12"
    :collapsed="!iscollapsed"
    @select="(item) => handleSelect(item.key)"
    @update:value="handleSelect"
  />
  <LayerEmpty v-else />
</template>

<script lang="ts" setup>
import type { CustomComponent } from '@open-data-v/base'
import { uuid } from '@open-data-v/base'
import type { MenuOption } from '@open-data-v/ui'
import { OMenu } from '@open-data-v/ui'
import { cloneDeep } from 'lodash-es'
import { computed, h, ref, watch } from 'vue'

import { useEmpty } from '../../../modules'
import { useCanvasState, useClipBoardState } from '../../../state'
import type { ContextmenuItem } from '../../../type'
import LayerItem from './layer-item.vue'
import SimpleLayerItem from './simple-layer-item.vue'

const canvasState = useCanvasState()
const clipBoardState = useClipBoardState()

const LayerEmpty = useEmpty()
withDefaults(
  defineProps<{
    iscollapsed?: boolean
  }>(),
  {
    iscollapsed: true
  }
)

const componentData = computed(() => canvasState.componentData)

const handleSelect = (key: string) => {
  const indexes: number[] = key.split('-').map((i) => Number(i))
  const activedComponent: CustomComponent | undefined = canvasState.getComponentByIndex(indexes)
  if (activedComponent) {
    canvasState.activateComponent(activedComponent, key)
  }
}

const menuOptions = ref<MenuOption[]>([])

const getMenuOptions = (
  fatherIndex: string,
  components: CustomComponent[],
  options: MenuOption[]
): MenuOption[] => {
  for (let i = 0; i < components.length; i++) {
    const item = components[i]
    const currentIndex = calcIndex(i, fatherIndex)
    if (item.subComponents) {
      const childrenOptions: MenuOption[] = []
      options.push({
        label: () =>
          h(LayerItem, {
            component: item,
            index: currentIndex,
            contextmenus: () => contextmenus(currentIndex),
            onclick: () => handleSelect(currentIndex)
          }),
        key: currentIndex,
        icon: () =>
          h(SimpleLayerItem, {
            icon: 'container',
            component: item,
            index: currentIndex,
            contextmenus: () => contextmenus(currentIndex),
            onclick: () => handleSelect(currentIndex)
          }),
        children: getMenuOptions(currentIndex, item.subComponents || [], childrenOptions)
      })
    } else {
      options.push({
        label: () =>
          h(LayerItem, {
            component: item,
            index: currentIndex,
            contextmenus: () => contextmenus(currentIndex)
          }),
        key: currentIndex,
        icon: () =>
          h(SimpleLayerItem, {
            icon: item.icon,
            component: item,
            index: currentIndex,
            contextmenus: () => contextmenus(currentIndex),
            onclick: () => handleSelect(currentIndex)
          })
      })
    }
  }
  return options
}
const calcIndex = (index: number, fatherIndex: string) => {
  if (fatherIndex) {
    return `${fatherIndex}-${index}`
  } else {
    return index.toString()
  }
}

const copy = (index: string) => {
  const indexes: number[] = index.split('-').map((i) => Number(i))
  const component: CustomComponent | undefined = canvasState.getComponentByIndex(indexes)
  if (component) {
    clipBoardState.copy(component.toJson(false))
  }
}

const remove = async (index: string) => {
  handleSelect(index)
  canvasState.removeComponent(canvasState.activeComponent as CustomComponent)
}

const up = async (index: string) => {
  handleSelect(index)
  if (!canvasState.activateComponent) {
    return
  }
  const indexes: number[] = index.split('-').map((i) => Number(i))
  canvasState.upComponent(
    canvasState.activeComponent as CustomComponent,
    indexes[indexes.length - 1]
  )
}

const down = async (index: string) => {
  handleSelect(index)
  if (!canvasState.activateComponent) {
    return
  }
  const indexes: number[] = index.split('-').map((i) => Number(i))
  canvasState.downComponent(
    canvasState.activeComponent as CustomComponent,
    indexes[indexes.length - 1]
  )
}

const top = async (index: string) => {
  handleSelect(index)
  canvasState.topComponent(canvasState.activeComponent as CustomComponent)
}

const bottom = async (index: string) => {
  handleSelect(index)
  canvasState.bottomComponent(canvasState.activeComponent as CustomComponent)
}

const hidden = (index: string) => {
  handleSelect(index)
  const indexes: number[] = index.split('-').map((i) => Number(i))
  const component = canvasState.getComponentByIndex(indexes)
  if (component) component.setVisible(false)
}

const display = (index: string) => {
  handleSelect(index)
  const indexes: number[] = index.split('-').map((i) => Number(i))
  const component = canvasState.getComponentByIndex(indexes)
  if (component) component.setVisible(true)
}
const cut = (index: string) => {
  const indexes: number[] = index.split('-').map((i) => Number(i))
  const curComponent: CustomComponent | undefined = canvasState.getComponentByIndex(indexes)
  if (!curComponent) {
    return
  }
  const component: CustomComponent | undefined = canvasState.removeComponent(
    curComponent as CustomComponent
  )
  if (component) {
    clipBoardState.copy(component.toJson(false))
  }
}

const paste = (index: string) => {
  const indexes: number[] = index.split('-').map((i) => Number(i))

  if (clipBoardState.copyData) {
    const data = cloneDeep(clipBoardState.copyData) as CustomComponent
    data.id = uuid()
    canvasState.insertComponent(data, indexes)
  }
}

const contextmenus = (index: string): ContextmenuItem[] => {
  const indexes = index.split('-').map((el) => parseInt(el))
  return [
    {
      text: '复制',
      subText: 'Ctrl + C',
      handler: () => copy(index)
    },
    {
      text: '粘贴',
      subText: 'Ctrl + V',
      handler: () => paste(index)
    },
    {
      text: '剪切',
      subText: 'Ctrl + X',
      handler: () => cut(index)
    },
    {
      text: '拆分',
      subText: '',
      disable:
        canvasState.getComponentByIndex(index.split('-').map((i) => Number(i)))?.component !==
        'Group',
      handler: () => canvasState.decompose()
    },
    {
      text: '删除',
      subText: '',
      handler: () => remove(index)
    },
    { divider: true },
    {
      text: '置于顶层',
      handler: () => top(index),
      children: [
        { text: '置于顶层', handler: () => top(index) },
        { text: '上移一层', handler: () => up(index) }
      ]
    },
    {
      text: '置于底层',
      handler: () => bottom(index),
      children: [
        { text: '置于底层', handler: () => bottom(index) },
        { text: '下移一层', handler: () => down(index) }
      ]
    },
    { divider: true },
    {
      text: '显示',
      disable: canvasState.getComponentByIndex(indexes)?.display,
      subText: '',
      handler: () => display(index)
    },
    {
      text: '隐藏',
      disable: !canvasState.getComponentByIndex(indexes)?.display,
      subText: '',
      handler: () => hidden(index)
    }
  ]
}

watch(
  () => canvasState.componentData,
  () => {
    const components = canvasState.componentData
    menuOptions.value = []
    // @ts-ignore
    menuOptions.value = getMenuOptions('', components, [])
  },
  {
    deep: true,
    immediate: true
  }
)
</script>
<style lang="less" scoped>
@import '../../../css/index.less';
</style>
