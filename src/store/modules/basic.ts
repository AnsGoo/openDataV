import { defineStore } from 'pinia'
import store from '@/store'
import type { EditData, CanvasStyleData, Postion } from '@/types/storeTypes'
import type { LayoutData } from '@/types/apiTypes'
import type { ComponentInfo } from '@/types/component'
import { EditMode } from '@/enum'
import { eventBus } from '@/bus/useEventBus'
import { swap, uuid } from '@/utils/utils'
import { Message } from '@/utils/message'
import { useSnapShotStoreWithOut } from './snapshot'

const snapShotStore = useSnapShotStoreWithOut()

const baseCanvasStyleData: CanvasStyleData = {
  width: 1920,
  height: 1080,
  scale: 100,
  dataWs: '',
  image: (import.meta.env.VITE_BACKGROUND as string) || '/images/bg.jpg'
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
    curComponent: undefined,
    isClickComponent: false,
    isShowEm: false, // 是否显示控件坐标
    layerComponent: undefined,
    ids: new Set()
  }),
  getters: {
    isEditMode(): boolean {
      return this.editMode === EditMode.EDIT
    },
    canvasData(): CanvasStyleData {
      return new Proxy(this.canvasStyleData, storeCanvasHandler)
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

    /**
     * 设置当前组件
     * @param component 当前组件
     * @param index
     */
    setCurComponent(component: any): void {
      this.curComponent = component
      this.layerComponent = undefined
    },

    /**
     * 同步当前组件的位置
     * @param postion 位置
     * @returns
     */
    syncComponentLoction(postion: Postion): void {
      if (!this.curComponent) {
        return
      }
      const styleKyes = ['top', 'left', 'width', 'height', 'rotate']
      const ablePostion = {}
      const style = this.curComponent!.style
      styleKyes.forEach((el) => {
        if (postion[el] != undefined) {
          ablePostion[el] = postion[el]
        }
      })
      this.curComponent!.style = { ...style, ...ablePostion }
      this.saveComponentData()

      eventBus.emit('changeStyle', {
        id: this.curComponent!.id,
        style: { ...postion }
      })
    },

    /**
     * 设置单个组件的样式属性
     * @param param0 样式
     * @returns
     */
    setComponentSingleStyle({ key, value }): void {
      if (!this.curComponent) {
        return
      }

      this.curComponent.style[key] = value
      this.saveComponentData()

      eventBus.emit('changeStyle', {
        id: this.curComponent.id,
        style: { [key]: value }
      })
    },
    /**
     * 重置组件数据ID
     * @param componentData 需要被重置的组件数据
     * @param ids
     * @param isUpdate
     */
    resetComponentData(componentData: Array<ComponentInfo>) {
      componentData.forEach((item: ComponentInfo) => {
        // 重置组件 ID

        if (this.ids.has(item.id!)) {
          item.id = uuid()
        }
        // 添加 rotate
        if (item.style.rotate === undefined) {
          item.style.rotate = 0
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
    setComponentData(componentData: Array<ComponentInfo> = []): void {
      this.resetComponentData(componentData)
      this.componentData = componentData
    },
    /**
     * 想画布中添加组件
     * @param component 组件
     */
    appendComponent(component: ComponentInfo): void {
      component.id = uuid()
      // 如果没有 rotate 属性，就添加一个属性
      if (component.style.rotate === undefined) {
        component.style.rotate = 0
      }
      if (component.subComponents) {
        this.resetComponentData(component.subComponents)
      }
      this.componentData.push(component)
      this.saveComponentData()
    },
    /**
     * 设置当前组件的PropValue
     * @param key 属性
     * @param value 值
     * @returns
     */
    setCurComponentPropValue(key: string, value: any): void {
      const curComponent = this.curComponent || this.layerComponent
      if (!curComponent || !curComponent.propValue) {
        return
      }
      curComponent.propValue[key] = value
      this.saveComponentData()
      eventBus.emit(curComponent.component + curComponent.id, { key: key, value: value })
    },
    /**
     * 设置当前组件的样式
     * @param key 属性
     * @param value 值
     * @returns
     */
    setCurComponentStyle(key: string, value: any): void {
      const groupStyleKeys = ['gtop', 'gleft', 'gweight', 'gheight', 'grotate']
      const curComponent = this.curComponent || this.layerComponent
      if (!curComponent) {
        return
      }

      if (curComponent.groupStyle && groupStyleKeys.includes(key)) {
        curComponent.groupStyle[key] = value
        this.saveComponentData()
        return
      }
      curComponent.style[key] = value
      this.saveComponentData()
    },
    /**
     * 设置组件的属性值
     * @param key 属性
     * @param value 值
     * @returns
     */
    setCurComponentProps(key: string, value: any): void {
      const curComponent = this.curComponent || this.layerComponent
      if (!curComponent) {
        return
      }
      curComponent[key] = value
      this.saveComponentData()
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
      this.curComponent = undefined
      this.layerComponent = component
    },
    /**
     * 清空画布
     */
    clearCanvas(): void {
      this.componentData = []
      this.curComponent = undefined
      this.isClickComponent = false
      this.isShowEm = false
      this.layerComponent = undefined
      this.canvasStyleData = baseCanvasStyleData
    },
    /**
     * 根据组件索引获取该组件的父级组件
     * @param indexs
     * @returns
     */
    getParentComponentData(indexs: number[]): ComponentInfo[] | undefined {
      let rootComponent: ComponentInfo = {
        subComponents: this.componentData,
        component: 'Root',
        display: false,
        style: {
          width: 0,
          height: 0,
          left: 0,
          top: 0,
          rotate: 0
        },
        id: '',
        label: '',
        icon: ''
      }
      indexs.forEach((el: number) => {
        rootComponent = rootComponent.subComponents
          ? rootComponent.subComponents[el]
          : rootComponent
      })
      return rootComponent.subComponents
    },
    /**
     * 组件图层下移
     * @param index 组件索引
     */
    downComponent(index: string) {
      const indexs: number[] = index.split('-').map((i) => Number(i))
      const myindex: number = indexs.pop() as number
      const fatherComponentData: Array<ComponentInfo> | undefined =
        this.getParentComponentData(indexs)
      if (fatherComponentData) {
        if (myindex > 0) {
          swap(fatherComponentData, myindex, myindex - 1)
          this.saveComponentData()
        } else {
          Message('图层已经到底了')
        }
      }
    },
    /**
     * 组件图层上移
     * @param index 组件索引
     */
    upComponent(index: string) {
      const indexs: number[] = index.split('-').map((i) => Number(i))
      const myindex: number = indexs.pop() as number
      const fatherComponentData: Array<ComponentInfo> | undefined =
        this.getParentComponentData(indexs)
      if (fatherComponentData) {
        const len: number = fatherComponentData.length
        if (myindex < len - 1) {
          swap(fatherComponentData, myindex, myindex + 1)
          this.saveComponentData()
        } else {
          Message('图层已经到顶了')
        }
      }
    },

    /**
     * 组件图层置顶
     * @param index 组件索引
     */
    topComponent(index: string) {
      const indexs: Array<number> = index.split('-').map((i) => Number(i))
      const myindex: number = indexs.pop() as number
      const fatherComponentData: Array<ComponentInfo> | undefined =
        this.getParentComponentData(indexs)
      if (fatherComponentData) {
        const len: number = fatherComponentData.length
        if (myindex < len - 1) {
          const myComponments: ComponentInfo[] = fatherComponentData.splice(myindex, 1)
          fatherComponentData.push(myComponments[0])
          this.saveComponentData()
        } else {
          Message('图层已经到顶了')
        }
      }
    },
    /**
     * 组件图层置底
     * @param index 组件索引
     */
    bottomComponent(index: string) {
      const indexs: number[] = index.split('-').map((i) => Number(i))
      const myindex: number = indexs.pop() as number
      const fatherComponentData: Array<ComponentInfo> | undefined =
        this.getParentComponentData(indexs)
      if (fatherComponentData && myindex > 0) {
        const myComponments: ComponentInfo[] = fatherComponentData.splice(myindex, 1)
        fatherComponentData.unshift(myComponments[0])
        this.saveComponentData()
      } else {
        Message('图层已经到底了')
      }
    },
    /**
     * 根据索引移除组件
     * @param index 索引
     * @returns 移除结果
     */
    removeComponent(index: string): boolean {
      const indexs: number[] = index.split('-').map((i) => Number(i))
      const myindex: number = indexs.pop() as number
      const fatherComponentData: Array<ComponentInfo> | undefined =
        this.getParentComponentData(indexs)
      if (fatherComponentData) {
        fatherComponentData.splice(myindex, 1)
        this.saveComponentData()

        return true
      }
      return false
    },
    showComponent(index: string): void {
      const indexs: number[] = index.split('-').map((i) => Number(i))
      const component: ComponentInfo = this.getComponentByIndex(indexs)
      component.display = true
    },
    hiddenComponent(index: string): void {
      const indexs: number[] = index.split('-').map((i) => Number(i))
      const component: ComponentInfo = this.getComponentByIndex(indexs)
      component.display = false
    },
    getComponentByIndex(indexs: number[]): ComponentInfo {
      let rootComponent: ComponentInfo = {
        subComponents: this.componentData,
        display: false,
        component: 'Root',
        style: {
          width: 0,
          left: 0,
          top: 0,
          height: 0,
          rotate: 0
        },
        id: '',
        label: '',
        icon: ''
      }
      indexs.forEach((el: number) => {
        rootComponent = rootComponent.subComponents
          ? rootComponent.subComponents[el]
          : rootComponent
      })
      return rootComponent
    },
    saveComponentData() {
      // storageComponentData.value = JSON.stringify(this.componentData)
      window.localStorage.setItem('canvasData', JSON.stringify(this.componentData))
      new Promise((resolve) => {
        resolve(snapShotStore.saveSnapshot(this.componentData, this.canvasStyleData))
      })
    }
  }
})

// Need to be used outside the setup
export function useBasicStoreWithOut() {
  return useBasicStore(store)
}
