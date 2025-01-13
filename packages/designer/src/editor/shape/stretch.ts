import type { DOMRectStyle, Position, Vector } from '@open-data-v/base'

import { rotatePoint } from '../../utils'

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

function getComponentCenter(position: DOMRectStyle): Vector {
  const { top, left, height, width } = position
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
function lineEquationY(k, p1: Vector, x: number): number {
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
function lineEquationX(k, p1: Vector, y: number): number {
  return p1.x - (p1.y - y) / k
}

/**
 *
 * @param position 组件位置
 * @param toPoint 被拖拽点最终的坐标
 * @returns
 */
export function calculateLeftTop(position: DOMRectStyle, toPoint: Vector): Position {
  const { top, left, rotate, width, height } = position
  const center: Vector = getComponentCenter(position)

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
 * @param position 组件位置
 * @param toPoint 被拖拽点最终的坐标
 * @returns
 */
function calculateLeft(position: DOMRectStyle, toPoint: Vector): Position {
  const { left, rotate, width, height, top } = position
  const center: Vector = getComponentCenter(position)
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
 * @param position 组件位置
 * @param toPoint 被拖拽点最终的坐标
 * @returns
 */
function calculateLeftBottom(position: DOMRectStyle, toPoint: Vector): Position {
  const { top, left, rotate, width } = position
  const center: Vector = getComponentCenter(position)
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

function calculateBottom(position: DOMRectStyle, toPoint: Vector): Position {
  const { top, left, rotate, width } = position
  const center: Vector = getComponentCenter(position)
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

function calculateTop(position: DOMRectStyle, toPoint: Vector): Position {
  const { top, left, rotate, width, height } = position
  const center: Vector = getComponentCenter(position)
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

function calculateRightTop(position: DOMRectStyle, toPoint: Vector): Position {
  const { top, left, rotate, height } = position
  const center: Vector = getComponentCenter(position)
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

function calculateRightBottom(position: DOMRectStyle, toPoint: Vector): Position {
  const { top, left, rotate } = position
  const center: Vector = getComponentCenter(position)
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

function calculateRight(position: DOMRectStyle, toPoint: Vector): Position {
  const { top, left, rotate, height } = position
  const center: Vector = getComponentCenter(position)
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

/**
 * 根据指定的点和向量计算拉伸后的组件位置和尺寸
 *
 * 此函数用于根据一个指定的点（代表组件的一个角或边缘），组件当前的位置，
 * 以及一个指向目标点的向量，来计算组件拉伸后的位置和尺寸该函数首先根据
 * 指定的点和向量，利用预定义的函数计算出拉伸后组件的top、left、width和height值
 * 然后，它将这些值四舍五入，以确保组件的尺寸和位置为整数，从而避免潜在的渲染问题
 *
 * @param point 组件上被拉伸的点的位置，如 'topLeft'、'bottomRight'等
 * @param position 组件当前的位置，包含top、left、width和height属性
 * @param toPoint 从组件的指定点指向目标点的向量，表示拉伸的方向和距离
 * @returns 返回一个包含拉伸后组件的top、left、width和height的新位置对象
 */
export function stretchedComponents(
  point: string,
  position: DOMRectStyle,
  toPoint: Vector
): Position {
  // 从预定义的函数中根据point参数选择合适的函数来计算新的边界矩形
  const { top, left, width, height } = funcs[point](position, toPoint)
  // 返回经过四舍五入处理的边界矩形，确保尺寸和位置为整数
  return {
    top: Math.round(top),
    left: Math.round(left),
    width: Math.round(width),
    height: Math.round(height)
  }
}
