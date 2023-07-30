import { cloneDeep } from 'lodash-es'
import { reactive } from 'vue'

import type { CustomComponent } from '@/models'

import { copyText, uuid } from '../utils'
import useCanvasState from './canvas'
import type { CopyItem } from './type'

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
    this.copyData.parent = undefined
    this.copyData.groupStyle = undefined
    copyText(JSON.stringify(this.copyData.toJson()))
  }

  paste(isMouse: boolean, x?: number, y?: number): void {
    if (!this.copyData) {
      return
    }

    const canvasState = useCanvasState()

    if (isMouse) {
      this.copyData.change(['position', 'top'], y!, 'style')
      this.copyData.change(['position', 'left'], x!, 'style')
    } else {
      this.copyData.change(['position', 'top'], (this.copyData.style.top as number) + 10, 'style')
      this.copyData.change(['position', 'left'], (this.copyData.style.left as number) + 10, 'style')
    }

    const data = cloneDeep(this.copyData)
    data.id = uuid()
    canvasState.appendComponent(data)
  }
}

const clipBoardState = new ClipBoardState()
export default function useClipBoardState() {
  return clipBoardState
}
