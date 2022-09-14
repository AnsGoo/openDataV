import { ComponentGroup, FormType } from '@/enum'
import type { PropsType } from '@/types/component'
import { BaseComponent } from '@/resource/models'

export const componentName = 'Decoration1'
class DecorationComponent extends BaseComponent {
  constructor(id?: string, name?: string) {
    super({
      component: componentName,
      group: ComponentGroup.DECORATION,
      name: name ? name : '1#装饰',
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
            defaultValue: '#fff'
          }
        },
        {
          prop: 'color2',
          label: '颜色2',
          type: FormType.COLOR,
          componentOptions: {
            defaultValue: '#0de7c2'
          }
        },
        {
          prop: 'pointSideLength',
          label: '点大小',
          type: FormType.NUMBER,
          componentOptions: {
            defaultValue: 5
          }
        }
      ]
    }
  ]
  _style: PropsType[] = []
}

export default DecorationComponent
