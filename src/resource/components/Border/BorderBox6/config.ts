import { ComponentGroup, FormType } from '@/enum'
import type { PropsType } from '@/types/component'
import { BaseComponent } from '@/resource/models'

export const componentName = 'BorderBox6'
class BorderBoxComponent extends BaseComponent {
  constructor(id?: string, name?: string) {
    super({
      component: componentName,
      group: ComponentGroup.BORDER,
      name: name ? name : '6#边框',
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
            defaultValue: '#1a98fc'
          }
        },
        {
          prop: 'colorRight',
          label: '边框颜色2',
          type: FormType.COLOR,
          componentOptions: {
            defaultValue: '#2cf7fe'
          }
        },
        {
          prop: 'backgroundColor',
          label: '底色',
          type: FormType.COLOR,
          componentOptions: {
            defaultValue: '#00000000'
          }
        }
      ]
    }
  ]
  _style: PropsType[] = []
}

export default BorderBoxComponent
