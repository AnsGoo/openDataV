import { ComponentGroup } from '@/enum'
import type { ComponentConfig, PropsType, ComponentOptions } from '@/types/component'

const component: ComponentConfig = {
  component: 'Group',
  label: '分组',
  propValue: {},
  icon: 'wenben',
  show: false,
  style: {},
  group: ComponentGroup.BASIC
}

const style: Array<PropsType> = []

const attrs: Array<PropsType> = []

const componentOptions: ComponentOptions = { component, style, attrs }
export default componentOptions
