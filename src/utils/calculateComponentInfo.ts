/* eslint-disable no-lonely-if */
import type { Vector } from '@/types/common'
import type { DOMRectStyle } from '@/types/component'
import { rotatedPointCoordinate, getCenterPoint } from './utils'

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

function calculateLeftTop(
  style: DOMRectStyle,
  curPositon: Vector,
  proportion: number,
  needLockProportion: boolean,
  pointInfo: {
    center: Vector
    curPoint: Vector
    symmetricPoint: Vector
  }
) {
  const { symmetricPoint } = pointInfo
  let newCenterPoint: Vector = getCenterPoint(curPositon, symmetricPoint)
  let newTopLeftPoint: Vector = rotatedPointCoordinate(curPositon, newCenterPoint, -style.rotate)
  let newBottomRightPoint: Vector = rotatedPointCoordinate(
    symmetricPoint,
    newCenterPoint,
    -style.rotate
  )

  let newWidth: number = newBottomRightPoint.x - newTopLeftPoint.x
  let newHeight: number = newBottomRightPoint.y - newTopLeftPoint.y

  if (needLockProportion) {
    if (newWidth / newHeight > proportion) {
      newTopLeftPoint.x += Math.abs(newWidth - newHeight * proportion)
    } else {
      newTopLeftPoint.y += Math.abs(newHeight - newWidth / proportion)
    }

    // 由于现在求的未旋转前的坐标是以没按比例缩减宽高前的坐标来计算的
    // 所以缩减宽高后，需要按照原来的中心点旋转回去，获得缩减宽高并旋转后对应的坐标
    // 然后以这个坐标和对称点获得新的中心点，并重新计算未旋转前的坐标
    const rotatedTopLeftPoint: Vector = rotatedPointCoordinate(
      newTopLeftPoint,
      newCenterPoint,
      style.rotate
    )
    newCenterPoint = getCenterPoint(rotatedTopLeftPoint, symmetricPoint)
    newTopLeftPoint = rotatedPointCoordinate(rotatedTopLeftPoint, newCenterPoint, -style.rotate)
    newBottomRightPoint = rotatedPointCoordinate(symmetricPoint, newCenterPoint, -style.rotate)

    newWidth = newBottomRightPoint.x - newTopLeftPoint.x
    newHeight = newBottomRightPoint.y - newTopLeftPoint.y
  }

  if (newWidth > 0 && newHeight > 0) {
    const react = {
      width: Math.round(newWidth),
      height: Math.round(newHeight),
      left: Math.round(newTopLeftPoint.x),
      top: Math.round(newTopLeftPoint.y)
    }
    Object.assign(style, react)
  }
}

function calculateRightTop(
  style: DOMRectStyle,
  curPositon: Vector,
  proportion: number,
  needLockProportion: boolean,
  pointInfo: {
    center: Vector
    curPoint: Vector
    symmetricPoint: Vector
  }
) {
  const { symmetricPoint } = pointInfo
  let newCenterPoint: Vector = getCenterPoint(curPositon, symmetricPoint)
  let newTopRightPoint: Vector = rotatedPointCoordinate(curPositon, newCenterPoint, -style.rotate)
  let newBottomLeftPoint: Vector = rotatedPointCoordinate(
    symmetricPoint,
    newCenterPoint,
    -style.rotate
  )

  let newWidth: number = newTopRightPoint.x - newBottomLeftPoint.x
  let newHeight: number = newBottomLeftPoint.y - newTopRightPoint.y

  if (needLockProportion) {
    if (newWidth / newHeight > proportion) {
      newTopRightPoint.x -= Math.abs(newWidth - newHeight * proportion)
    } else {
      newTopRightPoint.y += Math.abs(newHeight - newWidth / proportion)
    }

    const rotatedTopRightPoint = rotatedPointCoordinate(
      newTopRightPoint,
      newCenterPoint,
      style.rotate
    )
    newCenterPoint = getCenterPoint(rotatedTopRightPoint, symmetricPoint)
    newTopRightPoint = rotatedPointCoordinate(rotatedTopRightPoint, newCenterPoint, -style.rotate)
    newBottomLeftPoint = rotatedPointCoordinate(symmetricPoint, newCenterPoint, -style.rotate)

    newWidth = newTopRightPoint.x - newBottomLeftPoint.x
    newHeight = newBottomLeftPoint.y - newTopRightPoint.y
  }

  if (newWidth > 0 && newHeight > 0) {
    const react = {
      width: Math.round(newWidth),
      height: Math.round(newHeight),
      left: Math.round(newBottomLeftPoint.x),
      top: Math.round(newTopRightPoint.y)
    }
    Object.assign(style, react)
  }
}

