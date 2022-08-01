<template>
  <div class="logo">
    <img :src="Logo" alt="" :class="{ 'mr-2': !collapsed }" />
    <h2 v-show="!collapsed" class="title">{{ title }}</h2>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import Logo from '@/assets/logo.png'

defineProps<{
  collapsed: boolean
}>()

const title = ref<string>(import.meta.env.VITE_APP_TITLE)
</script>

<style lang="less" scoped>
.logo {
  @apply flex items-center justify-center overflow-hidden whitespace-nowrap;
  height: @header-height;
  line-height: @header-height;

  img {
    @apply w-auto;
    height: 35px;
  }

  .title {
    @apply mb-0;
  }
}
</style>
