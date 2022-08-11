import { ComponentGroup, FormType } from '@/enum'
import type { ComponentConfig, PropsType, ComponentOptions } from '@/types/component'
import type { ConditionText } from './type'

const component: ComponentConfig<ConditionText> = {
  component: 'ConditionText',
  group: ComponentGroup.TEXT,
  label: '条件文本',
  propValue: {
    history: '',
    tagName: 'CMJ_ZCFMQ',
    condition: []
  },
  icon: 'wenben',
  style: {
    width: 100,
    height: 40
  }
}

const style: Array<PropsType> = []

const attrs: Array<PropsType> = [
  {
    name: '数据配置',
    uid: 'data',
    children: [
      {
        key: 'tagName',
        label: '数据标签',
        type: FormType.TEXT
      },
      {
        key: 'history',
        label: '最新数据',
        type: FormType.TEXT
      }
    ]
  },
  {
    name: '条件',
    uid: 'condition',
    max: 10,
    children: [
      {
        key: 'symbol',
        label: '判别符号',
        type: FormType.SELECT,
        componentOptions: {
          options: [
            { value: '>', label: '大于' },
            { value: '<', label: '小于' },
            { value: '=', label: '等于' },
            { value: '>=', label: '大于等于' },
            { value: '<=', label: '小于等于' },
            { value: '!', label: '不等于' }
          ]
        }
      },
      {
        key: 'value',
        label: '判别值',
        type: FormType.TEXT
      },
      {
        key: 'displayType',
        label: '显示类型',
        type: FormType.SELECT,
        componentOptions: {
          options: [
            { value: 'symbol', label: '符号' },
            { value: 'text', label: '文本' },
            { value: 'image', label: '图片' }
          ]
        }
      },
      {
        key: 'displayContext',
        label: '显示内容',
        type: FormType.TEXT
      },
      {
        key: 'color',
        label: '颜色',
        type: FormType.COLOR
      },
      {
        key: 'fontSize',
        label: '字体大小',
        type: FormType.NUMBER
      },
      {
        key: 'iconFit',
        label: '图片填充方式',
        type: FormType.SELECT,
        componentOptions: {
          options: [
            { value: 'contain', label: '最小填充' },
            { value: 'cover', label: '最大填充' }
          ]
        }
      }
    ]
  }
]

const componentOptions: ComponentOptions = { component, style, attrs }
export default componentOptions
