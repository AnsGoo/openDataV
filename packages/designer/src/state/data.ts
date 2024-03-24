import { StaticDataPlugin, SubDataPlugin, WebsocketDataPlugin } from '@open-data-v/data'
import { reactive } from 'vue'

import { DemoDataPlugin } from '../data'

export interface DataPlugin {
  type: string
  name: string
  component: any
  handler: any
  useTo?: string | Array<string>
  getDefaultOption?: () => any
}

class DataState {
  private state = reactive<{ plugins: Record<string, DataPlugin> }>({
    plugins: {
      [DemoDataPlugin.type]: DemoDataPlugin,
      [StaticDataPlugin.type]: StaticDataPlugin,
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

  public loadPlugins(plugins: Array<DataPlugin>) {
    plugins.forEach((el) => {
      this.plugins[el.type] = el
    })
  }
}

const dataState = new DataState()
export default function useDataState() {
  return dataState
}
