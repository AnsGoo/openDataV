import { reactive } from 'vue'

import CustomScriptPlugin from '@/scripts/custom'
import SystemScriptPlugin from '@/scripts/system'

interface ScriptPlugin {
  type: string
  name: string
  component: any
  handler: any
}

class ScriptState {
  private state = reactive<{ plugins: Record<string, ScriptPlugin> }>({
    plugins: {
      [SystemScriptPlugin.type]: SystemScriptPlugin,
      [CustomScriptPlugin.type]: CustomScriptPlugin
    }
  })

  get plugins() {
    return this.state.plugins
  }

  get allScriptType() {
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

const scriptState = new ScriptState()
export default function useScriptState() {
  return scriptState
}
