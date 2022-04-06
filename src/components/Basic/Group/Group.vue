<template>
  <div class="group">
    <div>
      <template v-for="item in subComponents" :key="item.id">
        <component
          class="component"
          :class="{ active: isLayerActive(item.id as string) }"
          :is="item.component"
          :style="getComponentStyle(item)"
          :propValue="item.propValue"
          :id="'component' + item.id"
          :componentId="item.id"
          v-if="isShow(item.display)"
          :subComponents="item.subComponents"
        />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ComponentInfo } from '@/types/component'
import { useBasicStoreWithOut } from '@/store/modules/basic'
import { getComponentStyle } from '@/utils/utils'
const basicStore = useBasicStoreWithOut()
withDefaults(
  defineProps<{
    componentId: string
    subComponents: ComponentInfo[]
  }>(),
  {
    subComponents: () => []
  }
)
const isShow = (display: boolean): boolean => {
  return !(basicStore.isEditMode && display === false)
}
const isLayerActive = (id: string) => {
  if (basicStore.layerComponent) {
    return basicStore.layerComponent.id === id
  }
  return false
}
</script>

<style lang="less" scoped>
.group {
  & > div {
    position: relative;
    width: 100%;
    height: 100%;
    // pointer-events: none;

    .component {
      position: absolute;
    }

    .active {
      @apply select-none;

      outline: 1px solid red;
    }
  }
}
</style>
