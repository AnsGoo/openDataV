<template>
  <IconPark
    draggable="true"
    @dragstart="handleDragStart($event, index)"
    @drop="handleDrop($event, index)"
    @dragover="handleDragOver($event, index, true)"
    v-contextmenu.stop="contextmenus"
    :name="name"
  />
</template>

<script lang="ts" setup>
import { eventBus, StaticKey } from '@/bus'
import { useBasicStoreWithOut } from '@/store/modules/basic'
import { ContextmenuItem } from '@/plugins/directive/contextmenu/types'
import { BaseComponent } from '@/resource/models'

const props = withDefaults(
  defineProps<{
    component: BaseComponent
    index: string
    activeKey?: string
    mode?: string
    name: string
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
    eventBus.emit(StaticKey.ACTIVE_MENU, index)
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
.iconfont {
  @apply mr-1 text-xl;
}
</style>
