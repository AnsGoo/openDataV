<template>
  <component :is="component" v-bind="$attrs" :value="value" @change="handleChange" />
</template>

<script lang="ts" setup>
defineProps<{
  value: any
  component: string
}>()

const emits = defineEmits<{
  (e: 'update:value', value: any): void
}>()

const handleChange = (value: any) => {
  emits('update:value', value)
}
</script>

<style lang="less" scoped></style>
