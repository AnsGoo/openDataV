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

    <div v-show="display" class="mx-1 h-full border border-slate-300" style="width: 300px">
      <div class="flex justify-between">
        <span class="text-xl font-bold">组件</span>
        <span class="text-xl font-bold" @click="display = false">
          <XIcon name="closeOne" />
        </span>
      </div>
      <div class="px-4">
        <OSelect option="[{}]" />
      </div>
      <o-tabs>
        <o-tab-pane label="基础组件">
          <div class="flex flex-wrap">
            <div v-for="(item, index) in props.components" :key="index" class="m-2 text-center">
              <component :is="item.component" class="hover:scale-110" />
            </div>
          </div>
        </o-tab-pane>
        <o-tab-pane label="低码组件">
          <div class="flex flex-wrap">
            <div v-for="(item, index) in props.components" :key="index" class="m-2 text-center">
              <component :is="item.component" class="hover:scale-110" />
            </div>
          </div>
        </o-tab-pane>
      </o-tabs>
      <!-- <OCard title="测试" class="w-full h-full" /> -->
    </div>
  </div>
</template>
<script setup lang="ts">
import { OCard, OSelect, OTabPane, OTabs } from '@open-data-v/ui'
import { getCurrentInstance, h, ref } from 'vue'

const instance = getCurrentInstance()
const XIcon = instance!.appContext.components['XIcon']
const display = ref(false)

const props = defineProps<{
  components: Array<any>
}>()

const allComponents = ref([])

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

function openPanel(name: string) {
  display.value = true
}
</script>
