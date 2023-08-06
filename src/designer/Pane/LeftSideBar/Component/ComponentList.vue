<template>
  <div class="components">
    <n-menu :options="menuOptions" :accordion="false" />
  </div>
</template>

<script setup lang="ts">
import type { MenuOption } from 'naive-ui'
import { NMenu } from 'naive-ui'
import useCanvasState from 'open-data-v/designer/state/canvas'
import type { GroupType } from 'open-data-v/enum'
import { ComponentGroupList } from 'open-data-v/enum'
import type { CustomComponent } from 'open-data-v/models'
import { computed, getCurrentInstance, h } from 'vue'

import ComponentItem from './ComponentItem.vue'

const canvasState = useCanvasState()
const instance = getCurrentInstance()
const XIcon = instance!.appContext.components['XIcon']

const menuOptions = computed<MenuOption[]>(() => {
  const components = canvasState.components
  const groups: { group: string; component: CustomComponent[] } | {} = {}
  Object.keys(components).forEach((key) => {
    const component: CustomComponent = new components[key]()
    const group = component.group
    if (!group || !component.show) {
      return
    }

    if (!groups[group]) {
      groups[group] = []
    }
    groups[group].push(component)
  })
  const menus: MenuOption[] = []
  ComponentGroupList.forEach((item: GroupType) => {
    menus.push({
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
  return menus
})

const handleDragStart = (e) => {
  e.dataTransfer.setData('componentName', e.target.dataset.component)
}
</script>

<style scoped>
.components {
  user-select: none;
}
</style>
