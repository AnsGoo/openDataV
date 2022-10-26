import type { Vector, Position } from '@/types/common'
import type { DOMRectStyle } from '@/types/component'
import { rotatePoint } from './utils'

const funcs = {
  lt: calculateLeftTop,
  t: calculateTop,
  rt: calculateRightTop,
  r: calculateRight,
  rb: calculateRightBottom,
  b: calculateBottom,
  lb: calculateLeftBottom,
  l: calculateLeft
}

function getComponentCenter(style: DOMRectStyle): Vector {
  const { top, left, height, width } = style
  return {
    y: top + height / 2,
    x: left + width / 2
  }
}

/**
 * 直线方程。已知两点坐标和第三点X坐标求Y坐标
 * k =（y-p1.y) / (x-p1.x)
 * @param k
 * @param p1 p1点
 * @param x x坐标
 * @returns y坐标
 */
export function lineEquationY(k, p1: Vector, x: number): number {
  return k * (x - p1.x) + p1.y
}

/**
 * 直线方程。已知两点坐标和第三点Y坐标求X坐标
 *  k =（y-p1.y) / (x-p1.x)
 * @param k
 * @param p1 p1点
 * @param y y坐标
 * @returns x坐标
 */
export function lineEquationX(k, p1: Vector, y: number): number {
  return p1.x - (p1.y - y) / k
}

/**
 *
 * @param style 组件位置
 * @param toPoint 被拖拽点最终的坐标
 * @returns
 */
export function calculateLeftTop(style: DOMRectStyle, toPoint: Vector): Position {
  const { top, left, rotate, width, height } = style
  const center: Vector = getComponentCenter(style)

  // 不动点旋转前的坐标
  const freezePoint: Vector = { x: left + width, y: top + height }
  const afterfreezePoint: Vector = rotatePoint(freezePoint, center, rotate)

  //  拖拽之后的新的组件中点
  const newCenter: Vector = {
    x: (afterfreezePoint.x + toPoint.x) / 2,
    y: (afterfreezePoint.y + toPoint.y) / 2
  }
  // 反向旋转被拖拽的点，找的画布中的坐标
  const realPoint: Vector = rotatePoint(toPoint, newCenter, -rotate)
  const newfreezePoint: Vector = rotatePoint(afterfreezePoint, newCenter, -rotate)
  const realHeight = newfreezePoint.y - realPoint.y
  const realWidth = newfreezePoint.x - realPoint.x

  return { top: realPoint.y, left: realPoint.x, width: realWidth, height: realHeight }
}

/**
 *
 * @param style 组件位置
 * @param toPoint 被拖拽点最终的坐标
 * @returns
 */
function calculateLeft(style: DOMRectStyle, toPoint: Vector): Position {
  const { left, rotate, width, height, top } = style
  const center: Vector = getComponentCenter(style)
  // 不动点旋转前的坐标

  const freezePoint: Vector = { x: left + width, y: top + height / 2 }
  const afterfreezePoint: Vector = rotatePoint(freezePoint, center, rotate)
  if (rotate % 180 != 90) {
    const k = (center.y - afterfreezePoint.y) / (center.x - afterfreezePoint.x)
    const y = lineEquationY(k, center, toPoint.x)
    toPoint.y = y
  } else {
    toPoint.x = center.x
  }
  //  拖拽之后的新的组件中点
  const newCenter: Vector = {
    x: (afterfreezePoint.x + toPoint.x) / 2,
    y: (afterfreezePoint.y + toPoint.y) / 2
  }
  // 反向旋转被拖拽的点，找的画布中的坐标
  const realPoint: Vector = rotatePoint(toPoint, newCenter, -rotate)
  // 反向旋转不懂的点，找的画布中的坐标
  const newfreezePoint: Vector = rotatePoint(afterfreezePoint, newCenter, -rotate)
  const realWidth = newfreezePoint.x - realPoint.x
  return { top: newCenter.y - height / 2, left: realPoint.x, width: realWidth, height: height }
}

