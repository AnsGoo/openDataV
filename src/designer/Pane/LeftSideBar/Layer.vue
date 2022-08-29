<template>
  <div>
    <n-menu :options="menuOptions" @update:value="handleSelect" v-if="componentData.length > 0" />
    <n-descriptions v-else class="placeholder">
      <n-descriptions-item>
        <n-empty description="画布为空" />
      </n-descriptions-item>
    </n-descriptions>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, h, watch } from 'vue'
import { useBasicStoreWithOut } from '@/store/modules/basic'
import { useCopyStoreWithOut } from '@/store/modules/copy'
import { copyText, uuid } from '@/utils/utils'
import { NDescriptions, NEmpty, NDescriptionsItem, NMenu } from 'naive-ui'
import { useEventBus } from '@/bus/useEventBus'
import LayerItem from './LayerItem.vue'
import SimpleLayerItem from './SimpleLayerItem.vue'
import type { MenuOption } from 'naive-ui'
import { ComponentGroupList } from '@/enum'
import { ContextmenuItem } from '@/plugins/directive/contextmenu/types'
import { cloneDeep } from 'lodash-es'
import { BaseComponent } from '@/resource/models'

const basicStore = useBasicStoreWithOut()
const copyStore = useCopyStoreWithOut()

const iconMap: Recordable<string> = {}
ComponentGroupList.map((ele) => {
  iconMap[ele.key] = ele.icon
})

const componentData = computed(() => basicStore.componentData)

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
  const indexs: number[] = key.split('-').map((i) => Number(i))
  const activedComponent: Optional<BaseComponent> = basicStore.getComponentByIndex(indexs)
  if (activedComponent) {
    basicStore.setCurComponent(activedComponent, key)
  }
}

const menuOptions = ref<MenuOption[]>([])

const getMenuOptions = (
  fatherIndex: string,
  compoments: BaseComponent[],
  options: MenuOption[]
): MenuOption[] => {
  for (let i = 0; i < compoments.length; i++) {
    const item = compoments[i]
    const currentIndex = calcIndex(i, fatherIndex)
    if (item.component === 'Group') {
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
            name: 'branch-one',
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
  const indexs: number[] = index.split('-').map((i) => Number(i))
  const component: Optional<BaseComponent> = basicStore.getComponentByIndex(indexs)
  if (component) {
    component.groupStyle = undefined
    copyText(JSON.stringify(component.toJson()))
    copyStore.copy()
  }
}

const remove = async (index: string) => {
  handleSelect(index)
  const indexs: number[] = index.split('-').map((i) => Number(i))
  basicStore.removeComponent(indexs[indexs.length - 1], basicStore.curComponent?.parent)
}

const up = async (index: string) => {
  handleSelect(index)
  const indexs: number[] = index.split('-').map((i) => Number(i))
  basicStore.upComponent(indexs[indexs.length - 1], basicStore.curComponent?.parent)
}

const down = async (index: string) => {
  handleSelect(index)
  const indexs: number[] = index.split('-').map((i) => Number(i))
  basicStore.downComponent(indexs[indexs.length - 1], basicStore.curComponent?.parent)
}

const top = async (index: string) => {
  handleSelect(index)
  const indexs: number[] = index.split('-').map((i) => Number(i))
  basicStore.topComponent(indexs[indexs.length - 1], basicStore.curComponent?.parent)
}

const bottom = async (index: string) => {
  handleSelect(index)
  const indexs: number[] = index.split('-').map((i) => Number(i))
  basicStore.bottomComponent(indexs[indexs.length - 1], basicStore.curComponent?.parent)
}

const hidden = (index: string) => {
  handleSelect(index)
  const indexs: number[] = index.split('-').map((i) => Number(i))
  const component = basicStore.getComponentByIndex(indexs)
  if (component) component.hiddenComponent()
}

const display = (index: string) => {
  handleSelect(index)
  const indexs: number[] = index.split('-').map((i) => Number(i))
  const component = basicStore.getComponentByIndex(indexs)
  if (component) component.showComponent()
}
const cut = (index: string) => {
  const indexs: number[] = index.split('-').map((i) => Number(i))
  const cutComponent: Optional<BaseComponent> = basicStore.getComponentByIndex(indexs)
  const component: Optional<BaseComponent> = basicStore.cutComponent(
    indexs[indexs.length - 1],
    cutComponent?.parent
  )
  if (component) {
    copyText(JSON.stringify(component.toJson()))
    copyStore.copy()
  }
}

const paste = (index: string) => {
  const indexs: number[] = index.split('-').map((i) => Number(i))
  const component: Optional<BaseComponent> = copyStore.copyData
  const insertComponent: Optional<BaseComponent> = basicStore.getComponentByIndex(indexs)
  if (component) {
    const data = cloneDeep(copyStore.copyData) as BaseComponent
    data.id = uuid()
    basicStore.insertComponent(indexs[indexs.length - 1], data, insertComponent?.parent)
  }
}

const contextmenus = (index: string): ContextmenuItem[] => {
  const indexs = index.split('-').map((el) => parseInt(el))
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
      subText: 'Ctrl + V',
      handler: () => cut(index)
    },
    {
      text: '拆分',
      subText: 'Ctrl + V',
      disable:
        basicStore.getComponentByIndex(index.split('-').map((i) => Number(i)))?.component !==
        'Group',
      handler: () => basicStore.decompose()
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
      disable: basicStore.getComponentByIndex(indexs)?.display,
      subText: '',
      handler: () => display(index)
    },
    {
      text: '隐藏',
      disable: !basicStore.getComponentByIndex(indexs)?.display,
      subText: '',
      handler: () => hidden(index)
    }
  ]
}

watch(
  () => basicStore.componentData,
  () => {
    const compoments = basicStore.componentData
    menuOptions.value = []
    // @ts-ignore
    menuOptions.value = getMenuOptions('', compoments, [])
  },
  {
    deep: true,
    immediate: true
  }
)
</script>

<style lang="less" scoped></style>
