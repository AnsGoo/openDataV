type ZRLineType = 'solid' | 'dotted' | 'dashed' | number | number[]
export interface BasicLineChart {
  data: {
    upperLimit: number
    lowerLimit: number
    min: number
    max: number
  }
  label: {
    axisLabelColor: string
    axisColor: string
  }
  axis: {
    xshow: boolean
    xcolor: string
    yshow: boolean
    ycolor: string
    xLineType: ZRLineType
    yLineType: ZRLineType
    yAxisLineColor: string
    xAxisLineColor: string
    axisLabelColor: string
    axisColor: string
  }
  series: {
    lineColor: string
    lineLinearStart: string
    lineLinearEnd: string
    lineArea: boolean
    lineWidth: number
  }
}
