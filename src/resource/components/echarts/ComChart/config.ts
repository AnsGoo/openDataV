import { ComponentGroup } from '@/enum'
import { BaseComponent } from '@/resource/models'
import { DataIntegrationMode } from '@/resource/models/data'

export const componentName = 'ComChart'
class ComChartComponent extends BaseComponent {
  constructor(id?: string, name?: string, icon?: string) {
    super({
      component: componentName,
      group: ComponentGroup.OTHER,
      name: name ? name : '通用Echart图',
      id,
      width: 500,
      height: 170,
      icon,
      dataIntegrationMode: DataIntegrationMode.UNIVERSAL
    })
  }
}

export default ComChartComponent
