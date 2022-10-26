<template>
  <div
    id="editor"
    ref="editor"
    v-contextmenu.stop="contextmenus"
    class="editor edit"
    :style="bgStyle"
    @mousedown.left="handleMouseDown"
    @drop="handleDrop"
    @dragover="handleDragOver"
    @mouseup="deselectCurComponent"
  >
    <!-- 网格线 -->
    <Grid />

    <!-- 标尺 -->
    <Ruler
      :width="canvasStyleData.width"
      :height="canvasStyleData.height"
      :isShowReferLine="isShowReferLine"
    />

    <!--页面组件列表展示-->
    <template v-for="(item, index) in componentData" :key="item.id">
      <Shape
        v-if="basicStore.isEditMode && item.display"
        :id="'shape' + item.id"
        :defaultStyle="item.style"
        :style="getShapeStyle(item.style)"
        :active="item.id === (curComponent || {}).id"
        :info="item"
        :class="{ lock: item.locked }"
        :index="index"
      >
        <component
          :is="item.component"
          :id="'component' + item.id"
          class="component"
          :style="getComponentShapeStyle(item)"
          :component="item"
        />
      </Shape>
    </template>
    <!-- 标线 -->
    <MarkLine />

    <!-- 选中区域 -->
    <Area />
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, computed, onMounted, onUnmounted } from 'vue'
import Ruler from '@/designer/Editor/Ruler.vue'
import Area from '@/designer/Editor/Area.vue'
import Grid from '@/designer/Editor/Grid.vue'
import MarkLine from '@/designer/Editor/MarkLine.vue'
import Shape from '@/designer/Editor/Shape'
import { filterStyle, uuid } from '@/utils/utils'
import { useBasicStoreWithOut } from '@/store/modules/basic'
import { useComposeStoreWithOut } from '@/store/modules/compose'
import { EditMode } from '@/enum'
import type { Position, Vector } from '@/types/common'
import { getComponentShapeStyle } from '@/utils/utils'
import type { ContextmenuItem } from '@/plugins/directive/contextmenu/types'
import { useCopyStoreWithOut } from '@/store/modules/copy'
import type { BaseComponent } from '@/resource/models'
import { createComponent } from '@/resource/models'
import { componentList } from '../load'
import { DataIntegrationMode } from '@/resource/models/data'
import { backgroundToCss } from '@/utils/utils'

const basicStore = useBasicStoreWithOut()
const composeStore = useComposeStoreWithOut()
const copyStore = useCopyStoreWithOut()

const getShapeStyle = (style) => {
  return filterStyle(style, ['top', 'left', 'width', 'height', 'rotate'])
}

const clearCanvas = () => {
  basicStore.clearCanvas()
}

const paste = (_: HTMLElement, event: MouseEvent) => {
  const editorRectInfo = document.querySelector('#editor')!.getBoundingClientRect()
  const y = event.pageY - editorRectInfo.top
  const x = event.pageX - editorRectInfo.left
  copyStore.paste(true, x, y)
}

const contextmenus = (): ContextmenuItem[] => {
  return [
    {
      text: '粘贴',
      subText: 'Ctrl + V',
      handler: paste
    },
    {
      text: '清空画布',
      subText: '',
      handler: clearCanvas
    }
  ]
}

onMounted(() => {
  console.log('进入编辑模式')
  basicStore.setEditMode(EditMode.EDIT)
  document.addEventListener('paste', pasteComponent)
  document.addEventListener('copy', copyComponent)
})

onUnmounted(() => {
  console.log('进入预览模式')
  basicStore.setEditMode(EditMode.PREVIEW)
  document.removeEventListener('paste', pasteComponent)
  document.removeEventListener('copy', copyComponent)
  basicStore.clearCanvas()
})

const componentData = computed(() => {
  return basicStore.componentData
})

const canvasStyleData = computed(() => basicStore.canvasStyleData)
const curComponent = computed(() => basicStore.curComponent)

