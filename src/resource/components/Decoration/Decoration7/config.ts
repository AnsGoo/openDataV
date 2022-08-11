import { ComponentGroup, FormType } from '@/enum'
import type { ComponentConfig, PropsType, ComponentOptions } from '@/types/component'
import { Decoration7 } from './type'

const component: ComponentConfig<Decoration7> = {
  component: 'Decoration7',
  group: ComponentGroup.DECORATION,
  label: '7号装饰',
  propValue: {
    color1: '#1dc1f5',
    color2: '#1dc1f5',
    text: '7号装饰'
  },
  icon: 'line',
  style: {
    width: 200,
    height: 60,
    color: 'rgba(0, 206, 209, 1)',
    fontSize: 20,
    fontWeight: 600,
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
    name: '文字',
    uid: 'text',
    children: [
      {
        key: 'text',
        label: '文字',
        type: FormType.TEXT
      }
    ]
  },
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
      }
    ]
  }
]

const componentOptions: ComponentOptions = { component, style, attrs }
export default componentOptions
