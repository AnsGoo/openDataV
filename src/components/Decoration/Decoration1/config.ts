import { ComponentGroup } from '@/enum'
import type { ComponentConfig, GroupType, ComponentOptions } from '@/types/component'
import type { Decoration1 } from './type'

const component: ComponentConfig<Decoration1> = {
  component: 'Decoration1',
  group: ComponentGroup.DECORATION,
  label: '1号装饰',
  propValue: {
    color1: '#fff',
    color2: '#0de7c2',
    pointSideLength: 2.5
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
        key: 'pointSideLength',
        label: '点边大小',
        type: 'number'
      }
    ]
  }
]

const componentOptions: ComponentOptions = { component, style, attrs }
export default componentOptions
