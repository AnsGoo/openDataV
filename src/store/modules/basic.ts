import { defineStore } from 'pinia'
import store from '@/store'
import type { EditData, CanvasStyleData } from '@/types/storeTypes'
import type { LayoutData } from '@/types/apiTypes'
import { EditMode } from '@/enum'
import { calcComponentsRect, swap, toPercent, uuid } from '@/utils/utils'
import { message } from '@/utils/message'
import { useSnapShotStoreWithOut } from './snapshot'
import { BaseComponent, createComponent } from '@/resource/models'
import { cloneDeep } from 'lodash-es'
import { ComponentDataType, DOMRectStyle } from '@/types/component'
import { Position } from '@/types/common'

const snapShotStore = useSnapShotStoreWithOut()

const baseCanvasStyleData: CanvasStyleData = {
  width: window.screen.width,
  height: window.screen.height,
  scale: 100,
  image: import.meta.env.VITE_BACKGROUND as string,
  color: '#084860'
}

window.localStorage.setItem('canvasData', JSON.stringify([]))
window.localStorage.setItem('canvasStyle', JSON.stringify(baseCanvasStyleData))

const storeCanvasHandler: ProxyHandler<CanvasStyleData> = {
  get(target: CanvasStyleData, key) {
    return target[key]
  },
  set(target: CanvasStyleData, key, value) {
    Reflect.set(target, key, value)
    window.localStorage.setItem('canvasStyle', JSON.stringify(target))
    return true
  }
}

