export interface Vector {
  x: number
  y: number
}
export type Position = Omit<DOMRectStyle, 'rotate'>

export interface BackgroundType {
  type: 'color' | 'image' | 'gradient'
  value: BackgroundColor | BackgroundImage | BackgroundGradient
}

export interface BackgroundGradient {
  backgroundImage: string
}

export interface BackgroundImage extends BackgroundGradient {
  backgroundRepeat: string
  backgroundAttachment: string
  backgroundPosition: string
  backgroundSize: string
}

export interface BackgroundColor {
  backgroundColor: string
}
