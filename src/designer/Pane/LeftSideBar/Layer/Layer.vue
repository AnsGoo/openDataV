<template>
  <div>
    <n-menu
      v-if="componentData.length > 0"
      :options="menuOptions"
      :root-indent="1"
      :indent="12"
      @update:value="handleSelect"
    />
    <n-descriptions v-else class="placeholder">
      <n-descriptions-item>
        <n-empty description="画布为空" />
      </n-descriptions-item>
    </n-descriptions>
  </div>
</template>

<script lang="ts" setup>
import { cloneDeep } from 'lodash-es'
import type { MenuOption } from 'naive-ui'
import { NDescriptions, NDescriptionsItem, NEmpty, NMenu } from 'naive-ui'
import type { ContextmenuItem } from 'open-data-v/designer'
import { ComponentGroupList, useCanvasState, useClipBoardState } from 'open-data-v/designer'
import type { CustomComponent } from 'open-data-v/models'
import { ComponentGroup, useEventBus } from 'open-data-v/models'
import { computed, h, ref, watch } from 'vue'

import { uuid } from '../../../utils'
import LayerItem from './LayerItem.vue'
import SimpleLayerItem from './SimpleLayerItem.vue'

const canvasState = useCanvasState()
const clipBoardState = useClipBoardState()

const iconMap: Record<string, string> = {}
ComponentGroupList.map((ele) => {
  iconMap[ele.key] = ele.icon
})

const componentData = computed(() => canvasState.componentData)

const menu = ref<ElRef<any>>(null)
const activeKey = ref<string>('')
const open = (event: any) => {
  const index = event as string
  activeKey.value = index
  if (menu.value && menu.value.open) {
    menu.value.open(index)
  }
}
useEventBus('ActiveMenu', open)

const handleSelect = (key: string) => {
  activeKey.value = key
  const indexes: number[] = key.split('-').map((i) => Number(i))
  const activedComponent: Optional<CustomComponent> = canvasState.getComponentByIndex(indexes)
  if (activedComponent) {
    canvasState.setCurComponent(activedComponent, key)
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
    if (item.group === ComponentGroup.CONTAINER) {
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
            name: 'container',
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
            name: `${iconMap[item.group!]}`,
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
  const component: Optional<CustomComponent> = cloneDeep(canvasState.getComponentByIndex(indexes))
  if (component) {
    clipBoardState.copy(component)
  }
}

const remove = async (index: string) => {
  handleSelect(index)
  const indexes: number[] = index.split('-').map((i) => Number(i))
  canvasState.removeComponent(indexes[indexes.length - 1], canvasState.curComponent?.parent)
}

const up = async (index: string) => {
  handleSelect(index)
  const indexes: number[] = index.split('-').map((i) => Number(i))
  canvasState.upComponent(indexes[indexes.length - 1], canvasState.curComponent?.parent)
}

const down = async (index: string) => {
  handleSelect(index)
  const indexes: number[] = index.split('-').map((i) => Number(i))
  canvasState.downComponent(indexes[indexes.length - 1], canvasState.curComponent?.parent)
}

const top = async (index: string) => {
  handleSelect(index)
  const indexes: number[] = index.split('-').map((i) => Number(i))
  canvasState.topComponent(indexes[indexes.length - 1], canvasState.curComponent?.parent)
}

const bottom = async (index: string) => {
  handleSelect(index)
  const indexes: number[] = index.split('-').map((i) => Number(i))
  canvasState.bottomComponent(indexes[indexes.length - 1], canvasState.curComponent?.parent)
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
  const cutComponent: Optional<CustomComponent> = canvasState.getComponentByIndex(indexes)
  const component: Optional<CustomComponent> = canvasState.cutComponent(
    indexes[indexes.length - 1],
    cutComponent?.parent
  )
  if (component) {
    clipBoardState.copy(component)
  }
}

const paste = (index: string) => {
  const indexes: number[] = index.split('-').map((i) => Number(i))
  const insertComponent: Optional<CustomComponent> = canvasState.getComponentByIndex(indexes)
  if (clipBoardState.copyData) {
    const data = cloneDeep(clipBoardState.copyData) as CustomComponent
    data.id = uuid()
    canvasState.insertComponent(indexes[indexes.length - 1], data, insertComponent?.parent)
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

<style lang="less" scoped></style>
