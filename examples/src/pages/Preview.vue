<template>
  <Previewer ref="viewer" />
</template>

<script setup lang="ts">
import { StaticDataPlugin, SubDataPlugin, WebsocketDataPlugin } from '@open-data-v/data'
/* eslint-disable-next-line @typescript-eslint/consistent-type-imports */
import { Previewer, useCanvasState, useGraphState, useScriptState } from '@open-data-v/designer'
import type { CanvasMetaData } from '@open-data-v/designer/src/state/type'
import { CustomScriptPlugin, SystemScriptPlugin } from '@open-data-v/scripts'
import { onMounted, ref } from 'vue'

import QuickDataPlugin from '@/data/Quick'
import RestDataPlugin from '@/data/Rest'

const viewer = ref<InstanceType<typeof Previewer> | null>(null)
const canvasState = useCanvasState()!

const graphState = useGraphState()
graphState.loadDataPlugins([
  QuickDataPlugin,
  RestDataPlugin,
  StaticDataPlugin,
  SubDataPlugin,
  WebsocketDataPlugin
])
const scriptState = useScriptState()
scriptState.loadPlugins([CustomScriptPlugin, SystemScriptPlugin])

onMounted(async () => {
  const snapshot = await canvasState.snapshot.latestRecord()
  if (snapshot) {
    viewer.value!.loadCanvasData(snapshot.canvasData as unknown as CanvasMetaData)
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
