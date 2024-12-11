<template>
  <o-menu
    :options="menuOptions"
    :accordion="false"
    :collapsed="!iscollapsed"
    class="h-full o-scroll overflow-auto select-none"
  />
</template>

<script setup lang="ts">
import { DrapComponent } from '@open-data-v/designer'
import type { MenuOption } from '@open-data-v/ui'
import { OMenu } from '@open-data-v/ui'
import { getCurrentInstance, h, onMounted, ref } from 'vue'

import type { Category } from '../enum'
import { CategoryList } from '../enum'

withDefaults(
  defineProps<{
    iscollapsed?: boolean
  }>(),
  {
    iscollapsed: true
  }
)

const menuOptions = ref<Array<MenuOption>>([])

const instance = getCurrentInstance()
const XIcon = instance!.appContext.components['XIcon']

const loadMenuOption = () => {
  CategoryList.forEach((item: Category) => {
    menuOptions.value.push({
      label: () => item.name,
      key: item.key,
      icon: () =>
        h(XIcon, {
          name: `${item.icon}`
        }),
      children: item.components.map((el) => {
        return {
          label: () =>
            h(
              DrapComponent,
              {
                component: el.component
              },
              () => h('div', { class: 'select-none' }, el.title)
            ),
          key: el.component
        }
      })
    })
  })
}

onMounted(() => {
  loadMenuOption()
})
</script>
