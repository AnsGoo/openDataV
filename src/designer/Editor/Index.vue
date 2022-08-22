<template>
  <div
    class="editor edit"
    ref="editor"
    id="editor"
    :style="bgStyle"
    @mousedown="handleMouseDown"
    v-contextmenu="contextmenus"
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
        :id="'shape' + item.id"
        :defaultStyle="(item.style as any)"
        :style="getShapeStyle(item.style)"
        :active="item.id === (curComponent || {}).id"
        :info="item"
        :class="{ lock: item.locked }"
        :index="index"
        v-if="basicStore.isEditMode && !item.hided"
      >
        <component
          class="component"
          :is="item.component"
          :style="getComponentShapeStyle(item)"
          :component="item"
          :id="'component' + item.id"
        />
      </Shape>
    </template>
    <!-- 标线 -->
    <MarkLine />

    <!-- 选中区域 -->
    <Area :start="start" :width="width" :height="height" v-if="isShowArea" />
    <Area
      :start="appendStart"
      :width="appendWidth"
      :height="appendHeight"
      v-else-if="isShowAreas"
    />
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, computed, onMounted, onUnmounted, watch } from 'vue'
import Ruler from '@/designer/Editor/Ruler.vue'
import Area from '@/designer/Editor/Area.vue'
import Grid from '@/designer/Editor/Grid.vue'
import MarkLine from '@/designer/Editor/MarkLine.vue'
import Shape from '@/designer/Editor/Shape.vue'
import { filterStyle, calcComponentAxis, copyText } from '@/utils/utils'
import { useBasicStoreWithOut } from '@/store/modules/basic'
import { useComposeStoreWithOut } from '@/store/modules/compose'
import { EditMode } from '@/enum'
import { useEventBus } from '@/bus/useEventBus'
import { Vector } from '@/types/common'
import { DOMRectStyle, Rect } from '@/types/component'
import { getComponentShapeStyle } from '@/utils/utils'
import { ContextmenuItem } from '@/plugins/directive/contextmenu/types'
import { useCopyStoreWithOut } from '@/store/modules/copy'
import { BaseComponent } from '@/resource/models'

const basicStore = useBasicStoreWithOut()
const composeStore = useComposeStoreWithOut()
const copyStore = useCopyStoreWithOut()

const getShapeStyle = (style) => {
  return filterStyle(style, ['top', 'left', 'width', 'height', 'rotate'])
}

const isShowAreas = computed<boolean>(() => {
  return composeStore.style.width > 0 && !isShowArea.value
})

const appendStart = computed<Vector>(() => {
  return { x: composeStore.style.left, y: composeStore.style.top }
})

const appendWidth = computed<number>(() => {
  return composeStore.style.width
})

