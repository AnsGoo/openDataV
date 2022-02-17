<template>
  <div
    class="editor edit"
    ref="editor"
    id="editor"
    :style="defaultStyle"
    @contextmenu.prevent="handleContextMenu"
    @mousedown="handleMouseDown"
  >
    <!-- 网格线 -->
    <Grid />

    <!--页面组件列表展示-->
    <Shape
      v-for="(item, index) in componentData"
      :id="'shape' + item.id"
      :defaultStyle="item.style"
      :style="getShapeStyle(item.style)"
      :key="item.id"
      :active="item.id === (curComponent || {}).id"
      :element="item"
      :index="index"
      :class="{ lock: item.isLock }"
    >
      <component
        class="component"
        :is="item.component"
        :style="getComponentStyle(item.style)"
        :propValue="item.propValue"
        :element="item"
        :id="'component' + item.id"
        :subComponents="item.subComponents"
      />
    </Shape>

    <!-- 右击菜单 -->
    <ContextMenu
      :curComponent="curComponent"
      :menuTop="menuTop"
      :menuLeft="menuLeft"
      v-model:display="displayContexyMenu"
      ref="contextMenu"
    />
    <!-- 标线 -->
    <MarkLine />
    <!-- 选中区域 -->
    <Area :start="start" :width="width" :height="height" v-show="isShowArea" />
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, computed, watch, onMounted, onUnmounted } from 'vue'
import ContextMenu from '@/designer/Editor/ContextMenu.vue'
import Area from '@/designer/Editor/Area.vue'
import Grid from '@/designer/Editor/Grid.vue'
import MarkLine from '@/designer/Editor/MarkLine.vue'
import Shape from '@/designer/Editor/Shape.vue'
import { getComponentRotatedStyle, getScreenStyle, getStyle } from '@/utils/utils'
import { useBasicStoreWithOut } from '@/store/modules/basic'
import { useComposeStoreWithOut } from '@/store/modules/compose'
import { useStorage, onClickOutside } from '@vueuse/core'
import { EditMode } from '@/enum'
import { useEventBus } from '@/bus/useEventBus'
import { Vector } from '@/types/common'

const basicStore = useBasicStoreWithOut()
const composeStore = useComposeStoreWithOut()
let menuTop = ref<number>(0)
let menuLeft = ref<number>(0)
let displayContexyMenu = ref<boolean>(false)
const contextMenu = ref<ElRef>(null)

const hideArea = () => {
  isShowArea.value = false
  width.value = 0
  height.value = 0
  composeStore.setAreaData(
    {
      left: 0,
      top: 0,
      width: 0,
      height: 0
    },
    []
  )
}

useEventBus('hideArea', hideArea)

onMounted(() => {
  console.log('进入编辑模式')
  basicStore.setEditMode(EditMode.EDIT)
  document.addEventListener('keydown', keyDown)
})

onUnmounted(() => {
  console.log('进入预览模式')
  basicStore.setEditMode(EditMode.PREVIEW)
  document.removeEventListener('keydown', keyDown)
})

const componentData = computed(() => basicStore.componentData)
const canvasStyleData = computed(() => basicStore.canvasStyleData)
const curComponent = computed(() => basicStore.curComponent)
const defaultStyle = computed(() => {
  return getScreenStyle(canvasStyleData.value)
})

const storageCanvasData = useStorage(
  'canvasData',
  JSON.stringify(componentData.value),
  window?.localStorage
)
const storageCanvasStyle = useStorage(
  'canvasStyle',
  JSON.stringify(canvasStyleData.value),
  window?.localStorage
)

const editorX = ref<number>(0)
const editorY = ref<number>(0)
const start = reactive<Vector>({
  x: 0,
  y: 0
})
const width = ref<number>(0)
const height = ref<number>(0)
const isShowArea = ref<boolean>(false)
const editor = ref<ElRef>(null)

const handleContextMenu = (event: MouseEvent) => {
  menuTop.value = event.clientY
  menuLeft.value = event.clientX + 20
  displayContexyMenu.value = true
}

onClickOutside(contextMenu, () => (displayContexyMenu.value = false))

const handleMouseDown = (e: MouseEvent) => {
  // 阻止默认事件，防止拖拽时出现拖拽图标
  e.preventDefault()

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
  const move = (moveEvent) => {
    width.value = Math.abs(moveEvent.clientX - startX)
    height.value = Math.abs(moveEvent.clientY - startY)
    if (moveEvent.clientX < startX) {
      start.x = moveEvent.clientX - editorX.value
    }

    if (moveEvent.clientY < startY) {
      start.y = moveEvent.clientY - editorY.value
    }
  }

  const up = (UpMoveEvent) => {
    document.removeEventListener('mousemove', move)
    document.removeEventListener('mouseup', up)

    if (UpMoveEvent.clientX == startX && UpMoveEvent.clientY == startY) {
      hideArea()
      return
    }

    createGroup()
  }

  document.addEventListener('mousemove', move)
  document.addEventListener('mouseup', up)
}

