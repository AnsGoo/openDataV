<template>
  <RestPanel :slotter="slotter">
    <DataViewSlot />
  </RestPanel>
</template>

<script lang="ts" setup>
import type { Slotter } from '@open-data-v/base'
import { RestPanel } from '@open-data-v/data'

import DataViewSlot from './DynamicExtendContent.vue'

defineProps<{
  slotter: Slotter
}>()
</script>
