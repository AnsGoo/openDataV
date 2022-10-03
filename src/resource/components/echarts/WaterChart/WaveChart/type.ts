export interface WaveChartType {
  options: {
    amplitude: number // 振幅
    outlineShow: boolean // 是否显示边框
    shape: 'circle' | 'rect' | 'roundRect' | 'triangle' | 'diamond' | 'pin' | 'arrow' | 'container'
    radius: string // 图形占容器比例
    direction: 'left' | 'right' // 波动方向
    waveAnimation: true // 启用波动
    labelShow: true // 是否显示文字
    backgroundColor: string // 背景色
    color: string // 水波颜色
    outlineColor: string // 边框颜色
  }
}
