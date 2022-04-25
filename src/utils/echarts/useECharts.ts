import type { Ref } from 'vue'
import * as echarts from 'echarts'
import mydark from '@/theme/mydark'
import { EChartTypeEnum } from '@/enum'
import { onMounted, onUnmounted } from 'vue'
import { useEventBus } from '@/bus/useEventBus'
import { useBasicStoreWithOut } from '@/store/modules/basic'
import type {
  EChartPropTypes,
  EChartSeriesOption,
  EChartPieSeriesOption,
  EChartLineSeriesOption
} from '@/utils/echarts/propTypes'
import getPieSeries from './pieSeries'
import getLineSeries from './lineSeries'

type EChartsOption = echarts.EChartsOption
echarts.registerTheme('mydark', mydark)

/**
 *
 * @param propValue 初始化属性
 * @param chartEl  图表容器
 * @param chartType 图表类型
 * @param uid   component + id
 * @returns
 */
export const useEChart = (
  propValue: EChartPropTypes<EChartSeriesOption>,
  chartEl: Ref<HTMLElement | null>,
  chartType: EChartTypeEnum,
  uid: string
) => {
  const basicStore = useBasicStoreWithOut()
  let chart: echarts.EChartsType | null = null
  const option: EChartsOption = {}

  const getOptions = (): EChartsOption => {
    option.color = propValue.color

    // 直角坐标图才需要x、y坐标轴
    if (
      propValue.axis.length === 2 &&
      (chartType === EChartTypeEnum.LINE || chartType === EChartTypeEnum.BAR)
    ) {
      option.xAxis = {
        type: propValue.axis[0].type,
        show: propValue.axis[0].show,
        name: propValue.axis[0].name,
        nameLocation: propValue.axis[0].nameLocation,
        position: propValue.axis[0].position,
        scale: propValue.axis[0].scale
      }
      option.yAxis = {
        type: propValue.axis[1].type,
        show: propValue.axis[1].show,
        name: propValue.axis[1].name,
        nameLocation: propValue.axis[1].nameLocation,
        position: propValue.axis[1].position,
        scale: propValue.axis[1].scale
      }
    }

    // 设置图表标题
    if (propValue.title.length > 0) {
      option.title = {
        show: propValue.title[0].show,
        text: propValue.title[0].text || '',
        subtext: propValue.title[0].subtext || '',
        left: propValue.title[0].left || 'center',
        top: propValue.title[0].top || 'top',
        textStyle: {
          color: propValue.title[0].textColor,
          fontSize: propValue.title[0].textSize
        },
        subtextStyle: {
          color: propValue.title[0].subtextColor,
          fontSize: propValue.title[0].subtextSize
        }
      }
    }

    // 设置图例参数
    if (propValue.legend.length > 0) {
      option.legend = {
        show: propValue.legend[0].show,
        type: propValue.legend[0].type,
        top: propValue.legend[0].top || '10%',
        left: propValue.legend[0].left || '10%',
        orient: propValue.legend[0].orient || 'vertical',
        textStyle: {
          color: propValue.legend[0].textColor || '#fff',
          fontSize: propValue.legend[0].textSize || 12
        }
      }
    }

    // 设置提示参数
    if (propValue.tooltip.length > 0) {
      option.tooltip = {
        show: propValue.tooltip[0].show,
        trigger: propValue.tooltip[0].trigger || 'item',
        formatter: propValue.tooltip[0].formatter || '{a} <br/>{b} : {c} ({d}%)'
      }
    }

    // 设置系列参数
    if (propValue.series.length > 0) {
      const series = propValue.series[0]
      switch (chartType) {
        case EChartTypeEnum.PIE:
          option.series = getPieSeries(series as EChartPieSeriesOption)
          break
        case EChartTypeEnum.LINE:
          option.series = getLineSeries(series as EChartLineSeriesOption)
          break
        default:
          option.series = []
      }
    }

    return option
  }

  const initChart = () => {
    chart = echarts.init(chartEl.value!, 'mydark')
    chart.setOption(getOptions())
  }

  const updateChart = (options: EChartsOption) => {
    chart?.setOption(options)
  }

  onMounted(() => {
    initChart()
  })

  onUnmounted(() => {
    if (chart) {
      chart.clear()
      chart.dispose()
    }
  })

  const propsChange = () => {
    chart?.setOption(getOptions())
  }

  if (basicStore.isEditMode) {
    useEventBus(uid, propsChange)
  }

  return { updateChart, getOptions }
}
