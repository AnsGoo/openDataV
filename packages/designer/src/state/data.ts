import { BasePlugin } from '@open-data-v/base'

export interface DataPlugin {
  title: string
  type: string
  name: string
  component: any
  handler: any
  useTo?: string | Array<string>
  getDefaultOption?: () => any
}

export class DataState extends BasePlugin<DataPlugin> {
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
}
