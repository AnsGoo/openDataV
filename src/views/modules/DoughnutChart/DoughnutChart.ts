import { ComponentGroup } from '@/enum'
import type { ComponentOptions, GroupType, ComponentInfo } from '@/types/component'

const component: ComponentInfo = {
  component: 'DoughnutChart',
  label: '首页环形图定制',
  group: ComponentGroup.GAUGE,
  propValue: {
    url: 'http://192.168.66.33:60000/Scan/ReadPointValues',
    tagName_sc: 'VR_CMJYXSC',
    tagName_zd: 'VR_CMJZDHSC',
    name_zd: '自动割煤率',
    name_sd: '手动割煤率'
  },
  style: {
    width: 280,
    height: 280
  }
}
const style: Array<GroupType> = []

const attrs: Array<GroupType> = [
  {
    name: '基本配置',
    uid: 'basic',
    children: []
  },
  {
    name: '数据项配置',
    uid: 'datas',
    children: [
      {
        key: 'url',
        label: '提交地址',
        type: 'text'
      },
      {
        key: 'tagName_sc',
        label: '运行时长path点',
        type: 'text'
      },
      {
        key: 'tagName_zd',
        label: '自动化时长path点',
        type: 'text'
      },
      {
        key: 'name_zd',
        label: '自动对应的文字',
        type: 'text'
      },
      {
        key: 'name_sd',
        label: '手动对应的文字',
        type: 'text'
      }
    ]
  }
]

const componentOptions: ComponentOptions = { component, style, attrs }
export default componentOptions
