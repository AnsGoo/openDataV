import { cloneDeep, isNumber } from 'lodash-es'
import type { CustomComponent, DataOption, ScriptOption } from 'open-data-v/base'
import { ContainerType, DataMode, Logger } from 'open-data-v/base'
import type { Location, Vector } from 'open-data-v/designer'
import { useCanvasState, useDataState, useScriptState } from 'open-data-v/designer'

import type { ComponentDataType, DOMRectStyle } from './type'

export function toPercent(val: number) {
  return parseFloat((val * 100).toFixed(4))
}

const buildDataHandler = (componentObj: CustomComponent, data?: DataOption) => {
  const dataState = useDataState()
  if (!(data && data.requestOptions)) {
    componentObj.loadDemoData()
    return
  }
  const plugin = dataState.getPlugin(data.type)
  if (!plugin) {
    return
  }
  const dataHandler = plugin.handler
  const { options } = data.requestOptions!
  const otherConfig = data.otherConfig
  if (otherConfig) {
    options.otherConfig = otherConfig
  }
  const dataConfig = {
    type: data.type,
    dataInstance: new dataHandler(options)
  }
  componentObj.changeDataConfig(dataConfig)
}

const buildAfterCallback = (componentObj: CustomComponent, script?: ScriptOption) => {
  if (!script) {
    return
  }
  const scriptState = useScriptState()
  const plugin = scriptState.getPlugin(script.type)
  if (!plugin) {
    return
  }
  const scriptHandlerClasss = plugin.handler
  const scriptHandler = new scriptHandlerClasss(script.key)
  componentObj.afterCallbackChange(scriptHandler)
}
export function createComponent(component: ComponentDataType): any {
  const canvasState = useCanvasState()
  const components = canvasState.components
  const _class = components[component.component as string]
  const obj = new _class(component.id, component.name, component.icon)
  obj.groupStyle = component.groupStyle
  obj.setPropValue({ propValue: component.propValue })
  obj.setStyleValue({ style: component.style })
  obj.dataMode = component.dataMode || DataMode.SELF
  const data = component.data
  if (obj.dataMode || obj.dataIntegrationMode === DataMode.UNIVERSAL) {
    buildDataHandler(obj, data)
  }
  buildAfterCallback(obj, component.script)
  component.subComponents?.forEach((item) => {
    const subObj = createComponent(item)
    subObj.parent = obj
    obj.subComponents.push(subObj)
  })

  const viewType = canvasState.canvasStyleConfig.mode || ContainerType.CARD
  obj.setViewType(viewType)
  return obj
}

export function getComponentIndexById(id: string, parent: CustomComponent) {
  return parent.subComponents.findIndex((item) => item.id === id)
}

/**
 * 给定区域获取该区域范围内的所有组件和包含该这些组件的最小区域
 * @param rect 区域范围
 * @param componentData 所有组件数据
 *
 *@return {components: CustomComponent[], rect: Position} components 所有组件， minRect 最小区域
 */
export const getSelectComponents = (
  rect: Location,
  componentData: CustomComponent[]
):
  | {
      components: Array<CustomComponent>
      rect: { left: number; right: number; top: number; bottom: number }
    }
  | undefined => {
  const selectedComponents: Array<CustomComponent> = []
  const leftSet: Set<number> = new Set()
  const topSet: Set<number> = new Set()
  const rightSet: Set<number> = new Set()
  const bottomSet: Set<number> = new Set()

  // 计算所有的组件数据，判断是否在选中区域内
  componentData.forEach((component) => {
    // 获取位置大小信息：left, top, width, height
    const { width, height, left, top, rotate } = component.style
    const componentRect: Location = calcComponentAxis({
      width,
      height,
      left,
      top,
      rotate
    })
    if (
      componentRect.left >= rect.left &&
      componentRect.right <= rect.right &&
      componentRect.top >= rect.top &&
      componentRect.bottom <= rect.bottom
    ) {
      selectedComponents.push(component)
      leftSet.add(componentRect.left)
      topSet.add(componentRect.top)
      rightSet.add(componentRect.right)
      bottomSet.add(componentRect.bottom)
    }
  })

  if (selectedComponents.length > 0) {
    const left = Math.min(...leftSet)
    const right = Math.max(...rightSet)
    const top = Math.min(...topSet)
    const bottom = Math.max(...bottomSet)
    return {
      components: selectedComponents,
      rect: { left, right, top, bottom }
    }
  }
}

/**
 * 页面等比缩放
 * @param rootEl 页面根
 * @param width 设计宽度
 * @param height 设计高度
 */
