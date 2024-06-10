import { TinyColor } from '@ctrl/tinycolor'

import type { ColorOption } from './types'

export function tinycolor(...args) {
  return new TinyColor(...args)
}

export function transColor(data, oldHue?): ColorOption {
  const alpha = data && data.a
  let color

  // hsl is better than hex between conversions
  if (data && data.hsl) color = tinycolor(data.hsl)
  else if (data && data.hex && data.hex.length > 0) color = tinycolor(data.hex)
  else if (data && data.hsv) color = tinycolor(data.hsv)
  else if (data && data.rgba) color = tinycolor(data.rgba)
  else if (data && data.rgb) color = tinycolor(data.rgb)
  else color = tinycolor(data)

  if (color && (color._a === undefined || color._a === null))
    color.setAlpha(alpha || color.getAlpha())

  const hsl = color.toHsl()
  const hsv = color.toHsv()
  if (hsl.s === 0) hsv.h = hsl.h = data.h || (data.hsl && data.hsl.h) || oldHue || 0

  /* --- comment this block to fix #109, may cause #25 again --- */
  // when the hsv.v is less than 0.0164 (base on test)
  // because of possible loss of precision
  // the result of hue and saturation would be miscalculated
  if (hsv.v < 0.0164) {
    hsv.h = data.h || (data.hsv && data.hsv.h) || 0
    hsv.s = data.s || (data.hsv && data.hsv.s) || 0
  }

  if (hsl.l < 0.01) {
    hsl.h = data.h || (data.hsl && data.hsl.h) || 0
    hsl.s = data.s || (data.hsl && data.hsl.s) || 0
  }
  /* ------ */

  return {
    hsl,
    hex: color.toHexString().toUpperCase(),
    hex8: color.toHex8String().toUpperCase(),
    rgba: color.toRgb(),
    hsv,
    oldHue: data.h || oldHue || hsl.h,
    source: data.source,
    a: color.getAlpha()
  }
}
