import { ComponentGroup, FormType } from '@/enum'
import type { ComponentConfig, PropsType, ComponentOptions } from '@/types/component'
import type { BorderBox12 } from './type'

const component: ComponentConfig<BorderBox12> = {
  component: 'BorderBox12',
  group: ComponentGroup.BORDER,
  label: '12号边框',
  propValue: {
    colorLeft: '#2e6099',
    colorRight: '#7ce7fd',
    backgroundColor: 'transparent'
  },
  icon: 'line',
  style: {
    width: 150,
    height: 150
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
        type: FormType.COLOR
      },
      {
        key: 'colorRight',
        label: '边框颜色2',
        type: FormType.COLOR
      },
      {
        key: 'backgroundColor',
        label: '底色',
        type: FormType.COLOR
      }
    ]
  }
]

const componentOptions: ComponentOptions = { component, style, attrs }
export default componentOptions