export const pageScale = (rootEl: HTMLDivElement, width: number, height: number) => {
  const scaleX = document.documentElement.clientWidth / width
  const scaleY = document.documentElement.clientHeight / height
  const scale = Math.min(scaleX, scaleY)
  rootEl.style.transform = `scale(${scale}) translate(-50%)`
}

/**
 * 获取一组组件真实区域坐标
 * @param components
 * @returns
 */
export const getComponentRealRect = (components: CustomComponent[]) => {
  const maxRect: {
    right: number
    left: number
    top: number
    bottom: number
    center: Vector
    component: CustomComponent
  }[] = []

  const xAxisSet: Array<number> = []
  const yAxisSet: Array<number> = []
  components.forEach((ele) => {
    const left: number = ele.positionStyle.left
    const width: number = ele.positionStyle.width
    const top: number = ele.positionStyle.top
    const height: number = ele.positionStyle.height
    const rotate = Number(ele.positionStyle.rotate)
    const leftTop: Vector = { x: left, y: top }
    const rightTop: Vector = { x: left + width, y: top }
    const rightBottom: Vector = { x: left + width, y: top + height }
    const leftBottom: Vector = { x: left, y: top + height }
    const center: Vector = { x: left + width / 2, y: top + height / 2 }
    const locations = [leftTop, rightBottom, leftBottom, rightTop]
    const xAxis: number[] = []
    const yAxis: number[] = []
    locations.forEach((el: Vector) => {
      const point = rotatePoint(el, center, rotate)
      xAxis.push(point.x)
      yAxis.push(point.y)
      xAxisSet.push(point.x)
      yAxisSet.push(point.y)
    })
    const newLeft: number = Math.min(...xAxis)
    const newTop: number = Math.min(...yAxis)
    const newRight: number = Math.max(...xAxis)
    const newBottom: number = Math.max(...yAxis)
    maxRect.push({
      left: newLeft,
      top: newTop,
      right: newRight,
      bottom: newBottom,
      center: center,
      component: ele
    })
  })
  return {
    items: maxRect,
    left: Math.min(...xAxisSet),
    top: Math.min(...yAxisSet),
    right: Math.max(...xAxisSet),
    bottom: Math.max(...yAxisSet)
  }
}

/**
 * 计算组合组件的位置信息
 */
export function calcComponentsRect(components: CustomComponent[]) {
  const leftSet: Set<number> = new Set()
  const topSet: Set<number> = new Set()
  const rightSet: Set<number> = new Set()
  const bottomSet: Set<number> = new Set()
  components.forEach((component) => {
    // 获取位置大小信息：left, top, width, height
    const style: DOMRectStyle = component.positionStyle
    const componentRect: Location = calcComponentAxis(style)
    leftSet.add(componentRect.left)
    topSet.add(componentRect.top)
    rightSet.add(componentRect.right)
    bottomSet.add(componentRect.bottom)
  })

  const left = Math.min(...leftSet)
  const right = Math.max(...rightSet)
  const top = Math.min(...topSet)
  const bottom = Math.max(...bottomSet)
  return { left, top, width: right - left, height: bottom - top }
}

/**
 * 计算组件笛卡尔坐标系坐标
 * @param style 组件在画布中的位置
 * @returns 组件坐标
 */
export function calcComponentAxis(style: DOMRectStyle): Location {
  const leftUpPoint: Vector = { x: style.left, y: style.top }
  const rightUpPoint: Vector = { x: style.left + style.width, y: style.top }
  const rightDownPoint: Vector = { x: style.left + style.width, y: style.top + style.height }
  const leftDownPoint: Vector = { x: style.left, y: style.top + style.height }
  const center: Vector = { x: style.left + style.width / 2, y: style.top + style.height / 2 }
  const realRotate = mod360(style.rotate)
  if (realRotate != 0) {
    const alu: Vector = rotatePoint(leftUpPoint, center, realRotate)
    const aru: Vector = rotatePoint(rightUpPoint, center, realRotate)
    const ard: Vector = rotatePoint(rightDownPoint, center, realRotate)
    const ald: Vector = rotatePoint(leftDownPoint, center, realRotate)
    const left = Math.min(alu.x, aru.x, ard.x, ald.x)
    const right = Math.max(alu.x, aru.x, ard.x, ald.x)
    const top = Math.min(alu.y, aru.y, ard.y, ald.y)
    const bottom = Math.max(alu.y, aru.y, ard.y, ald.y)
    return { left, right, top, bottom }
  } else {
    return {
      top: style.top,
      left: style.left,
      right: style.left + style.width,
      bottom: style.top + style.height
    }
  }
}

