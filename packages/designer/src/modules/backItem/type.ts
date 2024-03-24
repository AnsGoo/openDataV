export interface BackgroundImage {
  backgroundImage: string
  backgroundRepeat: string
  backgroundAttachment: string
  backgroundPosition: string
  backgroundSize: string
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
