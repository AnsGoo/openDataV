import { ComponentGroup, FormType } from '@/enum'
import type { PropsType } from '@/types/component'
import { BaseComponent } from '@/resource/models'

export const componentName = 'Decoration3'
class DecorationComponent extends BaseComponent {
  constructor(id?: string, name?: string) {
    super({
      component: componentName,
      group: ComponentGroup.DECORATION,
      name: name ? name : '3#装饰',
      id,
      width: 200,
      height: 60
    })
  }

  _prop: PropsType[] = [
    {
      label: '基础配置',
      prop: 'base',
      children: [
        {
          prop: 'color1',
          label: '颜色1',
          type: FormType.COLOR,
          componentOptions: {
            defaultValue: '#7acaec'
          }
        },
        {
          prop: 'color2',
          label: '颜色2',
          type: FormType.COLOR,
          componentOptions: {
            defaultValue: '#7acaec'
          }
        },
        {
          prop: 'rectWidth',
          label: '单个矩形宽度',
          type: FormType.NUMBER,
          componentOptions: {
            defaultValue: 7
          }
        },
        {
          prop: 'space',
          label: '矩形间距',
          type: FormType.NUMBER,
          componentOptions: {
            defaultValue: 1
          }
        }
      ]
    }
  ]
  _style: PropsType[] = []
}

export default DecorationComponent
