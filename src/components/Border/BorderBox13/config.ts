import { ComponentGroup } from '@/enum'
import type { ComponentConfig, GroupType, ComponentOptions } from '@/types/component'
import type { BorderBox13 } from './type'

const component: ComponentConfig<BorderBox13> = {
  component: 'BorderBox13',
  group: ComponentGroup.BORDER,
  label: '13号边框',
  propValue: {
    colorLeft: '#1a98fc',
    colorRight: '#2cf7fe',
    backgroundColor: 'transparent'
  },
  icon: 'line',
  style: {
    width: 150,
    height: 150
  }
}

const style: Array<GroupType> = []

const attrs: Array<GroupType> = [
  {
    name: '边框色彩',
    uid: 'display',
    children: [
      {
        key: 'colorLeft',
        label: '边框颜色1',
        type: 'color'
      },
      {
        key: 'colorRight',
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
