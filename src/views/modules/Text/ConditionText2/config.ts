import { ComponentGroup } from '@/enum'
import type { ComponentInfo, GroupType, ComponentOptions } from '@/types/component'

const component: ComponentInfo = {
  component: 'ConditionText2',
  group: ComponentGroup.TEXT,
  label: '条件文本2',
  propValue: {
    history: '',
    tooltip: '',
    tagName: 'CMJ_ZCFMQ',
    symbol1: '=',
    value1: '1',
    displayType1: 'symbol',
    displayType2: 'symbol',
    displayContext1: 'icon-24gl-stopCircle',
    displayContext2: 'icon-24gl-previous',
    color1: '#1E90FF',
    color2: '#1E90FF',
    fontSize1: 100,
    fontSize2: 100,
    tooltip1: '',
    tooltip2: ''
  },
  icon: 'wenben',
  style: {
    width: 100,
    height: 120
  }
}

const style: Array<GroupType> = []

const attrs: Array<GroupType> = [
  {
    name: '数据配置',
    uid: 'data',
    children: [
      {
        key: 'tagName',
        label: '数据标签',
        type: 'text'
      },
      {
        key: 'history',
        label: '最新数据',
        type: 'text'
      },
      {
        key: 'tooltip',
        label: '提示文字',
        type: 'text'
      }
    ]
  },
  {
    name: '条件',
    uid: 'base',
    children: [
      {
        key: 'symbol',
        label: '判别符号',
        type: 'select',
        selectOptions: [
          { value: '>', label: '大于' },
          { value: '<', label: '小于' },
          { value: '=', label: '等于' },
          { value: '>=', label: '大于等于' },
          { value: '<=', label: '小于等于' },
          { value: '!', label: '不等于' }
        ]
      },
      {
        key: 'value',
        label: '判别值',
        type: 'text'
      }
    ]
  },
  {
    name: '显示1',
    uid: 'display1',
    children: [
      {
        key: 'displayType1',
        label: '显示类型',
        type: 'select',
        selectOptions: [
          { value: 'symbol', label: '符号' },
          { value: 'text', label: '文本' }
        ]
      },
      {
        key: 'displayContext1',
        label: '显示内容1',
        type: 'text'
      },
      {
        key: 'color1',
        label: '颜色',
        type: 'color'
      },
      {
        key: 'fontSize1',
        label: '字体大小',
        type: 'number'
      },
      {
        key: 'tooltip1',
        label: '提示文字',
        type: 'text'
      }
    ]
  },
  {
    name: '显示2',
    uid: 'display2',
    children: [
      {
        key: 'displayType2',
        label: '显示类型',
        type: 'select',
        selectOptions: [
          { value: 'symbol', label: '符号' },
          { value: 'text', label: '文本' }
        ]
      },
      {
        key: 'displayContext2',
        label: '显示内容2',
        type: 'text'
      },
      {
        key: 'color2',
        label: '颜色',
        type: 'color'
      },
      {
        key: 'fontSize2',
        label: '字体大小',
        type: 'number'
      },
      {
        key: 'tooltip2',
        label: '提示文字',
        type: 'text'
      }
    ]
  }
]

const componentOptions: ComponentOptions = { component, style, attrs }
export default componentOptions
