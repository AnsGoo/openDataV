import { ComponentGroup, FormType } from '@/enum'
import { BaseComponent } from '@/resource/models'

export const componentName = 'Group'
export class GroupComponent extends BaseComponent {
  show: boolean = false
  constructor(id?: string, name?: string) {
    super(componentName, ComponentGroup.BASIC, name ? name : '分组', id, 200, 200)
  }
}

export default GroupComponent
