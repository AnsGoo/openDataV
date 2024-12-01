<template>
  <RestPanel :slotter="slotter" :handler="handler">
    <DataViewSlot />
  </RestPanel>
</template>

<script lang="ts" setup>
import type { DataHandler, Slotter } from '@open-data-v/base'
import { RestPanel } from '@open-data-v/data'

import DataViewSlot from './DynamicExtendContent.vue'

defineProps<{
  slotter: Slotter
  handler: DataHandler
}>()
</script>
