<template>
  <div class="logo sall">
    <img :src="Logo" alt="" :class="{ 'mr-2': !collapsed }" />
    <h2 v-show="!collapsed" class="title rail">{{ title }}</h2>
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
    @apply mb-0 font-black;
  }
  /* 创建多级渐变。 */
  .sall .rail {
    color: transparent;
    background: linear-gradient(to right, #ff0000, #ffff00, #00ff00);
    background-clip: text;
  }
}
</style>
