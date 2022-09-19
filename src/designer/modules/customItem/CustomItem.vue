<template>
  <component :is="component" :vlaue="data" :change="handleChange"></component>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
const props = defineProps<{
  value: any
  component: string
}>()

const data = computed(() => {
  return props.value
})

const emits = defineEmits<{
  (e: 'update:value', value: any)
}>()

const handleChange = (value: any) => {
  emits('update:value', value)
}
</script>

<style lang="less" scoped></style>
