import { ComponentGroup, FormType } from '@/enum'
import type { PropsType } from '@/types/component'
import { BaseComponent } from '@/resource/models'

export const componentName = 'BorderBox7'
class BorderBoxComponent extends BaseComponent {
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

  _prop: PropsType[] = [
    {
      label: '基础配置',
      prop: 'base',
      children: [
        {
          prop: 'title',
          label: '标题',
          type: FormType.TEXT,
          componentOptions: {
            defaultValue: '7#边框'
          }
        },
        {
          prop: 'titleWidth',
          label: '标题宽度',
          type: FormType.NUMBER,
          componentOptions: {
            defaultValue: 180
          }
        },
        {
          prop: 'colorLeft',
          label: '边框颜色1',
          type: FormType.COLOR,
          componentOptions: {
            defaultValue: '#1a98fc'
          }
        },
        {
          prop: 'colorRight',
          label: '边框颜色2',
          type: FormType.COLOR,
          componentOptions: {
            defaultValue: '#005A5E'
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

export default BorderBoxComponent