const useBasicStore = defineStore({
  id: 'basic',
  state: (): EditData => ({
    name: '',
    thumbnail: '',
    editMode: EditMode.PREVIEW,
    canvasStyleData: new Proxy(baseCanvasStyleData, storeCanvasHandler),
    componentData: [],
    activeIndex: undefined,
    curComponent: undefined,
    isClickComponent: false,
    isShowEm: false, // 是否显示控件坐标
    ids: new Set(),
    benchmarkComponent: undefined
  }),
  getters: {
    isEditMode(): boolean {
      return this.editMode === EditMode.EDIT
    },
    canvasData(): CanvasStyleData {
      return new Proxy(this.canvasStyleData, storeCanvasHandler)
    },
    layoutData(): ComponentDataType[] {
      const result: ComponentDataType[] = []
      this.componentData.forEach((item) => {
        result.push(item.toJson())
      })
      return result
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
    setClickComponentStatus(status: boolean): void {
      this.isClickComponent = status
    },

    setEditMode(mode: string): void {
      this.editMode = mode
    },

    toggleShowEm(): void {
      this.isShowEm = !this.isShowEm
    },
    setName(name: string): void {
      this.name = name
    },
    setCanvasStyle(style: CanvasStyleData): void {
      this.canvasStyleData = style
      this.saveComponentData()
    },

    /**
     * 设置当前组件
     * @param component 当前组件
     * @param index
     */
    setCurComponent(component: Optional<BaseComponent>, index?: string): void {
      // 设置前清理当前
      if (this.curComponent) {
        this.curComponent.active = false
      }
      this.curComponent = component
      this.activeIndex = index
      if (this.curComponent) {
        this.curComponent.active = true
        this.isClickComponent = true
        this.benchmarkComponent = this.curComponent.parent
      }
    },

    /**
     * 同步当前组件的位置
     * @param postion 位置
     * @returns
     */
    syncComponentLoction(postion: Position, parentComponent?: BaseComponent, isSave = true): void {
      if (!this.curComponent) {
        return
      }
      const styleKyes = ['top', 'left', 'width', 'height', 'rotate']
      const ablePostion: Position = {}
      styleKyes.forEach((el) => {
        if (postion[el] != undefined) {
          ablePostion[el] = postion[el]
        }
      })

      if (parentComponent) {
        const parentStyle = parentComponent.positionStyle
        const groupStyle = this.curComponent.groupStyle!
        const gStyle = {
          gleft:
            ablePostion.left !== undefined
              ? toPercent((ablePostion.left! - parentStyle.left) / parentStyle.width)
              : groupStyle.gleft,
          gtop:
            ablePostion.top !== undefined
              ? toPercent((ablePostion.top! - parentStyle.top) / parentStyle.height)
              : groupStyle.gtop,
          gwidth:
            ablePostion.width !== undefined
              ? toPercent(ablePostion.width! / parentStyle.width)
              : groupStyle.gwidth,
          gheight:
            ablePostion.height !== undefined
              ? toPercent(ablePostion.height! / parentStyle.height)
              : groupStyle.gheight,
          grotate: ablePostion.rotate !== undefined ? ablePostion.rotate! : groupStyle.grotate
        }
        const newStyle = {
          left:
            ablePostion.left !== undefined
              ? ablePostion.left
              : this.curComponent.positionStyle.left,
          top:
            ablePostion.top !== undefined ? ablePostion.top : this.curComponent.positionStyle.top,
          width:
            ablePostion.width !== undefined
              ? ablePostion.width
              : this.curComponent.positionStyle.width,
          height:
            ablePostion.height !== undefined
              ? ablePostion.height
              : this.curComponent.positionStyle.height,
          rotate:
            ablePostion.rotate !== undefined
              ? ablePostion.rotate!
              : this.curComponent.positionStyle.rotate
        }
        this.curComponent.groupStyle = gStyle
        for (const key in newStyle) {
          this.curComponent.change(key, newStyle[key])
        }
      } else {
        for (const key in ablePostion) {
          this.curComponent.change(key, ablePostion[key])
        }
      }

      if (this.curComponent.subComponents) {
        this.curComponent.resizeSubComponents()
      }
      if (isSave) {
        this.saveComponentData()
      }
    },

    /**
     * 重置组件数据ID
     * @param componentData 需要被重置的组件数据
     * @param ids
     * @param isUpdate
     */
    resetComponentData(components: Array<BaseComponent>) {
      components.forEach((item: BaseComponent) => {
        // 重置组件 ID

        if (this.ids.has(item.id!)) {
          item.id = uuid()
        }

        this.ids.add(item.id!)
        if (item.subComponents) {
          this.resetComponentData(item.subComponents)
        }
      })
    },
    /**
     * 设置画图的组件数据
     * @param componentData
     */
    setComponentData(componentData: ComponentDataType[] = []): void {
      this.componentData = []
      componentData.forEach((item) => {
        return this.componentData.push(createComponent(item))
      })
      this.resetComponentData(this.componentData)
    },
    /**
     * 想画布中添加组件
     * @param component 组件
     */
    appendComponent(component: BaseComponent): void {
      if (component.subComponents) {
        this.resetComponentData(component.subComponents)
      }
      component.parent = undefined
      this.componentData.push(component)
      this.saveComponentData()
    },
    /**
     * 设置当前组件的PropValue
     * @param key 属性
     * @param value 值
     * @returns
     */
    setCurComponentPropValue(prop: string, key: string, value: any): void {
      const curComponent = this.curComponent
      if (!curComponent || !curComponent.propValue) {
        return
      }
      curComponent.change(key, value, prop)
      this.saveComponentData()
    },
    /**
     * 设置当前组件的样式
     * @param key 属性
     * @param value 值
     * @returns
     */
    setCurComponentStyle(key: string, value: any): void {
      const groupStyleKeys = ['gtop', 'gleft', 'gweight', 'gheight', 'grotate']
      if (!this.curComponent) {
        return
      }

      if (this.curComponent.groupStyle && groupStyleKeys.includes(key)) {
        this.curComponent.groupStyle[key] = value
      } else {
        this.curComponent.change(key, value)
      }
      this.saveComponentData()
    },

    getComponentIndexById(id: string, parent: Optional<BaseComponent>): number {
      if (parent) {
        return parent.subComponents.findIndex((item) => item.id === id)
      }
      return this.componentData.findIndex((item) => item.id === id)
    },
    /**
     * 清空画布
     */
    clearCanvas(): void {
      this.componentData = []
      this.curComponent = undefined
      this.isClickComponent = false
      this.isShowEm = false
      this.canvasStyleData = baseCanvasStyleData
    },
    /**
     * 组件图层下移
     * @param index 组件索引
     */
    downComponent(index: number, parent: Optional<BaseComponent>) {
      let componentData = this.componentData
      if (parent && parent.subComponents) {
        componentData = parent.subComponents
      }
      if (index > 0) {
        swap(componentData, index, index - 1)
        this.saveComponentData()
      } else {
        message.info('图层已经到底了')
      }
    },
    /**
     * 组件图层上移
     * @param index 组件索引
     */
    upComponent(index: number, parent: Optional<BaseComponent>) {
      let componentData = this.componentData
      if (parent && parent.subComponents) {
        componentData = parent.subComponents
      }

      const len: number = componentData.length
      if (index < len - 1 && index >= 0) {
        swap(componentData, index, index + 1)
        this.saveComponentData()
      } else {
        message.info('图层已经到顶了')
      }
    },

    /**
     * 组件图层置顶
     * @param index 组件索引
     */
    topComponent(index: number, parent: Optional<BaseComponent>) {
      let componentData = this.componentData
      if (parent && parent.subComponents) {
        componentData = parent.subComponents
      }
      const len: number = componentData.length
      if (index < len - 1 && index >= 0) {
        const myComponments: BaseComponent[] = componentData.splice(index, 1)
        componentData.push(myComponments[0])
        this.saveComponentData()
      } else {
        message.info('图层已经到顶了')
      }
    },
    /**
     * 组件图层置底
     * @param index 组件索引
     */
    bottomComponent(index: number, parent: Optional<BaseComponent>) {
      let componentData = this.componentData
      if (parent && parent.subComponents) {
        componentData = parent.subComponents
      }

      if (index > 0) {
        const myComponments: BaseComponent[] = componentData.splice(index, 1)
        componentData.unshift(myComponments[0])
        this.saveComponentData()
      } else {
        message.info('图层已经到底了')
      }
    },
    /**
     * 根据索引移除组件
     * @param index 索引
     * @returns 移除结果
     */
    removeComponent(index: number, parent: Optional<BaseComponent>) {
      if (parent && parent.subComponents) {
        parent.subComponents.splice(index, 1)
      } else {
        this.componentData.splice(index, 1)
      }
      this.saveComponentData()
    },
    getComponentByIndex(indexs: readonly number[]): Optional<BaseComponent> {
      const firstIndex = indexs[0]
      if (firstIndex === undefined || firstIndex < 0 || firstIndex >= this.componentData.length) {
        return undefined
      }

      let rootComponent = this.componentData[firstIndex]
      indexs.slice(1).forEach((el: number) => {
        rootComponent = rootComponent.subComponents
          ? rootComponent.subComponents[el]
          : rootComponent
      })
      return rootComponent
    },
    saveComponentData() {
      window.localStorage.setItem('canvasData', JSON.stringify(this.layoutData))
      new Promise((resolve) => {
        resolve(snapShotStore.saveSnapshot(this.layoutData, this.canvasStyleData))
      })
    },
    cutComponent(index: number, parent: Optional<BaseComponent>): Optional<BaseComponent> {
      let componentData = this.componentData
      if (parent && parent.subComponents) {
        componentData = parent.subComponents
      }

      if (index < componentData.length && index >= 0) {
        const components: BaseComponent[] = componentData.splice(index, 1)
        if (parent) {
          components[0].groupStyle = undefined
          this.resizeAutoComponent(parent)
        }
        this.saveComponentData()
        return components[0]
      }
    },
    insertComponent(
      index: number,
      insertComponent: BaseComponent,
      parent: Optional<BaseComponent>
    ): void {
      let componentData = this.componentData
      if (parent && parent.subComponents) {
        componentData = parent.subComponents
      }

      if (index < componentData.length && index >= 0) {
        componentData.splice(index, 0, insertComponent)
        if (parent) {
          this.resizeAutoComponent(parent)
        }
      }
      this.saveComponentData()
    },
    /**
     * 重新自动调整组件尺寸
     * @param component
     */
    resizeAutoComponent(parentComponent: Optional<BaseComponent>): void {
      if (parentComponent && parentComponent.component === 'Group') {
        const parentStyle = parentComponent.positionStyle
        const { top, left, height, width } = calcComponentsRect(parentComponent.subComponents)
        if (
          top === parentStyle.top &&
          left === parentStyle.left &&
          height === parentStyle.height &&
          width === parentStyle.width
        ) {
          return
        } else {
          const newGroupStyle = { ...parentStyle, top, left, height, width }
          for (const key in newGroupStyle) {
            parentComponent.change(key, newGroupStyle[key])
          }
          parentComponent.subComponents?.forEach((el: BaseComponent) => {
            const gStyle = {
              gleft: toPercent((el.positionStyle.left - newGroupStyle.left) / newGroupStyle.width),
              gtop: toPercent((el.positionStyle.top - newGroupStyle.top) / newGroupStyle.height),
              gwidth: toPercent(el.positionStyle.width / newGroupStyle.width),
              gheight: toPercent(el.positionStyle.height / newGroupStyle.height),
              grotate: el.positionStyle.rotate
            }
            el.groupStyle = gStyle
          })
          if (parentComponent.parent) {
            this.resizeAutoComponent(parentComponent.parent)
          }
        }
      }
    },
    /**
     * 取消组件间的组合
     * @returns
     */
    decompose() {
      if (!(this.curComponent && this.curComponent.component === 'Group')) return
      const components: BaseComponent[] = cloneDeep(this.curComponent.subComponents)
      if (components.length > 0) {
        const index: number = this.getComponentIndexById(
          this.curComponent.id,
          this.curComponent.parent
        )
        this.removeComponent(index, this.curComponent.parent)
        const parentComponent = this.curComponent.parent
        if (parentComponent) {
          const parentStyle: DOMRectStyle = parentComponent.positionStyle
          components.forEach((item: BaseComponent) => {
            item.groupStyle = {
              gleft: toPercent((item.positionStyle.left - parentStyle.left) / parentStyle.width),
              gtop: toPercent((item.positionStyle.top - parentStyle.top) / parentStyle.height),
              gwidth: toPercent(item.positionStyle.width / parentStyle.width),
              gheight: toPercent(item.positionStyle.height / parentStyle.height),
              grotate: item.positionStyle.rotate
            }
            parentComponent?.addComponent([item])
          })
        } else {
          components.forEach((item) => {
            item.groupStyle = undefined
            item.parent = undefined
            this.appendComponent(item)
          })
        }
      }
      this.saveComponentData()
    }
  }
})

// Need to be used outside the setup
export function useBasicStoreWithOut() {
  return useBasicStore(store)
}
