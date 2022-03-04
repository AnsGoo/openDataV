import { ComponentGroup } from '@/enum'
import type { ComponentConfig, GroupType, ComponentOptions } from '@/types/component'

const component: ComponentConfig = {
  component: 'v-button',
  group: ComponentGroup.BASIC,
  label: '按钮',
  propValue: {
    title: '点击'
  },
  icon: 'wenben',
  style: {
    width: 150,
    height: 150,
    fontSize: 14,
    fontWeight: 500,
    lineHeight: '',
    letterSpacing: 0,
    textAlign: '',
    color: 'black',
    borderWidth: 0,
    borderStyle: 'solid',
    borderColor: 'transparent',
    verticalAlign: 'middle',
    border: '3'
  }
}

const style: Array<GroupType> = [
  {
    name: '边框设置',
    uid: 'border',
    children: [
      {
        key: 'borderWidth',
        label: '边框宽度',
        type: 'number'
      },
      {
        key: 'borderStyle',
        label: '边框风格',
        type: 'select',
        selectOptions: [
          { value: 'none', label: '无轮廓' },
          { value: 'hidden', label: '隐藏边框' },
          { value: 'dotted', label: '点状轮廓' },
          { value: 'solid', label: '实线轮廓' }
        ]
      },
      {
        key: 'borderColor',
        label: '边框颜色',
        type: 'color'
      },
      {
        key: 'borderRadius',
        label: '圆角半径',
        type: 'number'
      }
    ]
  },
  {
    name: '文字设置',
    uid: 'text',
    children: [
      {
        key: 'fontSize',
        label: '字体大小',
        type: 'number'
      },
      {
        key: 'fontWeight',
        label: '字体粗细',
        type: 'select',
        selectOptions: [
          { value: 'normal', label: '正常' },
          { value: 'bold', label: '粗体' },
          { value: 'bolder', label: '特粗体' },
          { value: 'lighter', label: '细体' }
        ]
      },
      {
        key: 'color',
        label: '字体颜色',
        type: 'color'
      }
    ]
  },
  {
    name: '背景设置',
    uid: 'background',
    children: [
      {
        key: 'backgroundColor',
        label: '背景色',
        type: 'color'
      },
      {
        key: 'backgroundImage',
        label: '背景图片',
        type: 'text'
      }
    ]
  }
]

const attrs: Array<GroupType> = [
  {
    name: '标题配置',
    uid: 'title',
    children: [
      {
        key: 'title',
        label: '文本',
        type: 'text'
      }
    ]
  },
  {
    name: '路由配置',
    uid: 'router',
    children: [
      {
        key: 'router',
        label: '路由',
        type: 'text'
      }
    ]
  }
]

const componentOptions: ComponentOptions = { component, style, attrs }
export default componentOptions
