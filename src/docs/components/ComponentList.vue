<template>
  <div class="components">
    <n-ul v-for="item in menuOptions" :key="item.key">
      <div class="group-label">
        <IconPark :name="item.icon" size="25" />
        <span> {{ item.label }}</span>
        <span class="group-count">({{ item.count }})</span>
      </div>
      <n-li v-for="child in item.children || []" :key="child.key">
        <n-h4>{{ child.label }}</n-h4>
      </n-li>
    </n-ul>
  </div>
</template>

<script setup lang="ts">
import { NUl, NLi, NH4 } from 'naive-ui'
import { componentList } from '@/designer/load'
import type { GroupType } from '@/enum'
import { ComponentGroupList } from '@/enum'
import { IconPark } from '@/plugins/icon'
import type { BaseComponent } from '@/resource/models'

interface GroupItem {
  label: string
  icon: string
  key: string
  count: number
  children: Array<{
    label: string
    key: string
  }>
}
const menuOptions: Array<GroupItem> = []
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

ComponentGroupList.forEach((item: GroupType) => {
  if (groups[item.key]?.length && groups[item.key]?.length > 0) {
    menuOptions.push({
      label: item.name,
      count: groups[item.key]?.length || 0,
      key: item.key,
      icon: item.icon,
      children: groups[item.key]?.map((el) => {
        return {
          label: el.name,
          key: el.component
        }
      })
    })
  }
})
</script>

<style scoped lang="less">
.group-label {
  font-size: 20px;
  display: inline-flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-content: center;
  justify-content: center;
  align-items: center;
  filter: invert(50%);
}

h4 {
  margin-left: 25px;
  &:hover {
    transform: scale(1.01);
    color: #2d8cf0;
    cursor: pointer;
  }
}
</style>
