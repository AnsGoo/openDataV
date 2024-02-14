import type { MetaContainerItem } from '@open-data-v/base'
import { ComponentGroup, CustomComponent, FormType } from '@open-data-v/base'

export const componentName = 'BorderImage'
class BorderImageComponent extends CustomComponent {
  constructor(id?: string, name?: string) {
    super({
      component: componentName,
      group: ComponentGroup.BORDER,
      name: name ? name : '图片边框',
      id,
      width: 300,
      height: 200
    })
  }

  _prop: MetaContainerItem[] = [
    {
      label: '基础配置',
      prop: 'base',
      children: [
        {
          prop: 'borderSource',
          label: '边框图片路径',
          type: FormType.TEXT,
          props: {
            defaultValue: '/images/border-image.png'
          }
        },
        {
          prop: 'borderImageSlice',
          label: '边框图片切片',
          type: FormType.ARRAY,
          props: {
            componentType: FormType.NUMBER,
            type: 'dynamic',
            minItem: 1,
            maxItem: 4,
            defaultValue: ['51', '38', '20', '132']
          }
        },
        {
          prop: 'borderWidth',
          label: '边框宽度',
          type: FormType.ARRAY,
          props: {
            type: 'dynamic',
            minItem: 1,
            maxItem: 4,
            defaultValue: ['40.8px', '30.4px', '16px', '105.6px']
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

export default BorderImageComponent
