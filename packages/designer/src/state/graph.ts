import type { CustomComponent, DataMode } from '@open-data-v/base'
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

class GraphState {
  private components = new Map<string, IDragComponentMeta>()
  constructor() {}
  public state = reactive({})
  public resolutionOptions: Array<{
    value: {
      width: number
      height: number
    }
    label: string
  }> = [
    {
      value: {
        width: window.screen.width,
        height: window.screen.height
      },
      label: '当前设备'
    },
    {
      value: {
        width: 3840,
        height: 2160
      },
      label: '4k'
    },
    {
      value: {
        width: 2560,
        height: 1440
      },
      label: '2k'
    },
    {
      value: {
        width: 1920,
        height: 1080
      },
      label: '1080P'
    },
    {
      value: {
        width: 1280,
        height: 720
      },
      label: '720P'
    },
    {
      value: {
        width: 640,
        height: 360
      },
      label: '360P'
    },
    {
      value: {
        width: 320,
        height: 180
      },
      label: '180P'
    }
  ]
  public dataPluginState = new DataState()

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
