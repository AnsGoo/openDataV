<template>
  <div class="logo">
    <img :src="Logo" alt="" :class="{ 'mr-2': true }" />
  </div>
</template>

<script lang="ts" setup>
import Logo from '@/assets/logo.png'
</script>

<style lang="less" scoped>
.logo {
  @apply flex items-center justify-center overflow-hidden whitespace-nowrap;
  height: 100%;
  line-height: 100%;

  img {
    @apply w-auto;
    height: 40px;
  }
}
</style>
