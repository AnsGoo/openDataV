<template>
  <div
    :class="[
      'flex flex-col flex-nowrap m-auto p-1 rounded  dark:border-gray-700 border-gray-300 bg-zinc-50 dark:bg-zinc-900',
      bordered ? 'border' : 'border-0'
    ]"
  >
    <div
      v-if="title || slots['header']"
      class="flex flex-row flex-nowrap items-center h-10 p-5 text-xl"
    >
      <span v-if="!slots.header" class="inline-block font-semibold">{{ title }}</span>
      <div class="inline-block"><slot name="header"></slot></div>
    </div>
    <div class="p-5"><slot name="default"></slot></div>
    <div><slot name="footer"></slot></div>
  </div>
</template>
<script lang="ts" setup>
import { useSlots } from 'vue'

withDefaults(
  defineProps<{
    bordered?: boolean
    title?: string
  }>(),
  {
    bordered: true
  }
)

const slots = useSlots()
</script>
