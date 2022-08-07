import { ComponentGroup } from '@/enum'
import type { ComponentConfig, PropsType, ComponentOptions } from '@/types/component'
import type { BorderBox8 } from './type'

const component: ComponentConfig<BorderBox8> = {
  component: 'BorderBox8',
  group: ComponentGroup.BORDER,
  label: '08号边框',
  propValue: {
    colorLeft: 'rgba(126, 208, 234, 1)',
    colorRight: 'rgba(96, 195, 231, 1)',
    backgroundColor: '#00000000',
    reverse: false,
    dur: 3
  },
  icon: 'line',
  style: {
    width: 200,
    height: 200
  }
}

const style: Array<PropsType> = []

const attrs: Array<PropsType> = [
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
      },
      {
        key: 'dur',
        label: '时间',
        type: 'number'
      }
    ]
  }
]

const componentOptions: ComponentOptions = { component, style, attrs }
export default componentOptions
