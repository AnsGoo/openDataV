import { reactive } from 'vue'

import StaticDataPlugin from '@/apiView/StaticData'
import SubDataPlugin from '@/apiView/SubData'
import WebsocketDataPlugin from '@/apiView/WebsocketData'
import QuickDataPlugin from '@/data/Quick'
import RestDataPlugin from '@/data/Rest'
import DemoDataPlugin from '@/designer/data/DemoData'

interface DataPlugin {
  type: string
  name: string
  component: any
  handler: any
}

class DataState {
  private state = reactive<{ plugins: Recordable<DataPlugin> }>({
    plugins: {
      [DemoDataPlugin.type]: DemoDataPlugin,
      [StaticDataPlugin.type]: StaticDataPlugin,
      [RestDataPlugin.type]: RestDataPlugin,
      [QuickDataPlugin.type]: QuickDataPlugin,
      [SubDataPlugin.type]: SubDataPlugin,
      [WebsocketDataPlugin.type]: WebsocketDataPlugin
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

  public getPlugin(type: string) {
    return this.plugins[type]
  }
}

const dataState = new DataState()
export default function useDataState() {
  return dataState
}
