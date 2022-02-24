<template>
  <div class="contextmenu" :style="{ top: menuTop + 'px', left: menuLeft + 'px' }" v-show="display">
    <ul @mouseup="handleMouseUp">
      <template v-if="curComponent">
        <li @click="copy">复制</li>
        <li @click="paste">粘贴</li>
        <li @click="cut">剪切</li>
        <li @click="deleteComponent">删除</li>
        <li @click="topComponent">置顶</li>
        <li @click="bottomComponent">置底</li>
        <li @click="upComponent">上一层</li>
        <li @click="downComponent">下一层</li>
        <li @click="copyComponentId">复制ID</li>
      </template>
      <li v-else @click="paste">粘贴</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useBasicStoreWithOut } from '@/store/modules/basic'
import { useCopyStoreWithOut } from '@/store/modules/copy'
import { useSnapShotStoreWithOut } from '@/store/modules/snapshot'
import { useLayerStoreWithOut } from '@/store/modules/layer'

import { copyText, pasteText } from '@/utils/utils'
import type { ComponentInfo } from '@/types/component'

const props = defineProps<{
  display: boolean
  menuTop: number
  menuLeft: number
  curComponent: ComponentInfo | undefined
}>()

const emits = defineEmits<{ (event: 'update:display', display: boolean): void }>()

const basicStore = useBasicStoreWithOut()
const copyStore = useCopyStoreWithOut()
const snapShotStore = useSnapShotStoreWithOut()
const layerStore = useLayerStoreWithOut()

// 点击菜单时不取消当前组件的选中状态
const handleMouseUp = () => {
  basicStore.setClickComponentStatus(true)
}

const cut = () => {
  copyStore.cut()
  copyText(JSON.stringify(basicStore.curComponent))
  emits('update:display', false)
}

const copy = () => {
  copyStore.copy()
  copyText(JSON.stringify(basicStore.curComponent))
  emits('update:display', false)
}

const paste = () => {
  snapShotStore.recordSnapshot()
  const textData = pasteText()
  console.log(textData)
  if (textData) {
    const component: ComponentInfo = JSON.parse(textData)
    if ('component' in component) {
      component.style.top = props.menuTop - 82
      component.style.left = props.menuLeft - 258
    }
  } else {
    copyStore.paste(true, props.menuLeft - 258, props.menuTop - 82)
  }

  emits('update:display', false)
}

const deleteComponent = () => {
  snapShotStore.recordSnapshot()
  basicStore.deleteComponent()
  emits('update:display', false)
}

const upComponent = () => {
  snapShotStore.recordSnapshot()
  layerStore.upComponent()
  emits('update:display', false)
}

const downComponent = () => {
  snapShotStore.recordSnapshot()
  layerStore.downComponent()
  emits('update:display', false)
}

const topComponent = () => {
  snapShotStore.recordSnapshot()
  layerStore.topComponent()
  emits('update:display', false)
}

/**
 * 复制组件ID
 */
const copyComponentId = () => {
  if (props.curComponent) {
    let id = props.curComponent.id
    copyText(id as string)
  }
  emits('update:display', false)
}

const bottomComponent = () => {
  layerStore.bottomComponent()
  snapShotStore.recordSnapshot()
  emits('update:display', false)
}
</script>

<style scoped>
@layer components {
  .contextmenu {
    @apply fixed w-20 bg-white rounded-md;

    z-index: 1000;
  }

  ul {
    @apply rounded-sm shadow-lg box-border mx-1.5 my-0 px-1.5 py-0;
  }

  li {
    @apply text-center text-sm px-0 pb-5 relative whitespace-nowrap overflow-hidden overflow-ellipsis text-gray-500 h-8 leading-8 box-border cursor-pointer hover:bg-gray-50;
  }
}
</style>
