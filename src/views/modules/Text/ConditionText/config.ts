import { ComponentGroup } from '@/enum'
import type { ComponentInfo, GroupType, ComponentOptions } from '@/types/component'

const component: ComponentInfo = {
  component: 'ConditionText1',
  group: ComponentGroup.TEXT,
  label: '条件文本',
  propValue: {
    history: '',
    tagName: 'CMJ_ZCFMQ',
    symbol1: '=',
    value1: '1',
    displayType: 'symbol',
    displayContext1: 'icon-24gl-stopCircle',
    displayContext2: 'icon-24gl-previous',
    color: '#1E90FF',
    fontSize: 100
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
    name: '显示',
    uid: 'display',
    children: [
      {
        key: 'displayType',
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
        key: 'displayContext2',
        label: '显示内容2',
        type: 'text'
      }
    ]
  },
  {
    name: '字体设置',
    uid: 'background',
    children: [
      {
        key: 'color',
        label: '颜色',
        type: 'color'
      },
      {
        key: 'fontSize',
        label: '字体大小',
        type: 'number'
      }
    ]
  }
]

const componentOptions: ComponentOptions = { component, style, attrs }
export default componentOptions