const createGroup = () => {
  // 获取选中区域的组件数据
  const areaData = getSelectArea()
  if (areaData.length <= 1) {
    hideArea()
    return
  }

  // 根据选中区域和区域中每个组件的位移信息来创建 Group 组件
  // 要遍历选择区域的每个组件，获取它们的 left top right bottom 信息来进行比较
  let top = Infinity,
    left = Infinity
  let right = -Infinity,
    bottom = -Infinity
  areaData.forEach((component) => {
    let style: any = {}
    if (component.component == 'Group') {
      component.subComponents.forEach((item) => {
        const rectInfo = document.querySelector(`#component${item.id}`)!.getBoundingClientRect()
        style.left = rectInfo.left - editorX.value
        style.top = rectInfo.top - editorY.value
        style.right = rectInfo.right - editorX.value
        style.bottom = rectInfo.bottom - editorY.value

        if (style.left < left) left = style.left
        if (style.top < top) top = style.top
        if (style.right > right) right = style.right
        if (style.bottom > bottom) bottom = style.bottom
      })
    } else {
      style = getComponentRotatedStyle(component.style)
    }

    if (style.left < left) left = style.left
    if (style.top < top) top = style.top
    if (style.right > right) right = style.right
    if (style.bottom > bottom) bottom = style.bottom
  })

  start.x = Math.round(left)
  start.y = Math.round(top)
  width.value = Math.round(right - left)
  height.value = Math.round(bottom - top)

  // 设置选中区域位移大小信息和区域内的组件数据
  composeStore.setAreaData(
    {
      left: left,
      top: top,
      width: width.value,
      height: height.value
    },
    areaData
  )
}

const getSelectArea = () => {
  const result: Array<any> = []
  // 区域起点坐标
  const { x, y } = start
  // 计算所有的组件数据，判断是否在选中区域内
  basicStore.componentData.forEach((component) => {
    if (component.isLock) return

    // 获取位置大小信息：left, top, width, height
    const style = getComponentRotatedStyle(component.style)
    if (
      x <= style.left &&
      y <= style.top &&
      style.left + style.width <= x + width.value &&
      style.top + style.height <= y + height.value
    ) {
      result.push(component)
    }
  })

  // 返回在选中区域内的所有组件
  return result
}

const getShapeStyle = (style) => {
  const result = {} as any
  const styleAttr = ['width', 'height', 'top', 'left', 'rotate'] as Array<string>
  styleAttr.forEach((attr) => {
    if (attr != 'rotate') {
      result[attr] = style[attr] + 'px'
    } else {
      result.transform = 'rotate(' + style[attr] + 'deg)'
    }
  })

  return result
}

const getComponentStyle = (style) => {
  return getStyle(style, ['top', 'left', 'width', 'height', 'rotate'])
}

const keyDown = (e: KeyboardEvent): void => {
  if (curComponent.value && e.ctrlKey) {
    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault()
        basicStore.curComponent!.style.left = (curComponent.value.style!.left as number) - 1
        break
      case 'ArrowUp':
        e.preventDefault()
        basicStore.curComponent!.style.top = (curComponent.value.style!.top as number) - 1
        break
      case 'ArrowRight':
        e.preventDefault()
        basicStore.curComponent!.style.left = (curComponent.value.style!.left as number) + 1
        break
      case 'ArrowDown':
        e.preventDefault()
        basicStore.curComponent!.style.top = (curComponent.value.style!.top as number) + 1
        break
      default:
        e.stopPropagation()
    }
  } else {
    e.stopPropagation()
  }
}

watch(
  () => basicStore.componentData,
  (newData, _) => {
    if (newData) {
      storageCanvasData.value = JSON.stringify(newData)
    }
  },
  { deep: true }
)

watch(
  () => basicStore.canvasStyleData,
  (newData, _) => {
    if (newData) {
      storageCanvasStyle.value = JSON.stringify(newData)
    }
  },
  { deep: true }
)
</script>

<style scoped>
@layer components {
  .editor {
    @apply relative bg-white m-auto;
  }

  .lock {
    @apply opacity-50;
  }

  .edit .component {
    @apply outline-none w-full h-full;
  }

  .chosen {
    @apply border-2 border-red-600;
  }
}
</style>
