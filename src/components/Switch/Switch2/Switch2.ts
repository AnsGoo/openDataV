import { ComponentGroup } from '@/enum'
import type { ComponentInfo, GroupType, ComponentOptions } from '@/types/component'

const component: ComponentInfo = {
  component: 'Switch2',
  group: ComponentGroup.SWITCH,
  label: '开关2',
  propValue: {
    dataTag: 'ZJGD_2357#ZJGD',
    tooltip: '提示文字',
    optUrl: '',
    downData: '1',
    upData: '0',
    on: '',
    off: '',
    left: 0,
    top: 0,
    fontSize: 50,
    color: '#1dc1f5',
    backgroundColor: '#fff',
    radius: '50%',
    shadow: 0,
    shadowColor: 'rgba(179, 166, 166, 0.8)',
    activeShadow: 0,
    activeShadowColor: 'rgba(163, 136, 136, 0.8)'
  },
  icon: 'wenben',
  style: {
    width: 50,
    height: 50
  }
}

const style: Array<GroupType> = []

const attrs: Array<GroupType> = [
  {
    name: '数据配置',
    uid: 'data',
    children: [
      {
        key: 'optUrl',
        label: '操作地址',
        type: 'text'
      },
      {
        key: 'dataTag',
        label: '标签',
        type: 'text'
      },
      {
        key: 'tooltip',
        label: '提示文字',
        type: 'text'
      },
      {
        key: 'downData',
        label: '按下发送数据',
        type: 'text'
      },
      {
        key: 'upData',
        label: '抬起发送数据',
        type: 'text'
      }
    ]
  },
  {
    name: '样式配置',
    uid: 'style',
    children: [
      {
        key: 'on',
        label: '打开图标',
        type: 'text'
      },
      {
        key: 'off',
        label: '关闭图标',
        type: 'text'
      },
      {
        key: 'left',
        label: '左边距',
        type: 'number'
      },
      {
        key: 'top',
        label: '上边距',
        type: 'number'
      },
      {
        key: 'fontSize',
        label: '字体大小',
        type: 'number'
      },
      {
        key: 'backgroundColor',
        label: '背景颜色',
        type: 'color'
      },
      {
        key: 'color',
        label: '文字颜色',
        type: 'color'
      },
      {
        key: 'radius',
        label: '圆角',
        type: 'text'
      },
      {
        key: 'shadow',
        label: '阴影外延',
        type: 'number'
      },
      {
        key: 'shadowColor',
        label: '阴影颜色',
        type: 'color'
      },
      {
        key: 'activeShadow',
        label: '激活时阴影外延',
        type: 'number'
      },
      {
        key: 'activeShadowColor',
        label: '激活时阴影颜色',
        type: 'color'
      }
    ]
  }
]

const componentOptions: ComponentOptions = { component, style, attrs }
export default componentOptions
