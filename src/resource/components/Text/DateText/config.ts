import { ComponentGroup, FormType } from '@/enum'
import type { ComponentConfig, PropsType, ComponentOptions } from '@/types/component'
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

const style: Array<PropsType> = [
  {
    name: '字体设置',
    uid: 'background',
    children: [
      {
        key: 'color',
        label: '颜色',
        type: FormType.COLOR
      },
      {
        key: 'fontSize',
        label: '字体大小',
        type: FormType.NUMBER
      },
      {
        key: 'fontWeight',
        label: '字体宽度',
        type: FormType.FONT_WEIGHT
      },
      {
        key: 'fontFamily',
        label: '字体',
        type: FormType.FONT_STYLE
      }
    ]
  }
]

const attrs: Array<PropsType> = [
  {
    name: '基础配置',
    uid: 'base',
    children: [
      {
        key: 'format',
        label: '格式',
        type: FormType.TEXT
      }
    ]
  }
]

const componentOptions: ComponentOptions = { component, style, attrs }
export default componentOptions
