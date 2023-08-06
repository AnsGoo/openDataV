export interface Progress {
  data: {
    history: string
    datatag: string
    maxValue: number
  }
  attr: {
    color1: string
    color2: string
    borderWidth: number
    borderGap: number
    lineDash: number
    gapWeight: number
    textColor: string
    borderRadius: number
    localGradient: boolean
    formatter: string
    fontSize: number
  }
}
