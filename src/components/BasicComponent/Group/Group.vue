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
          :element="item"
          :subComponents="item.subComponents"
        />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ComponentInfo } from '@/types/component'
import { useBasicStoreWithOut } from '@/store/modules/basic'
import { getGroupStyle, getStyle } from '@/utils/utils'
const basicStore = useBasicStoreWithOut()
withDefaults(
  defineProps<{
    subComponents: ComponentInfo[]
  }>(),
  {
    subComponents: () => []
  }
)

const isLayerActive = (id: string) => {
  if (basicStore.layerComponent) {
    return basicStore.layerComponent.id === id
  }
  return false
}

const getComponentStyle = (item: ComponentInfo) => {
  return {
    ...getStyle(item.style, ['top', 'left', 'width', 'height', 'rotate']),
    ...getGroupStyle(item.groupStyle || {})
  }
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
