import { defineStore } from 'pinia'
import store from '@/store'
import type { EditData, CanvasStyleData, Postion } from '@/types/storeTypes'
import type { LayoutData } from '@/types/apiTypes'
import { EditMode } from '@/enum'
import { eventBus } from '@/bus/useEventBus'
import { swap, uuid } from '@/utils/utils'
import { message } from '@/utils/message'
import { useSnapShotStoreWithOut } from './snapshot'
import { BaseComponent, createComponent } from '@/resource/models'

const snapShotStore = useSnapShotStoreWithOut()

const baseCanvasStyleData: CanvasStyleData = {
  width: 1920,
  height: 1080,
  scale: 100,
  dataWs: '',
  image: (import.meta.env.VITE_BACKGROUND as string) || '/images/bg.png'
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
    setCurComponent(component: BaseComponent | undefined): void {
      this.curComponent = component
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

      for (const key in ablePostion) {
        this.curComponent.change(key, ablePostion[key])
      }

      this.saveComponentData()
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

      this.curComponent.change(key, value)
      this.saveComponentData()
    },
    /**
     * 重置组件数据ID
     * @param componentData 需要被重置的组件数据
     * @param ids
     * @param isUpdate
     */
    resetComponentData(componentData: Array<BaseComponent>) {
      componentData.forEach((item: BaseComponent) => {
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
    setComponentData(componentData: Record<string, string | number | boolean>[] = []): void {
      this.componentData = []
      componentData.forEach((item) => {
        this.componentData.push(createComponent(item))
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
      this.componentData.push(component)
      this.saveComponentData()
    },
    /**
     * 设置当前组件的PropValue
     * @param key 属性
     * @param value 值
     * @returns
     */
    setCurComponentPropValue(form: string, key: string, value: any): void {
      const curComponent = this.curComponent
      if (!curComponent || !curComponent.propValue) {
        return
      }
      curComponent.change(form, key, value)
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
        this.saveComponentData()
        return
      }
      this.curComponent.change(key, value)
      this.saveComponentData()
    },

    getComponentIndexById(id: string): number {
      for (let i = 0; i < this.componentData.length; ++i) {
        const item: BaseComponent = this.componentData[i]
        if (item.id === id) {
          return i
        }
      }
      return -1
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
     * 根据组件索引获取该组件的父级组件
     * @param indexs
     * @returns
     */
    getParentComponentData(indexs: number[]): BaseComponent[] | undefined {
      let rootComponent: BaseComponent = {
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
    downComponent(index: number, parent: BaseComponent | undefined) {
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
    upComponent(index: number, parent: BaseComponent | undefined) {
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
    topComponent(index: number, parent: BaseComponent | undefined) {
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
    bottomComponent(index: number, parent: BaseComponent | undefined) {
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
    removeComponent(index: number, parent: BaseComponent | undefined) {
      console.log(2222, this.componentData)
      if (parent && parent.subComponents) {
        parent.subComponents.slice(index, 1)
      } else {
        this.componentData.slice(index, 1)
        console.log(this.componentData)
      }
      this.saveComponentData()
    },
    showComponent(index: string): void {
      const indexs: number[] = index.split('-').map((i) => Number(i))
      const component: BaseComponent = this.getComponentByIndex(indexs)
      component.change('display', true)
    },
    hiddenComponent(index: string): void {
      const indexs: number[] = index.split('-').map((i) => Number(i))
      const component: BaseComponent = this.getComponentByIndex(indexs)
      component.change('display', false)
    },
    getComponentByIndex(indexs: number[]): BaseComponent {
      let rootComponent: BaseComponent = {
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
      // window.localStorage.setItem('canvasData', JSON.stringify(this.componentData))
      // new Promise((resolve) => {
      //   resolve(snapShotStore.saveSnapshot(this.componentData, this.canvasStyleData))
      // })
    }
  }
})

// Need to be used outside the setup
export function useBasicStoreWithOut() {
  return useBasicStore(store)
}
