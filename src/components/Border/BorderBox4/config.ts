import { ComponentGroup } from '@/enum'
import type { ComponentConfig, GroupType, ComponentOptions } from '@/types/component'
import type { BorderBox4 } from './type'

const component: ComponentConfig<BorderBox4> = {
  component: 'BorderBox4',
  group: ComponentGroup.BORDER,
  label: '04号边框',
  propValue: {
    colorLeft: '#11eefd',
    colorRight: '#0078d2',
    backgroundColor: '#00000000',
    reverse: false
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
