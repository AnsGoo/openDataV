import { ComponentGroup, FormType } from '@/enum'
import type { ComponentConfig, PropsType, ComponentOptions } from '@/types/component'
import type { BorderBox11 } from './type'

const component: ComponentConfig<BorderBox11> = {
  component: 'BorderBox11',
  group: ComponentGroup.BORDER,
  label: '11号边框',
  propValue: {
    colorLeft: '#8aaafb',
    colorRight: '#1f33a2',
    backgroundColor: 'transparent',
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

const style: Array<PropsType> = []

const attrs: Array<PropsType> = [
  {
    name: '标题设置',
    uid: 'title',
    children: [
      {
        key: 'title',
        label: '标题',
        type: FormType.TEXT
      },
      {
        key: 'titleWidth',
        label: '标题宽',
        type: FormType.NUMBER
      },
      {
        key: 'titleSize',
        label: '文字大小',
        type: FormType.NUMBER
      },
      {
        key: 'titleColor',
        label: '文字颜色',
        type: FormType.COLOR
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
        type: FormType.COLOR
      },
      {
        key: 'colorRight',
        label: '边框颜色2',
        type: FormType.COLOR
      },
      {
        key: 'backgroundColor',
        label: '底色',
        type: FormType.COLOR
      }
    ]
  }
]

const componentOptions: ComponentOptions = { component, style, attrs }
export default componentOptions
