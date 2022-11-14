<template>
  <div class="dv-tabs">
    <div class="tabs-nav">
      <div
        v-for="(item, index) in labels"
        :key="index"
        class="tabs-tab"
        :class="{ active: getShow(index) }"
        @click="tabsClick(index)"
      >
        {{ item }}
      </div>
    </div>
    <div ref="content" class="tabs-content" @drop="handleDrop" @dragover="handleDragOver">
      <component
        :is="item.component"
        v-for="(item, index) in contents"
        :id="'component' + item.id"
        :key="index"
        class="component"
        :style="getComponentStyle(item)"
        :component="item"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue'
import { getComponentStyle } from '@/utils/utils'
import type TabsComponent from './config'
import type { Tabs } from './type'
import { useProp } from '@/resource/hooks'
import type { BaseComponent } from '@/resource/models'
import { componentList } from '@/designer/load'
import { useBasicStoreWithOut } from '@/store/modules/basic'
import { DataIntegrationMode } from '@/resource/models/data'

const props = defineProps<{
  component: TabsComponent
}>()

const basicStore = useBasicStoreWithOut()
const { propValue } = useProp<Tabs>(props.component)
const labels = computed<Array<string>>(() => propValue.label.items)
const content = ref<HTMLElement | null>(null)

const activeKey = ref<string>('tab-1')

const tabsClick = (index: number) => {
  console.log('activeKey', 'tab-' + (index + 1))
  activeKey.value = 'tab-' + (index + 1)
}
const getShow = (index: number) => {
  return activeKey.value === 'tab-' + (index + 1)
}

const contents = computed<Array<BaseComponent>>(() => {
  return props.component.items[activeKey.value] || []
})

const handleDragOver = (e) => {
  e.preventDefault()
  e.dataTransfer.dropEffect = 'copy'
}

const handleDrop = async (e) => {
  e.preventDefault()
  e.stopPropagation()
  const componentName = e.dataTransfer.getData('componentName')
  if (componentName) {
    const component: BaseComponent = new componentList[componentName]()
    if (component.dataIntegrationMode === DataIntegrationMode.UNIVERSAL) {
      component.loadDemoData()
    }
    const editorRectInfo = content.value!.getBoundingClientRect()
    const y = (e.pageY - editorRectInfo.top) / basicStore.scale
    const x = (e.pageX - editorRectInfo.left) / basicStore.scale
    component.change('top', y)
    component.change('left', x)
    props.component.setItem(activeKey.value, component)
  }
}
</script>

<style lang="less" scoped>
.dv-tabs {
  display: flex;
  flex-direction: column;
  align-content: center;
  .tabs-nav {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-content: center;
    justify-content: space-between;
    align-items: center;
    .tabs-tab {
      font-size: 14px;
      line-height: 40px;
      width: 100%;
      text-align: center;
      border-bottom: 2px solid;
    }
    .tabs-tab.active {
      color: #2080f0;
      border-bottom: #2080f0 2px solid;
    }
  }
  .tabs-content {
    border-bottom: 1px solid;
    flex: 1;
    width: 100%;

    .component {
      position: absolute;
    }
  }
}
</style>
