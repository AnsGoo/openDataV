<template>
  <div class="components">
    <n-ul v-for="item in menus" :key="item.key">
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
import { IconPark } from '@/plugins/icon'
import type { MenuItem } from './type'

withDefaults(
  defineProps<{
    menus: Array<MenuItem>
  }>(),
  {
    menus: () => []
  }
)
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
