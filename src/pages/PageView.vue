<template>
  <Previewer ref="viewer" />
</template>

<script setup lang="ts">
/* eslint-disable-next-line @typescript-eslint/consistent-type-imports */
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { getPageApi } from '@/api/pages'
import type { Previewer } from '@/designer'
import { Logger } from '@/utils/utils'

const viewer = ref<InstanceType<typeof Previewer> | null>(null)

const route = useRoute()
const router = useRouter()

const initComponents = async (index: string): Promise<void> => {
  Logger.log('加载通用组件')
  try {
    const resp = await getPageApi(index)
    if (resp.data) {
      viewer.value!.setLayoutData(resp.data)
    }
  } catch (e: any) {
    await router.push({
      name: 'Error'
    })
  }
}
onMounted(async () => {
  // 如果是首页
  await initComponents(route.params.index as string)
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
