import type { CustomComponent } from '@open-data-v/base'
import { cloneDeep } from 'lodash-es'
import { reactive } from 'vue'

import { copyText, uuid } from '../utils'
import useCanvasState from './canvas'
import type { CopyItem } from './type'
import { singleton } from './utils'

class ClipBoardState {
  public state = reactive<CopyItem>({
    copyData: undefined,
    isCut: false
  })

  get copyData(): Optional<CustomComponent> {
    return this.state.copyData
  }
  set copyData(data: Optional<CustomComponent>) {
    this.state.copyData = data
  }

  get isCut(): boolean {
    return this.state.isCut
  }
  set isCut(isCut: boolean) {
    this.state.isCut = isCut
  }
  copy(data: CustomComponent) {
    this.copyData = cloneDeep(data)
    this.copyData!.parent = undefined
    this.copyData!.groupStyle = undefined
    copyText(JSON.stringify(this.copyData!.toJson()))
  }

  paste(isMouse: boolean, x?: number, y?: number): void {
    if (!this.copyData) {
      return
    }

    const canvasState = useCanvasState()

    if (isMouse) {
      this.copyData.changePosition('top', y!)
      this.copyData.changePosition('left', x!)
    } else {
      this.copyData.changePosition('top', (this.copyData.style.top as number) + 10)
      this.copyData.changePosition('left', (this.copyData.style.left as number) + 10)
    }

    const data = cloneDeep(this.copyData)
    data.id = uuid()
    canvasState.appendComponent(data)
  }
}

const State = singleton(ClipBoardState)
export default function useClipBoardState() {
  return new State() as ClipBoardState
}
