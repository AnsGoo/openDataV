<template>
  <div
    draggable="true"
    @dragstart="handleDragStart($event, index)"
    @drop="handleDrop($event, index)"
    @dragover="handleDragOver($event, index, true)"
    v-contextmenu.stop="contextmenus"
  >
    <div v-if="component.component === 'Group'" class="layer">
      <span v-show="mode === 'expand'">{{ component.name || '分组' }}</span>
      <icon-park name="preview-open" size="15" v-if="component.display" />
      <icon-park name="preview-close-one" size="15" v-else />
    </div>
    <div v-else class="layer">
      <span v-show="mode === 'expand'">{{ component.name }}</span>
      <icon-park size="15" name="preview-open" v-if="component.display" />
      <icon-park size="15" name="preview-close-one" v-else />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { eventBus, StaticKey } from '@/bus'
import { useBasicStoreWithOut } from '@/store/modules/basic'
import { ContextmenuItem } from '@/plugins/directive/contextmenu/types'
import { BaseComponent } from '@/resource/models'
import { cloneDeep } from 'lodash-es'
import { diffIndex } from '@/utils/utils'

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
    eventBus.emit(StaticKey.ACTIVE_MENU, index)
  }
}

const handleDrop = (event: DragEvent, toIndex: string) => {
  event.preventDefault()
  event.stopPropagation()
  const fromIndex: string = event.dataTransfer?.getData('compomentIndex') as string
  const isDragAble = diffIndex(fromIndex, toIndex)
  if (!isDragAble) return
  const indexs: number[] = fromIndex.split('-').map((i) => Number(i))
  const cutCompoment: Optional<BaseComponent> = basicStore.getComponentByIndex(indexs)
  const inCompoment = cloneDeep(cutCompoment)
  const toIndexs: number[] = toIndex.split('-').map((i) => Number(i))
  const toComponent: Optional<BaseComponent> = basicStore.getComponentByIndex(toIndexs)

  if (inCompoment && toComponent && toIndex) {
    const toComponentid: string = toComponent.id
    basicStore.cutComponent(indexs[indexs.length - 1], cutCompoment?.parent)
    const parent = toComponent.parent || undefined
    const data = parent ? parent.subComponents : basicStore.componentData
    const newToIndex = data.findIndex((el) => el.id === toComponentid)
    basicStore.insertComponent(newToIndex!, inCompoment!, parent)
    emits('select', toIndex)
  }
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
