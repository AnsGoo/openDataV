import type { MetaContainerItem } from 'open-data-v/base'
import { ComponentGroup, CustomComponent, FormType } from 'open-data-v/base'

export const componentName = 'BorderBox7'
class BorderBoxComponent extends CustomComponent {
  constructor(id?: string, name?: string) {
    super({
      component: componentName,
      group: ComponentGroup.BORDER,
      name: name ? name : '7#边框',
      id,
      width: 459,
      height: 300
    })
  }

  _prop: MetaContainerItem[] = [
    {
      label: '基础配置',
      prop: 'base',
      children: [
        {
          prop: 'title',
          label: '标题',
          type: FormType.TEXT,
          props: {
            defaultValue: '7#边框'
          }
        },
        {
          prop: 'titleWidth',
          label: '标题宽度',
          type: FormType.NUMBER,
          props: {
            defaultValue: 180
          }
        },
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
            defaultValue: '#005A5E'
          }
        },
        {
          prop: 'backgroundColor',
          label: '底色',
          type: FormType.COLOR,
          props: {
            defaultValue: 'transparent'
          }
        }
      ]
    }
  ]
  _style: MetaContainerItem[] = []
}

export default BorderBoxComponent
