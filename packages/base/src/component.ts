import { cloneDeep, set } from 'lodash-es'

import { DataSlotter } from './data-slotter'
import { DataMode } from './enums'
import type {
  BaseScript,
  DOMRectStyle,
  IComponentData,
  IComponentInfo,
  RelativePosition,
  Slotter
} from './type'
import { uuid } from './utils'

export class CustomComponent {
  id: string
  component: string
  name: string
  locked = false
  selected = false
  display = true
  show = true
  active = false
  dataMode: DataMode = DataMode.SELF
  isContainer = false
  private extendedMetaData: Record<string, any> = {}

  callbackProp?: (propKeys: Array<string>, value: any, modelValue: any) => void
  callbackData?: (result: any, type?: string) => void
  protected dataCallback?: (result: any, type?: string) => void

  // form表单中使用
  relativePosition?: RelativePosition
  position: DOMRectStyle = { left: 0, top: 0, width: 0, height: 0, rotate: 0 }

  parent?: CustomComponent
  subComponents?: CustomComponent[] = undefined

  private _propValue: Record<string, any> = {}
  dataSlotter: Slotter
  scriptConfig?: BaseScript

  constructor(metaData: IComponentInfo) {
    const {
      id,
      component,
      name,
      propValue,
      position,
      isContainer,
      dataMode,
      extendedMetaData = {},
      data
    } = metaData
    this.id = id || uuid()
    this.component = component
    this.name = name
    this.extendedMetaData = extendedMetaData
    this.dataSlotter = new DataSlotter(data || {})

    this.isContainer = isContainer || false
    this.subComponents = isContainer ? [] : undefined
    this.changePositions(position)
    this.dataMode = dataMode || DataMode.SELF
    this._propValue = propValue || {}
  }

  get propValue() {
    return this._propValue
  }

  get exampleData(): any {
    return undefined
  }
  private loadExampleData?: () => any

  public setExampleData(loader: () => any) {
    this.loadExampleData = loader
  }

  public getExtendedMetaData() {
    return this.extendedMetaData
  }

  public getExampleData() {
    if (this.exampleData) {
      return this.exampleData
    } else {
      return this.loadExampleData ? this.loadExampleData() : undefined
    }
  }

  // 生成后端存储需要的Json
  toJson(isDeep = true): IComponentData {
    const subComponents = (this.subComponents || []).map((item) => item.toJson(isDeep))
    const component: IComponentData = {
      id: isDeep ? this.id : undefined,
      component: this.component,
      name: this.name,
      propValue: this.propValue,
      position: this.position,
      subComponents: this.isContainer && subComponents.length > 0 ? subComponents : undefined,
      script: this.scriptConfig?.toJSON(),
      data: this.dataSlotter ? this.dataSlotter.toJSON() : undefined
    }
    return component
  }

  // 后端数据回填propValue
  private setPropValue(propValue: Record<string, any>) {
    Object.assign(this._propValue, propValue)
  }

  // 修改属性
  changeProp(propKeys: Array<string>, value: string | number | boolean | any, modelValue) {
    this.setPropValue(modelValue)
    if (this.callbackProp) {
      this.callbackProp(propKeys, value, modelValue)
    }
  }

  setPropChangeCallback(callback: (propKeys: Array<string>, value: any) => void) {
    this.callbackProp = callback
  }
  changePosition(key: 'top' | 'left' | 'height' | 'width' | 'rotate', value: number) {
    const positionKey = ['top', 'left', 'height', 'width', 'rotate']
    if (!positionKey.includes(key)) {
      return
    }
    set(this.position, key, key === 'rotate' ? value : Math.round(value))
  }
  changePositions(positions: Record<'top' | 'left' | 'height' | 'width' | 'rotate', number>) {
    const keys = Object.keys(positions) as Array<'top' | 'left' | 'height' | 'width' | 'rotate'>
    keys.forEach((el) => {
      this.changePosition(el, positions[el])
    })
  }

  /**
   * 添加子组件
   * @param components
   * @param deep
   * @param clear
   */
  addComponent(components: CustomComponent[], deep = false, clear = false) {
    if (!this.subComponents) {
      return
    }
    if (clear) {
      this.subComponents = []
    }

    components.forEach((item) => {
      let com = item
      if (deep) {
        com = cloneDeep(item)
      }
      com.parent = this
      this.subComponents!.push(com)
    })
  }
  /**
   * 设置组件的可见性
   */
  setVisible(visible: boolean) {
    this.display = visible
  }
  setDataChangeCallback(callback: (result: any, type?: string) => void) {
    this.callbackData = callback
    this.dataSlotter?.connect?.(callback)
  }
  setDataSlotter(slotter: Slotter) {
    this.dataSlotter = slotter
    this.callbackData && this.dataSlotter?.connect(this.callbackData)
  }
  appendChild(child: CustomComponent) {
    if (!this.subComponents) {
      return
    }
    this.subComponents!.push(child)
  }
  updateChild(index: number, child: CustomComponent) {
    if (!this.subComponents) {
      return
    }
    this.subComponents![index] = child
  }
}

export type BaseComponent = {
  new (id?: string, name?: string, extendedMetaData?: Record<string, any>): CustomComponent
}
