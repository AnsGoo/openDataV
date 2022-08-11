import { ComponentGroup, FormType } from '@/enum'
import type { ComponentConfig, PropsType, ComponentOptions } from '@/types/component'
import type { SubText } from './type'

const component: ComponentConfig<SubText> = {
  component: 'SubText',
  group: ComponentGroup.TEXT,
  label: '数据订阅文本',
  propValue: {
    tagName: 'ZJGD_2212#ZJGD',
    history: '',
    unit: ''
  },
  icon: 'wenben',
  style: {
    width: 100,
    height: 120,
    color: '#1E90FF',
    fontSize: 80,
    fontWeight: 900,
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
        key: 'tagName',
        label: '数据订阅Tag',
        type: FormType.TEXT
      },
      {
        key: 'history',
        label: '最新数据',
        type: FormType.TEXT
      },
      {
        key: 'unit',
        label: '单位',
        type: FormType.TEXT
      }
    ]
  }
]

const componentOptions: ComponentOptions = { component, style, attrs }
export default componentOptions
