<template>
  <div>
    <div class="px-4">
      <OInput @change="search" />
    </div>
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
  </div>
</template>
<script lang="ts" setup>
import { OInput, OTabPane, OTabs } from '@open-data-v/ui'
import { cloneDeep, throttle } from 'lodash-es'
import { computed, ref } from 'vue'

import type { IComponentItem } from '../type'
import ComponentCard from './component-card.vue'

const props = defineProps<{
  components: Array<IComponentItem>
}>()

const searchValue = ref('')
const componentList = computed<Array<IComponentItem>>(() => {
  const cards = cloneDeep(props.components).filter((el) => el.children && el.children.length > 0)
  cards.forEach((el) => {
    el.children = el.children!.filter((item) =>
      item.name.toLocaleLowerCase().includes((searchValue.value || '').toLocaleLowerCase())
    )
  })
  return cards.filter((el) => el.children && el.children.length > 0)
})
const search = throttle((e) => {
  searchValue.value = e
}, 300)
</script>
