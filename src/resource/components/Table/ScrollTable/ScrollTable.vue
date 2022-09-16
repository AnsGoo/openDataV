<template>
  <div class="dv-scroll-board">表头：</div>
</template>

<script lang="ts" setup>
import { useProp } from '@/resource/hooks'
import { BaseComponent } from '@/resource/models'

const props = defineProps<{
  component: BaseComponent
}>()
</script>
