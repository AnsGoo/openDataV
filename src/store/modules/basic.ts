import { defineStore } from 'pinia'
import store from '@/store'
import type { EditData, CanvasStyleData, Postion } from '@/types/storeTypes'
import type { LayoutData } from '@/types/apiTypes'
import type { ComponentInfo, GroupStyle } from '@/types/component'
import { EditMode } from '@/enum'
import { eventBus } from '@/bus/useEventBus'
import { calcComponentsRect, mod360, rotatePoint, swap, toPercent, uuid } from '@/utils/utils'
import { message } from '@/utils/message'
import { useSnapShotStoreWithOut } from './snapshot'
import { cloneDeep } from 'lodash'
import { Vector } from '@/types/common'

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
    activeIndex: undefined,
    curComponent: undefined,
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
    setCurComponent(component: ComponentInfo | undefined, index: string | undefined): void {
      this.curComponent = component
      this.activeIndex = index
    },

    /**
     * 同步当前组件的位置
     * @param postion 位置
     * @returns
     */
    syncComponentLoction(postion: Postion, parentComponent?: ComponentInfo): void {
      if (!this.curComponent) {
        return
      }
      const styleKyes = ['top', 'left', 'width', 'height', 'rotate']
      const ablePostion: Postion = {}
      const style = this.curComponent!.style
      styleKyes.forEach((el) => {
        if (postion[el] != undefined) {
          ablePostion[el] = postion[el]
        }
      })
      if (parentComponent) {
        const parentStyle = parentComponent.style
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
          left: ablePostion.left !== undefined ? ablePostion.left : style.left,
          top: ablePostion.top !== undefined ? ablePostion.top : style.top,
          width: ablePostion.width !== undefined ? ablePostion.width : style.width,
          height: ablePostion.height !== undefined ? ablePostion.height : style.height,
          rotate: ablePostion.rotate !== undefined ? ablePostion.rotate! : style.rotate
        }
        this.curComponent.groupStyle = gStyle
        this.curComponent!.style = { ...style, ...newStyle }
      } else {
        this.curComponent!.style = { ...style, ...ablePostion }
      }
      if (this.curComponent.subComponents) {
        this.resizeChildenComponent(this.curComponent.subComponents, this.curComponent)
      }

      this.saveComponentData()

      eventBus.emit('changeStyle', {
        id: this.curComponent!.id,
        style: { ...postion }
      })
    },

    /**
     * 重新自动调整组件尺寸
     * @param component
     */
    resizeAutoComponent(indexs: number[]): void {
      const parentComponent = this.getComponentByIndex(indexs)
      if (parentComponent && parentComponent.component === 'Group') {
        const parentStyle = cloneDeep(parentComponent.style)
        const { top, left, height, width } = calcComponentsRect(parentComponent.subComponents!)
        if (
          top === parentStyle.top &&
          left === parentStyle.left &&
          height === parentStyle.height &&
          width === parentStyle.width
        ) {
          return
        } else {
          const newGroupStyle = { ...parentStyle, top, left, height, width }
          parentComponent.style = newGroupStyle
          parentComponent.subComponents?.forEach((el: ComponentInfo) => {
            const myStyle = el.style
            const gStyle = {
              gleft: toPercent((myStyle.left! - newGroupStyle.left) / newGroupStyle.width),
              gtop: toPercent((myStyle.top! - newGroupStyle.top) / newGroupStyle.height),
              gwidth: toPercent(myStyle.width! / newGroupStyle.width),
              gheight: toPercent(myStyle.height! / newGroupStyle.height),
              grotate: myStyle.rotate!
            }
            el.groupStyle = gStyle
          })
          this.saveComponentData()
          eventBus.emit('changeStyle', {
            id: parentComponent!.id,
            style: { top, left, height, width }
          })
          indexs.pop()
          if (indexs.length > 0) {
            this.resizeAutoComponent(indexs)
          }
        }
      }
    },
    resizeChildenComponent(components: ComponentInfo[], parentComponent: ComponentInfo): void {
      const parentStyle = parentComponent.style
      components.forEach((el: ComponentInfo) => {
        const groupStyle: GroupStyle = el.groupStyle!
        const center: Vector = {
          y: parentStyle.top + parentStyle.height / 2,
          x: parentStyle.left + parentStyle.width / 2
        }
        const { top, left, height, width, rotate } = {
          top: parentStyle.top + (parentStyle.height * groupStyle.gtop) / 100,
          left: parentStyle.left + (parentStyle.width * groupStyle.gleft) / 100,
          height: (parentStyle.height * groupStyle.gheight) / 100,
          width: (parentStyle.width * groupStyle.gwidth) / 100,
          rotate: mod360(parentStyle.rotate + (groupStyle.grotate || 0))
        }
        const point: Vector = {
          y: top + height / 2,
          x: left + width / 2
        }

        const afterPoint: Vector = rotatePoint(point, center, parentStyle.rotate)
        el.style = {
          ...el.style,
          top: Math.round(afterPoint.y - height / 2),
          left: Math.round(afterPoint.x - width / 2),
          height: Math.round(height),
          width: Math.round(width),
          rotate
        }
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
      const curComponent = this.curComponent
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
      const curComponent = this.curComponent
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
      const curComponent = this.curComponent
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
     * 清空画布
     */
    clearCanvas(): void {
      this.componentData = []
      this.curComponent = undefined
      this.isShowEm = false
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
          message.info('图层已经到底了')
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
          message.info('图层已经到顶了')
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
          message.info('图层已经到顶了')
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
        message.info('图层已经到底了')
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
    /**
     * 显示组件
     * @param index  组件索引
     */
    showComponent(index: string): void {
      const indexs: number[] = index.split('-').map((i) => Number(i))
      const component: ComponentInfo = this.getComponentByIndex(indexs)
      component.display = true
    },
    /**
     * 隐藏组件
     * @param index 组件索引
     */
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
    },
    cutComponent(index: string): ComponentInfo | undefined {
      const indexs: number[] = index.split('-').map((i) => Number(i))
      const myindex: number = indexs.pop() as number
      const fatherComponent: ComponentInfo = this.getComponentByIndex(indexs)
      if (fatherComponent && fatherComponent.subComponents) {
        const components: ComponentInfo[] = fatherComponent.subComponents.splice(myindex, 1)
        const component: ComponentInfo = components[0]
        if (fatherComponent.component === 'Root') {
          return component
        } else if (fatherComponent.component === 'Group') {
          component.groupStyle = undefined
          this.resizeAutoComponent(indexs)
          return component
        }
      }
    },
    insertComponent(index: string, component: ComponentInfo): void {
      const indexs: number[] = index.split('-').map((i) => Number(i))
      const myindex: number = indexs.pop() as number
      const fatherComponent: ComponentInfo = this.getComponentByIndex(indexs)
      if (fatherComponent && fatherComponent.subComponents) {
        if (fatherComponent.component === 'Root') {
          fatherComponent.subComponents.splice(myindex, 0, component)
        } else if (fatherComponent.component === 'Group') {
          fatherComponent.subComponents.splice(myindex, 0, component)
          this.resizeAutoComponent(indexs)
        }
      }
    }
  }
})

// Need to be used outside the setup
export function useBasicStoreWithOut() {
  return useBasicStore(store)
}
