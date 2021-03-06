import { ComponentGroup } from '@/enum'
import type { ComponentConfig, GroupType, ComponentOptions } from '@/types/component'

const component: ComponentConfig = {
  component: 'Tabs',
  group: ComponentGroup.BASIC,
  label: 'Tabs组件',
  propValue: {
    componentIds: [],
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
    name: '显示方式',
    uid: 'displayStyle',
    children: [
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
  },
  {
    name: '数据',
    uid: 'componentIds',
    max: 10,
    children: [
      {
        key: 'id',
        label: '组件ID',
        type: 'text'
      }
    ]
  }
]

const componentOptions: ComponentOptions = { component, style, attrs }
export default componentOptions
