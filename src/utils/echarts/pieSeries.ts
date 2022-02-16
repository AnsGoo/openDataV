import type { SeriesOption } from 'echarts/types/dist/echarts'
import type { EChartPieSeriesOption } from './propTypes'
import type { GroupType } from '@/types/component'

// pie 系列配置
export const eChartPieSeriesAttr: GroupType = {
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
      key: 'radius',
      label: '半径',
      type: 'array',
      arrayAttr: {
        key: 'radius',
        type: 'text',
        max: 2
      }
    },
    {
      key: 'roseType',
      label: '南丁格尔玫瑰图',
      type: 'select',
      selectOptions: [
        { label: '不开启', value: '' },
        { label: '南丁格尔玫瑰图', value: 'radius' },
        { label: '玫瑰图', value: 'area' }
      ]
    },
    {
      key: 'labelShow',
      label: '是否显示标签',
      type: 'switch'
    },
    {
      key: 'labelPosition',
      label: '标签位置',
      type: 'select',
      selectOptions: [
        { label: '中心', value: 'center' },
        { label: '内部', value: 'inside' },
        { label: '外部', value: 'outside' }
      ]
    },
    {
      key: 'labelFormatter',
      label: '标签格式',
      type: 'text'
    },
    {
      key: 'emphasisScale',
      label: '选中是否放大',
      type: 'switch'
    },
    {
      key: 'emphasisLabelShow',
      label: '选中是否显示标签',
      type: 'switch'
    },
    {
      key: 'emphasisFontSize',
      label: '选中文字大小',
      type: 'number'
    },
    {
      key: 'emphasisFontWeight',
      label: '选中文字粗细',
      type: 'select',
      selectOptions: [
        { label: '正常', value: 'normal' },
        { label: '粗体', value: 'bold' },
        { label: '粗体', value: 'bolder' },
        { label: '细体', value: 'lighter' }
      ]
    }
  ]
}

// 饼图系列配置
export const eChartPieSeries: EChartPieSeriesOption = {
  name: '采煤机自动化率',
  radius: ['30%', '50%'],
  roseType: undefined,
  labelShow: false,
  labelPosition: 'center',
  labelFormatter: '{b} {d}%',
  emphasisScale: false,
  emphasisLabelShow: true,
  emphasisFontSize: 30,
  emphasisFontWeight: 'bold'
}

const getPieSeries = (series: EChartPieSeriesOption): SeriesOption[] => {
  const getRadius = (radius: string[] | undefined) => {
    if (!radius) {
      return 0
    }

    if (radius.length === 1) {
      return radius[0]
    }
    return radius
  }

  return [
    {
      name: series.name || '',
      type: 'pie',
      radius: getRadius(series.radius),
      label: {
        show: series.labelShow,
        position: series.labelPosition || 'outside',
        formatter: series.labelFormatter || '{b} {d}%'
      },
      emphasis: {
        scale: series.emphasisScale,
        label: {
          show: series.emphasisLabelShow,
          fontSize: series.emphasisFontSize,
          fontWeight: series.emphasisFontWeight || 'bold'
        }
      },
      roseType: series.roseType || undefined,
      labelLine: {
        show: true
      }
    }
  ]
}

export default getPieSeries
