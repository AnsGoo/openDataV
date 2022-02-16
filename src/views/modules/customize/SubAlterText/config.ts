import { ComponentGroup } from '@/enum'
import type { ComponentInfo, GroupType, ComponentOptions } from '@/types/component'

const component: ComponentInfo = {
  component: 'SubAlterText',
  group: ComponentGroup.CUSTOM,
  label: '告警数据文本',
  propValue: {
    timeout: 0,
    tagExpression: '^CMJ_',
    dateColor: '#1E90FF',
    dateFontSize: 20,
    dateFontWeight: 800,
    dateFontFamily: 'LED',
    typeBackgroundColor: '#1E90FF',
    typeColor: '#fff',
    typeFontSize: 20,
    typeFontWeight: 800,
    typeFontFamily: '',
    descFontSize: 20,
    descFontWeight: 800,
    descFontFamily: '',
    valueColor0: '#1E90FF',
    valueColor1: '#ffd700',
    valueColor2: '#ff4500',
    valueFontSize: 20,
    valueFontWeight: 800,
    valueFontFamily: 'LED'
  },
  icon: 'wenben',
  style: {
    width: 450,
    height: 50
  }
}

const style: Array<GroupType> = []

const attrs: Array<GroupType> = [
  {
    name: '基础配置',
    uid: 'data',
    children: [
      {
        key: 'tagExpression',
        label: '数据Tag表达式',
        type: 'text'
      },
      {
        key: 'timeout',
        label: '警告过期时间(s)',
        type: 'number'
      }
    ]
  },
  {
    name: '告警时间字体设置',
    uid: 'date',
    children: [
      {
        key: 'dateColor',
        label: '颜色',
        type: 'color'
      },
      {
        key: 'dateFontSize',
        label: '字体大小',
        type: 'number'
      },
      {
        key: 'dateFontWeight',
        label: '字体宽度',
        type: 'number'
      },
      {
        key: 'dateFontFamily',
        label: '字体',
        type: 'text'
      }
    ]
  },
  {
    name: '告警值字体设置',
    uid: 'value',
    children: [
      {
        key: 'valueFontSize',
        label: '字体大小',
        type: 'number'
      },
      {
        key: 'valueFontWeight',
        label: '字体宽度',
        type: 'number'
      },
      {
        key: 'valueFontFamily',
        label: '字体',
        type: 'text'
      },
      {
        key: 'valueColor0',
        label: '告警值颜色',
        type: 'color'
      },
      {
        key: 'valueColor1',
        label: '紧急值颜色',
        type: 'color'
      },
      {
        key: 'avlueColor2',
        label: '非常紧急值颜色',
        type: 'color'
      }
    ]
  },
  {
    name: '告警类型字体设置',
    uid: 'type',
    children: [
      {
        key: 'typeBackgroundColor',
        label: '背景颜色',
        type: 'color'
      },
      {
        key: 'typeColor',
        label: '颜色',
        type: 'color'
      },
      {
        key: 'typeFontSize',
        label: '字体大小',
        type: 'number'
      },
      {
        key: 'typeFontWeight',
        label: '字体宽度',
        type: 'number'
      },
      {
        key: 'typeFontFamily',
        label: '字体',
        type: 'text'
      }
    ]
  },
  {
    name: '告警描述字体设置',
    uid: 'desc',
    children: [
      {
        key: 'descFontSize',
        label: '字体大小',
        type: 'number'
      },
      {
        key: 'descFontWeight',
        label: '字体宽度',
        type: 'number'
      },
      {
        key: 'descFontFamily',
        label: '字体',
        type: 'text'
      }
    ]
  }
]

const componentOptions: ComponentOptions = { component, style, attrs }
export default componentOptions
