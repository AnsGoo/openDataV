import { cloneDeep } from 'lodash-es'
import { ComponentGroup } from '@/enum'
import type { DataOption } from '@/types/common'
import type { EChartPropTypes, EChartLineSeriesOption } from '@/utils/echarts/propTypes'
import type { ComponentConfig, GroupType, ComponentOptions } from '@/types/component'
import { basicEchartConfig, basicEchartAttr } from '@/utils/echarts/commonProp'
import { eChartLineSeries, eChartLineSeriesAttr } from '@/utils/echarts/lineSeries'

const component: ComponentConfig<EChartPropTypes<EChartLineSeriesOption> & DataOption> = {
  component: 'line-chart',
  group: ComponentGroup.LINE,
  label: '折线图',
  propValue: {
    history: '',
    dataTag: '',

    ...basicEchartConfig,

    color: [],
    series: [cloneDeep(eChartLineSeries)]
  },
  icon: 'line',
  style: {
    width: 200,
    height: 200
  }
}

const style: Array<GroupType> = []

const attrs: Array<GroupType> = [
  ...basicEchartAttr,
  { ...eChartLineSeriesAttr },
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
  }
]

const componentOptions: ComponentOptions = { component, style, attrs }
export default componentOptions
