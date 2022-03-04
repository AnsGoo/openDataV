import { ComponentGroup } from '@/enum'
import type { ComponentConfig, GroupType, ComponentOptions } from '@/types/component'

const component: ComponentConfig = {
  component: 'SubText',
  group: ComponentGroup.TEXT,
  label: '数据订阅文本',
  propValue: {
    tagName: 'ZJGD_2212#ZJGD',
    history: ''
  },
  icon: 'wenben',
  style: {
    width: 100,
    height: 120,
    color: '#1E90FF',
    fontSize: 80,
    fontWeight: 900,
    fontFamily: ''
  }
}

const style: Array<GroupType> = [
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
      },
      {
        key: 'fontWeight',
        label: '字体宽度',
        type: 'number'
      },
      {
        key: 'fontFamily',
        label: '字体',
        type: 'text'
      }
    ]
  }
]

const attrs: Array<GroupType> = [
  {
    name: '基础配置',
    uid: 'base',
    children: [
      {
        key: 'tagName',
        label: '数据订阅Tag',
        type: 'text'
      },
      {
        key: 'history',
        label: '最新数据',
        type: 'text'
      }
    ]
  }
]

const componentOptions: ComponentOptions = { component, style, attrs }
export default componentOptions
