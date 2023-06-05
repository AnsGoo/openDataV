import { ComponentGroup } from '@/enum'
import { DataIntegrationMode } from '@/enum/data'
import { CustomComponent } from '@/models'

export const componentName = 'Group'
class GroupComponent extends CustomComponent {
  show = false
  constructor(id?: string, name?: string) {
    super({
      component: componentName,
      group: ComponentGroup.CONTAINER,
      name: name ? name : '分组',
      id,
      width: 200,
      height: 200,
      dataIntegrationMode: DataIntegrationMode.UNIVERSAL
    })
  }
}

export default GroupComponent
