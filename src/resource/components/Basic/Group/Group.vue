<template>
  <div class="group" v-if="!editMode">
    <template v-for="item in subComponents" :key="item.id">
      <component
        class="component"
        :is="item.component"
        :style="getComponentStyle(item)"
        :propValue="item.propValue"
        :id="'component' + item.id"
        :componentId="item.id"
        :subComponents="item.subComponents"
        v-if="isShow(item.display)"
      />
    </template>
  </div>
  <div class="group" v-else>
    <template v-for="(item, i) in subComponents" :key="item.id">
      <Shape
        :id="'shape' + item.id"
        :defaultStyle="item.style"
        :style="getShapeStyle(item)"
        :active="item.id === (curComponent || {}).id"
        :info="item"
        :index="`${index}-${i.toString()}`"
        :class="{ lock: item.isLock }"
        :isInner="true"
        v-if="isShow(item.display)"
      >
        <component
          class="component"
          :is="item.component"
          :style="getInnerComponentShapeStyle(item)"
          :propValue="item.propValue"
          :componentId="item.id"
          :id="'component' + item.id"
          :subComponents="item.subComponents"
          :index="`${index}-${i.toString()}`"
        />
      </Shape>
    </template>
  </div>
</template>

<script setup lang="ts">
import type { ComponentInfo } from '@/types/component'
import { useBasicStoreWithOut } from '@/store/modules/basic'
import { filterStyle, getComponentStyle, getInnerComponentShapeStyle } from '@/utils/utils'
import Shape from '@/designer/Editor/Shape.vue'
import { computed } from 'vue'
const editMode = computed<boolean>(() => basicStore.isEditMode)
const basicStore = useBasicStoreWithOut()
withDefaults(
  defineProps<{
    componentId: string
    subComponents: ComponentInfo[]
    index: string
  }>(),
  {
    subComponents: () => []
  }
)

const curComponent = computed(() => basicStore.curComponent)
const isShow = (display: boolean): boolean => {
  return !(basicStore.isEditMode && display === false)
}
const getShapeStyle = (item: ComponentInfo) => {
  if (item.groupStyle?.gheight) {
    return filterStyle(item.groupStyle, ['gtop', 'gleft', 'gwidth', 'gheight', 'grotate'])
  } else {
    return filterStyle(item.style, ['top', 'left', 'width', 'height', 'rotate'])
  }
}
</script>

<style lang="less" scoped>
.group {
  & > div {
    position: absolute;
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