const bgStyle = computed<Recordable<string>>(() => {
  const backgroundStyle = backgroundToCss(canvasStyleData.value.background)
  const style = {
    ...canvasStyleData.value,
    ...backgroundStyle
  }
  return filterStyle(style, [
    'width',
    'height',
    'backgroundImage',
    'backgroundSize',
    'backgroundColor'
  ])
})

const copyComponent = () => {
  if (basicStore.curComponent) {
    copyStore.copy(basicStore.curComponent)
  }
}

const pasteComponent = (event: ClipboardEvent) => {
  if (event.clipboardData) {
    const textData = event.clipboardData.getData('text')
    try {
      const component: BaseComponent = createComponent(JSON.parse(textData))
      if (component) {
        component.change('top', component.positionStyle.top + 10)
        component.change('left', component.positionStyle.left + 10)
        component.id = uuid()
        copyStore.copy(component)
        event.preventDefault()
        event.stopPropagation()
        basicStore.appendComponent(component)
      }
    } catch (_) {}
  }
}

const editorX = ref<number>(0)
const editorY = ref<number>(0)
const start = reactive<Vector>({
  x: 0,
  y: 0
})

const editor = ref<ElRef>(null)
const isShowReferLine = ref<boolean>(true)
const handleMouseDown = (e: MouseEvent) => {
  // 阻止默认事件，防止拖拽时出现拖拽图标
  basicStore.setClickComponentStatus(false)
  e.preventDefault()
  e.stopPropagation()
  composeStore.setHidden()
  // 获取编辑器的位移信息，每次点击时都需要获取一次。主要是为了方便开发时调试用。
  const rectInfo = editor.value?.getBoundingClientRect()
  editorX.value = rectInfo!.x
  editorY.value = rectInfo!.y
  const startX = e.clientX
  const startY = e.clientY
  start.x = (startX - editorX.value) / basicStore.scale
  start.y = (startY - editorY.value) / basicStore.scale

  const move = (moveEvent: MouseEvent) => {
    moveEvent.preventDefault()
    moveEvent.stopPropagation()

    if (moveEvent.clientX < startX) {
      start.x = (moveEvent.clientX - editorX.value) / basicStore.scale
    }
    if (moveEvent.clientY < startY) {
      start.y = (moveEvent.clientY - editorY.value) / basicStore.scale
    }
    const width = Math.abs(moveEvent.clientX - startX) / basicStore.scale
    const height = Math.abs(moveEvent.clientY - startY) / basicStore.scale
    composeStore.setPostion({ left: start.x, top: start.y, width, height })
  }
  const up = (UpMoveEvent: MouseEvent) => {
    document.removeEventListener('mousemove', move)
    document.removeEventListener('mouseup', up)
    if (UpMoveEvent.clientX == startX && UpMoveEvent.clientY == startY) {
      composeStore.setHidden()
      return
    }

    const selectedRect: Position = {
      left: composeStore.style.left,
      top: composeStore.style.top,
      right: composeStore.style.left + composeStore.style.width,
      bottom: composeStore.style.top + composeStore.style.height
    }

    composeStore.setSelectComponents(selectedRect)
  }
  document.addEventListener('mousemove', move)
  document.addEventListener('mouseup', up)
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

    const editorRectInfo = document.querySelector('#editor')!.getBoundingClientRect()
    const y = (e.pageY - editorRectInfo.top) / basicStore.scale
    const x = (e.pageX - editorRectInfo.left) / basicStore.scale
    component.change('top', y)
    component.change('left', x)
    basicStore.appendComponent(component)
  }
}

const handleDragOver = (e) => {
  e.preventDefault()
  e.dataTransfer.dropEffect = 'copy'
}

const deselectCurComponent = () => {
  if (!basicStore.isClickComponent) {
    basicStore.setCurComponent(undefined)
  }
}
</script>

<style scoped lang="less">
.editor {
  @apply relative m-auto;
}

.edit .component {
  @apply w-full h-full;
  position: static !important;
}
</style>