/**
 *
 * @param style 组件位置
 * @param toPoint 被拖拽点最终的坐标
 * @returns
 */
function calculateLeftBottom(style: DOMRectStyle, toPoint: Vector): Position {
  const { top, left, rotate, width } = style
  const center: Vector = getComponentCenter(style)
  const freezePoint: Vector = { x: left + width, y: top }
  const afterfreezePoint: Vector = rotatePoint(freezePoint, center, rotate)

  //  拖拽之后的新的组件中点
  const newCenter: Vector = {
    x: (afterfreezePoint.x + toPoint.x) / 2,
    y: (afterfreezePoint.y + toPoint.y) / 2
  }
  // 反向旋转被拖拽的点，找的画布中的坐标
  const realPoint: Vector = rotatePoint(toPoint, newCenter, -rotate)
  // 反向旋转不懂的点，找的画布中的坐标
  const newfreezePoint: Vector = rotatePoint(afterfreezePoint, newCenter, -rotate)
  const realHeight = realPoint.y - newfreezePoint.y
  const realWidth = newfreezePoint.x - realPoint.x

  return { top: realPoint.y - realHeight, left: realPoint.x, width: realWidth, height: realHeight }
}

function calculateBottom(style: DOMRectStyle, toPoint: Vector): Position {
  const { top, left, rotate, width } = style
  const center: Vector = getComponentCenter(style)
  const freezePoint: Vector = { x: left + width / 2, y: top }
  const afterfreezePoint: Vector = rotatePoint(freezePoint, center, rotate)
  if (rotate % 180 != 90) {
    //  组件未旋转 斜率为无穷大
    const k = (center.y - afterfreezePoint.y) / (center.x - afterfreezePoint.x)
    const x = lineEquationX(k, center, toPoint.y)
    toPoint.x = x
  } else {
    toPoint.y = center.y
  }

  //  拖拽之后的新的组件中点
  const newCenter: Vector = {
    x: (afterfreezePoint.x + toPoint.x) / 2,
    y: (afterfreezePoint.y + toPoint.y) / 2
  }
  // 反向旋转被拖拽的点，找的画布中的坐标
  const realPoint: Vector = rotatePoint(toPoint, newCenter, -rotate)
  // 反向旋转不懂的点，找的画布中的坐标
  const newfreezePoint: Vector = rotatePoint(afterfreezePoint, newCenter, -rotate)
  const realHeight = realPoint.y - newfreezePoint.y
  return { top: realPoint.y - realHeight, left: newCenter.x - width / 2, width, height: realHeight }
}

function calculateTop(style: DOMRectStyle, toPoint: Vector): Position {
  const { top, left, rotate, width, height } = style
  const center: Vector = getComponentCenter(style)
  const freezePoint: Vector = { x: left + width / 2, y: top + height }
  const afterfreezePoint: Vector = rotatePoint(freezePoint, center, rotate)
  if (rotate % 180 != 90) {
    //  组件未旋转 斜率为无穷大
    const k = (center.y - afterfreezePoint.y) / (center.x - afterfreezePoint.x)
    const x = lineEquationX(k, center, toPoint.y)
    toPoint.x = x
  } else {
    toPoint.y = center.y
  }
  //  拖拽之后的新的组件中点
  const newCenter: Vector = {
    x: (afterfreezePoint.x + toPoint.x) / 2,
    y: (afterfreezePoint.y + toPoint.y) / 2
  }
  // 反向旋转被拖拽的点，找的画布中的坐标
  const realPoint: Vector = rotatePoint(toPoint, newCenter, -rotate)
  // 反向旋转不懂的点，找的画布中的坐标
  const newfreezePoint: Vector = rotatePoint(afterfreezePoint, newCenter, -rotate)
  const realHeight = newfreezePoint.y - realPoint.y
  return { top: realPoint.y, left: newCenter.x - width / 2, width, height: realHeight }
}

