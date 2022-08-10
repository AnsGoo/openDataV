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
    <span style="color: red">ED</span>
    <template v-for="(item, index) in subComponents" :key="item.id">
      <Shape
        :id="'shape' + item.id"
        :defaultStyle="item.style"
        :style="getShapeStyle(item.groupStyle)"
        :active="item.id === (curComponent || {}).id"
        :info="item"
        :index="index.toString()"
        :class="{ lock: item.isLock }"
        v-if="basicStore.isEditMode && item.display"
      >
        <component
          class="component"
          :is="item.component"
          :style="getInnerComponentShapeStyle(item)"
          :propValue="item.propValue"
          :componentId="item.id"
          :id="'component' + item.id"
          :subComponents="item.subComponents"
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
  }>(),
  {
    subComponents: () => []
  }
)

const curComponent = computed(() => basicStore.curComponent)
const isShow = (display: boolean): boolean => {
  return !(basicStore.isEditMode && display === false)
}
const getShapeStyle = (style) => {
  return filterStyle(style, ['gtop', 'gleft', 'gwidth', 'gheight', 'grotate'])
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
