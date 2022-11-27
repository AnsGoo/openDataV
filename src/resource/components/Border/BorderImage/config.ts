import { ComponentGroup, FormType } from '@/enum'
import type { PropsType } from '@/types/component'
import { BaseComponent } from '@/resource/models'

export const componentName = 'BorderImage'
class BorderImageComponent extends BaseComponent {
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

  _prop: PropsType[] = [
    {
      label: '基础配置',
      prop: 'base',
      children: [
        {
          prop: 'borderSource',
          label: '边框图片路径',
          type: FormType.TEXT,
          componentOptions: {
            defaultValue: '/images/border-image.png'
          }
        },
        {
          prop: 'borderImageSlice',
          label: '边框图片切片',
          type: FormType.ARRAY,
          componentOptions: {
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
          componentOptions: {
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
          componentOptions: {
            defaultValue: 'transparent'
          }
        }
      ]
    }
  ]
  _style: PropsType[] = []
}

export default BorderImageComponent
