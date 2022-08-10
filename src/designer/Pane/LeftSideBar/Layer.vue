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
import { useBasicStoreWithOut } from '@/store/modules/basic'
import { computed, ref, h, watch } from 'vue'
import type { ComponentInfo } from '@/types/component'
import { NDescriptions, NEmpty, NDescriptionsItem, NMenu } from 'naive-ui'
import { useEventBus } from '@/bus/useEventBus'
import { IconPark } from '@/plugins/icon'
import LayerItem from './LayerItem.vue'
import type { MenuOption } from 'naive-ui'
import { ComponentGroupList } from '@/enum'

const basicStore = useBasicStoreWithOut()

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
  const activedComponent: ComponentInfo = basicStore.getComponentByIndex(indexs)
  basicStore.setCurComponent(activedComponent)
}

const menuOptions = ref<MenuOption[]>([])

const getMenuOptions = (
  fatherIndex: string,
  compoments: ComponentInfo[],
  options: MenuOption[]
): MenuOption[] => {
  for (let i = 0; i < compoments.length; i++) {
    const item = compoments[i]

    if (item.component === 'Group') {
      const childrenOptions: MenuOption[] = []
      options.push({
        label: () =>
          h(LayerItem, {
            component: item,
            index: calcIndex(i, fatherIndex)
          }),
        key: calcIndex(i, fatherIndex),
        icon: () =>
          h(IconPark, {
            name: 'branch-one'
          }),
        children: getMenuOptions(
          calcIndex(i, fatherIndex),
          item.subComponents || [],
          childrenOptions
        )
      })
    } else {
      options.push({
        label: () =>
          h(LayerItem, {
            component: item,
            index: calcIndex(i, fatherIndex)
          }),
        key: calcIndex(i, fatherIndex),
        icon: () =>
          h(IconPark, {
            name: `${iconMap[item.group!]}`
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
