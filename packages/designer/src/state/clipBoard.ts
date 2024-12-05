import type { IComponentData } from '@open-data-v/base'
import { cloneDeep } from 'lodash-es'
import { reactive } from 'vue'

import { copyText, createComponent } from '../utils'
import useCanvasState from './canvas'
import type { CopyItem } from './type'
import { singleton } from './utils'

class ClipBoardState {
  public state = reactive<CopyItem>({
    copyData: undefined,
    isCut: false
  })

  get copyData(): Optional<IComponentData> {
    return this.state.copyData
  }
  set copyData(data: Optional<IComponentData>) {
    this.state.copyData = data
  }

  get isCut(): boolean {
    return this.state.isCut
  }
  set isCut(isCut: boolean) {
    this.state.isCut = isCut
  }
  copy(data: IComponentData) {
    this.copyData = cloneDeep(data)
    this.copyData!.relativePosition = undefined
    copyText(JSON.stringify(this.copyData))
  }

  paste(isMouse: boolean, x?: number, y?: number): void {
    if (!this.copyData) {
      return
    }

    const canvasState = useCanvasState()
    const componentCopy = createComponent(this.copyData)
    if (isMouse) {
      componentCopy.changePositions({
        top: y!,
        left: x!
      })
    } else {
      componentCopy.changePositions({
        top: (this.copyData.position.top as number) + 10,
        left: (this.copyData.position.left as number) + 10
      })
    }
    canvasState.appendComponent(componentCopy)
  }
}

const State = singleton(ClipBoardState)
export default function useClipBoardState() {
  return new State() as ClipBoardState
}
