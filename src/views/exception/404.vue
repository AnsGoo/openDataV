<template>
  <div class="notfound">Page Not Found</div>
</template>

<style scoped>
@layer components {
  .notfound {
    @apply m-auto flex items-center justify-center text-9xl font-black w-screen h-screen;
    @apply bg-gradient-to-r from-green-400 to-blue-500;

    text-shadow: 10px 5px 15px slategrey;
  }
}
</style>
