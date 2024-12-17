<template>
  <div v-for="(item, index) in props.components" :key="index">
    <template v-if="item.children && item.children.length > 0">
      <div class="flex flex-row h-10 items-center divide-y divide-gray-200 border-t border-dotted">
        <x-icon :name="item.icon" />
        <div class="text-xl">{{ item.name }}</div>
      </div>
      <div class="flex flex-wrap flex-row">
        <DrapComponent
          v-for="el in item.children || []"
          :key="el.key"
          :component="el.key"
          class="text-center border border-dotted rounded-e-md m-1"
          style="width: 30%"
          :tips="el.name"
          :title="el.name"
        >
          <img :src="el.thumbnail || Logo" class="w-full" />
          {{ el.name }}
        </DrapComponent>
      </div>
    </template>
  </div>
</template>
<script lang="ts" setup>
import { DrapComponent } from '@open-data-v/designer'

import Logo from '@/assets/logo.png'

const props = defineProps<{
  components: Array<any>
}>()
</script>