const appendHeight = computed<number>(() => {
  return composeStore.style.height
})
const hideArea = () => {
  isShowArea.value = false
  width.value = 0
  height.value = 0
  composeStore.setAreaData(
    {
      left: 0,
      top: 0,
      width: 0,
      height: 0,
      rotate: 0
    },
    []
  )
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

useEventBus('hideArea', hideArea)

onMounted(() => {
  console.log('进入编辑模式')
  basicStore.setEditMode(EditMode.EDIT)
  document.addEventListener('keydown', keyDown)
  document.addEventListener('paste', pasteComponent)
})

onUnmounted(() => {
  console.log('进入预览模式')
  basicStore.setEditMode(EditMode.PREVIEW)
  document.removeEventListener('keydown', keyDown)
  document.removeEventListener('paste', pasteComponent)
  basicStore.clearCanvas()
})

const componentData = computed(() => {
  return basicStore.componentData
})

const canvasStyleData = computed(() => basicStore.canvasStyleData)
const curComponent = computed(() => basicStore.curComponent)

const bgStyle = computed<Recordable<string>>(() => {
  const style = {
    ...canvasStyleData.value,
    backgroundImage: canvasStyleData.value.image,
    backgroundSize: 'cover'
  }
  return filterStyle(style, ['width', 'height', 'backgroundImage', 'backgroundSize'])
})

const pasteComponent = (event: ClipboardEvent) => {
  if (event.clipboardData) {
    const textData = event.clipboardData.getData('text')
    try {
      const component: BaseComponent = JSON.parse(textData)
      if ('component' in component) {
        component.change('top', component.positionStyle.top + 10)
        component.change('left', component.positionStyle.left + 10)
        copyText(JSON.stringify(component))
        event.preventDefault()
        basicStore.appendComponent(component)
      }
    } catch (e) {
      console.log(e)
    }
  }
}

const editorX = ref<number>(0)
const editorY = ref<number>(0)
const start = reactive<Vector>({
  x: 0,
  y: 0
})
const width = ref<number>(0)
const height = ref<number>(0)
const isShowArea = ref<boolean>(true)
const editor = ref<ElRef>(null)
const isShowReferLine = ref<boolean>(true)
const handleMouseDown = (e: MouseEvent) => {
  // 阻止默认事件，防止拖拽时出现拖拽图标
  if (e.button === 0) {
    basicStore.setCurComponent(undefined)
    e.preventDefault()
    e.stopPropagation()
    hideArea()
    // 获取编辑器的位移信息，每次点击时都需要获取一次。主要是为了方便开发时调试用。
    const rectInfo = editor.value?.getBoundingClientRect()
    editorX.value = rectInfo!.x
    editorY.value = rectInfo!.y
    const startX = e.clientX
    const startY = e.clientY
    start.x = startX - editorX.value
    start.y = startY - editorY.value

    // 展示选中区域
    isShowArea.value = true
    const move = (moveEvent: MouseEvent) => {
      moveEvent.preventDefault()
      moveEvent.stopPropagation()
      width.value = Math.abs(moveEvent.clientX - startX)
      height.value = Math.abs(moveEvent.clientY - startY)
      if (moveEvent.clientX < startX) {
        start.x = moveEvent.clientX - editorX.value
      }
      if (moveEvent.clientY < startY) {
        start.y = moveEvent.clientY - editorY.value
      }
    }
    const up = (UpMoveEvent: MouseEvent) => {
      document.removeEventListener('mousemove', move)
      document.removeEventListener('mouseup', up)
      if (UpMoveEvent.clientX == startX && UpMoveEvent.clientY == startY) {
        hideArea()
        return
      }
      const selectedRect: Rect = {
        left: start.x,
        top: start.y,
        right: width.value + start.x,
        bottom: start.y + height.value
      }
      const result = getSelectArea(selectedRect)
      if (result) {
        const rect = result.rect
        composeStore.setAreaData(
          {
            top: rect.top,
            left: rect.left,
            width: rect.right - rect.left,
            height: rect.bottom - rect.top,
            rotate: 0
          },
          result.components
        )
        start.x = rect.left
        start.y = rect.top
        width.value = rect.right - rect.left
        height.value = rect.bottom - rect.top
      } else {
        hideArea()
      }
    }
    document.addEventListener('mousemove', move)
    document.addEventListener('mouseup', up)
  }
}

const getSelectArea = (
  rect: Rect
): { components: Array<BaseComponent>; rect: Rect } | undefined => {
  const selectedComponents: Array<BaseComponent> = []
  const leftSet: Set<number> = new Set()
  const topSet: Set<number> = new Set()
  const rightSet: Set<number> = new Set()
  const bottomSet: Set<number> = new Set()

  // 计算所有的组件数据，判断是否在选中区域内
  basicStore.componentData.forEach((component) => {
    // 获取位置大小信息：left, top, width, height
    const { width, height, left, top, rotate } = component.style
    const componentRect: Rect = calcComponentAxis({
      width,
      height,
      left,
      top,
      rotate
    } as DOMRectStyle)
    if (
      componentRect.left >= rect.left &&
      componentRect.right <= rect.right &&
      componentRect.top >= rect.top &&
      componentRect.bottom <= rect.bottom
    ) {
      selectedComponents.push(component)
      leftSet.add(componentRect.left)
      topSet.add(componentRect.top)
      rightSet.add(componentRect.right)
      bottomSet.add(componentRect.bottom)
    }
  })
  if (selectedComponents.length > 0) {
    const left = Math.min(...leftSet)
    const right = Math.max(...rightSet)
    const top = Math.min(...topSet)
    const bottom = Math.max(...bottomSet)
    return {
      components: selectedComponents,
      rect: { left, right, top, bottom }
    }
  }
}

/**
 * 方向键控制组件移动
 */
const keyDown = (e: KeyboardEvent): void => {
  if (curComponent.value && e.ctrlKey) {
    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault()
        basicStore.syncComponentLoction({ left: curComponent.value.positionStyle.left - 1 })
        break
      case 'ArrowUp':
        e.preventDefault()
        basicStore.syncComponentLoction({ top: curComponent.value.positionStyle.top - 1 })
        break
      case 'ArrowRight':
        e.preventDefault()
        basicStore.syncComponentLoction({ left: curComponent.value.positionStyle.left + 1 })
        break
      case 'ArrowDown':
        e.preventDefault()
        basicStore.syncComponentLoction({ top: curComponent.value.positionStyle.top + 1 })
        break
      default:
        e.stopPropagation()
    }
  } else {
    e.stopPropagation()
  }
}

// watch(
//   () => [width, height],
//   () => {
//     if (width.value > 0 || height.value > 0) {
//       // 展示选中区域
//       isShowArea.value = true
//     }
//   }
// )
</script>

<style scoped lang="less">
@layer components {
  .editor {
    @apply relative m-auto;
    background-color: slategrey;
  }

  .edit .component {
    @apply outline-none w-full h-full;
    position: static !important;
  }
}
</style>
