import type { CustomComponent, DataInstance, MetaContainerItem } from '@open-data-v/base'
import {
  buildModeValue,
  ContainerType,
  eventBus,
  FormType,
  updateModeValue
} from '@open-data-v/base'
import { cloneDeep } from 'lodash-es'
import type { Component } from 'vue'
import { reactive } from 'vue'

import { EditMode, PixelEnum } from '../enum'
import { DataSlotter } from '../state'
import type { ComponentDataType, DOMRectStyle, GroupStyle, Vector } from '../type'
import {
  calcComponentsRect,
  createComponent,
  handleLogger,
  mod360,
  rotatePoint,
  swap,
  toPercent,
  uuid
} from '../utils'
import useDataState from './data'
import useSnapShotState from './snapshot'
import type { CanvasData, CanvasStyleConfig, CanvasStyleData, LayoutData } from './type'
import { singleton } from './utils'

const dataState = useDataState()

const snapShotState = useSnapShotState()

const baseCanvasStyleData: CanvasStyleData = {
  width: window.screen.width,
  height: window.screen.height,
  background: { backgroundColor: '#272e3b' },
  extraAttrs: {}
}

const pixels = [
  { label: '本设备', value: `${window.screen.width}X${window.screen.height}` },
  ...PixelEnum
]
const baseCanvasStyleConfig: Array<MetaContainerItem> = [
  {
    label: '基本配置',
    prop: 'basic',
    children: [
      {
        prop: 'pixel',
        label: '分辨率',
        type: FormType.SELECT,
        props: {
          options: pixels,
          defaultValue: `${window.screen.width}X${window.screen.height}`
        }
      },
      {
        prop: 'width',
        label: '宽度',
        type: FormType.NUMBER,
        props: {
          defaultValue: window.screen.width
        }
      },
      {
        prop: 'height',
        label: '高度',
        type: FormType.NUMBER,
        props: {
          defaultValue: window.screen.height
        }
      },
      {
        prop: 'background',
        label: '背景',
        type: FormType.BACKGROUND,
        props: {
          defaultValue: { backgroundColor: '#272e3b' }
        }
      }
    ]
  }
]

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

class CanvasState {
  public state = reactive<CanvasData>({
    name: '',
    thumbnail: '',
    editMode: EditMode.PREVIEW,
    canvasStyleData: new Proxy(baseCanvasStyleData, storeCanvasHandler),
    componentData: [],
    activeIndex: undefined,
    activeComponent: undefined,
    isShowEm: false, // 是否显示控件坐标
    ids: new Set(),
    benchmarkComponent: undefined,
    components: {},
    globalSlotters: {},
    darkTheme: true,
    scale: 1,
    canvasStyleConfig: {
      formItems: baseCanvasStyleConfig,
      mode: ContainerType.CARD
    }
  })

  public componentMetaMap: Map<
    string,
    {
      name: string
      title: string
      category: string
      icon?: string
      size: {
        width: number
        height: number
      }
      dataMode?: string
      panel: Component
    }
  > = new Map()

  private componentMap: Map<string, CustomComponent> = new Map()
  constructor(config?: CanvasStyleConfig) {
    const extraStyles = config
      ? config
      : {
          formItems: [],
          mode: ContainerType.CARD
        }

    this.state.canvasStyleConfig.formItems = [
      ...baseCanvasStyleConfig,
      ...(extraStyles.formItems || [])
    ]
    this.state.canvasStyleConfig.mode = extraStyles.mode
    this.rebuildCanvasExtraStyle(extraStyles.formItems || [])
  }

  get canvasStyleConfig(): CanvasStyleConfig {
    return this.state.canvasStyleConfig
  }

  get darkTheme(): boolean {
    return this.state.darkTheme
  }
  set darkTheme(isDark: boolean) {
    this.state.darkTheme = isDark
  }

  get components() {
    return this.state.components
  }
  public loadComponent(name: string, componentInfo: any, panel?: Component): void {
    this.componentMetaMap.set(name, {
      ...componentInfo,
      panel: panel
    })
  }

