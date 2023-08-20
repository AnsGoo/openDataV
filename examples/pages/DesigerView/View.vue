<template>
  <Designer ref="designer" :toolbars="toolBars" />
</template>

<script setup lang="ts">
/* eslint-disable-next-line @typescript-eslint/consistent-type-imports */
import { Designer, StaticKey, useCanvasState, useDataState, useEventBus } from 'open-data-v'
import { onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { getPageApi } from '@/api/pages'
import QuickDataPlugin from '@/data/Quick'
import RestDataPlugin from '@/data/Rest'
import useToolBars from '@/pages/DesigerView/toolbars'
import { useProjectSettingStoreWithOut } from '@/store/modules/projectSetting'
import { message } from '@/utils/message'

useEventBus(StaticKey.STDOUT, (event) => {
  console.log(event)
  const stdout = event as { type: string; name: string; message: any }
  if (stdout.name === 'handle') {
    let callback = message.info
    if (stdout.type === 'error') {
      callback = message.error
    } else if (stdout.type === 'warn') {
      callback = message.warning
    }
    callback(stdout.message)
  } else {
    let callback = console.info
    if (stdout.type === 'error') {
      callback = console.error
    } else if (stdout.type === 'warn') {
      callback = console.warn
    }
    callback(stdout.message)
  }
})

const canvasState = useCanvasState()
const dataState = useDataState()
dataState.loadPlugins([QuickDataPlugin, RestDataPlugin])
const route = useRoute()
const router = useRouter()
const toolBars = useToolBars(router, route)

const designer = ref<InstanceType<typeof Designer> | null>(null)

const settingStore = useProjectSettingStoreWithOut()

onMounted(async () => {
  const index = route.params.index as string
  if (index) {
    await restore(index)
  }
})

const restore = async (index: string) => {
  const resp = await getPageApi(index)
  if (!resp.data) {
    return
  }
  designer.value!.setLayoutData(resp.data)
}

watch(
  () => settingStore.darkTheme,
  () => {
    canvasState.darkTheme = settingStore.darkTheme
  }
)
</script>
