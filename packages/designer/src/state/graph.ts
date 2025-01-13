import type { DataMode } from '@open-data-v/base'
import type { Component } from 'vue'
import { reactive } from 'vue'

import type { DataPlugin } from './data'
import { DataState } from './data'
import { singleton } from './utils'

export interface IManinfest {
  name: string
  title: string
  icon?: string
  size: {
    width: number
    height: number
  }
  extendedMetaData?: Record<string, any>
}
export interface IDragComponentMeta extends IManinfest {
  isContainer: boolean
  dataMode?: DataMode
  panel: Component
}
interface IResolution {
  width: number
  height: number
}

export class GraphState {
  private components = new Map<string, IDragComponentMeta>()
  public state = reactive({
    snapshotMaxStack: 10
  })

  constructor(options: {
    snapshotMaxStack: number
    resolutionOptions?: Record<string, IResolution>
  }) {
    const { snapshotMaxStack = 10, resolutionOptions = {} } = options
    this.state.snapshotMaxStack = snapshotMaxStack
    const resolutionsKeys = Object.keys(resolutionOptions)
    resolutionsKeys.forEach((key) => {
      const { width, height } = resolutionOptions[key]
      this._resolutionOptions[key] = { width, height }
    })
  }
  private _resolutionOptions: Record<string, IResolution> = {
    '2k': {
      width: 1920,
      height: 1080
    },
    '4k': {
      width: 3840,
      height: 2160
    },
    '1080P': {
      width: 1920,
      height: 1080
    }
  }
  get resolutionOptions(): Array<{
    value: IResolution
    label: string
  }> {
    const resolutions: Array<{
      label: string
      value: IResolution
    }> = [
      {
        label: '当前设备',
        value: {
          width: window.innerWidth,
          height: window.innerHeight
        }
      }
    ]
    Object.keys(this._resolutionOptions).forEach((key) => {
      const { width, height } = this._resolutionOptions[key]
      resolutions.push({
        value: { width, height },
        label: key
      })
    })
    return resolutions
  }
  public dataPluginState = new DataState()

  public get snapshotMaxStack() {
    return this.state.snapshotMaxStack
  }

  public loadComponent(componentInfo: IDragComponentMeta): void {
    const { name } = componentInfo
    this.components.set(name, componentInfo)
  }

  public loadDataPlugins(plugins: Array<DataPlugin>) {
    this.dataPluginState.loadPlugins(plugins)
  }

  getComponent(name: string): IDragComponentMeta | undefined {
    return this.components.get(name)
  }
  getComponentPanel(name: string): Component | undefined {
    if (this.components.has(name)) {
      return this.components.get(name)!.panel
    }
  }
}

const State = singleton(GraphState)
export default function useGraphState() {
  return new State() as GraphState
}
