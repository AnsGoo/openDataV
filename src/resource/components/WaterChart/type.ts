export interface WaterChart {
  title: string
  shape: string
  outline: boolean //边框是否显示
  waveAnimation: boolean // 水波是否流动
  borderColor: string
  borderWidth: number
  shadowColor: string
  shadowBlur: number
  fontSize: number
  textColor: string
  offsetLeft: number
  offsetRight: number
  direction: string
  dataTag: string
  maxValue: number
  isInterval: boolean
  interval: number
  history: string
}
