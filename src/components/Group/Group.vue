<template>
  <div class="group" v-if="!editMode">
    <template v-for="item in component.subComponents" :key="item.id">
      <component
        class="component"
        :is="item.component"
        :style="getComponentStyle(item)"
        :component="item"
        :id="'component' + item.id"
      />
    </template>
  </div>
  <div class="group" :class="{ dotted: isActive }" v-else>
    <template v-for="(item, i) in component.subComponents" :key="item.id">
      <Shape
        :id="'shape' + item.id"
        :defaultStyle="item.style"
        :style="getShapeStyle(item)"
        :active="item.id === (curComponent || {}).id"
        :info="item"
        :class="{ lock: item.locked }"
        :isInner="true"
        :index="i"
        v-if="isShow(item.display)"
      >
        <component
          class="component"
          :is="item.component"
          :style="getInnerComponentShapeStyle(item)"
          :component="item"
          :id="'component' + item.id"
        />
      </Shape>
    </template>
  </div>
</template>

<script setup lang="ts">
import { useBasicStoreWithOut } from '@/store/modules/basic'
import { filterStyle, getComponentStyle, getInnerComponentShapeStyle } from '@/utils/utils'
import Shape from '@/designer/Editor/Shape'
import { computed } from 'vue'
import type { BaseComponent } from '@/resource/models'

const props = defineProps<{
  component: BaseComponent
}>()

const editMode = computed<boolean>(() => basicStore.isEditMode)
const basicStore = useBasicStoreWithOut()

const curComponent = computed(() => basicStore.curComponent)
const isActive = computed(() => {
  let curComponent = basicStore.curComponent
  while (curComponent) {
    if (curComponent.parent?.id === props.component.id) {
      return true
    }
    curComponent = curComponent.parent
  }

  return false
})

const isShow = (display: boolean): boolean => {
  return !(basicStore.isEditMode && display === false)
}
const getShapeStyle = (item: BaseComponent) => {
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
