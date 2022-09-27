<template>
  <div class="main">
    <n-menu :options="menuOptions" class="sider-bar-item" :collapsed="false" :icon-size="30" />
  </div>
</template>

<script setup lang="ts">
import { computed, h } from 'vue'
import { NMenu } from 'naive-ui'
import type { MenuOption } from 'naive-ui'

import TypeItem from './modules/TypeItem.vue'

const apiTypes = [
  {
    label: 'REST',
    icon: 'api',
    key: 'REST'
  },
  {
    label: 'GraphQL',
    icon: 'earth',
    key: 'GraphQL'
  },
  {
    label: '实时',
    icon: 'transform',
    key: 'RealTime'
  }
]

const menuOptions = computed<MenuOption[]>(() => {
  const menus: MenuOption[] = []
  apiTypes.forEach((item) => {
    menus.push({
      key: item.key,
      icon: () =>
        h(TypeItem, {
          icon: item.icon,
          label: item.label
        })
    })
  })
  return menus
})
</script>

<style scoped lang="less">
.main {
  border-right: 1px var(--n-text-color) dashed;
  width: min-content;
}
</style>
