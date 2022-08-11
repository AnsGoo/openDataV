import { ComponentGroup, FormType } from '@/enum'
import type { ComponentConfig, PropsType, ComponentOptions } from '@/types/component'
import type { ControlButton } from './type'

const component: ComponentConfig<ControlButton> = {
  component: 'ControlButton',
  label: '控制按钮',
  group: ComponentGroup.CUSTOM,
  propValue: {
    componentId: '',
    displayStyle: 'visibility',
    label: 'icon-dingzhi',
    fontColor: 'yellow',
    tooltip: '提示文本',
    fontSize: 60
  },
  style: {
    width: 60,
    height: 60
  },
  icon: ''
}
const style: Array<PropsType> = []

const attrs: Array<PropsType> = [
  {
    name: '基本配置',
    uid: 'basic',
    children: [
      {
        key: 'label',
        label: '图标',
        type: FormType.TEXT
      },
      {
        key: 'fontSize',
        label: '大小',
        type: FormType.NUMBER
      },
      {
        key: 'fontColor',
        label: '颜色',
        type: FormType.COLOR
      },
      {
        key: 'tooltip',
        label: '提示内容',
        type: FormType.TEXT
      }
    ]
  },
  {
    name: '控制配置',
    uid: 'datas',
    children: [
      {
        key: 'componentId',
        label: '组件ID',
        type: FormType.TEXT
      },
      {
        key: 'displayStyle',
        label: '显示方式',
        type: FormType.SELECT,
        componentOptions: {
          options: [
            {
              value: 'display',
              label: 'display'
            },
            {
              value: 'visibility',
              label: 'visibility'
            }
          ]
        }
      }
    ]
  }
]

const componentOptions: ComponentOptions = { component, style, attrs }
export default componentOptions