  get globalSlotters() {
    return this.state.globalSlotters
  }
  get globalOption() {
    return {
      basic: {
        width: this.canvasStyleData.width,
        height: this.canvasStyleData.height,
        background: this.canvasStyleData.background
      },
      ...this.canvasStyleData.extraAttrs
    }
  }

  get isShowEm(): boolean {
    return this.state.isShowEm
  }
  set isShowEm(isShowEm: boolean) {
    this.state.isShowEm = isShowEm
  }

  get scale(): number {
    return this.state.scale
  }
  set scale(scale: number) {
    this.state.scale = scale
  }

  get benchmarkComponent(): Optional<CustomComponent> {
    return this.state.benchmarkComponent
  }
  set benchmarkComponent(benchmarkComponent: Optional<CustomComponent>) {
    this.state.benchmarkComponent = benchmarkComponent
  }

  private get ids(): Set<string> {
    return this.state.ids
  }
  private set ids(ids: Set<string>) {
    this.state.ids = ids
  }

  /**
   * @deprecated
   * 请使用 activeComponent 属性
   */
  get curComponent(): Optional<CustomComponent> {
    return this.state.activeComponent
  }
  private set curComponent(component: Optional<CustomComponent>) {
    this.state.activeComponent = component
  }

  get activeComponent(): Optional<CustomComponent> {
    return this.state.activeComponent
  }
  private set activeComponent(component: Optional<CustomComponent>) {
    this.state.activeComponent = component
  }

  get componentData(): CustomComponent[] {
    return this.state.componentData
  }
  set componentData(componentData: CustomComponent[]) {
    this.state.componentData = componentData
  }

  get activeIndex(): string | undefined {
    return this.state.activeIndex
  }
  set activeIndex(activeIndex: string | undefined) {
    this.state.activeIndex = activeIndex
  }

  get canvasStyleData(): CanvasStyleData {
    return this.state.canvasStyleData
  }
  set canvasStyleData(canvasStyleData: CanvasStyleData) {
    this.state.canvasStyleData = canvasStyleData
  }
  get thumbnail(): string {
    return this.state.thumbnail
  }
  set thumbnail(thumbnail: string) {
    this.state.thumbnail = thumbnail
  }
  get editMode(): EditMode {
    return this.state.editMode
  }
  set editMode(editMode: EditMode) {
    this.state.editMode = editMode
  }

  get name(): string {
    return this.state.name
  }
  set name(name: string) {
    this.state.name = name
  }
  get layoutData(): ComponentDataType[] {
    const result: ComponentDataType[] = []
    this.componentData.forEach((item) => {
      result.push(item.toJson())
    })
    // eslint-disable-next-line prettier/prettier
    return result
  }
  get isEditMode(): boolean {
    return this.editMode === EditMode.EDIT
  }
  get canvasData(): CanvasStyleData {
    return new Proxy(this.canvasStyleData, storeCanvasHandler)
  }

  private resolveCanvasData(canvasData) {
    canvasData.forEach((el) => {
      if (el.subComponents) {
        this.resolveCanvasData(el.subComponents)
      }
    })
  }
  async setLayoutData(data: LayoutData) {
    this.resolveCanvasData(data.canvasData)
    this.name = data.name || ''
    this.thumbnail = data.thumbnail || ''
    if (data.canvasData) {
      this.setComponentData(data.canvasData)
    }

    if (data.canvasStyle) {
      this.canvasStyleData = data.canvasStyle
    }
    if (data.dataSlotters) {
      const keys = Object.keys(this.globalSlotters)
      keys.forEach((el) => {
        this.remveDataSlotter(el)
      })
      data.dataSlotters.forEach((el) => {
        const plugin = dataState.getPlugin(el.type)
        if (plugin) {
          const { options } = el.config!
          const dataInstance = new plugin.handler(options)
          this.appendDataSlotter(el.type, dataInstance)
        } else {
          console.log(`${el.type}插件不存在`)
        }
      })
    }
  }

