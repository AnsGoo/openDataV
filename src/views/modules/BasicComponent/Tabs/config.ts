import { ComponentGroup } from '@/enum'
import type { ComponentInfo, GroupType, ComponentOptions } from '@/types/component'

const component: ComponentInfo = {
  component: 'Tab1',
  group: ComponentGroup.BASIC,
  label: 'Tab组件',
  propValue: {
    componentIds: '',
    displayStyle: 'visibility'
  },
  icon: 'wenben',
  style: {
    width: 150,
    height: 50
  }
}

const style: Array<GroupType> = []

const attrs: Array<GroupType> = [
  {
    name: '数据',
    uid: 'data',
    children: [
      {
        key: 'componentIds',
        label: '组件ID',
        type: 'textarea'
      },
      {
        key: 'displayStyle',
        label: '显示方式',
        type: 'select',
        selectOptions: [
          {
            value: 'display',
            label: 'display'
          },
          {
            value: 'visibility',
            label: 'visibility'
          }
        ]
      }
    ]
  }
]

const componentOptions: ComponentOptions = { component, style, attrs }
export default componentOptions
