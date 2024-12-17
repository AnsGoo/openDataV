<template>
  <li class="ml-4 my-1">
    <div :class="{ bold: isFolder }" class="flex" @click="toggle" @dblclick="changeType">
      <div class="flex items-center">
        <x-icon :name="model.icon" />
        <div class="text-md">{{ model.name }}</div>
      </div>
      <div>
        <span v-if="isFolder">[{{ isOpen ? '-' : '+' }}]</span>
      </div>
    </div>
    <ul v-show="isOpen" v-if="isFolder">
      <LayerItem v-for="item in model.children" :key="item.id" class="item" :model="item" />
    </ul>
  </li>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

const props = defineProps<{
  model: {
    children?: any[]
    name: string
    id: string
    component?: string
    icon: string
  }
}>()

const isOpen = ref(false)
const isFolder = computed(() => {
  return props.model.children && props.model.children.length > 0
})

function toggle() {
  isOpen.value = !isOpen.value
}

function changeType() {
  if (!isFolder.value) {
    isOpen.value = true
  }
}
</script>
