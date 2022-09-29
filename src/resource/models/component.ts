import { cloneDeep } from 'lodash-es'
import { ComponentGroup, FormType } from '@/enum'
import { mod360, rotatePoint, uuid } from '@/utils/utils'
import type {
  ComponentDataType,
  ComponentStyle,
  ComponentType,
  DOMRectStyle,
  GroupStyle,
  PropsType
} from '@/types/component'
import { Vector } from '@/types/common'
import { cssTransfer } from './styleToCss'
import { DataType, RestRequestData, StaticRequestData } from './data'

export abstract class BaseComponent {
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
  callbackProp?: (prop: string, key: string, value: any) => void
  callbackStyle?: (prop: string, value: any) => void
  callbackData?: (result: any) => void

  // 检测变化
  propIsChange = true
  styleIsChange = true

  // form表单中使用
  _prop: PropsType[] = []
  _style: PropsType[] = []
  _data: any = undefined
  extraStyle: Recordable<string | number | boolean> = {} as never
  groupStyle?: GroupStyle
  positionStyle: DOMRectStyle = { left: 0, top: 0, width: 0, height: 0, rotate: 0 }

  parent?: BaseComponent
  subComponents: BaseComponent[] = []

  _propValue: Recordable = {}
  _styleValue: ComponentStyle = {
    ...this.positionStyle
  }
  dataConfig?: {
    type: DataType
    // requestConfig: StaticRequestData | RestRequestData
    otherConfig: Recordable
  }

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

    if (detail.width) {
      this.positionStyle.width = detail.width
    } else {
      this.positionStyle.width = 100
    }

