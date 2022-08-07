// 标尺中每小格代表的宽度(根据scale的不同实时变化)
const getGridSize = (scale: number) => {
  if (scale <= 0.25) return 40
  if (scale <= 0.5) return 20
  if (scale <= 1) return 10
  if (scale <= 2) return 5
  if (scale <= 4) return 2
  return 1
}

const FONT_SCALE = 0.83 // 10 / 12

export const drawCavaseRuler = (
  ctx: CanvasRenderingContext2D,
  start: number,
  selectStart: number,
  selectLength: number,
  options: { scale: number; width: number; height: number; ratio: number; palette: any },
  h?: boolean //横向为true,纵向缺省
) => {
  const { scale, width, height, ratio, palette } = options
  const { bgColor, fontColor, shadowColor, longfgColor, shortfgColor } = palette

  // 缩放ctx, 以简化计算
  ctx.scale(ratio, ratio)
  ctx.clearRect(0, 0, width, height)

  // 1. 画标尺底色
  ctx.fillStyle = bgColor
  ctx.fillRect(0, 0, width, height)

  // 2. 画阴影
  if (selectLength) {
    const shadowX = (selectStart - start) * scale // 阴影起点坐标
    const shadowWidth = selectLength * scale // 阴影宽度
    ctx.fillStyle = shadowColor
    h
      ? ctx.fillRect(shadowX, 0, shadowWidth, (height * 3) / 8)
      : ctx.fillRect(0, shadowX, (width * 3) / 8, shadowWidth)
  }

  const gridSize = getGridSize(scale) // 每小格表示的宽度
  const gridPixel = gridSize * scale
  const gridSize10 = gridSize * 10 // 每大格表示的宽度
  const gridPixel10 = gridSize10 * scale

  const startValue = Math.floor(start / gridSize) * gridSize // 绘制起点的刻度(略小于start, 且是gridSize的整数倍)
  const startValue10 = Math.floor(start / gridSize10) * gridSize10 // 长间隔绘制起点的刻度(略小于start, 且是gridSize10的整数倍)

  const offsetX = ((startValue - start) / gridSize) * gridPixel // 起点刻度距离ctx原点(start)的px距离
  const offsetX10 = ((startValue10 - start) / gridSize10) * gridPixel10 // 长间隔起点刻度距离ctx原点(start)的px距离
  const endValue = start + Math.ceil((h ? width : height) / scale) // 终点刻度(略超出标尺宽度即可)

  // 3. 画刻度和文字(因为刻度遮住了阴影)
  ctx.beginPath() // 一定要记得开关路径,因为clearRect并不能清除掉路径,如果不关闭路径下次绘制时会接着上次的绘制

  ctx.fillStyle = fontColor
  ctx.strokeStyle = longfgColor

  // 长间隔和短间隔需要两次绘制，才可以完成不同颜色的设置；分开放到两个for循环是为了节省性能，因为如果放到一个for循环的话，每次循环都会重新绘制操作dom
  // 绘制长间隔和文字
  for (let value = startValue10, count = 0; value < endValue; value += gridSize10, count++) {
    const x = offsetX10 + count * gridPixel10 + 0.5 // prevent canvas 1px line blurry
    h ? ctx.moveTo(x, 0) : ctx.moveTo(0, x)
    ctx.save()
    h ? ctx.translate(x, height * 0.4) : ctx.translate(width * 0.4, x)
    if (!h) {
      ctx.rotate(-Math.PI / 2) // 旋转 -90 度
    }
    ctx.scale(FONT_SCALE / ratio, FONT_SCALE / ratio)
    ctx.fillText(value.toString(), 4 * ratio, 7 * ratio)
    ctx.restore()
    h ? ctx.lineTo(x, (height * 9) / 16) : ctx.lineTo((width * 9) / 16, x)
  }
  ctx.stroke()
  ctx.closePath()

  // 绘制短间隔
  ctx.beginPath()
  ctx.strokeStyle = shortfgColor
  for (let value = startValue, count = 0; value < endValue; value += gridSize, count++) {
    const x = offsetX + count * gridPixel + 0.5 // prevent canvas 1px line blurry
    h ? ctx.moveTo(x, 0) : ctx.moveTo(0, x)
    if (value % gridSize10 !== 0) {
      h ? ctx.lineTo(x, (height * 1) / 4) : ctx.lineTo((width * 1) / 4, x)
    }
  }
  ctx.stroke()
  ctx.closePath()

  // 恢复ctx matrix
  ctx.setTransform(1, 0, 0, 1, 0, 0)
}
