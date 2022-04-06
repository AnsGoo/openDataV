import { ComponentGroup } from '@/enum'
import type { ComponentConfig, GroupType, ComponentOptions } from '@/types/component'

const component: ComponentConfig = {
  component: 'BorderBox2',
  group: ComponentGroup.BORDER,
  label: '02号边框',
  propValue: {
    colors: ['#4fd2dd', '#235fa7'],
    backgroundColor: ''
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
        key: 'colors',
        label: '边框色彩',
        type: 'array',
        arrayAttr: {
          key: 'color',
          type: 'color',
          max: 2
        }
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
