import { ComponentGroup, CustomComponent, FormType } from '@open-data-v/base'

export const componentName = 'BorderBox6'
class BorderBoxComponent extends CustomComponent {
  constructor(id, name) {
    super({
      component: componentName,
      group: ComponentGroup.BORDER,
      name: name ? name : '6#边框',
      id,
      width: 200,
      height: 200
    })
  }
  _prop = [
    {
      label: '基础配置',
      prop: 'base',
      children: [
        {
          prop: 'colorLeft',
          label: '边框颜色1',
          type: FormType.COLOR,
          props: {
            defaultValue: '#1a98fc'
          }
        },
        {
          prop: 'colorRight',
          label: '边框颜色2',
          type: FormType.COLOR,
          props: {
            defaultValue: '#2cf7fe'
          }
        },
        {
          prop: 'backgroundColor',
          label: '底色',
          type: FormType.COLOR,
          props: {
            defaultValue: '#00000000'
          }
        }
      ]
    }
  ]
  _style = []
}
export default BorderBoxComponent
//# sourceMappingURL=config.js.map