    if (detail.height) {
      this.positionStyle.height = detail.height
    } else {
      this.positionStyle.height = 100
    }
  }

  get propFromValue(): PropsType[] {
    const common: PropsType = {
      label: '公共属性',
      prop: 'common',
      children: [
        {
          label: '名称',
          prop: 'name',
          type: FormType.TEXT,
          componentOptions: {
            defaultValue: this.name
          }
        },
        {
          label: '组件',
          prop: 'component',
          type: FormType.TEXT,
          componentOptions: {
            defaultValue: this.component,
            editable: false
          }
        },
        {
          label: '组件ID',
          prop: 'id',
          type: FormType.TEXT,
          componentOptions: {
            defaultValue: this.id,
            editable: false
          }
        }
      ]
    }
    return [common, ...this._prop]
  }

  get styleFormValue(): PropsType[] {
    if (!this._style.find((item) => item.prop === 'position')) {
      const common: PropsType = {
        label: '位置大小',
        prop: 'position',
        children: [
          {
            label: '左边距',
            prop: 'left',
            type: FormType.NUMBER,
            componentOptions: {
              defaultValue: this.positionStyle.left
            }
          },
          {
            label: '上边距',
            prop: 'top',
            type: FormType.NUMBER,
            componentOptions: {
              defaultValue: this.positionStyle.top
            }
          },
          {
            label: '宽度',
            prop: 'width',
            type: FormType.NUMBER,
            componentOptions: {
              defaultValue: this.positionStyle.width
            }
          },
          {
            label: '高度',
            prop: 'height',
            type: FormType.NUMBER,
            componentOptions: {
              defaultValue: this.positionStyle.height
            }
          },
          {
            label: '旋转角度',
            prop: 'rotate',
            type: FormType.NUMBER,
            componentOptions: {
              defaultValue: this.positionStyle.rotate
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
      this._prop.forEach((item) => {
        if (!Reflect.has(this._propValue, item.prop)) {
          this._propValue[item.prop] = {}
        }

        item.children.forEach((obj) => {
          this._propValue[item.prop][obj.prop] = obj.componentOptions.defaultValue
        })
      })
      this.propIsChange = false
    }

    return this._propValue
  }

  get style(): ComponentStyle {
    if (this.styleIsChange) {
      const customStyle: Recordable<any>[] = []
      let transferStyle: Recordable<any> = {}
      this.styleFormValue.forEach((item) => {
        item.children.forEach((obj) => {
          if (obj.type === FormType.CUSTOM) {
            customStyle[obj.prop] = obj.componentOptions.defaultValue
          } else {
            const css = cssTransfer(obj.type!, obj.prop, obj.componentOptions.defaultValue)
            if (css) {
              transferStyle = { ...transferStyle, ...css }
            }
          }
          this._styleValue[obj.prop] = obj.componentOptions.defaultValue
        })
      })

      Object.assign(this._styleValue, this.extraStyle)
      Object.assign(this._styleValue, transferStyle)
      const res = this.styleToCss(customStyle)
      if (res) {
        Object.assign(this._styleValue, res)
      }
      this.styleIsChange = false
    }

    return this._styleValue
  }

  get exampleData(): any {
    return this._data ? this._data : ''
  }

  // 自定义样式编辑框数据处理
  styleToCss(_: Recordable<any>[]): Nullable<Recordable<any>> {
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
      subComponents: subComponents.length > 0 ? subComponents : undefined
    }

    if (this.groupStyle) {
      component.groupStyle = this.groupStyle
    }
    return component
  }

  // 后端数据回填propValue
  setPropValue(component: Record<string, any>) {
    this.propIsChange = true
    for (const prop in component.propValue) {
      const form = this._prop.find((obj) => obj.prop === prop)
      if (!form) continue

      for (const child in component.propValue[prop]) {
        const item = form.children.find((obj) => obj.prop === child)
        if (!item) continue
        item.componentOptions.defaultValue = component.propValue[prop][child]
      }
    }
  }

  // 后端数据回填style
  setStyleValue(component: Record<string, any>) {
    this.styleIsChange = true
    for (const prop in component.style) {
      this.styleFormValue.forEach((item) => {
        const propObj = item.children.find((obj) => obj.prop === prop)
        if (propObj) {
          propObj.componentOptions.defaultValue = component.style[prop]

          if (prop in this.positionStyle) {
            this.positionStyle[prop] = component.style[prop]
          }
        }
      })
    }
  }

  change(prop: string, value: string | number | boolean | any, form?: string) {
    if (form) {
      this.changeProp(form, prop, value)
    } else {
      this.changeStyle(prop, value)
    }
  }
  // 修改属性
  changeProp(form: string, prop: string, value: string | number | boolean | any) {
    this.propIsChange = true
    if (form === 'common' && prop === 'name') {
      this.name = value as string
      return
    }

    const formObj = this.propFromValue.find((item) => item.prop === form)
    if (!formObj) return

    const propObj = formObj.children.find((obj) => obj.prop === prop)
    if (!propObj) return
    propObj.componentOptions.defaultValue = value

    setTimeout(() => {
      if (this.callbackProp) {
        this.callbackProp(form, prop, value)
      }
    }, 0)
  }

  changePropCallback(callback: (prop: string, key: string, value: any) => void) {
    this.callbackProp = callback
  }

  // 修改样式
  changeStyle(prop: string, value: any) {
    this.styleIsChange = true
    for (const item of this.styleFormValue) {
      const propObj = item.children.find((obj) => obj.prop === prop)
      if (!propObj) continue

      propObj.componentOptions.defaultValue = value
      if (prop in this.positionStyle) {
        this.positionStyle[prop] = value
      }

      if (this.callbackStyle) {
        this.callbackStyle(prop, value)
      }
      break
    }

    this.extraStyle[prop] = value
  }

  changeStyleCallback(callback: (prop: string, value: any) => void) {
    this.callbackStyle = callback
  }

  /**
   * 添加子组件
   * @param components
   * @param deep
   * @param clear
   */
  addComponent(components: BaseComponent[], deep = false, clear = false) {
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

  /**
   * 重新调整当前组件的子组件
   * @returns
   */
  resizeSubComponents() {
    if (!this.subComponents) return
    const subComponents = this.subComponents
    const parentStyle = this.positionStyle
    subComponents.forEach((el: BaseComponent) => {
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
      el.change('top', Math.round(afterPoint.y - height / 2))
      el.change('left', Math.round(afterPoint.x - width / 2))
      el.change('height', Math.round(height))
      el.change('width', Math.round(width))
      el.change('rotate', rotate)
    })
  }
  async changeRequestDataConfig(type: DataType, config: Recordable<any>) {
    let requestConfig
    switch (type) {
      case DataType.STATIC:
        const { data, protocol, otherConfig } = config
        requestConfig = new StaticRequestData(data, protocol)
        this.dataConfig = {
          type: DataType.STATIC,
          requestConfig: requestConfig,
          otherConfig: otherConfig || {}
        }
        break
      case DataType.REST:
        const { options } = config
        requestConfig = new RestRequestData(options, { propvalue: this.propValue })
        this.dataConfig = {
          type: DataType.REST,
          requestConfig: requestConfig,
          otherConfig: otherConfig || {}
        }
        break
    }

    if (this.callbackData) {
      const result = await this.dataConfig?.requestConfig?.getRespData()
      this.callbackData(result)
    }
  }
  changeDataCallback(callback: (result: any) => void) {
    this.callbackData = callback
  }
}
