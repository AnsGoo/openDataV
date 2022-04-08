import { ComponentGroup } from '@/enum'
import type { ComponentConfig, GroupType, ComponentOptions } from '@/types/component'
import type { StaticText } from './type'

const component: ComponentConfig<StaticText> = {
  component: 'StaticText',
  group: ComponentGroup.TEXT,
  label: '静态文本',
  propValue: {
    text: '自定义文本'
  },
  icon: 'wenben',
  style: {
    width: 150,
    height: 50,
    color: '#1E90FF',
    fontSize: 20,
    fontWeight: 100,
    fontFamily: 'Arial'
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
        type: 'fontWeight'
      },
      {
        key: 'fontFamily',
        label: '字体',
        type: 'fontStyle'
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
        key: 'text',
        label: '自定义文本',
        type: 'text'
      }
    ]
  }
]

const componentOptions: ComponentOptions = { component, style, attrs }
export default componentOptions
