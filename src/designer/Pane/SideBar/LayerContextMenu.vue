<template>
  <div v-show="display" class="contextmenu" :style="{ top: menuTop + 'px', left: menuLeft + 'px' }">
    <ul>
      <li @click="deleteComponent(index)">删除</li>
      <li @click="topComponent(index)">置顶</li>
      <li @click="bottomComponent(index)">置底</li>
      <li @click="upComponent(index)">上一层</li>
      <li @click="downComponent(index)">下一层</li>
      <li @click="copyComponent(index)">复制</li>
      <li @click="changeComponentDisplay(index)" v-if="basicStore.layerComponent">
        {{ isDisplay ? '隐藏' : '显示' }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useBasicStoreWithOut } from '@/store/modules/basic'
import { copyText } from '@/utils/utils'
import type { ComponentInfo } from '@/types/component'
import { useCopyStoreWithOut } from '@/store/modules/copy'
import { computed } from 'vue'

defineProps<{
  menuTop: number
  menuLeft: number
  index: string
  display: boolean
}>()

const emits = defineEmits<{
  (e: 'update:display', value: boolean): void
}>()

const copyStore = useCopyStoreWithOut()
const basicStore = useBasicStoreWithOut()

const deleteComponent = async (index: string) => {
  basicStore.removeComponent(index)
  emits('update:display', false)
}

const isDisplay = computed<boolean>(() => basicStore.layerComponent?.display || false)

const copyComponent = (index: string) => {
  const indexs: number[] = index.split('-').map((i) => Number(i))
  const myindex: number = indexs.pop() as number
  const fatherComponentData: Array<ComponentInfo> | undefined =
    basicStore.getParentComponentData(indexs)
  if (fatherComponentData) {
    const componentInfo: ComponentInfo = fatherComponentData[myindex]
    copyText(JSON.stringify(componentInfo))
    copyStore.copy()
  }
  emits('update:display', false)
}

const downComponent = async (index: string) => {
  basicStore.downComponent(index)
  emits('update:display', false)
}

const upComponent = async (index: string) => {
  basicStore.upComponent(index)
  emits('update:display', false)
}

const bottomComponent = async (index: string) => {
  basicStore.bottomComponent(index)
  emits('update:display', false)
}

const topComponent = async (index: string) => {
  basicStore.topComponent(index)
  emits('update:display', false)
}

const changeComponentDisplay = (index: string) => {
  if (!isDisplay.value) {
    basicStore.showComponent(index)
  } else {
    basicStore.hiddenComponent(index)
  }
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
