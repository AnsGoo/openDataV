<template>
  <div v-if="!editMode" class="group">
    <template v-for="item in component.subComponents" :key="item.id">
      <component
        :is="item.component"
        :id="'component' + item.id"
        class="component"
        :style="getComponentStyle(item)"
        :component="item"
      />
    </template>
  </div>
  <div v-else class="group" :class="{ dotted: isActive }">
    <template v-for="(item, i) in component.subComponents" :key="item.id">
      <Shape
        v-if="isShow(item.display)"
        :id="'shape' + item.id"
        :defaultStyle="item.style"
        :style="getShapeStyle(item)"
        :active="item.id === (curComponent || {}).id"
        :info="item"
        :class="{ lock: item.locked }"
        :isInner="true"
        :index="i"
      >
        <component
          :is="item.component"
          :id="'component' + item.id"
          class="component"
          :style="getInnerComponentShapeStyle(item)"
          :component="item"
        />
      </Shape>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import type { CustomComponent } from '@/models'
import { filterStyle, getComponentStyle, getInnerComponentShapeStyle } from '@/utils/utils'

import Shape from '../../Editor/Shape'
import useCanvasState from '../../state/canvas'

const props = defineProps<{
  component: CustomComponent
}>()

const canvasState = useCanvasState()
const editMode = computed<boolean>(() => canvasState.isEditMode)

const curComponent = computed(() => canvasState.curComponent)
const isActive = computed(() => {
  let curComponent = canvasState.curComponent
  while (curComponent) {
    if (curComponent.parent?.id === props.component.id) {
      return true
    }
    curComponent = curComponent.parent
  }

  return false
})

const isShow = (display: boolean): boolean => {
  return !(canvasState.isEditMode && display === false)
}
const getShapeStyle = (item: CustomComponent) => {
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
  }
}
.component {
  position: absolute;
}

.dotted {
  outline: 1px dotted #70c0ff;
}
</style>
