export interface RankBoard {
  data: {
    url: string
    maxValue: number
    unit: string
    interval: number
  }
  bar: {
    color1: string
    color2: string
    barHeight: number
    borderRadius: number
  }
  line: {
    lineHeight: number
    borderGap: number
    lineColor: string
  }
  text: {
    fontSize: number
    labelColor: string
    rankColor: string
    valueColor: string
  }
}
