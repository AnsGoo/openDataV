import { ComponentGroup } from '@/enum'
import type { ComponentConfig, GroupType, ComponentOptions } from '@/types/component'

const component: ComponentConfig = {
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
      }
    ]
  }
]

const attrs: Array<GroupType> = [
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
      },
      {
        key: 'text',
        label: '文字',
        type: 'text'
      }
    ]
  }
]

const componentOptions: ComponentOptions = { component, style, attrs }
export default componentOptions
