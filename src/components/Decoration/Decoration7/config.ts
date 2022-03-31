import { ComponentGroup } from '@/enum'
import type { ComponentConfig, GroupType, ComponentOptions } from '@/types/component'
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
    fontWeight: 600
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
    name: '文字',
    uid: 'text',
    children: [
      {
        key: 'text',
        label: '文字',
        type: 'text'
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
        type: 'color'
      },
      {
        key: 'color2',
        label: '边框颜色2',
        type: 'color'
      }
    ]
  }
]

const componentOptions: ComponentOptions = { component, style, attrs }
export default componentOptions
