import { ComponentGroup, FormType } from '@/enum'
import type { PropsType } from '@/types/component'
import { BaseComponent } from '@/resource/models'

export const componentName = 'BorderBox4'
class BorderBoxComponent extends BaseComponent {
  constructor(id?: string, name?: string) {
    super({
      component: componentName,
      group: ComponentGroup.BORDER,
      name: name ? name : '4#边框',
      id,
      width: 200,
      height: 200
    })
  }

  _prop: PropsType[] = [
    {
      label: '基础配置',
      prop: 'base',
      children: [
        {
          prop: 'colorLeft',
          label: '边框颜色1',
          type: FormType.COLOR,
          componentOptions: {
            defaultValue: '#11eefd'
          }
        },
        {
          prop: 'colorRight',
          label: '边框颜色2',
          type: FormType.COLOR,
          componentOptions: {
            defaultValue: '#0078d2'
          }
        },
        {
          prop: 'backgroundColor',
          label: '底色',
          type: FormType.COLOR,
          componentOptions: {
            defaultValue: '#00000000'
          }
        },
        {
          prop: 'reverse',
          label: '反转',
          type: FormType.SWITCH,
          componentOptions: {
            defaultValue: false
          }
        },
        {
          prop: 'dur',
          label: '时间',
          type: FormType.NUMBER,
          componentOptions: {
            defaultValue: 3
          }
        }
      ]
    }
  ]
  _style: PropsType[] = []
}

export default BorderBoxComponent
