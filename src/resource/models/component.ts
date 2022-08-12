import { ComponentGroup, FormType } from '@/enum'
import { uuid } from '@/utils/utils'
import type { DOMRectStyle, PropsType } from '@/types/component'

export abstract class BaseComponent {
  id: string
  component: string
  group: ComponentGroup
  name: string
  icon: string = ''
  locked: boolean = false
  hided: boolean = false
  selected: boolean = false
  callbackProp: Function | undefined = undefined
  callbackStyle: Function | undefined = undefined

  _prop: PropsType[] = []
  _style: PropsType[] = []
  extraStyle: Record<string, string | number | boolean> = {} as never
  groupStyle: Record<'gtop' | 'gleft' | 'gweight' | 'gheight' | 'grotate', number> = {} as never
  baseStyle: DOMRectStyle = { left: 0, top: 0, width: 0, height: 0, rotate: 0 }

  parent: BaseComponent | undefined = undefined
  subComponents: BaseComponent[] = []

  constructor(
    component: string,
    group: ComponentGroup,
    name: string,
    id?: string,
    width?: number,
    height?: number,
    icon?: string
  ) {
    if (id) {
      this.id = id
    } else {
      this.id = uuid()
    }
    this.component = component
    this.group = group
    this.name = name

    if (icon) {
      this.icon = icon
    }

    if (width) {
      this.baseStyle.width = width
    } else {
      this.baseStyle.width = 100
    }

    if (height) {
      this.baseStyle.height = height
    } else {
      this.baseStyle.height = 100
    }
  }

  // 获取属性表单
  getPropFormJson() {
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
    return this.getFormJson([common, ...this._prop])
  }

  // 获取样式表单
  getStyleFormJson() {
    return this.getFormJson(this.styleValue)
  }

  // 生成Form表单需要的Json
  getFormJson(config: PropsType[]) {
    return config
  }

  get styleValue(): PropsType[] {
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
              defaultValue: this.baseStyle.left
            }
          },
          {
            label: '上边距',
            prop: 'top',
            type: FormType.NUMBER,
            componentOptions: {
              defaultValue: this.baseStyle.top
            }
          },
          {
            label: '宽度',
            prop: 'width',
            type: FormType.NUMBER,
            componentOptions: {
              defaultValue: this.baseStyle.width
            }
          },
          {
            label: '高度',
            prop: 'height',
            type: FormType.NUMBER,
            componentOptions: {
              defaultValue: this.baseStyle.height
            }
          },
          {
            label: '旋转角度',
            prop: 'rotate',
            type: FormType.NUMBER,
            componentOptions: {
              defaultValue: this.baseStyle.rotate
            }
          }
        ]
      }
      this._style = [common, ...this._style]
    }

    return this._style
  }

  get propValue() {
    const prop: Record<string, any> = {}
    this._prop.forEach((item) => {
      prop[item.prop] = {}
      item.children.forEach((obj) => {
        prop[item.prop][obj.prop] = obj.componentOptions.defaultValue
      })
    })

    return prop
  }

  get style(): Record<string, string | number | boolean> {
    const style: Record<string, string | number | boolean> = {}
    this.styleValue.forEach((item) => {
      item.children.forEach((obj) => {
        style[obj.prop] = obj.componentOptions.defaultValue
      })
    })

    return style
  }

  // 生成后端存储需要的Json
  toJson() {
    const component: Record<string, any> = {
      id: this.id,
      component: this.component,
      name: this.name,
      group: this.group,
      groupStyle: this.groupStyle
    }

    component.propValue = this.propValue

    component.style = this.style

    return component
  }

  // 后端数据回填propValue
  setPropValue(component: Record<string, any>) {
    this.setValue(component.propValue)
  }

  // 后端数据回填style
  setStyleValue(component: Record<string, any>) {
    this.setValue(component.style)
  }

  setValue(propList: Record<string, any>) {
    for (const prop in propList) {
      const form = this.propValue.find((obj) => obj.prop === prop)
      if (!form) continue

      for (const child in propList[prop]) {
        const item = form.children.find((obj) => obj.prop === child)
        if (!item) continue
        item.componentOptions.defaultValue = propList[prop][child]
      }
    }
  }

  change(prop: string, value: string | number | boolean, form?: string) {
    if (form) {
      this.changeProp(form, prop, value)
    } else {
      this.changeStyle(prop, value)
    }
  }
  // 修改属性
  changeProp(form: string, prop: string, value: string | number | boolean) {
    const formObj = this.propValue.find((item) => item.prop === form)
    if (!formObj) return

    const propObj = formObj.children.find((obj) => obj.prop === prop)
    if (!propObj) return
    propObj.componentOptions.defaultValue = value

    if (this.callbackProp) {
      this.callbackProp(prop, value)
    }
  }

  changePropCallback(callback: (prop: string, value: any) => void) {
    this.callbackProp = callback
  }

  // 修改样式
  changeStyle(prop: string, value: string | number | boolean) {
    for (const item of this.styleValue) {
      const propObj = item.children.find((obj) => obj.prop === prop)
      if (!propObj) continue

      propObj.componentOptions.defaultValue = value

      if (this.callbackStyle) {
        this.callbackStyle(prop, value)
      }
      break
    }
  }

  changeStyleCallback(callback: (prop: string, value: any) => void) {
    this.callbackStyle = callback
  }
}
