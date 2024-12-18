<template>
  <o-menu
    :options="menuOptions"
    :accordion="false"
    :collapsed="!iscollapsed"
    class="h-full o-scroll overflow-auto select-none"
  />
</template>

<script setup lang="ts">
import type { MenuOption } from '@open-data-v/ui'
import { OMenu } from '@open-data-v/ui'
import { computed, getCurrentInstance, h } from 'vue'

import DrapComponent from '../../components/drap-component.vue'
import type { IComponentItem } from '../type'

const props = withDefaults(
  defineProps<{
    iscollapsed?: boolean
    components: Array<IComponentItem>
  }>(),
  {
    iscollapsed: true,
    components: () => [] as Array<IComponentItem>
  }
)

const instance = getCurrentInstance()
const XIcon = instance!.appContext.components['XIcon']

const menuOptions = computed<MenuOption>(() => {
  const menuOptions: Array<MenuOption> = []
  props.components.forEach((item: IComponentItem) => {
    menuOptions.push({
      label: () => item.name as unknown as string,
      key: item.key,
      icon: () =>
        h(XIcon, {
          name: `${item.icon}`
        }),
      children: (item.children || []).map((el) => {
        return {
          label: () =>
            h(
              DrapComponent,
              {
                component: el.key
              },
              () => h('div', { class: 'select-none' }, el.name)
            ),
          key: el.key
        }
      })
    })
  })
  return menuOptions
})
</script>
<style lang="less" scoped>
@import '../../../css/index.less';
</style>
