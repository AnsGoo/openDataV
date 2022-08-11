import { ComponentGroup, FormType } from '@/enum'
import type { ComponentConfig, PropsType, ComponentOptions } from '@/types/component'
import type { BorderBox1 } from './type'

const component: ComponentConfig<BorderBox1> = {
  component: 'BorderBox1',
  group: ComponentGroup.BORDER,
  label: '01号边框',
  propValue: {
    colorLeft: '#4fd2dd',
    colorRight: '#235fa7',
    backgroundColor: '#00000000'
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
