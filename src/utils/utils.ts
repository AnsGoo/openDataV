import type {
  ComponentInfo,
  ComponentStyle,
  DOMRectStyle,
  GroupStyle,
  Rect
} from '@/types/component'
import { message } from '@/utils/message'
import type { Vector } from '@/types/common'
import { cloneDeep } from 'lodash-es'

export function swap<T>(arr: Array<T>, i: number, j: number) {
  arr.splice(j, 1, ...arr.splice(i, 1, arr[j]))
}

export function changeStyleWithScale(value: number, scale: number): number {
  return (value * scale) / 100
}

/**
 * 剔除指定样式，并转化为css
 * @param style  原始样式
 * @param excludes 剔除条件
 * @returns css
 */
export function excludeStyle(style: Recordable<any>, excludes: Array<string> = []) {
  let result: Recordable<string> = {}
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
export function filterStyle(style: Recordable<any>, filters: Array<string> = []) {
  let result: Recordable<string> = {}
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

export const getGroupStyle = (style: Recordable<any>) => {
  const filters = ['gtop', 'gheight', 'gwidth', 'gleft', 'grotate']
  return filterStyle(style, filters)
}

/**
 * 转化组件样式为css
 * @param component 主要转化样式的组件
 * @returns css
 */
export const getComponentStyle = (component: ComponentInfo) => {
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
export const getComponentShapeStyle = (component: ComponentInfo) => {
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
export const getInnerComponentShapeStyle = (component: ComponentInfo) => {
  const style = cloneDeep(component.style)
  return {
    ...excludeStyle(style, ['top', 'left', 'width', 'height', 'rotate']),
    width: '100%',
    height: '100%'
  }
}

/**
 * 计算组件笛卡尔坐标系坐标
 * @param style 组件在画布中的位置
 * @returns 组件坐标
 */
export function calcComponentAxis(style: DOMRectStyle): Rect {
  // 这里很重要，切记不能删除，将属性复制一份，否则会影响原始的属性值
  style = { ...style }

  const {
    width,
    height,
    left,
    top,
    rotate
  }: { width: number; height: number; left: number; top: number; rotate: number } = style

  const leftUpPoint: Vector = { x: left, y: top }
  const rightUpPoint: Vector = { x: left + width, y: top }
  const rightDownPoint: Vector = { x: left + width, y: top + height }
  const leftDownPoint: Vector = { x: left, y: top + height }
  const center: Vector = { x: left + width / 2, y: top + height / 2 }
  const realRotate = mod360(rotate)
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
    return { top, left, right: left + width, bottom: top + height }
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

export function decomposeComponent(component: ComponentInfo, parentStyle: ComponentStyle) {
  // 获取元素的中心点坐标
  const groupStyle: GroupStyle = component.groupStyle!
  const center: Vector = {
    y: parentStyle.top + parentStyle.height / 2,
    x: parentStyle.left + parentStyle.width / 2
  }

  if (component) {
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
    component.style = {
      ...component.style,
      top: Math.round(afterPoint.y - height / 2),
      left: Math.round(afterPoint.x - width / 2),
      height: Math.round(height),
      width: Math.round(width),
      rotate
    }
    component.groupStyle = undefined
  }
}

export function createGroupStyle(groupComponent: ComponentInfo) {
  const parentStyle: ComponentStyle = groupComponent.style
  groupComponent.subComponents!.forEach((component) => {
    // component.groupStyle 的 gtop gsleft 是相对于 group 组件的位置
    // 如果已存在 component.groupStyle，说明已经计算过一次了。不需要再次计算
    const style = { ...component.style } as DOMRectStyle
    component.groupStyle = {
      gleft: toPercent((style.left - parentStyle.left) / parentStyle.width),
      gtop: toPercent((style.top - parentStyle.top) / parentStyle.height),
      gwidth: toPercent(style.width / parentStyle.width),
      gheight: toPercent(style.height / parentStyle.height),
      grotate: style.rotate
    }
  })
}

/**
 * 计算组合组件的位置信息
 */
export function calcComponentsRect(components: ComponentInfo[]) {
  const leftSet: Set<number> = new Set()
  const topSet: Set<number> = new Set()
  const rightSet: Set<number> = new Set()
  const bottomSet: Set<number> = new Set()
  components.forEach((component) => {
    // 获取位置大小信息：left, top, width, height
    const style: DOMRectStyle = component.style
    const componentRect: Rect = calcComponentAxis(style)
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

export function toPercent(val: number) {
  return parseFloat((val * 100).toFixed(4))
}

// 判断是否图片，以 png/jpg/jpeg/gif/webp 结尾
export function isImage(file) {
  return /(png|jpg|jpeg|gif|webp)$/.test(file)
}

// 检测两个对象不同的属性值
export const checkDiff = (obj1: Recordable<any>, obj2: Recordable<any>) => {
  const result: Recordable<any> = {}
  if (!obj2) {
    return obj1
  }

  Object.keys(obj1).forEach((key) => {
    if (obj1[key] !== obj2[key]) {
      result[key] = obj1[key]
    }
  })

  return result
}

// 清除对象属性
export const cleanObjectProp = (obj) => {
  Object.keys(obj).forEach((key) => delete obj[key])
}

// 生成随机字符串
export const uuid = (hasHyphen?: string) => {
  return (
    hasHyphen ? 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx' : 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'
  ).replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0
    const v = c == 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

// 下载本地数据到文件
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
        message.info('请选择文件')
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

// 复制文本到剪贴板

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
 * 从剪切板获取文本
 * @returns  文本
 */
export const pasteText = (): string => {
  let textData
  const paste = (event: ClipboardEvent) => {
    textData = event.clipboardData?.getData('text')
    event.preventDefault()
  }
  document.addEventListener('paste', paste)
  document.execCommand('paste')
  document.removeEventListener('paste', paste)
  return textData
}

export const stylePropToCss = (key: string, value: any): Recordable<any> => {
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
    case 'backgroundImage':
      return { backgroundImage: `url(${value})` }
    case 'linearGradient':
      return { background: `linear-gradient(${value.angle}deg, ${value.color1}, ${value.color2})` }
    default:
      return { [key]: value }
  }
}

/**
 * 页面等比缩放
 * @param el 页面根
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
export const getComponentRealRect = (components: ComponentInfo[]) => {
  const maxRect: {
    right: number
    left: number
    top: number
    bottom: number
    center: Vector
    component: ComponentInfo
  }[] = []

  const xAxisSet: Array<number> = []
  const yAxisSet: Array<number> = []
  components.forEach((ele) => {
    const left: number = ele.style.left! as number
    const width: number = ele.style.width! as number
    const top: number = ele.style.top! as number
    const height: number = ele.style.height! as number
    const rotate: number = ele.style.rotate! as number
    const leftTop: Vector = { x: left, y: top }
    const rightTop: Vector = { x: left + width, y: top }
    const rightbottom: Vector = { x: left + width, y: top + height }
    const leftbottom: Vector = { x: left, y: top + height }
    const center: Vector = { x: left + width / 2, y: top + height / 2 }
    const loactions = [leftTop, rightbottom, leftbottom, rightTop]
    const xAxis: number[] = []
    const yAxis: number[] = []
    loactions.forEach((el: Vector) => {
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

export const loadScript = async (src: string) => {
  return new Promise(function (resolve, reject) {
    let shouldAppend = false
    let el: any = document.querySelector('script[src="' + src + '"]')
    if (!el) {
      el = document.createElement('script')
      el.type = 'text/javascript'
      el.async = true
      el.src = src
      shouldAppend = true
    } else if (el.hasAttribute('data-loaded')) {
      resolve(el)
      return
    }
    el.addEventListener('error', reject)
    el.addEventListener('abort', reject)
    el.addEventListener('load', function loadScriptHandler() {
      el.setAttribute('data-loaded', true)
      resolve(el)
    })
    if (shouldAppend) document.head.appendChild(el)
  })
}
