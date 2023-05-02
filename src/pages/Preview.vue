<template>
  <Previewer ref="viewer" />
</template>

<script setup lang="ts">
/* eslint-disable-next-line @typescript-eslint/consistent-type-imports */
import { Previewer } from '@/designer'
import { onMounted, ref } from 'vue'
import { useSnapShotStoreWithOut } from '@/store/modules/snapshot'
import type { ComponentDataType } from '@/types/component'

const viewer = ref<InstanceType<typeof Previewer> | null>(null)
const snapShotStore = useSnapShotStoreWithOut()

onMounted(async () => {
  const snapshot = await snapShotStore.latestRecord()
  if (snapshot) {
    viewer.value!.setLayoutData({
      canvasData: snapshot.canvasData as ComponentDataType[],
      canvasStyle: snapshot.canvasStyle
    })
  }
})
</script>

<style scoped lang="less">
.bg {
  @apply w-screen h-screen;

  .screen {
    position: relative;
    left: 50%;
    transform-origin: 0 0;
    transform: translateX(-50%);
  }
}
</style>
