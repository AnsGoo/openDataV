import { defineStore } from 'pinia'
import { store } from '@/store'
import type { EditData, CanvasStyleData, Postion, ComponentPos } from '@/types/storeTypes'
import type { LayoutData } from '@/types/apiTypes'
import type { ComponentInfo } from '@/types/component'
import { EditMode } from '@/enum'
import { eventBus } from '@/bus/useEventBus'
import { uuid } from '@/utils/utils'

const useBasicStore = defineStore({
  id: 'basic',
  state: (): EditData => ({
    name: '',
    thumbnail: '',
    editMode: EditMode.PREVIEW,
    canvasStyleData: {
      width: 1920,
      height: 1080,
      scale: 100,
      alertWs: '',
      dataWs: '',
      image: 'https://cdn.jsdelivr.net/gh/AnsGoo/openDataV@gh-pages/images/bg.jpg'
    },
    componentData: [],
    curComponent: undefined,
    curComponentIndex: undefined,
    isClickComponent: false,
    isShowEm: false, // 是否显示控件坐标
    layerComponent: undefined
  }),
  getters: {
    isEditMode(): boolean {
      return this.editMode === EditMode.EDIT
    },

    editor(): HTMLElement | null {
      return document.querySelector('#editor')
    }
  },
  actions: {
    setLayoutData(data: LayoutData) {
      if (data.canvasData) {
        this.setComponentData(data.canvasData)
      }

      if (data.canvasStyle) {
        this.canvasStyleData = data.canvasStyle
      }

      if (data.name) {
        this.name = data.name
      }

      if (data.thumbnail) {
        this.thumbnail = data.thumbnail
      }
    },

    setName(name: string) {
      this.name = name
    },

    setThumbnail(thumbnail: string) {
      this.thumbnail = thumbnail
    },

    setClickComponentStatus(status: boolean): void {
      this.isClickComponent = status
    },

    setEditMode(mode: string): void {
      this.editMode = mode
    },

    toggleShowEm(): void {
      this.isShowEm = !this.isShowEm
    },

    setCanvasStyle(style: CanvasStyleData): void {
      this.canvasStyleData = style
    },

    setCurComponent(component: any, index: number | undefined): void {
      this.curComponent = component
      this.curComponentIndex = index
      this.layerComponent = undefined
    },

    setShapeStyle(pos: Postion): void {
      if (!this.curComponent || !this.curComponent.style) {
        return
      }

      if (pos.top) {
        this.curComponent.style.top = Math.round(pos.top)
        pos.top = Math.round(pos.top)
      }

      if (pos.left) {
        this.curComponent.style.left = Math.round(pos.left)
        pos.left = Math.round(pos.left)
      }

      if (pos.width) {
        this.curComponent.style.width = Math.round(pos.width)
        pos.width = Math.round(pos.width)
      }

      if (pos.height) {
        this.curComponent.style.height = Math.round(pos.height)
        pos.height = Math.round(pos.height)
      }

      if (pos.rotate) {
        this.curComponent.style.rotate = pos.rotate
        pos.rotate = Math.round(pos.rotate)
      }

      eventBus.emit('changeStyle', {
        id: this.curComponent!.id,
        style: { ...pos }
      })
    },

    setShapeSingleStyle({ key, value }): void {
      if (!this.curComponent || !this.curComponent.style) {
        return
      }

      this.curComponent.style[key] = value
      eventBus.emit('changeStyle', {
        id: this.curComponent.id,
        style: { [key]: value }
      })
    },

    resetComponentData(componentData: Array<ComponentInfo>, ids: Set<string>) {
      componentData.forEach((item: ComponentInfo) => {
        // 重置组件 ID
        if (!item.id) {
          item.id = uuid()
        } else {
          if (ids.has(item.id as string)) {
            item.id = uuid()
          }
        }

        // 添加 rotate
        if (item.style.rotate === undefined) {
          item.style.rotate = 0
        }

        ids.add(item.id as string)
        if (item.subComponents) {
          this.resetComponentData(item.subComponents, ids)
        }
      })
    },

    setComponentData(componentData: Array<ComponentInfo> = []): void {
      const ids: Set<string> = new Set()
      this.resetComponentData(componentData, ids)
      this.componentData = componentData
    },

    addComponent({ component, index }: ComponentPos): void {
      if (index !== undefined) {
        this.componentData.splice(index, 0, component)
      } else {
        component.id = uuid()

        // 如果没有 rotate 属性，就添加一个属性
        if (component.style.rotate === undefined) {
          component.style.rotate = 0
        }

        this.componentData.push(component)
      }
    },

    /**
     * 复制组件
     * @parms component: 被复制的组件
     */
    copyComponent(component: ComponentInfo): void {
      const ids: Set<string> = new Set()
      this.resetComponentData([...this.componentData, component], ids)
      this.componentData.push(component)
    },

    deleteComponent(index: number | string | undefined = undefined): void {
      // 根据组件 ID 获取组件的索引
      if (typeof index === 'string') {
        index = this.getComponentIndexById(index)
      }

      if (index === undefined) {
        index = this.curComponentIndex
      }

      if (index === this.curComponentIndex) {
        this.curComponentIndex = undefined
        this.curComponent = undefined
      }

      if ((index as number) >= 0) {
        this.componentData.splice(index as number, 1)
      }
    },

    setCurComponentProp(key: string, value: any): void {
      const curComponent = this.curComponent || this.layerComponent
      if (!curComponent || !curComponent.propValue) {
        return
      }

      curComponent.propValue[key] = value

      eventBus.emit(curComponent.component + curComponent.id, { key: key, value: value })
    },

    getComponentIndexById(id: string): number {
      for (let i = 0; i < this.componentData.length; ++i) {
        const item: ComponentInfo = this.componentData[i]
        if (item.id === id) {
          return i
        }
      }

      return -1
    },

    /**
     * 设置图层激活组件，选择图层组件时，取消当前组件的选中状态
     * @param component
     */
    setActiveComponent(component: ComponentInfo): void {
      this.curComponentIndex = undefined
      this.curComponent = undefined
      this.layerComponent = component
    },
    /**
     * 清空画布
     */
    clearCanvas(): void {
      this.componentData = []
      this.curComponent = undefined
      this.curComponentIndex = undefined
      this.isClickComponent = false
      this.isShowEm = false
      this.layerComponent = undefined
    }
  }
})

// Need to be used outside the setup
export function useBasicStoreWithOut() {
  return useBasicStore(store)
}
