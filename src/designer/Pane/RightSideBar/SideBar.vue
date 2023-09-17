<template>
  <div v-if="iscollapsed">
    <o-tabs
      v-if="curComponent"
      v-model:value="activeKey"
      type="line"
      animated
      justify-content="center"
      @update:value="
        (key) => {
          activeKey = key
        }
      "
    >
      <o-tab-pane name="style" display-directive="show:lazy">
        <template #tab>
          <x-icon name="textStyle" />
          <span v-show="!iscollapsed">样式</span>
        </template>
        <div class="attr-list o-scroll">
          <StyleList :curComponent="curComponent" />
        </div>
      </o-tab-pane>
      <o-tab-pane name="attr" display-directive="show:lazy">
        <template #tab>
          <x-icon name="attr" />
          <span v-show="!iscollapsed">属性</span>
        </template>
        <div class="attr-list o-scroll">
          <AttrList :curComponent="curComponent" />
        </div>
      </o-tab-pane>
      <o-tab-pane name="data" display-directive="show:lazy">
        <template #tab>
          <x-icon name="data" />
          <span v-show="!iscollapsed">数据</span>
        </template>
        <div class="attr-list o-scroll">
          <DataList :curComponent="curComponent" />
        </div>
      </o-tab-pane>
    </o-tabs>
    <o-tabs v-else type="line" animated justify-content="center">
      <o-tab-pane name="canvas" display-directive="show:lazy">
        <template #tab>
          <x-icon name="canvas" />
          <span v-show="!iscollapsed">画布</span>
        </template>
        <div class="attr-list">
          <Canvas />
        </div>
      </o-tab-pane>
      <o-tab-pane name="data" display-directive="show:lazy">
        <template #tab>
          <x-icon name="data" />
          <span v-show="!iscollapsed">数据</span>
        </template>
        <div class="attr-list">
          <GlobalData />
        </div>
      </o-tab-pane>
    </o-tabs>
  </div>
  <div v-else>
    <o-menu
      :options="menuOptions"
      :collapsed="!iscollapsed"
      class="h-full o-scroll overflow-auto"
    />
  </div>
</template>

<script setup lang="ts">
import { useCanvasState } from 'open-data-v/designer'
import type { MenuOption } from 'open-data-v/ui'
import { OMenu, OTabPane, OTabs } from 'open-data-v/ui'
import { computed, getCurrentInstance, h, ref } from 'vue'

import AttrList from './AttrModule'
import Canvas from './CanvasModules/Canvas.vue'
import GlobalData from './CanvasModules/GlobalData'
import DataList from './DataModule'
import StyleList from './StyleModule'
// 右侧属性列表
const instance = getCurrentInstance()
const XIcon = instance!.appContext.components['XIcon']

const activeKey = ref<string>('attr')

const canvasState = useCanvasState()
withDefaults(
  defineProps<{
    iscollapsed: boolean
  }>(),
  { iscollapsed: false }
)

const emits = defineEmits<{
  (e: 'update:iscollapsed', iscollapsed: boolean): void
}>()

const curComponent = computed(() => canvasState.curComponent)
const menuOptions = computed<MenuOption[]>(() => {
  if (canvasState.curComponent) {
    return [
      {
        label: '样式',
        key: '4',
        icon: () =>
          h(XIcon, {
            name: 'textStyle',
            onClick: () => collapsedTabPane('style')
          })
      },
      {
        label: '属性',
        key: '2',
        icon: () =>
          h(XIcon, {
            name: 'attr',
            onClick: () => collapsedTabPane('attr')
          })
      },
      {
        label: '数据',
        key: '3',
        icon: () =>
          h(XIcon, {
            name: 'data',
            onClick: () => collapsedTabPane('data')
          })
      }
    ]
  } else {
    return [
      {
        label: '画布',
        key: '1',
        icon: () =>
          h(XIcon, {
            name: 'canvas',
            onClick: () => collapsedTabPane('canvas')
          })
      },
      {
        label: '数据',
        key: '2',
        icon: () =>
          h(XIcon, {
            name: 'data',
            onClick: () => collapsedTabPane('data')
          })
      }
    ]
  }
})

const collapsedTabPane = (key: string) => {
  emits('update:iscollapsed', true)
  activeKey.value = key
}
</script>
<style scoped>
@import 'open-data-v/css/index.less';
.attr-list {
  @apply overflow-auto p-1 pt-0;
  backdrop-filter: blur(50px);
  height: calc(90vh - 28px);
}
</style>
