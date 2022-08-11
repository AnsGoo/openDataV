import { ComponentGroup, FormType } from '@/enum'
import type { ComponentConfig, PropsType, ComponentOptions } from '@/types/component'
import type { StaticText } from './type'
import { NDatePicker } from 'naive-ui'

const component: ComponentConfig<StaticText> = {
  component: 'StaticText',
  group: ComponentGroup.TEXT,
  label: '静态文本',
  propValue: {
    type: FormType.TEXT,
    text: '自定义文本'
  },
  icon: 'wenben',
  style: {
    width: 150,
    height: 20,
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
        key: 'type',
        label: '文本类型',
        type: FormType.SELECT,
        componentOptions: {
          options: [
            { value: 'text', label: '文本' },
            { value: 'symbol', label: '符号' }
          ]
        }
      },
      {
        key: 'text',
        label: '自定义文本',
        type: FormType.TEXT
      },
      {
        key: 'date',
        label: '测试组件',
        type: FormType.CUSTOM,
        componentOptions: {
          componentType: NDatePicker
        }
      }
    ]
  }
]

const componentOptions: ComponentOptions = { component, style, attrs }
export default componentOptions
