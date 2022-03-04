import { ComponentGroup } from '@/enum'
import type { ComponentConfig, GroupType, ComponentOptions } from '@/types/component'

const component: ComponentConfig = {
  component: 'CommonImage',
  group: ComponentGroup.BASIC,
  label: '图片',
  propValue: {
    imgUrl: ''
  },
  icon: 'wenben',
  style: {
    width: 150,
    height: 150
  }
}

const style: Array<GroupType> = []

const attrs: Array<GroupType> = [
  {
    name: '图片设置',
    uid: 'title',
    children: [
      {
        key: 'imgUrl',
        label: '图片地址',
        type: 'text'
      }
    ]
  }
]

const componentOptions: ComponentOptions = { component, style, attrs }
export default componentOptions
