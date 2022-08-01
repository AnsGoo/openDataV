import { ComponentGroup } from '@/enum'
import type { ComponentConfig, GroupType, ComponentOptions } from '@/types/component'
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

const style: Array<GroupType> = []

const attrs: Array<GroupType> = [
  {
    name: '边框色彩',
    uid: 'display',
    children: [
      {
        key: 'color',
        label: '边框颜色',
        type: 'color'
      },
      {
        key: 'width',
        label: '边框宽度',
        type: 'number'
      },
      {
        key: 'style',
        label: '样式',
        type: 'select',
        selectOptions: [
          { value: 'dotted', label: '点线' },
          { value: 'solid ', label: '实线' },
          { value: 'double ', label: '双实线' },
          { value: 'dashed', label: '虚线' }
        ]
      }
    ]
  }
]

const componentOptions: ComponentOptions = { component, style, attrs }
export default componentOptions
