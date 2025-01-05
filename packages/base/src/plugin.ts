import type { BaseComponent } from './component'

export abstract class BasePlugin<T extends { name: string }> {
  private pluginMap = new Map<string, T>()

  constructor(_component: BaseComponent) {}

  get plugins() {
    const plugins: Record<string, T> = {}
    this.pluginMap.forEach((value, key) => {
      plugins[key] = value
    })
    return plugins
  }

  public getPlugin(name: string) {
    return this.pluginMap.get(name)
  }

  public loadPlugins(plugins: Array<T>) {
    plugins.forEach((plugin) => {
      this.pluginMap.set(plugin.name, plugin)
    })
  }
}
