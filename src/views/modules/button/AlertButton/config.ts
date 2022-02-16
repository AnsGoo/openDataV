import { ComponentGroup } from '@/enum'
import type { ComponentInfo, GroupType, ComponentOptions } from '@/types/component'

const component: ComponentInfo<{ icon: string; background: string }> = {
  component: 'AlertButton',
  group: ComponentGroup.BASIC,
  label: '提示按钮',
  propValue: {
    icon: 'icon-baojing1',
    background: 'rgba(9, 21, 41, 0.8)'
  },
  icon: 'wenben',
  style: {
    width: 30,
    height: 30
  }
}

const style: Array<GroupType> = []

const attrs: Array<GroupType> = [
  {
    name: '图标配置',
    uid: 'icon',
    children: [
      {
        key: 'icon',
        label: '图标',
        type: 'text'
      },
      {
        key: 'background',
        label: '背景颜色',
        type: 'color'
      }
    ]
  }
]

const componentOptions: ComponentOptions = { component, style, attrs }
export default componentOptions
