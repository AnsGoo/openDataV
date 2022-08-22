import { cloneDeep } from 'lodash-es'
import { ComponentGroup, FormType } from '@/enum'
import { mod360, rotatePoint, uuid } from '@/utils/utils'
import type { DOMRectStyle, GroupStyle, PropsType } from '@/types/component'
import type { ComponentDataType } from './types'
import { Vector } from '@/types/common'

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
  callbackProp: Function | undefined = undefined
  callbackStyle: Function | undefined = undefined

  // form表单中使用
  _prop: PropsType[] = []
  _style: PropsType[] = []

  extraStyle: Record<string, string | number | boolean> = {} as never
  groupStyle: GroupStyle | undefined = undefined
  positionStyle: DOMRectStyle = { left: 0, top: 0, width: 0, height: 0, rotate: 0 }

  parent: BaseComponent | undefined = undefined
  subComponents: BaseComponent[] = []

  _propValue: Record<string, any> = {}
  _styleValue: Record<string, any> = {}

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
      this.positionStyle.width = width
    } else {
      this.positionStyle.width = 100
    }

    if (height) {
      this.positionStyle.height = height
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
    this._propValue['common'] = {
      name: this.name,
      component: this.component,
      id: this.id
    }

    this._prop.forEach((item) => {
      if (!Reflect.has(this._propValue, item.prop)) {
        this._propValue[item.prop] = {}
      }

      item.children.forEach((obj) => {
        this._propValue[item.prop][obj.prop] = obj.componentOptions.defaultValue
      })
    })

    return this._propValue
  }

  get style(): Record<string, string | number | boolean> {
    this.styleFormValue.forEach((item) => {
      item.children.forEach((obj) => {
        this._styleValue[obj.prop] = obj.componentOptions.defaultValue
      })
    })

    for (const [key, value] of Object.entries(this.extraStyle)) {
      this._styleValue[key] = value
    }
    return this._styleValue
  }

  // 生成后端存储需要的Json
  toJson(): ComponentDataType {
    const component: ComponentDataType = {
      id: this.id,
      component: this.component,
      name: this.name,
      propValue: this.propValue,
      style: this.style,
      subComponents: []
    }

    if (this.groupStyle) {
      component.groupStyle = this.groupStyle
    }

    this.subComponents.forEach((item) => component.subComponents.push(item.toJson()))
    return component
  }

  // 后端数据回填propValue
  setPropValue(component: Record<string, any>) {
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

  change(prop: string, value: string | number | boolean, form?: string) {
    if (form) {
      this.changeProp(form, prop, value)
    } else {
      this.changeStyle(prop, value)
    }
  }
  // 修改属性
  changeProp(form: string, prop: string, value: string | number | boolean) {
    if (form === 'common' && prop === 'name') {
      this.name = value as string
      return
    }

    const formObj = this.propFromValue.find((item) => item.prop === form)
    if (!formObj) return

    const propObj = formObj.children.find((obj) => obj.prop === prop)
    if (!propObj) return
    propObj.componentOptions.defaultValue = value

    if (this.callbackProp) {
      this.callbackProp(form, prop, value)
    }
  }

  changePropCallback(callback: (prop: string, key: string, value: any) => void) {
    this.callbackProp = callback
  }

  // 修改样式
  changeStyle(prop: string, value: string | number | boolean) {
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
}
