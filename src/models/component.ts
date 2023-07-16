import { cloneDeep } from 'lodash-es'
import { h } from 'vue'

import type { ComponentGroup } from '@/enum'
import { ContainerType, FormType } from '@/enum'
import { DataIntegrationMode } from '@/enum/data'
import type { BaseScript } from '@/scripts/base'
import type {
  ComponentDataType,
  ComponentStyle,
  ComponentType,
  DOMRectStyle,
  GroupStyle,
  MetaContainerItem,
  MetaForm
} from '@/types/component'

import type { RequestDataInstance, Response } from './requestOption'
import { buildModeValue, getObjProp, updateFormItemsValue, updateModeValue, uuid } from './utils'

interface DataConfig {
  type: string
  requestConfig: RequestDataInstance
}

export abstract class CustomComponent {
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
  dataIntegrationMode: DataIntegrationMode = DataIntegrationMode.SELF
  callbackProp?: (propKeys: Array<string>, value: any) => void
  callbackStyle?: (propKeys: Array<string>, value: any) => void
  callbackData?: (result: any, type?: string) => void
  protected componentDataCallback?: (result: any, type?: string) => void

  // 检测变化
  propIsChange = true
  styleIsChange = true
  defaultViewType = {
    propValue: ContainerType.COLLAPSE,
    style: ContainerType.COLLAPSE,
    data: ContainerType.CARD
  }

  // form表单中使用
  _prop: MetaContainerItem[] = []
  _style: MetaContainerItem[] = []
  extraStyle: Recordable<string | number | boolean> = {}
  groupStyle?: GroupStyle
  positionStyle: DOMRectStyle = { left: 0, top: 0, width: 0, height: 0, rotate: 0 }

  parent?: CustomComponent
  subComponents: CustomComponent[] = []

  _propValue: Recordable = {}
  _styleValue: ComponentStyle = {
    ...this.positionStyle
  }
  dataConfig?: DataConfig
  scriptConfig?: BaseScript

  protected constructor(detail: ComponentType) {
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
    this.dataIntegrationMode = detail.dataIntegrationMode || DataIntegrationMode.SELF
    Object.assign(this.defaultViewType, detail.defaultViewType || {})
  }

  get propFromValue(): MetaContainerItem[] {
    const common: MetaContainerItem = {
      label: '公共属性',
      prop: 'common',
      children: [
        {
          label: '名称',
          prop: 'name',
          type: FormType.TEXT,
          props: {
            defaultValue: this.name
          }
        },
        {
          label: '组件',
          prop: 'component',
          type: FormType.TEXT,
          props: {
            defaultValue: this.component,
            editable: false
          }
        },
        {
          label: '组件ID',
          prop: 'id',
          type: FormType.TEXT,
          props: {
            defaultValue: this.id,
            editable: false
          }
        }
      ]
    }
    const propFrom = [common, ...this._prop]
    const propValue = {}
    buildModeValue(propFrom, propValue)
    return propFrom
  }

  get styleFormValue(): MetaContainerItem[] {
    if (!this._style.find((item) => item.prop === 'position')) {
      const common: MetaContainerItem = {
        label: '位置大小',
        prop: 'position',
        children: [
          {
            label: '左边距',
            prop: 'left',
            type: FormType.NUMBER,
            props: {
              defaultValue: this.positionStyle.left,
              suffix: () => h('span', {}, 'px'),
              precision: 0
            }
          },
          {
            label: '上边距',
            prop: 'top',
            type: FormType.NUMBER,
            props: {
              defaultValue: this.positionStyle.top,
              suffix: () => h('span', {}, 'px'),
              precision: 0
            }
          },
          {
            label: '宽度',
            prop: 'width',
            type: FormType.NUMBER,
            props: {
              defaultValue: this.positionStyle.width,
              suffix: () => h('span', {}, 'px'),
              precision: 0
            }
          },
          {
            label: '高度',
            prop: 'height',
            type: FormType.NUMBER,
            props: {
              defaultValue: this.positionStyle.height,
              suffix: () => h('span', {}, 'px'),
              precision: 0
            }
          },
          {
            label: '旋转角度',
            prop: 'rotate',
            type: FormType.NUMBER,
            props: {
              defaultValue: this.positionStyle.rotate,
              suffix: () => h('span', {}, '°')
            }
          }
        ]
      }
      this._style = [common, ...this._style]
    }

    return this._style
  }

  get propValue() {
    if (this.propIsChange) {
      updateFormItemsValue(this._prop, this._propValue)
      this.propIsChange = false
    }
    return this._propValue
  }

  get style(): ComponentStyle {
    if (this.styleIsChange) {
      const customStyle: Recordable[] = []
      this.styleFormValue.forEach((item) => {
        ;(item.children || []).forEach((obj) => {
          const objProps = obj.props || obj.componentOptions
          if (objProps) {
            if (obj.type === FormType.CUSTOM) {
              customStyle[obj.prop] = objProps.defaultValue
            }
            this._styleValue[obj.prop] = objProps!.defaultValue
          }
        })
      })

      Object.assign(this._styleValue, this.extraStyle)
      const res = this.styleToCss(customStyle)
      if (res) {
        Object.assign(this._styleValue, res)
      }
      this.styleIsChange = false
    }
    return this._styleValue
  }

  get exampleData(): any {
    return undefined
  }

  // 自定义样式编辑框数据处理
  styleToCss(_: Recordable[]): Nullable<Recordable> {
    return null
  }

