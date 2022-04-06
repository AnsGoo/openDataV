<template>
  <span>{{ customeText }}</span>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useEventBus } from '@/bus/useEventBus'

import { useBasicStoreWithOut } from '@/store/modules/basic'
import type { StaticText } from './type'

const basicStore = useBasicStoreWithOut()

const props = defineProps<{
  componentId: string
  propValue: StaticText
}>()

const customeText = ref<string>(props.propValue.text)

const handler = (event) => {
  customeText.value = event.value
}

if (basicStore.isEditMode) {
  useEventBus(props.componentId, handler)
}
</script>

<style lang="less" scoped>
span {
  display: inline-block;
  width: 100%;
  text-align: center;
  pointer-events: none;
}
</style>
