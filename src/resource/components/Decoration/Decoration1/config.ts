import { ComponentGroup, FormType } from '@/enum'
import { CustomComponent } from '@/models'
import type { MetaContainerItem } from '@/types/component'

export const componentName = 'Decoration1'
class DecorationComponent extends CustomComponent {
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

  _prop: MetaContainerItem[] = [
    {
      label: '基础配置',
      prop: 'base',
      children: [
        {
          prop: 'color1',
          label: '颜色1',
          type: FormType.COLOR,
          props: {
            defaultValue: '#fff'
          }
        },
        {
          prop: 'color2',
          label: '颜色2',
          type: FormType.COLOR,
          props: {
            defaultValue: '#0de7c2'
          }
        },
        {
          prop: 'pointSideLength',
          label: '点大小',
          type: FormType.NUMBER,
          props: {
            defaultValue: 5
          }
        }
      ]
    }
  ]
  _style: MetaContainerItem[] = []
}

export default DecorationComponent
