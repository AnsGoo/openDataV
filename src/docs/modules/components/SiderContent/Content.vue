<template>
  <div v-memo="menus" class="components">
    <n-ul v-for="item in menus" :key="item.key">
      <div class="group-label" @click="goTo(item.key)">
        <IconPark :name="item.icon" size="20" />
        <span> {{ item.label }}</span>
        <span class="group-count">({{ item.count }})</span>
      </div>
      <n-li v-for="child in item.children || []" :key="child.key" @click="goTo(child.key)">
        <div class="group-item">{{ child.label }}</div>
      </n-li>
    </n-ul>
  </div>
</template>

<script setup lang="ts">
import { NUl, NLi } from 'naive-ui'
import { IconPark } from '@/plugins/icon'
import type { MenuItem } from './type'
import { useRouter } from 'vue-router'

const router = useRouter()
withDefaults(
  defineProps<{
    menus: Array<MenuItem>
  }>(),
  {
    menus: () => []
  }
)

const goTo = (key: string) => {
  router.push({
    name: key
  })
}
</script>

<style scoped lang="less">
.group-label {
  font-size: 18px;
  display: inline-flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-content: center;
  justify-content: center;
  align-items: center;
  filter: invert(50%);
}

.group-item {
  margin-left: 20px;
  &:hover {
    transform: scale(1.01);
    color: #2d8cf0;
    cursor: pointer;
  }
}
</style>
