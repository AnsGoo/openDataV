import { ComponentGroup } from '@/enum'
import type { ComponentInfo, GroupType, ComponentOptions } from '@/types/component'

const component: ComponentInfo = {
  component: 'MachineWithStatus',
  label: '带状态的泵站图片',
  group: ComponentGroup.MACHINEIMG,
  propValue: {
    history: '/Scan/WritePoint',
    tagName: 'CMJ_ZDHQDXNTZ',
    borderColor: '#0266C6'
  },
  style: {
    width: 150,
    height: 150
  }
}
const style: Array<GroupType> = []
const attrs: Array<GroupType> = [
  {
    name: '基本配置',
    uid: 'basic',
    children: [
      {
        key: 'borderColor',
        label: '边框颜色',
        type: 'color'
      }
    ]
  },
  {
    name: '数据项配置',
    uid: 'datas',
    children: [
      {
        key: 'history',
        label: '初始化接口',
        type: 'text'
      },
      {
        key: 'tagName',
        label: 'path点',
        type: 'text'
      }
    ]
  }
]

const componentOptions: ComponentOptions = { component, style, attrs }
export default componentOptions
