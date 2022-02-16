import { ComponentGroup } from '@/enum'
import type { ComponentInfo, GroupType, ComponentOptions } from '@/types/component'

const component: ComponentInfo = {
  component: 'ConditionText3',
  group: ComponentGroup.TEXT,
  label: '条件文本3',
  propValue: {
    history: '',
    tagName: 'CMJ_ZCFMQ',

    symbol1: '=',
    value1: '1',
    displayType1: 'symbol',
    displayContext1: 'icon-24gl-stopCircle',
    color1: '#1E90FF',
    fontSize1: 100,

    symbol2: '=',
    value2: '1',
    displayType2: 'symbol',
    displayContext2: 'icon-24gl-stopCircle',
    color2: '#1E90FF',
    fontSize2: 100,

    symbol3: '=',
    value3: '1',
    displayType3: 'symbol',
    displayContext3: 'icon-24gl-stopCircle',
    color3: '#1E90FF',
    fontSize3: 100,

    symbol4: '=',
    value4: '1',
    displayType4: 'symbol',
    displayContext4: 'icon-24gl-stopCircle',
    color4: '#1E90FF',
    fontSize4: 100
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
    name: '条件1',
    uid: 'condition1',
    children: [
      {
        key: 'symbol1',
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
        key: 'value1',
        label: '判别值',
        type: 'text'
      },
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
        label: '显示内容',
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
      }
    ]
  },
  {
    name: '条件2',
    uid: 'condition2',
    children: [
      {
        key: 'symbol2',
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
        key: 'value2',
        label: '判别值',
        type: 'text'
      },
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
        label: '显示内容',
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
      }
    ]
  },
  {
    name: '条件3',
    uid: 'condition3',
    children: [
      {
        key: 'symbol3',
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
        key: 'value3',
        label: '判别值',
        type: 'text'
      },
      {
        key: 'displayType3',
        label: '显示类型',
        type: 'select',
        selectOptions: [
          { value: 'symbol', label: '符号' },
          { value: 'text', label: '文本' }
        ]
      },
      {
        key: 'displayContext3',
        label: '显示内容',
        type: 'text'
      },
      {
        key: 'color3',
        label: '颜色',
        type: 'color'
      },
      {
        key: 'fontSize3',
        label: '字体大小',
        type: 'number'
      }
    ]
  },
  {
    name: '条件4',
    uid: 'condition4',
    children: [
      {
        key: 'symbol4',
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
        key: 'value4',
        label: '判别值',
        type: 'text'
      },
      {
        key: 'displayType4',
        label: '显示类型',
        type: 'select',
        selectOptions: [
          { value: 'symbol', label: '符号' },
          { value: 'text', label: '文本' }
        ]
      },
      {
        key: 'displayContext4',
        label: '显示内容',
        type: 'text'
      },
      {
        key: 'color4',
        label: '颜色',
        type: 'color'
      },
      {
        key: 'fontSize4',
        label: '字体大小',
        type: 'number'
      }
    ]
  }
]

const componentOptions: ComponentOptions = { component, style, attrs }
export default componentOptions