/**
 * @description: 角度转弧度
 * Math.PI = 180 度
 */
function angleToRadian(angle: number) {
  return (angle * Math.PI) / 180
}

/**
 * 点旋转函数
 * @param point 被旋转的点
 * @param center 旋转中心
 * @param rotate 旋转弧度
 * @returns
 */
export function rotatePoint(point: Vector, center: Vector, rotate: number): Vector {
  /**
   * 旋转公式：
   *  点a(x, y)
   *  旋转中心c(x, y)
   *  旋转后点n(x, y)
   *  旋转角度θ                tan ??
   * nx = cosθ * (ax - cx) - sinθ * (ay - cy) + cx
   * ny = sinθ * (ax - cx) + cosθ * (ay - cy) + cy
   */

  return {
    x:
      (point.x - center.x) * Math.cos(angleToRadian(rotate)) -
      (point.y - center.y) * Math.sin(angleToRadian(rotate)) +
      center.x,
    y:
      (point.x - center.x) * Math.sin(angleToRadian(rotate)) +
      (point.y - center.y) * Math.cos(angleToRadian(rotate)) +
      center.y
  }
}

// 求两点之间的中点坐标
export function getCenterPoint(p1: Vector, p2: Vector): Vector {
  return {
    x: p1.x + (p2.x - p1.x) / 2,
    y: p1.y + (p2.y - p1.y) / 2
  }
}

export function sin(rotate: number): number {
  return Math.abs(Math.sin(angleToRadian(rotate)))
}

export function cos(rotate: number): number {
  return Math.abs(Math.cos(angleToRadian(rotate)))
}

export function mod360(deg): number {
  deg = deg || 0
  return (deg + 360) % 360
}

export function createGroupStyle(groupComponent: CustomComponent) {
  const parentStyle: DOMRectStyle = groupComponent.positionStyle
  groupComponent.subComponents!.forEach((component) => {
    // component.groupStyle 的 gtop gsleft 是相对于 group 组件的位置
    // 如果已存在 component.groupStyle，说明已经计算过一次了。不需要再次计算
    component.groupStyle = {
      gleft: toPercent((component.positionStyle.left - parentStyle.left) / parentStyle.width),
      gtop: toPercent((component.positionStyle.top - parentStyle.top) / parentStyle.height),
      gwidth: toPercent(component.positionStyle.width / parentStyle.width),
      gheight: toPercent(component.positionStyle.height / parentStyle.height),
      grotate: component.positionStyle.rotate
    }
  })
}
export function swap<T>(arr: Array<T>, i: number, j: number) {
  arr.splice(j, 1, ...arr.splice(i, 1, arr[j]))
}

