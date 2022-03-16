<template>
  <!-- 如果在编辑器模式下，button 按钮不响应点击时间，在父元素中进行拦截 -->
  >
  <button class="v-button" @click="handleClick">{{ propValue.title }}</button>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import type { ComponentInfo } from '@/types/component'
import { useBasicStoreWithOut } from '@/store/modules/basic'

const router = useRouter()
const props = defineProps<{ propValue: Recordable<string>; element: ComponentInfo }>()

const basicStore = useBasicStoreWithOut()

const handleClick = () => {
  if (basicStore.isEditMode) {
    return
  }

  if (props.propValue.router) {
    router.push(props.propValue.router)
  }
}
</script>

<style lang="less" scoped>
@layer components {
  .v-button {
    @apply inline-block leading-none whitespace-nowrap cursor-pointer bg-white border-0 border-transparent text-gray-300 text-center;
    @apply outline-none m-0 w-5/6 h-2/3 text-sm box-border font-medium;
    @apply hover:bg-gray-50 hover:text-blue-600;

    -webkit-appearance: none;
    transition: all 0.1s;
    background-color: #282c34;
  }

  .v-button:active {
    color: #3a8ee6;
    outline: 0;
  }
}
</style>
