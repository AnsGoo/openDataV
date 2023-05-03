import * as echarts from 'echarts'
import type { Ref } from 'vue'
import { onMounted, onUnmounted } from 'vue'

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

  const resizeHandler = (entry: ResizeObserverEntry) => {
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
