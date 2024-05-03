<template>
  <o-menu
    :options="menuOptions"
    :accordion="false"
    :collapsed="!iscollapsed"
    class="h-full o-scroll overflow-auto select-none"
  />
</template>

<script setup lang="ts">
import type { CustomComponent } from '@open-data-v/base'
import type { MenuOption } from '@open-data-v/ui'
import { OMenu } from '@open-data-v/ui'
import { getCurrentInstance, h, onMounted, ref } from 'vue'

import type { GroupType } from '../../../enum'
import { ComponentGroupList } from '../../../enum'
import { useCanvasState } from '../../../state'
import ComponentItem from './ComponentItem.vue'

withDefaults(
  defineProps<{
    iscollapsed?: boolean
  }>(),
  {
    iscollapsed: true
  }
)

const menuOptions = ref<Array<MenuOption>>([])

const canvasState = useCanvasState()
const instance = getCurrentInstance()
const XIcon = instance!.appContext.components['XIcon']

const loadMenuOption = () => {
  const components = canvasState.components
  const componentMap = canvasState.componentMetaMap
  const groups: { group: string; component: CustomComponent[] } | {} = {}
  Object.keys(components).forEach((key) => {
    const clazz = components[key]
    const component = new clazz()
    const group = component.group
    if (!group || !component.show) {
      return
    }

    if (!groups[group]) {
      groups[group] = []
    }
    groups[group].push(component)
  })

  componentMap.forEach((value, key) => {
    const { category = 'OTHER' } = value
    if (!groups[category]) {
      groups[category] = []
    }
    groups[category].push({
      name: value.title,
      component: key
    })
  })
  ComponentGroupList.forEach((item: GroupType) => {
    menuOptions.value.push({
      label: () => item.name,
      key: item.key,
      icon: () =>
        h(XIcon, {
          name: `${item.icon}`
        }),
      children: groups[item.key]?.map((el) => {
        return {
          label: () =>
            h(ComponentItem, {
              component: el.component,
              name: el.name,
              ondragstart: handleDragStart
            }),
          key: el.component
        }
      })
    })
  })
}

onMounted(() => {
  loadMenuOption()
})

const handleDragStart = (e) => {
  e.dataTransfer.setData('componentName', e.target.dataset.component)
}
</script>
<style lang="less" scoped>
@import '../../../css/index.less';
</style>
