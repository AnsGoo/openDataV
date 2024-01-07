<template>
  <RestPane :slotter="slotter" :handler="handler">
    <DataViewSlot />
  </RestPane>
</template>

<script lang="ts" setup>
import type { DataHandler, Slotter } from 'open-data-v/data'
import { RestPane } from 'open-data-v/data/rest'

import DataViewSlot from './DynamicExtendContent.vue'

defineProps<{
  slotter: Slotter
  handler: DataHandler
}>()
</script>
