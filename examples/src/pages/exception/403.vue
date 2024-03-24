<template>
  <div class="notfound">
    <div>
      <img src="/errors/403.png" alt="" @click="toHome" />
    </div>
  </div>
</template>
<script setup lang="ts">
import type { Router } from 'vue-router'
import { useRouter } from 'vue-router'

const router: Router = useRouter()

const toHome = async () => {
  await router.push({
    name: 'Home'
  })
}
</script>

<style scoped>
.notfound {
  @apply m-auto flex items-center justify-center text-9xl font-black w-screen h-screen;
  @apply bg-gradient-to-r from-green-400 to-blue-500;

  text-shadow: 10px 5px 15px slategrey;
}
</style>
