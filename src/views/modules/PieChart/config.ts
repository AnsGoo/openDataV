import { cloneDeep } from 'lodash-es'
import { ComponentGroup } from '@/enum'
import type { DataOption } from '@/types/common'
import type { EChartPropTypes, EChartPieSeriesOption } from '@/utils/echarts/propTypes'
import type { ComponentInfo, GroupType, ComponentOptions } from '@/types/component'
import { basicEchartConfig, basicEchartAttr } from '@/utils/echarts/commonProp'
import { eChartPieSeries, eChartPieSeriesAttr } from '@/utils/echarts/pieSeries'

const component: ComponentInfo<EChartPropTypes<EChartPieSeriesOption> & DataOption> = {
  component: 'PieChart',
  label: '饼图',
  group: ComponentGroup.PERCENTAGE,
  propValue: {
    history: '',
    dataTag: '',

    ...basicEchartConfig,

    color: ['#13c2c2', '#aaa'],
    series: [cloneDeep(eChartPieSeries)]
  },
  icon: 'wenben',
  style: {
    width: 300,
    height: 300
  }
}

const style: Array<GroupType> = []

const attrs: Array<GroupType> = [
  ...basicEchartAttr,
  cloneDeep(eChartPieSeriesAttr),
  {
    name: '数据配置',
    uid: 'data',
    children: [
      {
        key: 'history',
        label: '历史数据',
        type: 'text'
      },
      {
        key: 'dataTag',
        label: '数据标签',
        type: 'text'
      }
    ]
  },
  {
    name: '基础配置',
    uid: 'display',
    children: [
      {
        key: 'color',
        label: '颜色',
        type: 'array',
        arrayAttr: {
          key: 'color',
          type: 'color',
          max: 2
        }
      }
    ]
  }
]

const componentOptions: ComponentOptions = { component, style, attrs }
export default componentOptions
