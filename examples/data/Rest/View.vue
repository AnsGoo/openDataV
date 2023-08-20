<template>
  <RestPane :slotter="slotter">
    <DataViewSlot />
  </RestPane>
</template>

<script lang="ts" setup>
import type { Slotter } from 'open-data-v/data'
import { RestPane } from 'open-data-v/data/rest'

import DataViewSlot from './DynamicExtendView.vue'

defineProps<{
  slotter: Slotter
}>()
</script>
