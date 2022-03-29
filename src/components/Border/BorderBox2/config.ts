import { ComponentGroup } from '@/enum'
import type { ComponentConfig, GroupType, ComponentOptions } from '@/types/component'
import type { BorderBox2 } from './type'

const component: ComponentConfig<BorderBox2> = {
  component: 'BorderBox2',
  group: ComponentGroup.BORDER,
  label: '02号边框',
  propValue: {
    color1: '#4fd2dd',
    color2: '#235fa7',
    backgroundColor: '#00000000'
  },
  icon: 'line',
  style: {
    width: 200,
    height: 200
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
        key: 'backgroundColor',
        label: '底色',
        type: 'color'
      }
    ]
  }
]

const componentOptions: ComponentOptions = { component, style, attrs }
export default componentOptions
