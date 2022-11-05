<template>
  <div class="components">
    <n-menu :options="menuOptions" :accordion="false" />
  </div>
</template>

<script setup lang="ts">
import { ComponentGroupList } from '@/enum'
import { componentList } from '@/designer/load'
import { computed, h } from 'vue'
import { NMenu } from 'naive-ui'
import type { MenuOption } from 'naive-ui'
import ComponentItem from './ComponentItem.vue'
import type { GroupType } from '@/enum'
import { XIcon } from '@/plugins/xicon'
import type { BaseComponent } from '@/resource/models'

const menuOptions = computed<MenuOption[]>(() => {
  const groups: { group: string; component: BaseComponent[] } | {} = {}
  Object.keys(componentList).forEach((key) => {
    const component: BaseComponent = new componentList[key]()
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
