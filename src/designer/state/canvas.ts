import { cloneDeep } from 'lodash-es'
import { reactive } from 'vue'

import type { LayoutData } from '@/api/pages'
import { ContainerType, EditMode, FormType } from '@/enum'
import PixelEnum from '@/enum/pixel'
import type { CustomComponent } from '@/models'
import { buildModeValue, updateModeValue } from '@/models/utils'
import type { Position, Vector } from '@/types/common'
import type {
  ComponentDataType,
  DOMRectStyle,
  GroupStyle,
  MetaContainerItem
} from '@/types/component'
import type { CanvasStyleConfig, CanvasStyleData, EditData } from '@/types/storeTypes'
import { message } from '@/utils/message'
import { calcComponentsRect, mod360, rotatePoint, swap, toPercent, uuid } from '@/utils/utils'

import { createComponent } from '../utils'
import useSnapShotState from './snapshot'

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
  public state = reactive<EditData>({
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
    benchmarkComponent: undefined,
    globalData: [],
    scale: 1,
    canvasStyleConfig: {
      formItems: baseCanvasStyleConfig,
      mode: ContainerType.CARD
    }
  })
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
  get canvasGlobalData() {
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

  get ids(): Set<string> {
    return this.state.ids
  }
  set ids(ids: Set<string>) {
    this.state.ids = ids
  }

  get isClickComponent(): boolean {
    return this.state.isClickComponent
  }
  set isClickComponent(isClickComponent: boolean) {
    this.state.isClickComponent = isClickComponent
  }

  // @ts-ignore
  get curComponent(): Optional<CustomComponent> {
    return this.state.curComponent
  }
  set curComponent(curComponent: CustomComponent) {
    this.state.curComponent = curComponent
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
  setLayoutData(data: LayoutData) {
    this.name = data.name || ''
    this.thumbnail = data.thumbnail || ''
    if (data.canvasData) {
      this.setComponentData(data.canvasData)
    }

    if (data.canvasStyle) {
      this.canvasStyleData = data.canvasStyle
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
  setClickComponentStatus(status: boolean): void {
    this.isClickComponent = status
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
   * 设置当前组件
   * @param component 当前组件
   * @param index
   */
  setCurComponent(component: Optional<CustomComponent>, index?: string): void {
    // 设置前清理当前
    if (this.curComponent) {
      this.curComponent.active = false
    }
    this.curComponent = <CustomComponent>component
    this.activeIndex = index
    if (this.curComponent) {
      this.curComponent.active = true
      this.isClickComponent = true
      this.benchmarkComponent = this.curComponent.parent
    }
  }

  /**
   * 同步当前组件的位置
   * @param position 位置
   * @param parentComponent 父组件
   * @param isSave 是否保存
   * @returns
   */
  syncComponentLocation(
    position: Position,
    parentComponent?: CustomComponent,
    isSave = true
  ): void {
    if (!this.curComponent) {
      return
    }
    const styleKeys = ['top', 'left', 'width', 'height', 'rotate']
    const ablePosition: Position = {}
    styleKeys.forEach((el) => {
      if (position[el] != undefined) {
        ablePosition[el] = position[el]
      }
    })
    if (parentComponent) {
      const parentStyle = parentComponent.positionStyle
      const groupStyle = this.curComponent.groupStyle!
      const gStyle = {
        gleft:
          ablePosition.left !== undefined
            ? toPercent((ablePosition.left! - parentStyle.left) / parentStyle.width)
            : groupStyle.gleft,
        gtop:
          ablePosition.top !== undefined
            ? toPercent((ablePosition.top! - parentStyle.top) / parentStyle.height)
            : groupStyle.gtop,
        gwidth:
          ablePosition.width !== undefined
            ? toPercent(ablePosition.width! / parentStyle.width)
            : groupStyle.gwidth,
        gheight:
          ablePosition.height !== undefined
            ? toPercent(ablePosition.height! / parentStyle.height)
            : groupStyle.gheight,
        grotate: ablePosition.rotate !== undefined ? ablePosition.rotate! : groupStyle.grotate
      }
      const newStyle = {
        left:
          ablePosition.left !== undefined
            ? ablePosition.left
            : this.curComponent.positionStyle.left,
        top:
          ablePosition.top !== undefined ? ablePosition.top : this.curComponent.positionStyle.top,
        width:
          ablePosition.width !== undefined
            ? ablePosition.width
            : this.curComponent.positionStyle.width,
        height:
          ablePosition.height !== undefined
            ? ablePosition.height
            : this.curComponent.positionStyle.height,
        rotate:
          ablePosition.rotate !== undefined
            ? ablePosition.rotate!
            : this.curComponent.positionStyle.rotate
      }
      this.curComponent.groupStyle = gStyle
      for (const key in newStyle) {
        this.curComponent.change(['position', key], newStyle[key], 'style')
      }
    } else {
      for (const key in ablePosition) {
        this.curComponent.change(['position', key], ablePosition[key], 'style')
      }
    }

    if (this.curComponent.subComponents) {
      this.resizeSubComponent(this.curComponent)
    }
    if (isSave) {
      this.saveComponentData()
    }
  }
  /**
   * 重新调整当前组件的子组件
   * @param component 当前组件
   */
  resizeSubComponent(component: CustomComponent) {
    if (!component.subComponents) return
    const subComponents = component.subComponents
    const parentStyle = component.positionStyle
    subComponents.forEach((el: CustomComponent) => {
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
      el.change(['position', 'top'], Math.round(afterPoint.y - height / 2), 'style')
      el.change(['position', 'left'], Math.round(afterPoint.x - width / 2), 'style')
      el.change(['position', 'height'], Math.round(height), 'style')
      el.change(['position', 'width'], Math.round(width), 'style')
      el.change(['position', 'rotate'], rotate, 'style')
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
    this.saveComponentData()
  }
  /**
   * 设置当前组件的PropValue
   * @param keys 属性组
   * @param value 值
   * @returns
   */
  setCurComponentPropValue(keys: Array<string>, value: any): void {
    const curComponent = this.curComponent
    if (!curComponent || !curComponent.propValue) {
      return
    }
    curComponent.change(keys, value, 'propValue')
    this.saveComponentData()
  }
  /**
   * 设置当前组件的样式
   * @param keys
   * @param value 值
   * @returns
   */
  setCurComponentStyle(keys: Array<string>, value: any): void {
    const groupStyleKeys = ['gtop', 'gleft', 'gweight', 'gheight', 'grotate']
    if (!this.curComponent) {
      return
    }
    if (
      keys.length === 2 &&
      keys[0] === 'position' &&
      this.curComponent.groupStyle &&
      groupStyleKeys.includes(keys[1])
    ) {
      this.curComponent.groupStyle[keys[1]] = value
    } else {
      this.curComponent.change(keys, value, 'style')
    }
    this.saveComponentData()
  }

  getComponentIndexById(id: string, parent: Optional<CustomComponent>): number {
    if (parent) {
      return parent.subComponents.findIndex((item) => item.id === id)
    }
    return this.componentData.findIndex((item) => item.id === id)
  }
  /**
   * 清空画布
   */
  clearCanvas(): void {
    this.componentData = []
    // @ts-ignore
    this.curComponent = undefined
    this.isClickComponent = false
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
      message.info('图层已经到底了')
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
      message.info('图层已经到顶了')
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
      message.info('图层已经到顶了')
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
      message.info('图层已经到底了')
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
      resolve(snapShotState.saveSnapshot(this.layoutData, this.canvasStyleData))
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
  resizeAutoComponent(parentComponent: Optional<CustomComponent>): void {
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
          parentComponent.change(['position', key], newGroupStyle[key], 'style')
        }
        parentComponent.subComponents?.forEach((el: CustomComponent) => {
          el.groupStyle = {
            gleft: toPercent((el.positionStyle.left - newGroupStyle.left) / newGroupStyle.width),
            gtop: toPercent((el.positionStyle.top - newGroupStyle.top) / newGroupStyle.height),
            gwidth: toPercent(el.positionStyle.width / newGroupStyle.width),
            gheight: toPercent(el.positionStyle.height / newGroupStyle.height),
            grotate: el.positionStyle.rotate
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
    if (!(this.curComponent && this.curComponent.component === 'Group')) return
    const components: CustomComponent[] = cloneDeep(this.curComponent.subComponents)
    if (components.length > 0) {
      const index: number = this.getComponentIndexById(
        this.curComponent.id,
        this.curComponent.parent
      )
      this.removeComponent(index, this.curComponent.parent)
      const parentComponent = this.curComponent.parent
      if (parentComponent) {
        const parentStyle: DOMRectStyle = parentComponent.positionStyle
        components.forEach((item: CustomComponent) => {
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

const canvasState = new CanvasState({
  mode: ContainerType.CARD
})
export default function useCanvasState() {
  return canvasState
}
