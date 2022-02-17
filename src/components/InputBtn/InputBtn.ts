import { ComponentGroup } from '@/enum'
import type { ComponentInfo, GroupType, ComponentOptions } from '@/types/component'

const component: ComponentInfo = {
  component: 'InputBtn',
  label: '带按钮的输入框',
  group: ComponentGroup.STARTSTOP,
  propValue: {
    url: '/Scan/WritePoint',
    getDataUrl: '',
    inputValue: '1',
    tagName: 'zj',
    inputBkg: '#0000',
    inputColor: '#0266C6',
    inputBorColor: '#1e90ff',
    btnWords: '设置',
    btnBkg: '#1e90ff',
    btnColor: '#fff'
  },
  style: {
    width: 150,
    height: 30
  }
}
const style: Array<GroupType> = []
const attrs: Array<GroupType> = [
  {
    name: '基本配置',
    uid: 'basic',
    children: [
      {
        key: 'inputBkg',
        label: '输入框背景颜色',
        type: 'color'
      },
      {
        key: 'inputColor',
        label: '输入框中文字颜色',
        type: 'color'
      },
      {
        key: 'inputBorColor',
        label: '输入框边框颜色',
        type: 'color'
      },

      {
        key: 'btnWords',
        label: '按钮文字',
        type: 'input'
      },
      {
        key: 'btnBkg',
        label: '按钮背景颜色',
        type: 'color'
      },
      {
        key: 'btnColor',
        label: '按钮文字颜色',
        type: 'color'
      }
    ]
  },
  {
    name: '数据项配置',
    uid: 'datas',
    children: [
      {
        key: 'url',
        label: '提交数据url地址',
        type: 'input'
      },
      {
        key: 'getDataUrl',
        label: '获取数据url地址',
        type: 'input'
      },
      {
        key: 'tagName',
        label: 'path值',
        type: 'input'
      },
      {
        key: 'inputValue',
        label: '输入的值',
        type: 'input'
      }
    ]
  }
]
const componentOptions: ComponentOptions = { component, style, attrs }
export default componentOptions
