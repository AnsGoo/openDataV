<template>
  <Designer ref="designer" :toolbars="toolBars" />
</template>

<script setup lang="ts">
/* eslint-disable-next-line @typescript-eslint/consistent-type-imports */
import { Designer } from 'open-data-v/designer'
import useCanvasState from 'open-data-v/designer/state/canvas'
import { onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { getPageApi } from '@/api/pages'
import useToolBars from '@/pages/DesigerView/toolbars'
import { useProjectSettingStoreWithOut } from '@/store/modules/projectSetting'

const canvasState = useCanvasState()
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
