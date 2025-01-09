import { CONTEXT } from '@open-data-v/base'
import { inject } from 'vue'

import { systemLogger } from '../utils'
import type { CanvasState } from './canvas'
import type { SelectionState } from './selection'

export function useCanvasState(): CanvasState | undefined {
  const context = inject(CONTEXT, null)
  if (!context) {
    systemLogger.error('useCanvasState must be called in setup')
    return
  }
  const { canvasState } = context

  return canvasState
}

export function useSelectionState(): SelectionState | undefined {
  const context = inject(CONTEXT, null)
  if (!context) {
    systemLogger.error('useSelectionState must be called in setup')
    return
  }
  const { selectionState } = context
  return selectionState
}
