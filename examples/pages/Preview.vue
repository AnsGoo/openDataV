<template>
  <Previewer ref="viewer" />
</template>

<script setup lang="ts">
/* eslint-disable-next-line @typescript-eslint/consistent-type-imports */
import { Previewer } from 'open-data-v/designer'
import useSnapShotState from 'open-data-v/designer/state/snapshot'
import type { ComponentDataType } from 'open-data-v/designer/type'
import { onMounted, ref } from 'vue'

const viewer = ref<InstanceType<typeof Previewer> | null>(null)
const snapShotState = useSnapShotState()

onMounted(async () => {
  const snapshot = await snapShotState.latestRecord()
  if (snapshot) {
    viewer.value!.setLayoutData({
      canvasData: snapshot.canvasData as ComponentDataType[],
      canvasStyle: snapshot.canvasStyle,
      dataSlotters: snapshot.dataSlotters
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
