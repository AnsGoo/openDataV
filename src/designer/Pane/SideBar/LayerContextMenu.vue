<template>
  <div v-show="display" class="contextmenu" :style="{ top: menuTop + 'px', left: menuLeft + 'px' }">
    <ul>
      <li @click="deleteComponent(index)">删除</li>
      <li @click="topComponent(index)">置顶</li>
      <li @click="bottomComponent(index)">置底</li>
      <li @click="upComponent(index)">上一层</li>
      <li @click="downComponent(index)">下一层</li>
      <li @click="copyComponent(index)">复制</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useBasicStoreWithOut } from '@/store/modules/basic'
import { useSnapShotStoreWithOut } from '@/store/modules/snapshot'
import { swap, copyText } from '@/utils/utils'
import type { ComponentInfo } from '@/types/component'
import { Message } from '@/utils/message'
import { useCopyStoreWithOut } from '@/store/modules/copy'

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
const snapShotStore = useSnapShotStoreWithOut()

const deleteComponent = (index: string) => {
  const indexs: number[] = index.split('-').map((i) => Number(i))
  const myindex: number = indexs.pop() as number
  const fatherComponentData: Array<ComponentInfo> | undefined = getFatherComponentData(indexs)
  if (fatherComponentData) {
    snapShotStore.recordSnapshot()
    fatherComponentData.splice(myindex, 1)
  }
  emits('update:display', false)
}

const copyComponent = (index: string) => {
  const indexs: number[] = index.split('-').map((i) => Number(i))
  const myindex: number = indexs.pop() as number
  const fatherComponentData: Array<ComponentInfo> | undefined = getFatherComponentData(indexs)
  if (fatherComponentData) {
    const componentInfo: ComponentInfo = fatherComponentData[myindex]
    copyText(JSON.stringify(componentInfo))
    copyStore.copy()
  }
  emits('update:display', false)
}

const downComponent = (index: string) => {
  const indexs: number[] = index.split('-').map((i) => Number(i))
  const myindex: number = indexs.pop() as number
  const fatherComponentData: Array<ComponentInfo> | undefined = getFatherComponentData(indexs)
  if (fatherComponentData) {
    if (myindex > 0) {
      snapShotStore.recordSnapshot()
      swap(fatherComponentData, myindex, myindex - 1)
    } else {
      Message('图层已经到底了')
    }
  }
  emits('update:display', false)
}

const upComponent = (index: string) => {
  const indexs: number[] = index.split('-').map((i) => Number(i))
  const myindex: number = indexs.pop() as number
  const fatherComponentData: Array<ComponentInfo> | undefined = getFatherComponentData(indexs)
  if (fatherComponentData) {
    const len: number = fatherComponentData.length
    if (myindex < len - 1) {
      snapShotStore.recordSnapshot()
      swap(fatherComponentData, myindex, myindex + 1)
    } else {
      Message('图层已经到顶了')
    }
  }
  emits('update:display', false)
}

const bottomComponent = (index: string) => {
  const indexs: number[] = index.split('-').map((i) => Number(i))
  const myindex: number = indexs.pop() as number
  const fatherComponentData: Array<ComponentInfo> | undefined = getFatherComponentData(indexs)
  if (fatherComponentData && myindex > 0) {
    snapShotStore.recordSnapshot()
    const myComponments: ComponentInfo[] = fatherComponentData.splice(myindex, 1)
    fatherComponentData.unshift(myComponments[0])
  } else {
    Message('图层已经到底了')
  }
  emits('update:display', false)
}

const topComponent = (index: string) => {
  const indexs: Array<number> = index.split('-').map((i) => Number(i))
  const myindex: number = indexs.pop() as number
  let fatherComponentData: Array<ComponentInfo> | undefined = getFatherComponentData(indexs)
  if (fatherComponentData) {
    const len: number = fatherComponentData.length
    if (myindex < len - 1) {
      snapShotStore.recordSnapshot()
      const myComponments: ComponentInfo[] = fatherComponentData.splice(myindex, 1)
      fatherComponentData.push(myComponments[0])
    } else {
      Message('图层已经到顶了')
    }
  }
  emits('update:display', false)
}

const getFatherComponentData = (indexs: number[]) => {
  let rootComponent: ComponentInfo = {
    subComponents: basicStore.componentData,
    component: '',
    style: {
      width: 0,
      height: 0,
      left: 0,
      top: 0,
      rotate: 0
    },
    id: '',
    label: '',
    icon: ''
  }
  indexs.forEach((el: number) => {
    rootComponent = rootComponent.subComponents ? rootComponent.subComponents[el] : rootComponent
  })
  const fatherComponentData: Array<ComponentInfo> | undefined = rootComponent.subComponents
  return fatherComponentData
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
