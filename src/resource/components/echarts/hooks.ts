import { onUnmounted, Ref, onMounted } from 'vue'
import * as echarts from 'echarts'
import mydark from './theme'

type EchartOption = echarts.EChartsOption | any
// 图表大小改变
export const useEchart = (chartEl: Ref<ElRef | undefined | null>) => {
  echarts.registerTheme('mydark', mydark)
  let chart: Nullable<echarts.EChartsType> = null

  onMounted(() => {
    if (chartEl.value) {
      chart = echarts.init(chartEl.value, 'mydark')
      chart.clear()
    }
  })

  const resizeHandler = (entries) => {
    const entry = entries[0]
    const { width, height } = entry.contentRect
    chart?.resize({ width, height })
  }

  onUnmounted(() => {
    if (chart) {
      chart.clear()
      chart.dispose()
    }
  })

  const updateEchart = (option: EchartOption) => {
    try {
      chart?.setOption(option)
    } catch (e) {
      console.log(e)
    }
  }

  return { updateEchart, resizeHandler }
}
