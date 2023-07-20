import { reactive } from 'vue'

import StaticDataPlugin from '@/apiView/static'
import SubDataPlugin from '@/apiView/sub'
import WebsocketDataPlugin from '@/apiView/websocket'
import QuickDataPlugin from '@/data/Quick'
import RestDataPlugin from '@/data/Rest'
import DemoDataPlugin from '@/designer/data/DemoData'

interface DataPlugin {
  type: string
  name: string
  component: any
  handler: any
  useTo?: string | Array<string>
  getdefaultOption?: () => any
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

  get componentPlugins() {
    const plugins: Recordable<DataPlugin> = {}
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
    const plugins: Recordable<DataPlugin> = {}
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
