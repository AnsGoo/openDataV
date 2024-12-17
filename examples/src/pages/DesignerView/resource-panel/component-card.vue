<template>
  <div
    class="divide-y divide-slate-200 dark:divide-slate-400 divide-dashed border-b border-slate-200 dark:border-slate-400"
  >
    <div class="flex flex-row h-10 items-center justify-between">
      <div class="flex">
        <x-icon :name="componentItem.icon" />
        <div class="text-xl">{{ componentItem.name }}</div>
      </div>
      <div @click="() => (selectedRef = !selectedRef)">
        <x-icon :name="!selectedRef ? 'expandLess' : 'expandMore'" />
      </div>
    </div>
    <div v-show="selectedRef" class="flex flex-wrap flex-row">
      <DrapComponent
        v-for="el in componentItem.children || []"
        :key="el.key"
        :component="el.key"
        class="text-center border rounded m-1 hover:scale-105 border-slate-200 dark:border-slate-600"
        style="width: 30%"
        :tips="el.name"
        :title="el.name"
      >
        <img :src="el.thumbnail || Logo" class="w-full" />
        {{ el.name }}
      </DrapComponent>
    </div>
  </div>
</template>
<script setup lang="ts">
import { DrapComponent, useIcon } from '@open-data-v/designer'
import { ref } from 'vue'

import Logo from '@/assets/logo.png'

import ExpandLess from './icon/expand-less'
import ExpandMore from './icon/expand-more'
import type { IComponentItem } from './type'

const XIcon = useIcon({
  expandLess: ExpandLess,
  expandMore: ExpandMore
})

defineProps<{
  componentItem: IComponentItem
}>()

const selectedRef = ref<boolean>(true)
</script>
