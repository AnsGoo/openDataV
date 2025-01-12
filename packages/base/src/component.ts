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
import { baseLoger, isValidPath, uuid } from './utils'

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

  callbackProp?: (modelValue: any) => void
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
      dataOptions
    } = metaData
    this.id = id || uuid()
    this.component = component
    this.name = name
    this.extendedMetaData = extendedMetaData
    this.dataSlotter = new DataSlotter(dataOptions || {})

    this.isContainer = isContainer || false
    this.subComponents = isContainer ? [] : undefined
    this.changePosition(position)
    this.dataMode = dataMode || DataMode.SELF
    this._propValue = propValue || {}
  }

  get propValue() {
    return this._propValue
  }

  public getExtendedMetaData() {
    return this.extendedMetaData
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
      dataOptions: this.dataSlotter ? this.dataSlotter.toJSON() : undefined
    }
    return component
  }

  // 后端数据回填propValue
  private setPropValue(propValue: Record<string, any>) {
    Object.assign(this._propValue, propValue)
  }

  // 修改属性
  changeProp(modelValue: Record<string, any>): void
  changeProp(path: string, value: any): void

  changeProp(...args: any[]): void {
    if (args.length === 1 && typeof args[0] === 'object') {
      const modelValue = args[0]
      this.setPropValue(modelValue)
    } else if (args.length === 2 && typeof args[0] === 'string') {
      const [path, value] = args

      // 路径验证
      if (!path || typeof path !== 'string' || !isValidPath(path)) {
        baseLoger.error(`Invalid path: ${path}`)
        return
      }

      try {
        set(this._propValue, path, value)
      } catch (error) {
        baseLoger.error(`Error setting property , ${error}`)
        return
      }
    } else {
      baseLoger.warn('Invalid arguments for changeProp')
      return
    }

    // 回调函数存在性检查
    if (typeof this.callbackProp === 'function') {
      try {
        this.callbackProp(this.propValue)
      } catch (error) {
        console.error('Error calling callbackProp:', error)
      }
    }
  }

  setPropChangeCallback(callback: (value: any) => void) {
    this.callbackProp = callback
  }
  changePosition(
    position: Partial<Record<'top' | 'left' | 'height' | 'width' | 'rotate', number>>
  ): void
  changePosition(key: 'top' | 'left' | 'height' | 'width' | 'rotate', value: number): void
  changePosition(...args): void {
    const positionKey = ['top', 'left', 'height', 'width', 'rotate']
    if (args.length === 1 && typeof args[0] === 'object') {
      const position = args[0]
      const keys = Object.keys(position)
      keys.forEach((el) => {
        if (positionKey.includes(el)) {
          this.changePosition(el as 'top' | 'left' | 'height' | 'width' | 'rotate', position[el])
        }
      })
    } else if (args.length === 2 && typeof args[0] === 'string') {
      const [key, value] = args
      if (!positionKey.includes(key)) {
        return
      }
      set(this.position, key, key === 'rotate' ? value : Math.round(value))
    } else {
      baseLoger.warn('Invalid arguments for changePosition')
      return
    }
  }

  /**
   * 添加子组件
   * @param components
   * @param deep
   * @param clear
   */
  appendChildComponent(components: CustomComponent[], deep = false, clear = false) {
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
}

export type BaseComponent = {
  new (id?: string, name?: string, extendedMetaData?: Record<string, any>): CustomComponent
}
