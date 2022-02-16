<template>
  <!-- 如果在编辑器模式下，button 按钮不响应点击时间，在父元素中进行拦截 -->
  <img class="bg" :src="imgUrl" />
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useEventBus } from '@/bus/useEventBus'

import type { ComponentInfo } from '@/types/component'
import { useBasicStoreWithOut } from '@/store/modules/basic'

const basicStore = useBasicStoreWithOut()

const props = defineProps<{
  element: ComponentInfo
  propValue: Recordable<string>
}>()

const imgUrl = computed<string>(() => {
  return props.propValue.imgUrl
})

const customeText = ref<string>(props.propValue.text)

const handler = (event) => {
  customeText.value = event.value
}
if (basicStore.isEditMode) {
  useEventBus(props.element.component + props.element.id, handler)
}
</script>

<style scoped>
@layer components {
  .bg {
    @apply w-full h-full;
  }
}
</style>
