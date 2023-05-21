import { reactive } from 'vue'

import RestDataPlugin from '@/apiView/DynamicData'
import StaticDataPlugin from '@/apiView/StaticData'
import DemoDatePlugin from '@/designer/data/DemoData'

interface DataPlugin {
  type: string
  name: string
  component: any
}

class DataState {
  private state = reactive<{ plugins: Recordable<DataPlugin> }>({
    plugins: {
      [DemoDatePlugin.type]: DemoDatePlugin,
      [StaticDataPlugin.type]: StaticDataPlugin,
      [RestDataPlugin.type]: RestDataPlugin
    }
  })

  get plugins() {
    return this.state.plugins
  }

  get allDataType() {
    const options: Array<{ label: string; value: string }> = []
    const keys = Object.keys(this.plugins)
    keys.forEach((el) => {
      const plugin = this.plugins[el]
      options.push({
        label: plugin.name,
        value: plugin.type
      })
    })
    return options
  }

  public getDataComponent(type: string) {
    return this.plugins[type]
  }
}

const dataState = new DataState()
export default function useDataState() {
  return dataState
}
