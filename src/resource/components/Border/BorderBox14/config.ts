import { ComponentGroup, FormType } from '@/enum'
import type { ComponentConfig, PropsType, ComponentOptions } from '@/types/component'
import type { BorderBox14 } from './type'

const component: ComponentConfig<BorderBox14> = {
  component: 'BorderBox14',
  group: ComponentGroup.BORDER,
  label: '14号边框',
  propValue: {
    color: '#1a98fc',
    width: 2,
    style: 'solid'
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
        key: 'color',
        label: '边框颜色',
        type: FormType.COLOR
      },
      {
        key: 'width',
        label: '边框宽度',
        type: FormType.NUMBER
      },
      {
        key: 'style',
        label: '样式',
        type: FormType.SELECT,
        componentOptions: {
          options: [
            { value: 'dotted', label: '点线' },
            { value: 'solid ', label: '实线' },
            { value: 'double ', label: '双实线' },
            { value: 'dashed', label: '虚线' }
          ]
        }
      }
    ]
  }
]

const componentOptions: ComponentOptions = { component, style, attrs }
export default componentOptions
