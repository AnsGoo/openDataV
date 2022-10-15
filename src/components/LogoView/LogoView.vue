<template>
  <div class="logo">
    <img :src="Logo" alt="" :class="{ 'mr-2': true }" />
  </div>
</template>

<script lang="ts" setup>
import Logo from '@/assets/logo.png'
withDefaults(
  defineProps<{
    width: string
  }>(),
  {
    width: '60px'
  }
)
</script>

<style lang="less" scoped>
.logo {
  @apply flex items-center justify-center overflow-hidden whitespace-nowrap;
  width: v-bind(width);
  height: 100%;
  line-height: 100%;
  padding-top: 1px;
  padding-bottom: 1px;

  img {
    @apply w-auto;
    height: inherit;
  }
}
</style>