function calculateRightBottom(
  style: DOMRectStyle,
  curPositon: Vector,
  proportion: number,
  needLockProportion: boolean,
  pointInfo: {
    center: Vector
    curPoint: Vector
    symmetricPoint: Vector
  }
) {
  const { symmetricPoint } = pointInfo
  let newCenterPoint: Vector = getCenterPoint(curPositon, symmetricPoint)
  let newTopLeftPoint: Vector = rotatedPointCoordinate(
    symmetricPoint,
    newCenterPoint,
    -style.rotate
  )
  let newBottomRightPoint: Vector = rotatedPointCoordinate(
    curPositon,
    newCenterPoint,
    -style.rotate
  )

  let newWidth: number = newBottomRightPoint.x - newTopLeftPoint.x
  let newHeight: number = newBottomRightPoint.y - newTopLeftPoint.y

  if (needLockProportion) {
    if (newWidth / newHeight > proportion) {
      newBottomRightPoint.x -= Math.abs(newWidth - newHeight * proportion)
    } else {
      newBottomRightPoint.y -= Math.abs(newHeight - newWidth / proportion)
    }

    const rotatedBottomRightPoint: Vector = rotatedPointCoordinate(
      newBottomRightPoint,
      newCenterPoint,
      style.rotate
    )
    newCenterPoint = getCenterPoint(rotatedBottomRightPoint, symmetricPoint)
    newTopLeftPoint = rotatedPointCoordinate(symmetricPoint, newCenterPoint, -style.rotate)
    newBottomRightPoint = rotatedPointCoordinate(
      rotatedBottomRightPoint,
      newCenterPoint,
      -style.rotate
    )

    newWidth = newBottomRightPoint.x - newTopLeftPoint.x
    newHeight = newBottomRightPoint.y - newTopLeftPoint.y
  }

  if (newWidth > 0 && newHeight > 0) {
    style.width = Math.round(newWidth)
    style.height = Math.round(newHeight)
    style.left = Math.round(newTopLeftPoint.x)
    style.top = Math.round(newTopLeftPoint.y)
  }
}

function calculateLeftBottom(
  style: DOMRectStyle,
  curPositon: Vector,
  proportion: number,
  needLockProportion: boolean,
  pointInfo: {
    center: Vector
    curPoint: Vector
    symmetricPoint: Vector
  }
) {
  const { symmetricPoint } = pointInfo
  let newCenterPoint: Vector = getCenterPoint(curPositon, symmetricPoint)
  let newTopRightPoint: Vector = rotatedPointCoordinate(
    symmetricPoint,
    newCenterPoint,
    -style.rotate
  )
  let newBottomLeftPoint: Vector = rotatedPointCoordinate(curPositon, newCenterPoint, -style.rotate)

  let newWidth: number = newTopRightPoint.x - newBottomLeftPoint.x
  let newHeight: number = newBottomLeftPoint.y - newTopRightPoint.y

  if (needLockProportion) {
    if (newWidth / newHeight > proportion) {
      newBottomLeftPoint.x += Math.abs(newWidth - newHeight * proportion)
    } else {
      newBottomLeftPoint.y -= Math.abs(newHeight - newWidth / proportion)
    }

    const rotatedBottomLeftPoint: Vector = rotatedPointCoordinate(
      newBottomLeftPoint,
      newCenterPoint,
      style.rotate
    )
    newCenterPoint = getCenterPoint(rotatedBottomLeftPoint, symmetricPoint)
    newTopRightPoint = rotatedPointCoordinate(symmetricPoint, newCenterPoint, -style.rotate)
    newBottomLeftPoint = rotatedPointCoordinate(
      rotatedBottomLeftPoint,
      newCenterPoint,
      -style.rotate
    )

    newWidth = newTopRightPoint.x - newBottomLeftPoint.x
    newHeight = newBottomLeftPoint.y - newTopRightPoint.y
  }

  if (newWidth > 0 && newHeight > 0) {
    const react = {
      width: Math.round(newWidth),
      height: Math.round(newHeight),
      left: Math.round(newBottomLeftPoint.x),
      top: Math.round(newTopRightPoint.y)
    }
    Object.assign(style, react)
  }
}

