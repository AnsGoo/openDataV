type ZRLineType = 'solid' | 'dotted' | 'dashed' | number | number[]
export interface StereoscopicBarChart {
  data: {
    upperLimit: number
    lowerLimit: number
    min: string | undefined
    max: string | undefined
    minOffset: number
    maxOffset: number
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
}
