import type { SeriesOption } from 'echarts/types/dist/echarts'
import type { EChartLineSeriesOption } from './propTypes'
import type { GroupType } from '@/types/component'

// 折线图系列配置
export const eChartLineSeriesAttr: GroupType = {
  name: '系列配置',
  uid: 'series',
  max: 1,
  children: [
    {
      key: 'name',
      label: '名称',
      type: 'text'
    },
    {
      key: 'smooth',
      label: '是否平滑',
      type: 'switch'
    },
    {
      key: 'areaStyle',
      label: '是否填充区域',
      type: 'switch'
    },
    {
      key: 'itemColor',
      label: '线条颜色',
      type: 'array',
      arrayAttr: {
        key: 'color',
        type: 'text',
        max: 10
      }
    }
  ]
}

export const eChartLineSeries: EChartLineSeriesOption = {
  name: '折线图',
  smooth: true,
  areaStyle: false,
  itemColor: []
}

const getLineSeries = (series: EChartLineSeriesOption): SeriesOption[] => {
  const getItemColor = (args): string => {
    for (const item of series.itemColor) {
      const [val, color] = item.split(',')
      if (args.value > Number(val)) {
        return color
      }
    }

    return '#aaa'
  }

  return [
    {
      name: series.name || '',
      type: 'line',
      smooth: series.smooth,
      areaStyle: series.areaStyle ? {} : undefined,
      itemStyle: {
        color: getItemColor
      }
    }
  ]
}

export default getLineSeries
