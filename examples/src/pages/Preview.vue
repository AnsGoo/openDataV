<template>
  <Previewer ref="viewer" />
</template>

<script setup lang="ts">
import type { ComponentDataType } from '@open-data-v/base'
/* eslint-disable-next-line @typescript-eslint/consistent-type-imports */
import { Previewer, useDataState, useScriptState, useSnapshotState } from '@open-data-v/designer'
import { CustomScriptPlugin, SystemScriptPlugin } from '@open-data-v/scripts'
import { onMounted, ref } from 'vue'

import QuickDataPlugin from '@/data/Quick'
import RestDataPlugin from '@/data/Rest'

const viewer = ref<InstanceType<typeof Previewer> | null>(null)
const snapShotState = useSnapshotState()

const dataState = useDataState()
dataState.loadPlugins([QuickDataPlugin, RestDataPlugin])
const scriptState = useScriptState()
scriptState.loadPlugins([CustomScriptPlugin, SystemScriptPlugin])

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
