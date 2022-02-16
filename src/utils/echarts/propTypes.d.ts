// 坐标轴配置
export interface EChartAxis {
  show: boolean
  name: string
  nameLocation: 'start' | 'middle' | 'end'
  position: 'top' | 'bottom' | 'left' | 'right'
  type: 'value' | 'category' | 'time' | 'log' | undefined
  scale: boolean
}

// 标题类型
export interface EChartTitle {
  show: boolean
  text: string
  subtext: string
  left: 'left' | 'center' | 'right'
  top: 'top' | 'middle' | 'bottom'
  textColor: string
  textSize: number
  subtextColor: string
  subtextSize: number
}

// 图例类型
export interface EChartLegend {
  show: boolean // 是否显示图例
  type: string // 图例类型
  top: string // 图例距离顶部距离
  left: string // 图例距离左边距离
  orient: 'vertical' | 'horizontal' // 图例布局方式
  textColor?: string // 图例文字颜色
  textSize?: number // 图例文字大小
}

// 提示类型
export interface EChartToolTip {
  show: boolean // 是否显示提示框
  trigger: 'item' | 'axis' // 提示框触发类型
  formatter: string // 提示框格式化
}

export interface EChartPropTypes<T> {
  // 坐标轴配置
  axis: EChartAxis[]

  // 标题配置
  title: EChartTitle[]
  // 图例配置
  legend: EChartLegend[]

  // 提示框配置
  tooltip: EChartToolTip[]

  // 颜色配置
  color: string[] // 颜色

  // 图表配置
  series: Array<T> // 图表数据
}

interface EChartCommonSeriesOption {
  name: string
}

// 饼图系列配置
export interface EChartPieSeriesOption extends EChartCommonSeriesOption {
  radius: string[]
  roseType: 'radius' | 'area' | undefined
  labelShow: boolean
  labelPosition: 'center' | 'inside' | 'outside'
  labelFormatter: string
  emphasisScale: boolean
  emphasisLabelShow: boolean
  emphasisFontSize: number
  emphasisFontWeight: 'normal' | 'bold' | 'bolder' | 'lighter' | number
}

export interface EChartLineSeriesOption extends EChartCommonSeriesOption {
  smooth: boolean
  areaStyle: boolean
  itemColor: Array<string>
}

// 图表系列类型合集
export type EChartSeriesOption = EChartPieSeriesOption | EChartLineSeriesOption
