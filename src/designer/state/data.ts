import StaticDataPlugin from 'open-data-v/apiView/static'
import SubDataPlugin from 'open-data-v/apiView/sub'
import WebsocketDataPlugin from 'open-data-v/apiView/websocket'
import QuickDataPlugin from 'open-data-v/data/Quick'
import RestDataPlugin from 'open-data-v/data/Rest'
import DemoDataPlugin from 'open-data-v/designer/data/DemoData'
import { reactive } from 'vue'

interface DataPlugin {
  type: string
  name: string
  component: any
  handler: any
  useTo?: string | Array<string>
  getdefaultOption?: () => any
}

class DataState {
  private state = reactive<{ plugins: Record<string, DataPlugin> }>({
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

  get componentPlugins() {
    const plugins: Record<string, DataPlugin> = {}
    const keys = Object.keys(this.plugins)
    keys.forEach((el: string) => {
      const plugin = this.plugins[el]
      const useTo = plugin.useTo || 'COMPONENT'
      if (useTo === 'COMPONENT' || useTo.includes('COMPONENT')) {
        plugins[el] = plugin
      }
    })
    return plugins
  }

  get globalPlugins() {
    const plugins: Record<string, DataPlugin> = {}
    const keys = Object.keys(this.plugins)
    keys.forEach((el: string) => {
      const plugin = this.plugins[el]
      const useTo = plugin.useTo || 'GLOBAL'
      if (useTo === 'GLOBAL' || useTo.includes('GLOBAL')) {
        plugins[el] = plugin
      }
    })
    return plugins
  }

  public getPlugin(type: string) {
    return this.plugins[type]
  }
}

const dataState = new DataState()
export default function useDataState() {
  return dataState
}
