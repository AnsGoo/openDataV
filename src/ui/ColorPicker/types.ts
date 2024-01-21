export interface Color {
  [key: string]: number

  r: number
  g: number
  b: number
}

export interface ColorOption {
  a: number
  hex: string
  hex8: string
  hsl: {
    a: number
    h: number
    l: number
    s: number
  }
  hsv: {
    h: number
    v: number
    s: number
    a: number
  }
  oldHue: number
  rgba: {
    r: number
    g: number
    b: number
    a: number
  }
  source?: string
}
