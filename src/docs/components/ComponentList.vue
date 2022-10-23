<template>
  <div class="components">
    <n-menu :options="menuOptions" :accordion="false" />
  </div>
</template>

<script setup lang="ts">
import { computed, h } from 'vue'
import { NMenu } from 'naive-ui'
import type { MenuOption } from 'naive-ui'
import { componentList } from '@/designer/load'
import type { GroupType } from '@/enum'
import { ComponentGroupList } from '@/enum'
import { IconPark } from '@/plugins/icon'
import { BaseComponent } from '@/resource/models'
import ComponentItem from './ComponentItem.vue'

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
    if (groups[item.key]?.length && groups[item.key]?.length > 0) {
      menus.push({
        label: () => `${item.name}(${groups[item.key]?.length || 0})`,
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
                name: el.name,
                onclick: handler
              }),
            key: el.component
          }
        })
      })
    }
  })
  return menus
})

const handler = (e) => {
  console.log(e)
}
</script>

<style scoped>
.components {
  user-select: none;
}
</style>
