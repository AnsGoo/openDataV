import { ComponentGroup, FormType } from '@/enum'
import type { ComponentConfig, PropsType, ComponentOptions } from '@/types/component'
import type { Progress } from './type'

const component: ComponentConfig<Progress> = {
  component: 'Progress',
  label: '进度条',
  group: ComponentGroup.PROGERSS,
  propValue: {
    history: 'https://data.com',
    datatag: 'CMJ_CMJQYSD',
    maxValue: 150,
    color1: '#3DE7C9',
    color2: '#00BAFF',
    borderWidth: 3,
    borderGap: 3,
    lineDash: 5,
    gapWeight: 1,
    textColor: '#fff',
    borderRadius: 5,
    localGradient: false,
    formatter: '{value}%',
    fontSize: 15
  },
  icon: 'wenben',
  style: {
    width: 300,
    height: 100
  }
}

const style: Array<PropsType> = []

const attrs: Array<PropsType> = [
  {
    name: '数据配置',
    uid: 'data',
    children: [
      {
        key: 'history',
        label: '历史数据地址',
        type: FormType.TEXT
      },
      {
        key: 'datatag',
        label: '数据标签',
        type: FormType.TEXT
      },
      {
        key: 'maxValue',
        label: '最大值',
        type: FormType.NUMBER
      }
    ]
  },
  {
    name: '属性配置',
    uid: 'attr',
    children: [
      {
        key: 'color1',
        label: '颜色1',
        type: FormType.COLOR
      },
      {
        key: 'color2',
        label: '颜色2',
        type: FormType.COLOR
      },
      {
        key: 'borderWidth',
        label: '边框宽度',
        type: FormType.NUMBER
      },
      {
        key: 'borderGap',
        label: '边框间隔',
        type: FormType.NUMBER
      },
      {
        key: 'lineDash',
        label: '线条宽度',
        type: FormType.NUMBER
      },
      {
        key: 'gapWeight',
        label: '线条间隙',
        type: FormType.NUMBER
      },
      {
        key: 'fontSize',
        label: '字体大小',
        type: FormType.NUMBER
      },
      {
        key: 'textColor',
        label: '文字颜色',
        type: FormType.COLOR
      },
      {
        key: 'borderRadius',
        label: '圆角',
        type: FormType.NUMBER
      },
      {
        key: 'localGradient',
        label: '局部渐变',
        type: FormType.SWITCH
      },
      {
        key: 'formatter',
        label: '文字格式化',
        type: FormType.TEXT
      }
    ]
  }
]

const componentOptions: ComponentOptions = { component, style, attrs }
export default componentOptions
