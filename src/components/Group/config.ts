import { ComponentGroup } from '@/enum'
import { BaseComponent } from '@/resource/models'

export const componentName = 'Group'
class GroupComponent extends BaseComponent {
  show = false
  constructor(id?: string, name?: string) {
    super({
      component: componentName,
      group: ComponentGroup.CONTAINER,
      name: name ? name : '分组',
      id,
      width: 200,
      height: 200
    })
  }
}

export default GroupComponent
