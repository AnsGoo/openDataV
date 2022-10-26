import { onMounted, onUnmounted } from 'vue'
import mitt from 'mitt'
import type { Handler, Emitter } from 'mitt'

const eventBus: Emitter<Events> = mitt<Events>()

export interface ChannelItem {
  value: number
  isRegExp: boolean
}

const channels: Map<string, ChannelItem> = new Map()

type Events = Recordable

function useEventBus(
  key: string,
  handler: Handler<Events | string>,
  options: {
    isAppend: boolean
    isRegExp: boolean
  } = {
    isAppend: false,
    isRegExp: false
  }
) {
  onMounted(() => {
    const { isAppend }: { isAppend: boolean } = options
    if (isAppend) {
      const { value, isRegExp }: ChannelItem = channels.get(key) || { value: 0, isRegExp: false }
      channels.set(key, { value: value + 1, isRegExp })
    }
    eventBus.on(key, handler)
  })

  onUnmounted(() => {
    if (channels.has(key)) {
      const { value, isRegExp }: ChannelItem = channels.get(key) || { value: 0, isRegExp: false }
      if (value === 1) {
        channels.delete(key)
      } else {
        channels.set(key, { value: value - 1, isRegExp })
      }
    }
    eventBus.off(key, handler)
  })

  function emit(data: Events) {
    eventBus.emit(key, data)
  }
  return emit
}

export { eventBus, useEventBus, channels }
