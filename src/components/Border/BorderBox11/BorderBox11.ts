import { ComponentGroup } from '@/enum'
import type { ComponentConfig, GroupType, ComponentOptions } from '@/types/component'

const component: ComponentConfig = {
  component: 'BorderBox11',
  group: ComponentGroup.BORDER,
  label: '11号边框',
  propValue: {
    colorLeft: '#8aaafb',
    colorRight: '#1f33a2',
    backgroundColor: '',
    titleWidth: 250,
    titleSize: 18,
    titleColor: '#fff',
    title: '标题'
  },
  icon: 'line',
  style: {
    width: 500,
    height: 250
  }
}

const style: Array<GroupType> = []

const attrs: Array<GroupType> = [
  {
    name: '标题设置',
    uid: 'title',
    children: [
      {
        key: 'title',
        label: '标题',
        type: 'text'
      },
      {
        key: 'titleWidth',
        label: '标题宽',
        type: 'number'
      },
      {
        key: 'titleSize',
        label: '文字大小',
        type: 'number'
      },
      {
        key: 'titleColor',
        label: '文字颜色',
        type: 'color'
      }
    ]
  },
  {
    name: '边框色彩',
    uid: 'display',
    children: [
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
      }
    ]
  }
]

const componentOptions: ComponentOptions = { component, style, attrs }
export default componentOptions
