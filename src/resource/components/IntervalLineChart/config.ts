import { ComponentGroup } from '@/enum'
import type { ComponentConfig, GroupType, ComponentOptions } from '@/types/component'
import type { IntervalLineChart } from './type'

const component: ComponentConfig<IntervalLineChart> = {
  component: 'IntervalLineChart',
  group: ComponentGroup.LINE,
  label: '间隔线图',
  propValue: {
    title: '标题',
    subTitle: '子标题',
    history: 'https://data.com',
    data: '{}',
    interval: 3000,
    highflag: 400,
    lowflag: 252,
    method: 'GET'
  },
  icon: 'wenben',
  style: {
    width: 300,
    height: 300
  }
}

const style: Array<GroupType> = []

const attrs: Array<GroupType> = [
  {
    name: '标题配置',
    uid: 'title',
    children: [
      {
        key: 'title',
        label: '标题',
        type: 'text'
      },
      {
        key: 'subTitle',
        label: '子标题',
        type: 'text'
      }
    ]
  },
  {
    name: '数据配置',
    uid: 'data',
    children: [
      {
        key: 'history',
        label: '历史数据地址',
        type: 'text'
      },
      {
        key: 'method',
        label: 'HTTP方法',
        type: 'select',
        componentOptions: {
          options: [
            { value: 'GET', label: 'GET' },
            { value: 'POST', label: 'POST' }
          ]
        }
      },
      {
        key: 'data',
        label: '查询条件',
        type: 'textarea'
      },
      {
        key: 'interval',
        label: '更新间隔',
        type: 'number'
      },
      {
        key: 'highflag',
        label: '最大报警线',
        type: 'number'
      },
      {
        key: 'lowflag',
        label: '最小报警线',
        type: 'number'
      }
    ]
  }
]

const componentOptions: ComponentOptions = { component, style, attrs }
export default componentOptions
