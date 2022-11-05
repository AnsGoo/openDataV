<template>
  <n-menu
    :options="menuOptions"
    :inverted="inverted"
    :collapsed="collapsed"
    :collapsed-width="64"
    :collapsed-icon-size="20"
    :indent="24"
    :value="selectedKeys"
  />
</template>

<script lang="ts" setup>
import { ref, onMounted, computed, watch, h } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { useProjectSettingStoreWithOut } from '@/store/modules/projectSetting'
import type { MenuType } from '@/router'
import { routeView } from '@/router'
import type { MenuOption } from 'naive-ui'
import { NMenu } from 'naive-ui'
import { XIcon } from '@/plugins/xicon'

defineProps<{
  collapsed: boolean
}>()

// 当前路由
const currentRoute = useRoute()
const settingStore = useProjectSettingStoreWithOut()
const menuOptions = ref<MenuOption[]>([])
const selectedKeys = ref<string>(currentRoute.name as string)
// const openKeys = reactive<string[]>([])

const inverted = computed(() => {
  return ['dark', 'header-dark'].includes(settingStore.navTheme)
})

// 跟随页面路由变化，切换菜单选中状态
watch(
  () => currentRoute.fullPath,
  () => {
    updateMenu()

    // if (currentRoute.matched && currentRoute.matched.length) {
    //   openKeys.splice(0, openKeys.length)
    //   currentRoute.matched.forEach((item) => {
    //     openKeys.push(item.name as string)
    //   })
    // }
  },
  {
    immediate: true
  }
)

function updateSelectedKeys() {
  const activeMenu: string = (currentRoute.meta?.activeMenu as string) || ''
  selectedKeys.value = activeMenu ? (activeMenu as string) : (currentRoute.name as string)
}

function renderLink(name: string, title: string) {
  return () =>
    h(
      RouterLink,
      {
        to: { name: name }
      },
      { default: () => title }
    )
}

function renderIcon(icon: string) {
  return () =>
    h(XIcon, {
      name: icon
    })
}

function updateMenu() {
  const menuRoutes = routeView.generatorMenu()

  const loopMenu = (route: MenuType): MenuOption => {
    if (route.children) {
      let children: MenuOption[] = []
      for (const child of route.children) {
        children.push(loopMenu(child))
      }
      return {
        label: route.title,
        key: route.name,
        icon: renderIcon(route.icon),
        children: children,
        show: true
      }
    } else {
      return {
        label: renderLink(route.name, route.title),
        key: route.name,
        icon: renderIcon(route.icon),
        show: true
      }
    }
  }

  const temp: MenuOption[] = []
  menuRoutes.forEach((item) => {
    temp.push(loopMenu(item))
  })

  // @ts-ignore
  menuOptions.value = temp

  updateSelectedKeys()
}

onMounted(() => {
  // updateMenu()
})
</script>
