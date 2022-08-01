import { ComponentGroup } from '@/enum'
import type { ComponentConfig, GroupType, ComponentOptions } from '@/types/component'
import { Decoration8 } from './type'

const component: ComponentConfig<Decoration8> = {
  component: 'Decoration8',
  group: ComponentGroup.DECORATION,
  label: '8号装饰',
  propValue: {
    color1: '#1dc1f5',
    color2: '#1dc1f5',
    reverse: false
  },
  icon: 'line',
  style: {
    width: 200,
    height: 60
  }
}

const style: Array<GroupType> = []

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
        key: 'reverse',
        label: '反转',
        type: 'switch'
      }
    ]
  }
]

const componentOptions: ComponentOptions = { component, style, attrs }
export default componentOptions