  // 生成后端存储需要的Json
  toJson(): ComponentDataType {
    const subComponents = this.subComponents.map((item) => item.toJson())
    const component: ComponentDataType = {
      id: this.id,
      component: this.component,
      name: this.name,
      propValue: this.propValue,
      style: this.style,
      subComponents: subComponents.length > 0 ? subComponents : undefined,
      dataIntegrationMode: this.dataIntegrationMode,
      script: this.scriptConfig?.toJSON()
    }
    if (this.dataConfig) {
      component.data = {
        type: this.dataConfig?.type,
        requestOptions: this.dataConfig?.requestConfig.toJSON()
      }
    }
    if (this.groupStyle) {
      component.groupStyle = this.groupStyle
    }
    return component
  }

  // 后端数据回填propValue
  setPropValue({ propValue }: { propValue: Record<string, any> }) {
    this.propIsChange = true
    updateFormItemsValue(this._prop, propValue)
    this._propValue = propValue
  }

  // 后端数据回填style
  setStyleValue({ style }: { style: Record<string, any> }) {
    this.styleIsChange = true
    for (const prop in style) {
      this.styleFormValue.forEach((item) => {
        const propObj = (item.children || []).find((obj) => obj.prop === prop)
        if (propObj) {
          const objProps = propObj.props || propObj.componentOptions
          if (!objProps) {
            return
          }
          objProps.defaultValue = style[prop]
          if (prop in this.positionStyle) {
            this.positionStyle[prop] = style[prop]
          }
        }
      })
    }
  }

  change(propKeys: Array<string>, value: any, from: 'style' | 'propValue' | 'data') {
    if (from === 'propValue') {
      this.changeProp(propKeys, value)
    } else if (from === 'style') {
      this.changeStyle(propKeys, value)
    }
  }
  // 修改属性
  changeProp(propKeys: Array<string>, value: string | number | boolean | any) {
    this.propIsChange = true
    if (propKeys.length === 2 && propKeys[0] === 'common' && propKeys[1] === 'name') {
      this.name = value as string
      return
    }
    updateModeValue(this._propValue, propKeys, value)
    if (this.callbackProp) {
      this.callbackProp(propKeys, value)
    }
  }

  changePropCallback(callback: (propKeys: Array<string>, value: any) => void) {
    this.callbackProp = callback
  }
  afterCallbackChange(scriptHandler: BaseScript) {
    this.scriptConfig = scriptHandler
    if (this.dataConfig?.requestConfig && this.componentDataCallback) {
      this.callbackData = this.buildDataCallback()
      this.dataConfig?.requestConfig.connect!(this.callbackData)
    }
  }

  // 修改样式
  changeStyle(propKeys: Array<string>, value: any) {
    const positionKey = ['top', 'left', 'height', 'width', 'rotate']
    let changeValue = value
    if (propKeys.length === 2 && propKeys[0] === 'position' && positionKey.includes(propKeys[1])) {
      changeValue = Math.round(value)
      this.positionStyle[propKeys[1]] = changeValue
    }
    this.styleIsChange = true
    const curObj = getObjProp(this.styleFormValue, propKeys) as MetaForm
    const objProps = curObj.props || curObj.componentOptions
    if (objProps) {
      objProps.defaultValue = value
    }
    if (this.callbackStyle) this.callbackStyle(propKeys, value)

    // this.extraStyle[prop] = value
  }

  changeStyleCallback(callback: (propKeys: Array<string>, value: any) => void) {
    this.callbackStyle = callback
  }

  /**
   * 添加子组件
   * @param components
   * @param deep
   * @param clear
   */
  addComponent(components: CustomComponent[], deep = false, clear = false) {
    if (clear) {
      this.subComponents = []
    }

    components.forEach((item) => {
      let com = item
      if (deep) {
        com = cloneDeep(item)
      }
      com.parent = this
      this.subComponents.push(com)
    })
  }
  /**
   * 隐藏组件
   */
  hiddenComponent() {
    this.display = false
  }
  /**
   * 显示组件
   */
  showComponent() {
    this.display = true
  }
  async changeRequestDataConfig(dataConfig: DataConfig) {
    const { requestConfig } = this.dataConfig || {}
    if (requestConfig && requestConfig.close) {
      requestConfig.close()
    }
    this.dataConfig = dataConfig
    if (this.callbackData) {
      await this.dataConfig?.requestConfig.connect!(this.callbackData)
    }
  }
  changeDataCallback(callback: (result: any, type?: string) => void) {
    this.componentDataCallback = callback
    this.callbackData = this.buildDataCallback()
    this.dataConfig?.requestConfig.connect!(this.callbackData)
  }

  buildDataCallback() {
    return (resp: Response) => {
      if (this.scriptConfig && this.scriptConfig.afterCallback) {
        const afterCallback = this.scriptConfig.afterCallback
        const { status, data } = resp
        if (status === 'SUCCESS') {
          try {
            const afterData = afterCallback(data, this.propValue)
            resp['afterData'] = afterData
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
  loadDemoData() {
    const exampleData = this.exampleData
    setTimeout(() => {
      if (this.callbackData) {
        this.callbackData({ status: 'SUCCESS', data: exampleData, afterData: exampleData }, 'DEMO')
      }
    }, 200)
  }
  appendChild(child: CustomComponent) {
    this.subComponents.push(child)
  }
  updateChild(index: number, child: CustomComponent) {
    this.subComponents[index] = child
  }
}
