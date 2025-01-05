import { CONTEXT } from '@open-data-v/base'
import { inject } from 'vue'

import { systemLogger } from '../utils'
import type { ActionState } from './actions'
import type { CanvasState } from './canvas'

export function useCanvasState(): CanvasState | undefined {
  const context = inject(CONTEXT, null)
  if (!context) {
    systemLogger.error('useCanvasState must be called in setup')
    return
  }
  const { canvasState } = context

  return canvasState
}

export function useActionState(): ActionState | undefined {
  const context = inject(CONTEXT, null)
  if (!context) {
    systemLogger.error('useActionState must be called in setup')
    return
  }
  const { actionState } = context
  return actionState
}
