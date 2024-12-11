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
import { DrapComponent, useCanvasState } from '@open-data-v/designer'
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

const canvasState = useCanvasState()
const instance = getCurrentInstance()
const XIcon = instance!.appContext.components['XIcon']

const loadMenuOption = () => {
  const componentMap = canvasState.componentMetaMap
  const groups: { group: string; component: CustomComponent[] } | {} = {}
  componentMap.forEach((value, key) => {
    const { category = 'OTHER', isContainer } = value
    if (isContainer) {
      return
    }
    if (!groups[category]) {
      groups[category] = []
    }
    groups[category].push({
      name: value.title,
      component: key
    })
  })
  CategoryList.forEach((item: Category) => {
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
            h(
              DrapComponent,
              {
                component: el.component
              },
              () => h('div', { class: 'select-none' }, el.name)
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
