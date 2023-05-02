<template>
  <Designer ref="designer" />
</template>

<script setup lang="ts">
/* eslint-disable-next-line @typescript-eslint/consistent-type-imports */
import { Designer } from '@/designer'
import { onMounted, ref } from 'vue'
import { getPageApi } from '@/api/pages'
import { useRoute } from 'vue-router'

const route = useRoute()
const designer = ref<InstanceType<typeof Designer> | null>(null)

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
</script>
