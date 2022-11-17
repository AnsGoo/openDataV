<template>
  <div class="dv-tabs">
    <div class="tabs-nav">
      <div
        v-for="(item, index) in labels"
        :key="index"
        class="tabs-tab"
        :class="{ active: getShow(index) }"
        :style="labelStyle"
        @click="tabsClick(index)"
      >
        {{ item }}
      </div>
    </div>
    <div v-if="!editMode" ref="content" class="tabs-content">
      <Group
        :id="'component' + content.id"
        class="component"
        :style="getComponentStyle(content)"
        :component="content"
      />
    </div>
    <div v-else ref="contentRef" class="tabs-content" @drop="handleDrop" @dragover="handleDragOver">
      <Shape
        v-if="isShow(content.display)"
        :id="'shape' + content.id"
        :defaultStyle="content.style"
        :style="getShapeStyle(content)"
        :active="content.id === (curComponent || {}).id"
        :info="content"
        :class="{ lock: content.locked }"
        :isInner="true"
        :index="0"
      >
        <Group
          :id="'component' + content.id"
          class="component"
          :style="getInnerComponentShapeStyle(content)"
          :component="content"
        />
      </Shape>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue'
import {
  filterStyle,
  getComponentStyle,
  getInnerComponentShapeStyle,
  toPercent,
  uuid
} from '@/utils/utils'
import type TabsComponent from './config'
import type { Tabs } from './type'
import { useProp } from '@/resource/hooks'
import Shape from '@/designer/Editor/Shape'
import type { BaseComponent } from '@/resource/models'
import { componentList } from '@/designer/load'
import { useBasicStoreWithOut } from '@/store/modules/basic'
import { DataIntegrationMode } from '@/resource/models/data'
import Group from '@/components/Group/Group.vue'
import GroupComponent from '@/components/Group/config'

const props = defineProps<{
  component: TabsComponent
}>()

const basicStore = useBasicStoreWithOut()
const editMode = computed<boolean>(() => basicStore.isEditMode)
const { propValue } = useProp<Tabs>(props.component)
const labels = computed<Array<string>>(() => {
  const len = (propValue.label.items || []).length
  for (let i = 0; i < len; i++) {
    if (!props.component.subComponents[i]) {
      const groupConfig = new GroupComponent(uuid())
      const { top, left, width, height } = props.component.style
      const labelHeight = propValue.style.height
      groupConfig.change('top', top + labelHeight)
      groupConfig.change('left', left)
      groupConfig.change('width', width)
      groupConfig.change('height', height - labelHeight)
      groupConfig.parent = props.component
      groupConfig.groupStyle = {
        gleft: 0,
        gtop: toPercent((groupConfig.positionStyle.top - top) / height),
        gwidth: 100,
        gheight: toPercent(groupConfig.positionStyle.height / height),
        grotate: props.component.positionStyle.rotate || 0
      }
      props.component.updateChild(i, groupConfig)
    }
  }
  return propValue.label.items || []
})

const getShapeStyle = (item: BaseComponent) => {
  if (item.groupStyle?.gheight) {
    return filterStyle(item.groupStyle, ['gtop', 'gleft', 'gwidth', 'gheight', 'grotate'])
  } else {
    return filterStyle(item.style, ['top', 'left', 'width', 'height', 'rotate'])
  }
}

const curComponent = computed(() => basicStore.curComponent)
const activeKey = ref<number>(0)

const isShow = (display: boolean): boolean => {
  return !(basicStore.isEditMode && display === false)
}

const tabsClick = (index: number) => {
  console.log('activeKey', 'tab-' + (index + 1))
  activeKey.value = index
}
const getShow = (index: number) => {
  return activeKey.value === index
}

const contentRef = ref<HTMLElement | null>(null)
const content = computed<InstanceType<typeof GroupComponent>>(() => {
  return props.component.subComponents[activeKey.value]
})

const labelStyle = computed<Recordable>(() => {
  return {
    height: `${propValue.style.height}px`,
    color: propValue.style.color,
    fontSize: `${propValue.style.fontSize}px`,
    weight: `${propValue.style.fontWeight}px`,
    family: `${propValue.style.fontWeight}px`
  }
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
    const { top, left } = document.querySelector('#editor')!.getBoundingClientRect()
    const y = (e.pageY - top) / basicStore.scale
    const x = (e.pageX - left) / basicStore.scale
    const parentStyle = props.component.subComponents[activeKey.value].style
    component.change('top', y)
    component.change('left', x)
    component.groupStyle = {
      gleft: toPercent((component.positionStyle.left - parentStyle.left) / parentStyle.width),
      gtop: toPercent((component.positionStyle.top - parentStyle.top) / parentStyle.height),
      gwidth: toPercent(component.positionStyle.width / parentStyle.width),
      gheight: toPercent(component.positionStyle.height / parentStyle.height),
      grotate: component.positionStyle.rotate || 0
    }
    component.parent = props.component
    props.component.subComponents[activeKey.value].appendChild(component)
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
      position: static !important;
    }
  }
}
</style>