export const uuid = (hasHyphen?: string) => {
  return (
    hasHyphen ? 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx' : 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'
  ).replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0
    const v = c == 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

/**
 * 剔除指定样式，并转化为css
 * @param style  原始样式
 * @param excludes 剔除条件
 * @returns css
 */
export function excludeStyle(style: Record<string, any>, excludes: Array<string> = []) {
  let result: Record<string, string> = {}
  Object.keys(style).forEach((key) => {
    if (!excludes.includes(key)) {
      const css = stylePropToCss(key, style[key])
      result = { ...result, ...css }
    }
  })

  return result
}

/**
 * 保留指定样式，并转化为css
 * @param style 原始样式
 * @param filters 过滤条件
 * @returns css
 */
export function filterStyle(style: Record<string, any>, filters: Array<string> = []) {
  let result: Record<string, any> = {}
  Object.keys(style).forEach((key) => {
    if (filters.includes(key)) {
      const css = stylePropToCss(key, style[key])
      result = { ...result, ...css }
    }
  })
  return result
}

/**
 * 生成群组样式
 * @param style 原始样式
 * @returns css
 */

export const getGroupStyle = (style: Record<string, any>) => {
  const filters = ['gtop', 'gheight', 'gwidth', 'gleft', 'grotate']
  return filterStyle(style, filters)
}

/**
 * 转化组件样式为css
 * @param component 主要转化样式的组件
 * @returns css
 */
export const getComponentStyle = (component: CustomComponent) => {
  const style = cloneDeep(component.style)
  const groupStyle = cloneDeep(component.groupStyle)
  if (groupStyle) {
    return {
      ...excludeStyle(style, ['top', 'left', 'width', 'height', 'rotate']),
      ...getGroupStyle(groupStyle)
    }
  } else {
    return excludeStyle(component.style)
  }
}

/**
 * 转化组件样式为css
 * @param component 主要转化样式的组件
 * @returns css
 */
export const getComponentShapeStyle = (component: CustomComponent) => {
  const style = cloneDeep(component.style)
  const groupStyle = cloneDeep(component.groupStyle)
  if (groupStyle) {
    return {
      ...excludeStyle(style, ['top', 'left', 'width', 'height', 'rotate']),
      ...getGroupStyle(groupStyle)
    }
  } else {
    return excludeStyle(style, ['top', 'left', 'width', 'height', 'rotate'])
  }
}

/**
 * 转化组件样式为css
 * @param component 主要转化样式的组件
 * @returns css
 */
export const getInnerComponentShapeStyle = (component: CustomComponent) => {
  const style = cloneDeep(component.style)
  return {
    ...excludeStyle(style, ['top', 'left', 'width', 'height', 'rotate']),
    width: '100%',
    height: '100%'
  }
}

export const stylePropToCss = (key: string, value: any): Record<string, any> => {
  switch (key) {
    case 'gwidth':
    case 'gheight':
    case 'gtop':
    case 'gleft':
      return { [key.slice(1)]: `${value}%` }
    case 'width':
    case 'height':
    case 'top':
    case 'left':
    case 'bottom':
    case 'right':
      return { [key]: `${value}px` }
    case 'fontSize':
    case 'borderWidth':
    case 'letterSpacing':
    case 'borderRadius':
      return { [key]: `${value}px` }
    case 'rotate':
    case 'scaleX':
    case 'scaleY':
      return { transform: `${key}(${value}deg)` }

    case 'grotate':
      return { transform: `${key.slice(1)}(${value}deg)` }

    case 'scale':
      return { transform: `${key}(${(value[0], value[1])}deg)` }
    case 'image':
      return { backgroundImage: value ? `url(${value})` : null }
    case 'linearGradient':
      return value.color1 && value.color2 && isNumber(value.angle)
        ? {
            backgroundImage: `linear-gradient(${value.angle}deg, ${value.color1}, ${value.color2})`
          }
        : {}
    case 'background': {
      return backgroundToCss(value)
    }
    default:
      return { [key]: value }
  }
}

export const backgroundToCss = (value: any) => {
  if ('angle' in value) {
    return {
      backgroundImage: `linear-gradient(${value.angle}deg, ${value.color1}, ${value.color2})`
    }
  } else if (
    'backgroundImage' in value &&
    value['backgroundImage'] &&
    !value['backgroundImage'].startsWith('url')
  ) {
    value['backgroundImage'] = `url(${value['backgroundImage']})`
  }
  return value
}
export const exportRaw = (name: string, data: string) => {
  const downLink = document.createElement('a')
  const blob = new Blob([data])
  downLink.href = URL.createObjectURL(blob)

  // 将下载链接插入页面中
  document.body.appendChild(downLink)
  downLink.download = name
  downLink.click()

  // 然后移除
  document.body.removeChild(downLink)
}

// 导入本地数据
export const importRaw = (fileHandler, accept = '.*') => {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = accept
  input.onchange = (e) => {
    if (e.currentTarget && e.currentTarget['files']) {
      const length = e.currentTarget['files'].length || 0
      if (length === 0) {
        return
      } else {
        const reader = new FileReader()
        reader.readAsText(e.currentTarget['files'][0])
        reader.onload = fileHandler
      }
    }
  }
  document.body.appendChild(input)
  input.click()
  document.body.removeChild(input)
}

export const copyText = (text: string): void => {
  const copy = (event: ClipboardEvent) => {
    event.clipboardData?.setData('text', text)
    event.preventDefault()
  }
  document.addEventListener('copy', copy)
  document.execCommand('copy')
  document.removeEventListener('copy', copy)
}

/**
 * 请求动画帧的节流工具
 * @param fn 被执行的函数
 * @returns
 */
export function throttleFrame(fn) {
  let timer = 0
  return function (this: any, ...args: any[]) {
    const self = this
    if (timer) {
      cancelAnimationFrame(timer)
      timer = 0
    }
    timer = requestAnimationFrame(() => {
      timer = 0
      fn.apply(self, args)
    })
  }
}

export const diffIndex = (fromIndex: string, toIndex: string): boolean => {
  if (fromIndex && toIndex && fromIndex !== toIndex) {
    const fromLength = fromIndex.length
    const toLength = toIndex.length
    const length = Math.min(toLength, fromLength)
    if (fromIndex.substring(0, length) === toIndex.substring(0, length)) {
      return toLength <= fromLength
    } else {
      return true
    }
  } else {
    return false
  }
}

export const handleLogger = new Logger('handle')
export const systemLogger = new Logger('system')
