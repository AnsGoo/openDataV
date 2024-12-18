import type { CustomComponent } from '@open-data-v/base'
import type { ContextmenuItem } from 'type'

import { useCanvasState, useClipBoardState } from '../../state'

const useComponentActions = () => {
  const canvasState = useCanvasState()
  const clipBoardState = useClipBoardState()

  const copy = (component: CustomComponent, _level: string) => {
    if (component) {
      clipBoardState.copy(component.toJson(false))
    }
  }

  const remove = async (component: CustomComponent, _level: string) => {
    canvasState.removeComponent(component)
  }

  const up = async (component: CustomComponent, level: string) => {
    const indexes: number[] = level.split('-').map((i) => Number(i))
    canvasState.upComponent(component, indexes[indexes.length - 1])
    canvasState.activateComponent(component)
  }

  const down = (component: CustomComponent, level: string) => {
    const indexes: number[] = level.split('-').map((i) => Number(i))
    canvasState.downComponent(component, indexes[indexes.length - 1])
    canvasState.activateComponent(component)
  }
  const cut = (component: CustomComponent, _level: string) => {
    const removedComponent: CustomComponent | undefined = canvasState.removeComponent(component)
    if (removedComponent) {
      clipBoardState.copy(removedComponent.toJson(false))
    }
  }

  const top = (component: CustomComponent, _level: string) => {
    canvasState.topComponent(component as CustomComponent)
    canvasState.activateComponent(component)
  }

  const bottom = async (component: CustomComponent, _level: string) => {
    canvasState.bottomComponent(component as CustomComponent)
    canvasState.activateComponent(component)
  }

  const hidden = (component: CustomComponent, _level: string) => {
    if (component) component.setVisible(false)
    canvasState.deactivateComponent()
  }

  const display = (component: CustomComponent, _level: string) => {
    if (component) component.setVisible(true)
    canvasState.activateComponent(component)
  }
  const decompose = (component: CustomComponent, _level: string) => {
    canvasState.activateComponent(component)
    canvasState.decompose()
    canvasState.deactivateComponent()
  }

  const activateComponent = (component: CustomComponent) => {
    canvasState.activateComponent(component)
  }
  const deactivateComponent = () => {
    canvasState.deactivateComponent()
  }

  return {
    copy,
    remove,
    up,
    down,
    top,
    bottom,
    hidden,
    display,
    decompose,
    cut,
    activateComponent,
    deactivateComponent
  }
}

const useComponentContextMenu = () => {
  const { copy, remove, up, down, top, bottom, hidden, display, decompose, cut } =
    useComponentActions()
  const contextmenus = (component: CustomComponent, level: string): ContextmenuItem[] => {
    return [
      {
        text: '复制',
        subText: 'Ctrl + C',
        handler: () => copy(component, level)
      },
      {
        text: '剪切',
        subText: 'Ctrl + X',
        handler: () => cut(component, level)
      },
      {
        text: '拆分',
        subText: '',
        disable: !component.isContainer,
        handler: () => decompose(component, level)
      },
      {
        text: '删除',
        subText: '',
        handler: () => remove(component, level)
      },
      { divider: true },
      {
        text: '置于顶层',
        handler: () => top(component, level),
        children: [
          { text: '置于顶层', handler: () => top(component, level) },
          { text: '上移一层', handler: () => up(component, level) }
        ]
      },
      {
        text: '置于底层',
        handler: () => bottom(component, level),
        children: [
          { text: '置于底层', handler: () => bottom(component, level) },
          { text: '下移一层', handler: () => down(component, level) }
        ]
      },
      { divider: true },
      {
        text: '显示',
        disable: component?.display,
        subText: '',
        handler: () => display(component, level)
      },
      {
        text: '隐藏',
        disable: !component.display,
        subText: '',
        handler: () => hidden(component, level)
      }
    ]
  }
  return contextmenus
}

export { useComponentActions, useComponentContextMenu }
