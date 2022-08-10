<template>
  <div class="components">
    <n-menu :options="menuOptions" :accordion="false" />
  </div>
</template>

<script setup lang="ts">
import { ComponentGroupList } from '@/enum'
import { componentList } from '@/designer/load'
import type { ComponentInfo } from '@/types/component'
import { computed, h } from 'vue'
import { NMenu } from 'naive-ui'
import type { MenuOption } from 'naive-ui'
import ComponentItem from './ComponentItem.vue'
import type { GroupType } from '@/enum'
import { IconPark } from '@/plugins/icon'

const menuOptions = computed<MenuOption[]>(() => {
  const groups: { group: string; component: ComponentInfo[] } | {} = {}
  Object.keys(componentList)
    .filter((key) => {
      if (componentList[key].component.show !== false) {
        return componentList[key]
      }
    })
    .forEach((key) => {
      const group = componentList[key].component.group
      if (!group) {
        return
      }

      if (!groups[group]) {
        groups[group] = []
      }
      groups[group].push(componentList[key].component)
    })
  const menus: MenuOption[] = []
  ComponentGroupList.forEach((item: GroupType) => {
    menus.push({
      label: () => item.name,
      key: item.key,
      icon: () =>
        h(IconPark, {
          name: `${item.icon}`
        }),
      children: groups[item.key]?.map((el) => {
        return {
          label: () =>
            h(ComponentItem, {
              component: el.component,
              name: el.label,
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

<style scoped></style>
