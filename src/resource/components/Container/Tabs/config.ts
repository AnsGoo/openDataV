import { ComponentGroup, FormType } from '@/enum'
import type { PropsType } from '@/types/component'
import { BaseComponent } from '@/resource/models'

export const componentName = 'Tabs'
class TabsComponent extends BaseComponent {
  constructor(id?: string, name?: string) {
    super({
      component: componentName,
      group: ComponentGroup.CONTAINER,
      name: name ? name : '标签页',
      id,
      width: 400,
      height: 200
    })
  }

  _prop: PropsType[] = [
    {
      label: '标签配置',
      prop: 'label',
      children: [
        {
          prop: 'items',
          label: '标签',
          type: FormType.ARRAY,
          componentOptions: {
            type: 'dynamic',
            defaultValue: ['标签1', '标签2'],
            minItem: 1
          }
        }
      ]
    }
  ]
  _style: PropsType[] = []
  private _items: Recordable<Array<BaseComponent>> = {}
  get items(): Recordable<Array<BaseComponent>> {
    return this._items
  }
  setItem(key: string, component: BaseComponent): void {
    if (!this.items[key]) {
      this._items[key] = [component]
    } else {
      if (this.items[key].findIndex((el) => el.id === component.id) === -1) {
        this._items[key].push(component)
      }
    }
  }
}

export default TabsComponent
