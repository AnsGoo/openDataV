import type { ComponentInfo, GroupType, ComponentOptions } from '@/types/component'

const component: ComponentInfo = {
  component: 'Group',
  label: '分组',
  propValue: {},
  icon: 'wenben',
  show: false,
  style: {}
}

const style: Array<GroupType> = []

const attrs: Array<GroupType> = []

const componentOptions: ComponentOptions = { component, style, attrs }
export default componentOptions
