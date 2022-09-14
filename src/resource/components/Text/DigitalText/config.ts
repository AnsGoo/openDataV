import { ComponentGroup, FormType } from '@/enum'
import type { PropsType } from '@/types/component'
import { BaseComponent } from '@/resource/models'

export const componentName = 'Digital'
class DigitalTextComponent extends BaseComponent {
  constructor(id?: string, name?: string, icon?: string) {
    super({
      component: componentName,
      group: ComponentGroup.TEXT,
      name: name ? name : '数字文本',
      id,
      width: 100,
      height: 30,
      icon
    })
  }

  _prop: PropsType[] = [
    {
      label: '数据配置',
      prop: 'dataconfig',
      children: [
        {
          prop: 'data',
          label: '数据',
          type: FormType.NUMBER,
          componentOptions: {
            defaultValue: 10
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
            defaultValue: 'skyblue'
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
          type: FormType.FONT_WEIGHT,
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

export default DigitalTextComponent