  setCanvasStyle(keys: Array<string>, val: any) {
    if (keys.length === 2 && keys[0] === 'basic') {
      if (keys[1] === 'pixel') {
        const pixels = val.split('X')
        this.canvasData.height = parseInt(pixels[1])
        this.canvasData.width = parseInt(pixels[0])
      } else {
        this.canvasData[keys[1]] = val
      }
    } else {
      const extraAttrs = this.canvasData.extraAttrs
      updateModeValue(extraAttrs, keys, val)
    }
    this.saveComponentData()
  }
  rebuildCanvasExtraStyle(formItems: MetaContainerItem[]) {
    const basicAttrs: {
      width?: number
      height?: number
      background?: any
    } = {}
    buildModeValue(baseCanvasStyleConfig, basicAttrs)
    this.canvasStyleData.width = basicAttrs.width || window.screen.width
    this.canvasStyleData.height = basicAttrs.height || window.screen.height
    this.canvasStyleData.background = basicAttrs.background || { backgroundColor: '#272e3b' }
    const extraAttrs = {}
    buildModeValue(formItems, extraAttrs)
    this.canvasStyleData.extraAttrs = extraAttrs
  }

  setEditMode(mode: EditMode): void {
    this.editMode = mode
  }
  setScale(value: number) {
    this.scale = value / 100
  }
  toggleShowEm(): void {
    this.isShowEm = !this.isShowEm
  }
  setName(name: string): void {
    this.name = name
  }

  /**
   * @deprecated 请使用 activateComponent方法
   * 设置当前组件
   * @param component 当前组件
   * @param index
   */
  setCurComponent(component: Optional<CustomComponent>, index?: string): void {
    this.activateComponent(component, index)
  }

  /**
   * 激活当前组件
   * @param component 当前组件
   * @param index
   */
  activateComponent(component: Optional<CustomComponent>, index?: string): void {
    // 设置前清理当前
    if (this.activeComponent) {
      this.activeComponent.active = false
    }
    this.activeComponent = component
    this.activeIndex = index
    if (this.activeComponent) {
      this.activeComponent.active = true
      this.benchmarkComponent = this.activeComponent.parent
    }
  }

  /**
   * 取消组件的激活状态
   * @param component 当前组件
   * @param index
   */
  deactivateComponent(): void {
    // 设置前清理当前
    if (this.activeComponent) {
      this.activeComponent.active = false
    }
    this.activeComponent = undefined
    this.activeIndex = undefined
  }

