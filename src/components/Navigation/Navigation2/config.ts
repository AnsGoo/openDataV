import { ComponentGroup } from '@/enum'
import type { ComponentInfo, GroupType, ComponentOptions } from '@/types/component'

const component: ComponentInfo = {
  component: 'Navigation2',
  group: ComponentGroup.Navigation,
  label: '导航2',
  propValue: {
    colorLeft: '#11eefd',
    colorRight: '#0078d2',
    backgroundColor: '',
    titleWidth: 150,
    strokeWdith: 2,
    routerUrl: ''
  },
  icon: 'line',
  style: {
    width: 240,
    height: 250
  }
}

const style: Array<GroupType> = []

const attrs: Array<GroupType> = [
  {
    name: '边框色彩',
    uid: 'display',
    children: [
      {
        key: 'titleWidth',
        label: '标题宽',
        type: 'number'
      },
      {
        key: 'colorLeft',
        label: '边框颜色1',
        type: 'color'
      },
      {
        key: 'colorRight',
        label: '边框颜色2',
        type: 'color'
      },
      {
        key: 'backgroundColor',
        label: '底色',
        type: 'color'
      },
      {
        key: 'strokeWdith',
        label: '边框宽度',
        type: 'number'
      }
    ]
  },
  {
    name: '事件配置',
    uid: 'action',
    children: [
      {
        key: 'routerUrl',
        label: '路由地址',
        type: 'text'
      }
    ]
  }
]

const componentOptions: ComponentOptions = { component, style, attrs }
export default componentOptions
