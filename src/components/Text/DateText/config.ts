import { ComponentGroup } from '@/enum'
import type { ComponentConfig, GroupType, ComponentOptions } from '@/types/component'
import type { DateText } from './type'

const component: ComponentConfig<DateText> = {
  component: 'DateText',
  group: ComponentGroup.TEXT,
  label: '时间文本',
  propValue: {
    format: 'YYYY-MM-DD HH:mm:ss'
  },
  icon: 'wenben',
  style: {
    width: 200,
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
        key: 'format',
        label: '格式',
        type: 'text'
      }
    ]
  }
]

const componentOptions: ComponentOptions = { component, style, attrs }
export default componentOptions
