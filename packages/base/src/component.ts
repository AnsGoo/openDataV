import { cloneDeep, isNumber } from 'lodash-es'

import type { ComponentGroup } from './enums'
import { ContainerType, DataMode } from './enums'
import type {
  BaseScript,
  ComponentDataType,
  ComponentType,
  DataInstance,
  DOMRectStyle,
  GroupStyle,
  Response
} from './type'
import { uuid } from './utils'

export interface DataConfig {
  type: string
  dataInstance: DataInstance
}

export class CustomComponent {
  id: string
  component: string
  group: ComponentGroup
  name: string
  icon = ''
  locked = false
  selected = false
  display = true
  show = true
  active = false
  dataMode: DataMode = DataMode.SELF
  /**
   * @deprecated dataIntegrationMode 即将弃用，建议使用 dataMode
   */
  dataIntegrationMode: DataMode = DataMode.SELF
  callbackProp?: (propKeys: Array<string>, value: any, modelValue: any) => void
  callbackStyle?: (propKeys: Array<string>, value: any, modelValue: any) => void
  callbackData?: (result: any, type?: string) => void
  protected componentDataCallback?: (result: any, type?: string) => void

  defaultViewType: ContainerType = ContainerType.CARD

  // form表单中使用
  extraStyle: Record<string, string | number | boolean> = {}
  groupStyle?: GroupStyle
  positionStyle: DOMRectStyle = { left: 0, top: 0, width: 0, height: 0, rotate: 0 }

  parent?: CustomComponent
  subComponents?: CustomComponent[] = undefined

  private _propValue: Record<string, any> = {}
  private _styleValue: Record<string, any> = {
    position: this.positionStyle
  }
  dataConfig?: DataConfig
  scriptConfig?: BaseScript

  constructor(detail: ComponentType) {
    if (detail.id) {
      this.id = detail.id
    } else {
      this.id = uuid()
    }
    this.component = detail.component
    this.group = detail.group
    this.name = detail.name

    if (detail.icon) {
      this.icon = detail.icon
    }
    this.positionStyle.width = detail.width || 100
    this.positionStyle.height = detail.height || 100
    this.dataMode = detail.dataMode || detail.dataIntegrationMode || DataMode.SELF
    this.initProp()
  }

  get propValue() {
    return this._propValue
  }

  setViewType(viewType: ContainerType) {
    this.defaultViewType = viewType
  }

  get style(): Record<string, any> {
    return {
      ...this._styleValue,
      info: {
        id: this.id,
        name: this.name,
        component: this.component
      }
    }
  }
  get exampleData(): any {
    return undefined
  }
  private loadExampleData?: () => any

  public setExampleData(loader: () => any) {
    this.loadExampleData = loader
  }

  public getExampleData() {
    if (this.exampleData) {
      return this.exampleData
    } else {
      return this.loadExampleData ? this.loadExampleData() : undefined
    }
  }

  // 自定义样式编辑框数据处理
  styleToCss(_: Record<string, any>[]): Nullable<Record<string, any>> {
    return null
  }

  // 生成后端存储需要的Json
  toJson(): ComponentDataType {
    const subComponents = (this.subComponents || []).map((item) => item.toJson())
    const component: ComponentDataType = {
      id: this.id,
      component: this.component,
      name: this.name,
      propValue: this.propValue,
      style: this.style,
      subComponents: subComponents.length > 0 ? subComponents : undefined,
      dataMode: this.dataMode,
      script: this.scriptConfig?.toJSON()
    }
    if (this.dataConfig) {
      component.data = {
        type: this.dataConfig?.type,
        requestOptions: this.dataConfig?.dataInstance.toJSON()
      }
    }
    if (this.groupStyle) {
      component.groupStyle = this.groupStyle
    }
    return component
  }

  // 后端数据回填propValue
  setPropValue(propValue: Record<string, any>) {
    console.log(propValue)
    this._propValue = propValue
  }

  private initProp() {
    this._propValue = {}
  }

  // 后端数据回填style
  setStyleValue(style: Record<string, any>) {
    this._styleValue = { ...this._styleValue, ...style }
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
  afterCallbackChange(scriptHandler: BaseScript) {
    this.scriptConfig = scriptHandler
    if (this.dataConfig?.dataInstance && this.componentDataCallback) {
      this.callbackData = this.buildDataCallback()
      const { dataInstance } = this.dataConfig || {}
      if (dataInstance && dataInstance.close) {
        dataInstance.close()
        dataInstance.connect!(this.callbackData)
      }
    }
  }
  changePosition(key: 'top' | 'left' | 'height' | 'width' | 'rotate', value: number) {
    this.changeStyle(['position', key], value, this.style)
  }

  // 修改样式
  changeStyle(propKeys: Array<string>, value: any, style: Record<string, any>) {
    const positionKey = ['top', 'left', 'height', 'width', 'rotate']
    let changeValue = value
    if (propKeys[0] === 'position') {
      if (propKeys.length === 2 && positionKey.includes(propKeys[1])) {
        changeValue = Math.round(value)
        this.positionStyle[propKeys[1]] = changeValue
      } else if (propKeys.length === 1) {
        positionKey.forEach((el) => {
          if (!isNumber(value[el])) {
            return
          }
          this.positionStyle[el] = value[el]
        })
      }
      this.setStyleValue(this.positionStyle)
    } else {
      this.setStyleValue(style)
    }
    if (this.callbackStyle) this.callbackStyle(propKeys, value, this.style)
  }

  setStyleChangeCallback(callback: (propKeys: Array<string>, value: any) => void) {
    this.callbackStyle = callback
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
  async changeDataConfig(dataConfig: DataConfig) {
    const { dataInstance } = this.dataConfig || {}
    if (dataInstance && dataInstance.close) {
      dataInstance.close()
    }
    this.dataConfig = dataConfig
    if (this.callbackData) {
      await this.dataConfig?.dataInstance.connect!(this.callbackData)
    }
  }
  setDataChangeCallback(callback: (result: any, type?: string) => void) {
    this.componentDataCallback = callback
    this.callbackData = this.buildDataCallback()
    const { dataInstance } = this.dataConfig || {}
    if (!dataInstance) {
      return
    }
    if (dataInstance.close) {
      dataInstance.close()
    }
    dataInstance.connect!(this.callbackData)
  }

  buildDataCallback() {
    return (resp: Response) => {
      if (this.scriptConfig && this.scriptConfig.afterCallback) {
        const afterCallback = this.scriptConfig.afterCallback
        const { status, data } = resp
        if (status === 'SUCCESS') {
          try {
            resp['afterData'] = afterCallback(data, this.propValue)
          } catch (err) {
            resp['afterData'] = undefined
            resp.status = 'FAILED'
          }
        }
      } else {
        resp['afterData'] = resp.data
      }
      if (this.componentDataCallback) {
        this.componentDataCallback(resp)
      }
    }
  }
  async loadDemoData() {
    const exampleData = await this.getExampleData()
    setTimeout(() => {
      if (this.callbackData) {
        this.callbackData({ status: 'SUCCESS', data: exampleData, afterData: exampleData }, 'DEMO')
      }
    }, 200)
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

export type BaseComponent = { new (id?: string, name?: string, icon?: string): CustomComponent }
