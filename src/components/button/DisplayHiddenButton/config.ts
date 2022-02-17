import { ComponentGroup } from '@/enum'
import type { ComponentInfo, GroupType, ComponentOptions } from '@/types/component'

const component: ComponentInfo = {
  component: 'DisplayHiddenButton',
  label: '显示隐藏组件按钮',
  group: ComponentGroup.STARTSTOP,
  propValue: {
    componentId: '',
    displayStyle: 'visibility',
    label: '',
    fontColor: 'yellow',
    tooltip: '',
    fontSize: 60
  },
  style: {
    width: 80,
    height: 80
  }
}
const style: Array<GroupType> = []

const attrs: Array<GroupType> = [
  {
    name: '基本配置',
    uid: 'basic',
    children: [
      {
        key: 'label',
        label: '标签内容',
        type: 'text'
      },
      {
        key: 'fontSize',
        label: '按钮大小',
        type: 'number'
      },
      {
        key: 'fontColor',
        label: '按钮颜色',
        type: 'color'
      },
      {
        key: 'tooltip',
        label: '提示内容',
        type: 'text'
      }
    ]
  },
  {
    name: '控制数据配置',
    uid: 'datas',
    children: [
      {
        key: 'componentId',
        label: '组件ID',
        type: 'text'
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
