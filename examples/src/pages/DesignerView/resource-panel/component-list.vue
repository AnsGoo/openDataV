<template>
  <div>
    <o-tabs>
      <o-tab-pane label="原子组件">
        <component-card v-for="item in componentList" :key="item.key" :component-item="item" />
      </o-tab-pane>
      <o-tab-pane label="复合组件">
        <div class="flex flex-wrap">
          <div v-for="(item, index) in props.components" :key="index" class="m-2 text-center">
            {{ item.name }}
          </div>
        </div>
      </o-tab-pane>
    </o-tabs>
    <!-- <OCard title="测试" class="w-full h-full" /> -->
  </div>
</template>
<script lang="ts" setup>
import { OTabPane, OTabs } from '@open-data-v/ui'
import { computed } from 'vue'

import ComponentCard from './component-card.vue'
import type { IComponentItem } from './type'

const props = defineProps<{
  components: Array<IComponentItem>
}>()

const componentList = computed(() =>
  props.components.filter((el) => el.children && el.children.length > 0)
)
</script>