  /**
   * 同步当前组件的位置
   * @param position 位置
   * @param parentComponent 父组件
   * @param isSave 是否保存
   * @returns
   */
  syncComponentLocation(
    position: Partial<DOMRectStyle>,
    parentComponent?: CustomComponent,
    isSave = true
  ): void {
    if (!this.activeComponent) {
      return
    }
    const styleKeys = ['top', 'left', 'width', 'height', 'rotate']
    const ablePosition: Partial<DOMRectStyle> = {}
    styleKeys.forEach((el) => {
      if (position[el] != undefined) {
        ablePosition[el] = position[el]
      }
    })
    if (parentComponent) {
      const parentPosition = parentComponent.position
      const groupStyle = this.activeComponent.groupStyle!
      const gStyle = {
        gleft:
          ablePosition.left !== undefined
            ? toPercent((ablePosition.left! - parentPosition.left) / parentPosition.width)
            : groupStyle.gleft,
        gtop:
          ablePosition.top !== undefined
            ? toPercent((ablePosition.top! - parentPosition.top) / parentPosition.height)
            : groupStyle.gtop,
        gwidth:
          ablePosition.width !== undefined
            ? toPercent(ablePosition.width! / parentPosition.width)
            : groupStyle.gwidth,
        gheight:
          ablePosition.height !== undefined
            ? toPercent(ablePosition.height! / parentPosition.height)
            : groupStyle.gheight,
        grotate: ablePosition.rotate !== undefined ? ablePosition.rotate! : groupStyle.grotate
      }
      const newStyle = {
        left:
          ablePosition.left !== undefined ? ablePosition.left : this.activeComponent.position.left,
        top: ablePosition.top !== undefined ? ablePosition.top : this.activeComponent.position.top,
        width:
          ablePosition.width !== undefined
            ? ablePosition.width
            : this.activeComponent.position.width,
        height:
          ablePosition.height !== undefined
            ? ablePosition.height
            : this.activeComponent.position.height,
        rotate:
          ablePosition.rotate !== undefined
            ? ablePosition.rotate!
            : this.activeComponent.position.rotate
      }
      this.activeComponent.groupStyle = gStyle
      for (const key in newStyle) {
        this.activeComponent.changePosition(
          key as 'top' | 'left' | 'height' | 'width' | 'rotate',
          newStyle[key]
        )
      }
    } else {
      for (const key in ablePosition) {
        this.activeComponent.changePosition(
          key as 'top' | 'left' | 'height' | 'width' | 'rotate',
          ablePosition[key]
        )
      }
    }

    if (this.activeComponent.subComponents) {
      this.resizeSubComponent(this.activeComponent)
    }
    if (isSave) {
      this.saveComponentData()
    }
  }
  /**
   * 重新调整当前组件的子组件
   * @param component 当前组件
   */
  private resizeSubComponent(component: CustomComponent) {
    if (!component.subComponents) return
    const subComponents = component.subComponents
    const parentPosition = component.position
    subComponents.forEach((el: CustomComponent) => {
      const groupStyle: GroupStyle = el.groupStyle!
      const center: Vector = {
        y: parentPosition.top + parentPosition.height / 2,
        x: parentPosition.left + parentPosition.width / 2
      }
      const { top, left, height, width, rotate } = {
        top: parentPosition.top + (parentPosition.height * groupStyle.gtop) / 100,
        left: parentPosition.left + (parentPosition.width * groupStyle.gleft) / 100,
        height: (parentPosition.height * groupStyle.gheight) / 100,
        width: (parentPosition.width * groupStyle.gwidth) / 100,
        rotate: mod360(parentPosition.rotate + (groupStyle.grotate || 0))
      }
      const point: Vector = {
        y: top + height / 2,
        x: left + width / 2
      }

      const afterPoint: Vector = rotatePoint(point, center, parentPosition.rotate)
      el.changePositions({
        top: Math.round(afterPoint.y - height / 2),
        left: Math.round(afterPoint.x - width / 2),
        height: Math.round(height),
        width: Math.round(width),
        rotate: rotate
      })
    })
  }

