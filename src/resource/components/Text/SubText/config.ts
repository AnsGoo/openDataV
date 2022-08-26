import { ComponentGroup, FormType } from '@/enum'
import type { PropsType } from '@/types/component'
import { BaseComponent } from '@/resource/models'

export const componentName = 'SubText'
export class SubTextComponent extends BaseComponent {
  constructor(id?: string, name?: string, icon?: string) {
    super({
      component: componentName,
      group: ComponentGroup.TEXT,
      name: name ? name : '数据订阅文本',
      id,
      width: 100,
      height: 30,
      icon
    })
  }

  _prop: PropsType[] = [
    {
      label: '基础配置',
      prop: 'base',
      children: [
        {
          prop: 'tagName',
          label: '数据标签',
          type: FormType.TEXT,
          componentOptions: {
            defaultValue: ''
          }
        },
        {
          prop: 'url',
          label: '获取数据API',
          type: FormType.TEXT,
          componentOptions: {
            defaultValue: ''
          }
        },
        {
          prop: 'unit',
          label: '单位',
          type: FormType.TEXT,
          componentOptions: {
            defaultValue: ''
          }
        }
      ]
    }
  ]
  _style: PropsType[] = [
    {
      label: '字体设置',
      prop: 'font',
      children: [
        {
          prop: 'color',
          label: '颜色',
          type: FormType.COLOR,
          componentOptions: {
            defaultValue: '#1E90FF'
          }
        },
        {
          prop: 'fontSize',
          label: '字体大小',
          type: FormType.NUMBER,
          componentOptions: {
            defaultValue: 20
          }
        },
        {
          prop: 'fontWeight',
          label: '字体宽度',
          type: FormType.NUMBER,
          componentOptions: {
            defaultValue: 200
          }
        },
        {
          prop: 'fontFamily',
          label: '字体',
          type: FormType.FONT_STYLE,
          componentOptions: {
            defaultValue: 'Arial'
          }
        }
      ]
    }
  ]
}

export default SubTextComponent
