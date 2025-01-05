import type { DataMode } from '@open-data-v/base'
import type { Component } from 'vue'
import { reactive } from 'vue'

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

  public loadComponent(componentInfo: IDragComponentMeta): void {
    const { name } = componentInfo
    this.components.set(name, componentInfo)
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