function calculateRightTop(style: DOMRectStyle, toPoint: Vector): Position {
  const { top, left, rotate, height } = style
  const center: Vector = getComponentCenter(style)
  const freezePoint: Vector = { x: left, y: top + height }
  const afterfreezePoint: Vector = rotatePoint(freezePoint, center, rotate)

  //  拖拽之后的新的组件中点
  const newCenter: Vector = {
    x: (afterfreezePoint.x + toPoint.x) / 2,
    y: (afterfreezePoint.y + toPoint.y) / 2
  }
  // 反向旋转被拖拽的点，找的画布中的坐标
  const realPoint: Vector = rotatePoint(toPoint, newCenter, -rotate)
  // 反向旋转不懂的点，找的画布中的坐标
  const newfreezePoint: Vector = rotatePoint(afterfreezePoint, newCenter, -rotate)
  const realHeight = newfreezePoint.y - realPoint.y
  const realWidth = realPoint.x - newfreezePoint.x
  return { top: realPoint.y, left: newfreezePoint.x, width: realWidth, height: realHeight }
}

function calculateRightBottom(style: DOMRectStyle, toPoint: Vector): Position {
  const { top, left, rotate } = style
  const center: Vector = getComponentCenter(style)
  const freezePoint: Vector = { x: left, y: top }
  const afterfreezePoint: Vector = rotatePoint(freezePoint, center, rotate)

  //  拖拽之后的新的组件中点
  const newCenter: Vector = {
    x: (afterfreezePoint.x + toPoint.x) / 2,
    y: (afterfreezePoint.y + toPoint.y) / 2
  }
  // 反向旋转被拖拽的点，找的画布中的坐标
  const realPoint: Vector = rotatePoint(toPoint, newCenter, -rotate)
  // 反向旋转不懂的点，找的画布中的坐标
  const newfreezePoint: Vector = rotatePoint(afterfreezePoint, newCenter, -rotate)
  const realHeight = realPoint.y - newfreezePoint.y
  const realWidth = realPoint.x - newfreezePoint.x
  return { top: newfreezePoint.y, left: newfreezePoint.x, width: realWidth, height: realHeight }
}

function calculateRight(style: DOMRectStyle, toPoint: Vector): Position {
  const { top, left, rotate, height } = style
  const center: Vector = getComponentCenter(style)
  const freezePoint: Vector = { x: left, y: top + height / 2 }
  const afterfreezePoint: Vector = rotatePoint(freezePoint, center, rotate)
  if (rotate % 180 != 90) {
    const k = (center.y - afterfreezePoint.y) / (center.x - afterfreezePoint.x)
    const y = lineEquationY(k, center, toPoint.x)
    toPoint.y = y
  } else {
    toPoint.x = center.x
  }
  //  拖拽之后的新的组件中点
  const newCenter: Vector = {
    x: (afterfreezePoint.x + toPoint.x) / 2,
    y: (afterfreezePoint.y + toPoint.y) / 2
  }
  // 反向旋转被拖拽的点，找的画布中的坐标
  const realPoint: Vector = rotatePoint(toPoint, newCenter, -rotate)
  // 反向旋转不懂的点，找的画布中的坐标
  const newfreezePoint: Vector = rotatePoint(afterfreezePoint, newCenter, -rotate)
  const realWidth = realPoint.x - newfreezePoint.x
  return { top: newfreezePoint.y - height / 2, left: newfreezePoint.x, width: realWidth, height }
}

export function stretchedComponents(point: string, style: DOMRectStyle, toPoint: Vector): Position {
  const { top, left, width, height } = funcs[point](style, toPoint)
  return {
    top: Math.round(top),
    left: Math.round(left),
    width: Math.round(width),
    height: Math.round(height)
  }
}
