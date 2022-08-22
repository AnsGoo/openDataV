<template>
  <div
    draggable="true"
    @dragstart="handleDragStart($event, index)"
    @drop="handleDrop($event, index)"
    @dragover="handleDragOver($event, index, true)"
    v-contextmenu="contextmenus"
  >
    <div v-if="component.component === 'Group'" class="layer">
      <span v-show="mode === 'expand'">{{ component.name || '分组' }}</span>
      <icon-park name="preview-open" size="24" v-if="component.display" />
      <icon-park name="preview-close-one" size="24" v-else />
    </div>
    <div v-else class="layer">
      <span v-show="mode === 'expand'">{{ component.name }}</span>
      <icon-park size="24" name="preview-open" v-if="component.display" />
      <icon-park size="24" name="preview-close-one" v-else />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { eventBus } from '@/bus/useEventBus'
import { useBasicStoreWithOut } from '@/store/modules/basic'
import { ContextmenuItem } from '@/plugins/directive/contextmenu/types'
import { BaseComponent } from '@/resource/models'

const props = withDefaults(
  defineProps<{
    component: BaseComponent
    index: string
    activeKey?: string
    mode?: string
    contextmenus: () => ContextmenuItem[]
  }>(),
  {
    mode: 'expand'
  }
)

const emits = defineEmits<{ (e: 'select', index: string): void }>()
const basicStore = useBasicStoreWithOut()

const handleDragStart = (event: DragEvent, index: string) => {
  // event.preventDefault()
  event.dataTransfer?.setData('compomentIndex', index)
  event.stopPropagation()
}

const handleDragOver = (event: DragEvent, index: string, isEmit = false) => {
  event.preventDefault()
  event.stopPropagation()
  if (isEmit && index !== props.activeKey) {
    eventBus.emit('ActiveMenu', index)
  }
}

const handleDrop = (event: DragEvent, index: string) => {
  event.preventDefault()
  event.stopPropagation()
  const compomentIndex: string = event.dataTransfer?.getData('compomentIndex') as string
  const toIndex: string = calcDragIndex(compomentIndex, index)

  const indexs: number[] = compomentIndex.split('-').map((i) => Number(i))
  const cutComponent: Optional<BaseComponent> = basicStore.getComponentByIndex(indexs)
  const compoment: Optional<BaseComponent> = basicStore.cutComponent(
    indexs[indexs.length - 1],
    cutComponent?.parent
  )
  if (compoment && toIndex) {
    const toIndexs: number[] = compomentIndex.split('-').map((i) => Number(i))
    const insertComponent: Optional<BaseComponent> = basicStore.getComponentByIndex(toIndexs)
    basicStore.insertComponent(toIndexs[toIndexs.length - 1], compoment, insertComponent)
    emits('select', index)
  }
}
const calcDragIndex = (fromIndex: string, toIndex: string): string => {
  const fromIndexs: number[] = fromIndex.split('-').map((el: string) => parseInt(el))
  const toIndexs: number[] = toIndex.split('-').map((el: string) => parseInt(el))
  const fromLength: number = fromIndexs.length
  for (let i = 0; i < fromLength; i++) {
    if (fromIndexs[i] === toIndexs[i]) {
      continue
    } else if (fromIndexs[i] > toIndexs[i]) {
      return toIndex
    } else if (fromIndexs[i] < toIndexs[i]) {
      if (i + 1 == fromLength) {
        toIndexs[i] = toIndexs[i] - 1
        return toIndexs.join('-')
      } else {
        return toIndex
      }
    }
  }
  return toIndex
}
</script>

<style lang="less" scoped>
.layer {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-content: center;
  justify-content: space-between;
  align-items: center;
}
</style>
