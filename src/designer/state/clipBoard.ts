import { cloneDeep } from 'lodash-es'
import { reactive } from 'vue'

import type { CustomComponent } from '@/models'
import type { CopyItem } from '@/types/storeTypes'
import { copyText, uuid } from '@/utils/utils'

import useCanvasState from './canvas'

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
      this.copyData.change('top', y!)
      this.copyData.change('left', x!)
    } else {
      this.copyData.change('top', (this.copyData.style.top as number) + 10)
      this.copyData.change('left', (this.copyData.style.left as number) + 10)
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