function calculateTop(
  style: DOMRectStyle,
  curPositon: Vector,
  proportion: number,
  needLockProportion: boolean,
  pointInfo: {
    center: Vector
    curPoint: Vector
    symmetricPoint: Vector
  }
) {
  const { symmetricPoint, curPoint }: { symmetricPoint: Vector; curPoint: Vector } = pointInfo
  const rotatedcurPositon: Vector = rotatedPointCoordinate(curPositon, curPoint, -style.rotate)
  const rotatedTopMiddlePoint: Vector = rotatedPointCoordinate(
    {
      x: curPoint.x,
      y: rotatedcurPositon.y
    },
    curPoint,
    style.rotate
  )

  // 勾股定理
  const newHeight: number = Math.sqrt(
    (rotatedTopMiddlePoint.x - symmetricPoint.x) ** 2 +
      (rotatedTopMiddlePoint.y - symmetricPoint.y) ** 2
  )

  if (newHeight > 0) {
    const newCenter = {
      x: rotatedTopMiddlePoint.x - (rotatedTopMiddlePoint.x - symmetricPoint.x) / 2,
      y: rotatedTopMiddlePoint.y + (symmetricPoint.y - rotatedTopMiddlePoint.y) / 2
    }

    let width: number = style.width
    // 因为调整的是高度 所以只需根据锁定的比例调整宽度即可
    if (needLockProportion) {
      width = newHeight * proportion
    }
    const react = {
      width,
      height: Math.round(newHeight),
      left: Math.round(newCenter.x - style.width / 2),
      top: Math.round(newCenter.y - newHeight / 2)
    }
    Object.assign(style, react)
  }
}

function calculateRight(
  style: DOMRectStyle,
  curPositon: Vector,
  proportion: number,
  needLockProportion: boolean,
  pointInfo: {
    center: Vector
    curPoint: Vector
    symmetricPoint: Vector
  }
) {
  const { symmetricPoint, curPoint }: { symmetricPoint: Vector; curPoint: Vector } = pointInfo
  const rotatedcurPositon: Vector = rotatedPointCoordinate(curPositon, curPoint, -style.rotate)
  const rotatedRightMiddlePoint: Vector = rotatedPointCoordinate(
    {
      x: rotatedcurPositon.x,
      y: curPoint.y
    },
    curPoint,
    style.rotate
  )

  const newWidth: number = Math.sqrt(
    (rotatedRightMiddlePoint.x - symmetricPoint.x) ** 2 +
      (rotatedRightMiddlePoint.y - symmetricPoint.y) ** 2
  )
  if (newWidth > 0) {
    const newCenter: Vector = {
      x: rotatedRightMiddlePoint.x - (rotatedRightMiddlePoint.x - symmetricPoint.x) / 2,
      y: rotatedRightMiddlePoint.y + (symmetricPoint.y - rotatedRightMiddlePoint.y) / 2
    }

    let height: number = style.height
    // 因为调整的是宽度 所以只需根据锁定的比例调整高度即可
    if (needLockProportion) {
      height = newWidth / proportion
    }
    const react = {
      width: Math.round(newWidth),
      height,
      left: Math.round(newCenter.x - newWidth / 2),
      top: Math.round(newCenter.y - style.height / 2)
    }
    Object.assign(style, react)
  }
}

