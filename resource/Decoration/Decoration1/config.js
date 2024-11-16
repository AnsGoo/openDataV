import { ComponentGroup, CustomComponent, FormType } from '@open-data-v/base'

export const componentName = 'Decoration1'
class DecorationComponent extends CustomComponent {
  constructor(id, name) {
    super({
      component: componentName,
      group: ComponentGroup.DECORATION,
      name: name ? name : '1#装饰',
      id,
      width: 200,
      height: 60
    })
  }
  _prop = [
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
  _style = []
}
export default DecorationComponent
//# sourceMappingURL=config.js.map
