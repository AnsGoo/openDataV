<template>
  <RestView :curComponent="curComponent">
    <DataViewSlot />
  </RestView>
</template>

<script lang="ts" setup>
import RestView from '@/apiView/DynamicData/View.vue'
import type { CustomComponent } from '@/models'

import DataViewSlot from './DynamicExtendView.vue'

defineProps<{
  curComponent?: CustomComponent
}>()
</script>
