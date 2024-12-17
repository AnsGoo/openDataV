<template>
  <div class="h-full flex flex-row">
    <div>
      <div
        v-for="(item, index) in menuOptions"
        :key="index"
        class="o-scroll overflow-auto flex flex-nowrap flex-col"
      >
        <div class="m-2 text-center">
          <component :is="item.icon" class="hover:scale-110" />
        </div>
      </div>
    </div>

    <div
      v-show="display"
      class="mx-1 p-1 h-full border-l dark:border-slate-500"
      style="width: 300px"
    >
      <div class="flex justify-between">
        <span class="text-xl font-bold">{{ panelTitleMap[activePanel] }}</span>
        <span class="text-xl font-bold" @click="display = false">
          <XIcon name="closeOne" />
        </span>
      </div>
      <div class="px-4">
        <OInput />
      </div>
      <ComponentList v-show="activePanel === 'components'" :components="props.components" />
      <Layer v-show="activePanel === 'layer'" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { OInput } from '@open-data-v/ui'
import { getCurrentInstance, h, ref } from 'vue'

import ComponentList from './component-list.vue'
import Layer from './layer/layer.vue'

const instance = getCurrentInstance()
const XIcon = instance!.appContext.components['XIcon']
const display = ref(false)

const props = defineProps<{
  components: Array<any>
}>()

const menuOptions = [
  {
    icon: () =>
      h(XIcon, {
        name: 'components',
        onClick: () => openPanel('components')
      })
  },
  {
    icon: () =>
      h(XIcon, {
        name: 'layers',
        onClick: () => openPanel('layer')
      })
  },
  {
    icon: () =>
      h(XIcon, {
        name: 'api',
        onClick: () => openPanel('api')
      })
  }
]

const activePanel = ref<string>('components')

const panelTitleMap = {
  components: '组件',
  layer: '图层',
  api: 'API'
}

function openPanel(name: string) {
  activePanel.value = name
  display.value = true
}
</script>
