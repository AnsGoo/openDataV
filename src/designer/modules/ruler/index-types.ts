export interface PaletteType {
  bgColor?: string
  longfgColor?: string
  shortfgColor?: string
  fontColor?: string
  shadowColor?: string
  lineColor?: string
  lineBoardStyle?: string
  borderColor?: string
  cornerActiveColor?: string
  menu?: MenuType
}

export interface MenuType {
  bgColor?: string
  dividerColor?: string
  listItem?: {
    textColor?: string
    hoverTextColor?: string
    disabledTextColor?: string
    bgColor?: string
    hoverBgColor?: string
  }
}

export interface ShadowType {
  x: number
  y: number
  width: number
  height: number
}
export interface LineType {
  h?: Array<number>
  v?: Array<number>
}