  /**
   * 重置组件数据ID
   * @param components 需要被重置的组件数据
   */
  resetComponentData(components: Array<CustomComponent>) {
    components.forEach((item: CustomComponent) => {
      // 重置组件 ID

      if (this.ids.has(item.id!)) {
        item.id = uuid()
      }

      this.ids.add(item.id!)
      this.componentMap.set(item.id!, item)
      if (item.subComponents) {
        this.resetComponentData(item.subComponents)
      }
    })
  }
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
    this.saveComponentData()
  }
  /**
   * 想画布中添加组件
   * @param component 组件
   */
  appendComponent(component: CustomComponent): void {
    if (component.subComponents) {
      this.resetComponentData(component.subComponents)
    }
    component.parent = undefined
    this.componentData.push(component)
    this.componentMap.set(component.id, component)
    this.saveComponentData()
  }
  /**
   * 设置当前组件的PropValue
   * @param component
   * @param keys 属性组
   * @param value 值
   * @param modelValue PropValue 值
   * @returns
   */
  setComponentPropValue(
    component: CustomComponent,
    keys: Array<string>,
    value: any,
    modelValue: Record<string, any>
  ): void {
    component.changeProp(keys, value, modelValue)
    this.saveComponentData()
  }
  getComponentIndexById(id: string, parent: Optional<CustomComponent>): number {
    if (parent) {
      return (parent.subComponents || []).findIndex((item) => item.id === id)
    }
    return this.componentData.findIndex((item) => item.id === id)
  }

  public getComponentById(id: string): CustomComponent | undefined {
    return this.findComponentById(id, this.componentData)
  }

  private findComponentById(id: string, data: Array<CustomComponent>): CustomComponent | undefined {
    const len = data.length
    for (let i = 0; i < len; i++) {
      if (data[i].id === id) {
        return data[i]
      } else {
        const subComponents = data[i].subComponents
        if (subComponents && subComponents.length > 0) {
          return this.findComponentById(id, subComponents)
        }
      }
    }
  }
  /**
   * 清空画布
   */
  clearCanvas(): void {
    this.componentData = []
    this.activeComponent = undefined
    this.isShowEm = false
    this.name = ''
    this.thumbnail = ''
    // this.rebuildCanvasExtraStyle()
    this.canvasStyleData = baseCanvasStyleData
  }
  /**
   * 组件图层下移
   * @param index 组件索引
   * @param parent
   */
  downComponent(index: number, parent: Optional<CustomComponent>) {
    let componentData = this.componentData
    if (parent && parent.subComponents) {
      componentData = parent.subComponents
    }
    if (index > 0) {
      swap(componentData, index, index - 1)
      this.saveComponentData()
    } else {
      handleLogger.warn('图层已经到底了')
    }
  }
  /**
   * 组件图层上移
   * @param index 组件索引
   * @param parent
   */
  upComponent(index: number, parent: Optional<CustomComponent>) {
    let componentData = this.componentData
    if (parent && parent.subComponents) {
      componentData = parent.subComponents
    }

    const len: number = componentData.length
    if (index < len - 1 && index >= 0) {
      swap(componentData, index, index + 1)
      this.saveComponentData()
    } else {
      handleLogger.warn('图层已经到顶了')
    }
  }

  /**
   * 组件图层置顶
   * @param index 组件索引
   * @param parent
   */
  topComponent(index: number, parent: Optional<CustomComponent>) {
    let componentData = this.componentData
    if (parent && parent.subComponents) {
      componentData = parent.subComponents
    }
    const len: number = componentData.length
    if (index < len - 1 && index >= 0) {
      const myComponments: CustomComponent[] = componentData.splice(index, 1)
      componentData.push(myComponments[0])
      this.saveComponentData()
    } else {
      handleLogger.warn('图层已经到顶了')
    }
  }
  /**
   * 组件图层置底
   * @param index 组件索引
   * @param parent
   */
  bottomComponent(index: number, parent: Optional<CustomComponent>) {
    let componentData = this.componentData
    if (parent && parent.subComponents) {
      componentData = parent.subComponents
    }

    if (index > 0) {
      const myComponments: CustomComponent[] = componentData.splice(index, 1)
      componentData.unshift(myComponments[0])
      this.saveComponentData()
    } else {
      handleLogger.warn('图层已经到底了')
    }
  }
  /**
   * 根据索引移除组件
   * @param index 索引
   * @param parent
   * @returns 移除结果
   */
  removeComponent(index: number, parent: Optional<CustomComponent>) {
    if (parent && parent.subComponents) {
      parent.subComponents.splice(index, 1)
    } else {
      this.componentData.splice(index, 1)
    }
    this.saveComponentData()
  }

  getComponentByIndex(indexs: readonly number[]): Optional<CustomComponent> {
    const firstIndex = indexs[0]
    if (firstIndex === undefined || firstIndex < 0 || firstIndex >= this.componentData.length) {
      return undefined
    }

    let rootComponent = this.componentData[firstIndex]
    indexs.slice(1).forEach((el: number) => {
      rootComponent = rootComponent.subComponents ? rootComponent.subComponents[el] : rootComponent
    })
    return rootComponent
  }
  saveComponentData() {
    window.localStorage.setItem('canvasData', JSON.stringify(this.layoutData))
    new Promise((resolve) => {
      resolve(
        snapShotState.saveSnapshot(this.layoutData, this.canvasStyleData, this.dataSlotterData)
      )
    })
  }
  cutComponent(index: number, parent: Optional<CustomComponent>): Optional<CustomComponent> {
    let componentData = this.componentData
    if (parent && parent.subComponents) {
      componentData = parent.subComponents
    }
    if (index < componentData.length && index >= 0) {
      const components: CustomComponent[] = componentData.splice(index, 1)
      if (parent) {
        components[0].groupStyle = undefined
        this.resizeAutoComponent(parent)
      }
      this.saveComponentData()
      return components[0]
    }
  }

  /**
   * 想组件中插入子组件
   * @param index
   * @param insertComponent
   * @param parent
   */
  insertComponent(
    index: number,
    insertComponent: CustomComponent,
    parent: Optional<CustomComponent>
  ): void {
    let componentData = this.componentData
    if (parent && parent.subComponents) {
      componentData = parent.subComponents
      insertComponent.parent = parent
    } else {
      insertComponent.parent = undefined
      insertComponent.groupStyle = undefined
    }
    if (index < componentData.length && index >= 0) {
      componentData.splice(index + 1, 0, insertComponent)
      if (parent) {
        this.resizeAutoComponent(parent)
      }
    }
    this.saveComponentData()
  }
  /**
   * 重新自动调整组件尺寸
   * @param parentComponent
   */
  public resizeAutoComponent(parentComponent: Optional<CustomComponent>): void {
    if (parentComponent && parentComponent.component === 'Group') {
      const parentPosition = parentComponent.position
      const { top, left, height, width } = calcComponentsRect(parentComponent.subComponents!)
      if (
        top === parentPosition.top &&
        left === parentPosition.left &&
        height === parentPosition.height &&
        width === parentPosition.width
      ) {
        return
      } else {
        const newGroupStyle = { ...parentPosition, top, left, height, width }
        for (const key in newGroupStyle) {
          parentComponent.changePosition(
            key as 'top' | 'left' | 'height' | 'width' | 'rotate',
            newGroupStyle[key]
          )
        }
        parentComponent.subComponents?.forEach((el: CustomComponent) => {
          el.groupStyle = {
            gleft: toPercent((el.position.left - newGroupStyle.left) / newGroupStyle.width),
            gtop: toPercent((el.position.top - newGroupStyle.top) / newGroupStyle.height),
            gwidth: toPercent(el.position.width / newGroupStyle.width),
            gheight: toPercent(el.position.height / newGroupStyle.height),
            grotate: el.position.rotate
          }
        })
        if (parentComponent.parent) {
          this.resizeAutoComponent(parentComponent.parent)
        }
      }
    }
  }
  /**
   * 取消组件间的组合
   * @returns
   */
  decompose() {
    if (!(this.activeComponent && this.activeComponent.component === 'Group')) return
    const components: CustomComponent[] = cloneDeep(this.activeComponent.subComponents)
    if (components.length > 0) {
      const index: number = this.getComponentIndexById(
        this.activeComponent.id,
        this.activeComponent.parent
      )
      this.removeComponent(index, this.activeComponent.parent)
      const parentComponent = this.activeComponent.parent
      if (parentComponent) {
        const parentPosition: DOMRectStyle = parentComponent.position
        components.forEach((item: CustomComponent) => {
          item.groupStyle = {
            gleft: toPercent((item.position.left - parentPosition.left) / parentPosition.width),
            gtop: toPercent((item.position.top - parentPosition.top) / parentPosition.height),
            gwidth: toPercent(item.position.width / parentPosition.width),
            gheight: toPercent(item.position.height / parentPosition.height),
            grotate: item.position.rotate
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

  appendDataSlotter(dataType: string, dataInstance?: DataInstance) {
    const acceptor = (result: any) => {
      eventBus.emit('globalData', result)
    }
    const slotter = new DataSlotter({ type: dataType, acceptor, dataInstance })
    this.globalSlotters[uuid()] = slotter
  }

  remveDataSlotter(id: string) {
    const slotter = this.globalSlotters[id]
    if (!slotter) {
      return
    }
    if (slotter.dataInstance && slotter.dataInstance.close) {
      slotter.dataInstance.close
    }
    delete this.state.globalSlotters[id]
  }
  getDataSlotter(id: string) {
    return this.globalSlotters[id]
  }

  get dataSlotterData() {
    const keys = Object.keys(this.globalSlotters)

    const dataSlotters: Array<{ type: string; config: any }> = []
    keys.forEach((el) => {
      const slotter = this.getDataSlotter(el)
      if (!slotter) {
        return
      }
      dataSlotters.push({
        type: slotter.type,
        config: slotter.dataInstance ? slotter.dataInstance.toJSON() : undefined
      })
    })
    return dataSlotters
  }

  getComponentPanel(componentName: string) {
    if (this.componentMetaMap.has(componentName)) {
      return this.componentMetaMap.get(componentName)!.panel
    }
  }
}

const State = singleton(CanvasState)
export default function useCanvasState() {
  return new State({ mode: ContainerType.CARD }) as CanvasState
}
