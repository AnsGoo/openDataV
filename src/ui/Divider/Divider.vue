<template>
  <div
    v-if="!vertical"
    class="flex flex-nowrap w-full flex-row justify-center items-center mt-2 mb-2"
  >
    <div
      :class="[
        titlePlacement === 'left' ? 'w-1/5' : titlePlacement === 'center' ? 'w-1/2' : 'w-full',
        'bg-zinc-200',
        'dark:bg-zinc-500',
        'border-0'
      ]"
      style="height: 1px"
    ></div>
    <div class="whitespace-nowrap"><slot name="default"></slot></div>
    <div
      :class="[
        titlePlacement === 'right' ? 'w-1/5' : titlePlacement === 'center' ? 'w-1/2' : 'w-full',
        'bg-zinc-200',
        'dark:bg-zinc-500',
        'border-0'
      ]"
      style="height: 1px"
    ></div>
  </div>

  <div
    v-else
    class="bg-zinc-200 dark:bg-zinc-500 border-0 inline-block align-middle h-4 mr-1 ml-1"
    style="width: 1px"
  ></div>
</template>

<script lang="ts" setup>
withDefaults(
  defineProps<{
    dashed?: boolean
    titlePlacement?: 'left' | 'right' | 'center'
    vertical?: boolean
  }>(),
  {
    dashed: false,
    titlePlacement: 'center',
    vertical: false
  }
)
</script>
