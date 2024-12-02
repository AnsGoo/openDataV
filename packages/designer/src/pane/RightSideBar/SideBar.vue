<template>
  <div class="right o-scroll">
    <Toggle
      :x="rightWidth"
      location="right"
      :direction="rightDreiction"
      @click="collapsedRight = !collapsedRight"
    />
    <div v-if="collapsedRight">
      <o-tabs
        v-if="curComponent"
        v-model:value="activeKey"
        :style="{ width: rightWidth }"
        @update:value="
          (key) => {
            activeKey = key
          }
        "
      >
        <o-tab-pane name="style">
          <template #label>
            <div class="flex-nowrap flex flex-row items-center">
              <x-icon name="textStyle" class="inline-block" />
              <span v-show="collapsedRight" class="inline-block">样式</span>
            </div>
          </template>
          <div class="attr-list o-scroll">
            <StyleList :curComponent="curComponent" />
          </div>
        </o-tab-pane>
        <o-tab-pane name="attr">
          <template #label>
            <div class="flex-nowrap flex flex-row items-center">
              <x-icon name="attr" class="inline-block" />
              <span v-show="collapsedRight" class="inline-block">属性</span>
            </div>
          </template>
          <div class="attr-list o-scroll">
            <AttrList :curComponent="curComponent" />
          </div>
        </o-tab-pane>
        <o-tab-pane name="data">
          <template #label>
            <div class="flex-nowrap flex flex-row items-center">
              <x-icon name="data" class="inline-block" />
              <span v-show="collapsedRight" class="inline-block">数据</span>
            </div>
          </template>
          <div class="attr-list o-scroll">
            <DataList :curComponent="curComponent" />
          </div>
        </o-tab-pane>
      </o-tabs>
      <o-tabs
        v-else
        v-model:value="canvasActiveKey"
        @update:value="
          (key) => {
            canvasActiveKey = key
          }
        "
      >
        <o-tab-pane name="canvas">
          <template #label>
            <div class="flex-nowrap flex flex-row items-center">
              <x-icon name="canvas" />
              <span v-show="collapsedRight">画布</span>
            </div>
          </template>
          <div class="attr-list">
            <Canvas />
          </div>
        </o-tab-pane>
        <o-tab-pane name="data">
          <template #label>
            <div class="flex-nowrap flex flex-row items-center">
              <x-icon name="data" />
              <span v-show="collapsedRight">数据</span>
            </div>
          </template>
          <div class="attr-list">
            <GlobalData />
          </div>
        </o-tab-pane>
      </o-tabs>
    </div>
    <div v-else>
      <div
        v-for="(item, index) in menuOptions"
        :key="index"
        class="h-full o-scroll overflow-auto flex flex-nowrap flex-col"
      >
        <div class="m-2 text-center">
          <component :is="item.icon" class="hover:scale-110" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { OTabPane, OTabs } from '@open-data-v/ui'
import { computed, getCurrentInstance, h, ref } from 'vue'

import { Toggle } from '../../components'
import { useCanvasState } from '../../state'
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

const emits = defineEmits<{
  (e: 'update:iscollapsed', iscollapsed: boolean): void
}>()
const collapsedRight = ref(true)
const rightWidth = computed<string>(() => (collapsedRight.value ? '18rem' : '4rem'))
const rightDreiction = computed<'left' | 'right'>(() => (collapsedRight.value ? 'right' : 'left'))
const curComponent = computed(() => canvasState.activeComponent)

const canvasActiveKey = ref<string>('canvas')
const menuOptions = computed(() => {
  if (canvasState.activeComponent) {
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
<style lang="less" scoped>
@import '../../css/index.less';
.attr-list {
  @apply overflow-auto p-1 pt-0;
  backdrop-filter: blur(50px);
  height: calc(90vh - 28px);
}
.right {
  transition-property: width;
  transition-duration: 0.5s;
  width: v-bind(rightWidth);
  height: 100%;
}
</style>