function calculateBottom(
  style: DOMRectStyle,
  curPositon: Vector,
  proportion: number,
  needLockProportion: boolean,
  pointInfo: {
    center: Vector
    curPoint: Vector
    symmetricPoint: Vector
  }
) {
  const { symmetricPoint, curPoint }: { symmetricPoint: Vector; curPoint: Vector } = pointInfo
  const rotatedcurPositon: Vector = rotatedPointCoordinate(curPositon, curPoint, -style.rotate)
  const rotatedBottomMiddlePoint: Vector = rotatedPointCoordinate(
    {
      x: curPoint.x,
      y: rotatedcurPositon.y
    },
    curPoint,
    style.rotate
  )

  const newHeight: number = Math.sqrt(
    (rotatedBottomMiddlePoint.x - symmetricPoint.x) ** 2 +
      (rotatedBottomMiddlePoint.y - symmetricPoint.y) ** 2
  )
  if (newHeight > 0) {
    const newCenter = {
      x: rotatedBottomMiddlePoint.x - (rotatedBottomMiddlePoint.x - symmetricPoint.x) / 2,
      y: rotatedBottomMiddlePoint.y + (symmetricPoint.y - rotatedBottomMiddlePoint.y) / 2
    }

    let width: number = style.width
    // 因为调整的是高度 所以只需根据锁定的比例调整宽度即可
    if (needLockProportion) {
      width = newHeight * proportion
    }
    const react = {
      width,
      height: Math.round(newHeight),
      left: Math.round(newCenter.x - style.width / 2),
      top: Math.round(newCenter.y - newHeight / 2)
    }
    Object.assign(style, react)
  }
}

function calculateLeft(
  style: DOMRectStyle,
  curPositon: Vector,
  proportion: number,
  needLockProportion: boolean,
  pointInfo: {
    center: Vector
    curPoint: Vector
    symmetricPoint: Vector
  }
) {
  const { symmetricPoint, curPoint }: { symmetricPoint: Vector; curPoint: Vector } = pointInfo
  const rotatedcurPositon: Vector = rotatedPointCoordinate(curPositon, curPoint, -style.rotate)
  const rotatedLeftMiddlePoint: Vector = rotatedPointCoordinate(
    {
      x: rotatedcurPositon.x,
      y: curPoint.y
    },
    curPoint,
    style.rotate
  )

  const newWidth: number = Math.sqrt(
    (rotatedLeftMiddlePoint.x - symmetricPoint.x) ** 2 +
      (rotatedLeftMiddlePoint.y - symmetricPoint.y) ** 2
  )
  if (newWidth > 0) {
    const newCenter: Vector = {
      x: rotatedLeftMiddlePoint.x - (rotatedLeftMiddlePoint.x - symmetricPoint.x) / 2,
      y: rotatedLeftMiddlePoint.y + (symmetricPoint.y - rotatedLeftMiddlePoint.y) / 2
    }

    let height: number = style.height
    if (needLockProportion) {
      height = newWidth / proportion
    }
    const react = {
      width: Math.round(newWidth),
      height,
      left: Math.round(newCenter.x - newWidth / 2),
      top: Math.round(newCenter.y - style.height / 2)
    }
    Object.assign(style, react)
  }
}

export default function calculateComponentPositonAndSize(
  name: string,
  style: DOMRectStyle,
  curPositon: Vector,
  proportion: number,
  needLockProportion: boolean,
  pointInfo: {
    center: Vector
    curPoint: Vector
    symmetricPoint: Vector
  }
) {
  funcs[name](style, curPositon, proportion, needLockProportion, pointInfo)
}
