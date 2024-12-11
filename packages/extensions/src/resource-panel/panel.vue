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

    <div v-show="display" class="mx-1 h-full" style="width: 300px">
      <OCard title="测试" class="w-full h-full" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { OCard } from '@open-data-v/ui'
import { getCurrentInstance, h, ref } from 'vue'

const instance = getCurrentInstance()
const XIcon = instance!.appContext.components['XIcon']
const display = ref(false)

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
  console.log(name)
  display.value = true
}
</script>
