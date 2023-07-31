<template>
  <RestView :slotter="slotter">
    <DataViewSlot />
  </RestView>
</template>

<script lang="ts" setup>
import RestView from 'open-data-v/apiView/rest/View.vue'
import type { Slotter } from 'open-data-v/apiView/type'

import DataViewSlot from './DynamicExtendView.vue'

defineProps<{
  slotter: Slotter
}>()
</script>
