import { ComponentGroup, FormType } from '@/enum'
import type { ComponentConfig, PropsType, ComponentOptions } from '@/types/component'
import type { Decoration11 } from './type'

const component: ComponentConfig<Decoration11> = {
  component: 'Decoration11',
  group: ComponentGroup.DECORATION,
  label: '11号装饰',
  propValue: {
    color1: 'rgba(101, 134, 236, 0.5)',
    color2: 'rgba(44, 247, 254, 0.5)',
    text: '11号装饰'
  },
  icon: 'line',
  style: {
    width: 200,
    height: 60,
    color: 'rgba(0, 206, 209, 1)',
    fontSize: 20,
    fontWeight: 600
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
      }
    ]
  }
]

const attrs: Array<PropsType> = [
  {
    name: '边框色彩',
    uid: 'display',
    children: [
      {
        key: 'color1',
        label: '边框颜色1',
        type: FormType.COLOR
      },
      {
        key: 'color2',
        label: '边框颜色2',
        type: FormType.COLOR
      },
      {
        key: 'text',
        label: '文字',
        type: FormType.TEXT
      }
    ]
  }
]

const componentOptions: ComponentOptions = { component, style, attrs }
export default componentOptions
