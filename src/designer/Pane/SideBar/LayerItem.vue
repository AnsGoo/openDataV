<template>
  <template v-for="(item, i) in components" :key="i">
    <el-sub-menu
      v-if="item.component === 'Group'"
      :index="caculIndex(i)"
      @contextmenu.prevent="showContextmenu($event as PointerEvent, caculIndex(i))"
    >
      <template #title>
        <span class="icon iconfont icon-zu"></span>
        <span>{{ item.label || '分组' }}</span>
      </template>
      <LayerItem
        v-if="item.subComponents && item.subComponents.length > 0"
        :components="item.subComponents"
        :index="caculIndex(i)"
      />
    </el-sub-menu>
    <el-menu-item
      v-else
      :index="caculIndex(i)"
      @contextmenu.prevent="showContextmenu($event as PointerEvent, caculIndex(i))"
    >
      <template #title>
        <span :class="`icon iconfont ${iconMap[item.group as string]}`"></span>
        <span>{{ item.label }}</span>
      </template>
    </el-menu-item>
  </template>
  <LayerContextMenu
    v-model:display="displayContexyMenu"
    :menuTop="menuTop"
    :menuLeft="menuLeft"
    :index="curIndex"
    ref="contextMenu"
  />
</template>

<script lang="ts" setup>
import type { ComponentInfo } from '@/types/component'
import { ref } from 'vue'
import iconMap from '../icon'
import LayerContextMenu from './LayerContextMenu.vue'
import { ElMenuItem, ElSubMenu } from 'element-plus'

import { onClickOutside } from '@vueuse/core'
const props = defineProps<{
  components: ComponentInfo[]
  index?: string
}>()

const emits = defineEmits<{ (e: 'select', index: string): void }>()
const contextMenu = ref<ElRef>(null)

onClickOutside(contextMenu, () => close())
let displayContexyMenu = ref<boolean>(false)
let menuTop = ref<number>(0)
let menuLeft = ref<number>(0)
let curIndex = ref<string>('')

const caculIndex = (index: number) => {
  let fatherIndex: string | undefined = props.index
  if (fatherIndex) {
    return `${fatherIndex}-${index}`
  } else {
    return index.toString()
  }
}

const close = (): void => {
  displayContexyMenu.value = false
}

const showContextmenu = (event: PointerEvent, index: string) => {
  menuTop.value = event.clientY
  menuLeft.value = event.clientX + 20
  displayContexyMenu.value = false
  event.stopPropagation()
  emits('select', index)
  displayContexyMenu.value = true
  curIndex.value = index
}
</script>
