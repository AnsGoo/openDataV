<!-- TODO: 这个页面后续将用 JSX 重构 -->
<template>
  <div class="attr-list">
    <Container :config="styleKeys" :data="formData" :mode="mode" @change="changed" />
  </div>
</template>

<script setup lang="ts">
import { cloneDeep, debounce } from 'lodash-es'
import { computed, ref, watch } from 'vue'

import Container from '@/designer/modules/form/Container'
import useCanvasState from '@/designer/state/canvas'
import type { ContainerType } from '@/enum'
import type { CustomComponent } from '@/models'
import type { ComponentStyle, MetaContainerItem } from '@/types/component'

const props = defineProps<{
  curComponent: CustomComponent
}>()
const canvasState = useCanvasState()
const mode = computed<ContainerType>(() => props.curComponent.defaultViewType)

const formData = ref<ComponentStyle>({ ...props.curComponent.style })
const styleKeys = computed<Array<MetaContainerItem>>(() => {
  if (props.curComponent) {
    return props.curComponent.styleFormValue
  }
  return []
})

// 样式页面改变，修改当前组件的样式：curComponent.style
const changed = debounce((keys: Array<string>, val: any) => {
  if (props.curComponent) {
    const locationKeys = ['top', 'left', 'width', 'height', 'rotate']
    if (keys[0] === 'position' && locationKeys.includes(keys[1])) {
      const parentComponent = props.curComponent.parent
      // key as 'top' | 'left' | 'width' | 'height' | 'rotate'
      canvasState.syncComponentLocation({ [keys[1]]: val as number }, parentComponent, true)
      if (parentComponent) {
        canvasState.resizeAutoComponent(parentComponent)
      }
    } else {
      canvasState.setCurComponentStyle(keys, val)
    }
  }
}, 300)

watch(
  () => props.curComponent.id,
  () => {
    if (props.curComponent && props.curComponent.id) {
      formData.value = cloneDeep(props.curComponent.style)
    }
  },
  { immediate: true, deep: true }
)

const updatePositionStyle = debounce(() => {
  Object.assign(formData.value, props.curComponent.positionStyle)
}, 200)

watch(
  () => props.curComponent.positionStyle,
  () => {
    if (props.curComponent && props.curComponent.id) {
      updatePositionStyle()
    }
  },
  { deep: true }
)
</script>

<style scoped>
.attr-list {
  @apply overflow-auto p-1 pt-0 h-full;

  backdrop-filter: blur(50px);
  margin-right: 10px;
}
</style>
