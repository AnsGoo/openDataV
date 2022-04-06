import { ComponentGroup } from '@/enum'
import type { ComponentConfig, GroupType, ComponentOptions } from '@/types/component'

const component: ComponentConfig = {
  component: 'Symbol1',
  group: ComponentGroup.TEXT,
  label: '符号',
  propValue: {
    symbol: 'icon-falling'
  },
  icon: 'wenben',
  style: {
    width: 130,
    height: 150,
    color: '#1E90FF',
    fontSize: 100
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
        key: 'symbol',
        label: '符号',
        type: 'text'
      }
    ]
  }
]

const componentOptions: ComponentOptions = { component, style, attrs }
export default componentOptions
