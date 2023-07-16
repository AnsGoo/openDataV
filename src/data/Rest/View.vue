<template>
  <RestView :slotter="slotter">
    <DataViewSlot />
  </RestView>
</template>

<script lang="ts" setup>
import RestView from '@/apiView/DynamicData/View.vue'
import type { Slotter } from '@/apiView/type'

import DataViewSlot from './DynamicExtendView.vue'

defineProps<{
  slotter: Slotter
}>()
</script>
