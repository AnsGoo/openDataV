<template>
  <div @dragstart="handleDragStart" style="height: calc(100vh - 100px)">
    <div class="components">
      <n-scrollbar>
        <n-menu :options="menuOptions" :accordion="false" />
      </n-scrollbar>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ComponentGroupList } from '@/enum'
import { componentList } from '@/designer/load'
import type { ComponentInfo } from '@/types/component'
import { computed, h } from 'vue'
import { NMenu, NScrollbar } from 'naive-ui'
import type { MenuOption } from 'naive-ui'
import ComponentItem from './ComponentItem.vue'
import type { GroupType } from '@/enum'
import RenderIcon from './RenderIcon.vue'

withDefaults(
  defineProps<{
    mode?: string
  }>(),
  {
    mode: 'expand'
  }
)

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
        h(RenderIcon, {
          name: `icon${item.icon}`
        }),
      children: groups[item.key]?.map((el) => {
        return {
          label: () =>
            h(ComponentItem, {
              component: el.component,
              name: el.label
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
@layer components {
  .component-list {
    @apply flex flex-wrap justify-between p-2.5;
  }

  .component {
    @apply border border-solid border-gray-300 cursor-pointer mb-2.5 text-center text-gray-600;
    @apply px-0.5 py-1.5 flex items-center justify-center active:cursor-pointer rounded-md;
    @apply w-full;
  }

  /* .n-menu {
    width: 200px;
  }
  ul :deep(.n-sub-menu__title) {
    height: 36px;
    line-height: 36px;
  }
  ul :deep(.n-menu-item) {
    height: 30px;
    line-height: 30px;
  } */

  .components {
    display: flex;
    height: 100%;
  }

  .components ul {
    flex: 1;
    /* width: 50px; */
    background-color: #f5f7fa;
  }

  div.preview {
    flex: 3;
    display: flex;
    overflow: auto;
    flex-direction: column;
  }

  div .group {
    width: 50px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-size: 12px;
  }

  li a {
    display: block;
    width: 100%;
    height: 100%;
    text-decoration: none;
  }

  .components li {
    border-bottom: 1px solid #e4e7ed;
    border-right: 1px solid #e4e7ed;
  }

  .active {
    border-right: none !important;
    background-color: #aaa;
    color: #409eff;
  }
  .iconfont {
    @apply mr-1 text-xl;
    color: rgba(30, 144, 255, 1);
  }
}
</style>
