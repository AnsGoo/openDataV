<template>
  <div :class="['dv-tabs', modeStyle]">
    <div :class="['tabs-nav', modeStyle]">
      <div
        v-for="(item, index) in labels"
        :key="index"
        class="tabs-tab"
        :class="{ active: getShow(index), [modeStyle]: true }"
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
        v-if="isShow(content.display || false)"
        :id="'shape' + content.id"
        :defaultStyle="content.style"
        :style="getShapeStyle(content)"
        :active="content.id === (curComponent || {}).id"
        :info="content"
        :class="{ lock: content.locked }"
        :isInner="true"
        :index="activeKey"
      >
        <Group
          :id="'component' + content.id"
          class="component"
          :style="getInnerComponentShapeStyle(content)"
          :component="content"
        />
      </Shape>
      <!-- <Group
        :id="'component' + content.id"
        class="component"
        :style="getComponentStyle(content)"
        :component="content"
      /> -->
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, computed, watch } from 'vue'
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
  return propValue.label.items || []
})

watch(
  () => propValue.label.mode,
  () => {
    const len = (propValue.label.items || []).length
    const mode = propValue.label.mode || 'horizontal'
    const labelHeight = propValue.style.height
    const { top, left, width, height } = props.component.style
    for (let i = 0; i < len; i++) {
      console.log(props.component.subComponents[i])
      if (!props.component.subComponents[i]) {
        const groupConfig = new GroupComponent(uuid())
        if (mode === 'horizontal') {
          groupConfig.change('top', top + labelHeight)
          groupConfig.change('left', left)
          groupConfig.change('width', width)
          groupConfig.change('height', height - labelHeight)
        } else {
          groupConfig.change('top', top)
          groupConfig.change('left', left + labelHeight)
          groupConfig.change('width', width - labelHeight)
          groupConfig.change('height', height)
        }
        groupConfig.parent = props.component
        groupConfig.groupStyle = {
          gleft: 0,
          gtop: toPercent((groupConfig.positionStyle.top - top) / height),
          gwidth: 100,
          gheight: toPercent(groupConfig.positionStyle.height / height),
          grotate: props.component.positionStyle.rotate || 0
        }
        props.component.updateChild(i, groupConfig)
      } else {
        const groupConfig = props.component.subComponents[i]
        if (mode === 'horizontal') {
          groupConfig.change('top', top + labelHeight)
          groupConfig.change('left', left)
        } else {
          groupConfig.change('top', top)
          groupConfig.change('left', left + labelHeight)
        }
        groupConfig.groupStyle = {
          gleft: toPercent((groupConfig.positionStyle.left - left) / width),
          gtop: toPercent((groupConfig.positionStyle.top - top) / height),
          gwidth: toPercent(groupConfig.positionStyle.width / width),
          gheight: toPercent(groupConfig.positionStyle.height / height),
          grotate: groupConfig.groupStyle!.grotate || 0
        }
      }
    }
  },
  {
    immediate: true
  }
)

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
  activeKey.value = index
}
const getShow = (index: number) => {
  return activeKey.value === index
}

const modeStyle = computed<string>(() => {
  console.log(propValue.label.mode)
  return propValue.label.mode ? propValue.label.mode : 'horizontal'
})
const contentRef = ref<HTMLElement | null>(null)
const content = computed<InstanceType<typeof GroupComponent>>(() => {
  console.log(props.component.subComponents[activeKey.value])
  return props.component.subComponents[activeKey.value]
})

// const content = ref<InstanceType<typeof GroupComponent>>()

const labelStyle = computed<Recordable>(() => {
  return {
    [propValue.label.mode === 'horizontal' ? 'height' : 'width']: `${propValue.style.height}px`,
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
  align-content: center;
  &.horizontal {
    flex-direction: column;
  }
  &.vertical {
    flex-direction: row;
  }
  .tabs-nav {
    display: flex;
    flex-wrap: nowrap;
    align-content: center;
    justify-content: space-between;
    align-items: center;
    &.horizontal {
      flex-direction: row;
    }
    &.vertical {
      flex-direction: column;
    }
    .tabs-tab {
      font-size: 14px;
      line-height: 40px;
      text-align: center;
      flex: 1;
      &.horizontal {
        border-bottom: 2px solid;
      }
      &.vertical {
        border-right: 2px solid;
        writing-mode: vertical-rl;
      }
    }
    .tabs-tab.active {
      color: #2080f0;
      &.horizontal {
        border-bottom: #2080f0 2px solid;
      }
      &.vertical {
        border-right: #2080f0 2px solid;
      }
    }
  }
  .tabs-content {
    // border-bottom: 1px solid;
    flex: 1;
    width: 100%;
    .component {
      position: static !important;
    }
  }
}
</style>
