<template>
  <div class="machine" :style="['border-color:' + propValue.borderColor + ';']">
    <img :src="propValue.name" alt="" />
  </div>
</template>
<script setup lang="ts">
import type { ComponentInfo } from '@/types/component'
import { ref } from 'vue'

const props = defineProps<{
  element: ComponentInfo
  propValue: Recordable<any>
}>()
let propValue = ref<any>(props.propValue)
</script>
<style lang="less" scoped>
.machine {
  width: 100%;
  height: 100%;
  border-style: solid;
  border-width: 1px;
  // position: relative;
  img {
    width: 90%;
    position: absolute;
    transform: translate(-50%, -50%);
    left: 50%;
    top: 50%;
  }
}
</style>
