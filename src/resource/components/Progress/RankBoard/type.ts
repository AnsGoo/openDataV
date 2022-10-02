export interface RankBoard {
  data: {
    maxValue: number
    unit: string
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
