/**
 * @description 快捷键操作
 * @description 根据 [vueuse - useMagicKeys]{@link https://github.com/vueuse/vueuse/blob/main/packages/core/useMagicKeys/index.ts} 修改
 */
import { DefaultMagicKeysAliasMap, useEventListener } from '@vueuse/core'
import { onBeforeUnmount } from 'vue'
import { isFunction } from 'lodash-es'

const defaultWindow = document.querySelector('body')

export interface UseMagicKeysOptions {
  /**
   * Target for listening events
   *
   * @default body element
   */
  target?: EventTarget

  /**
   * Alias map for keys, all the keys should be lowercase
   * { target: keycode }
   *
   * @example { ctrl: "control" }
   * @default <predefined-map>
   */
  aliasMap?: Recordable<string>
}

/**
 * 操作按键
 *
 * 根据 [vueuse - useMagicKeys]{@see https://github.com/vueuse/vueuse/blob/main/packages/core/useMagicKeys/index.ts} 修改
 *
 * @param { UseMagicKeysOptions } [options={}] 设置
 */
export function useHandleKey(options: UseMagicKeysOptions = {}): any {
  const { target = defaultWindow, aliasMap = DefaultMagicKeysAliasMap } = options

  const current = new Set<string>()
  const refs: Record<string, any> = {
    current
  }
  // 用于循环数据
  const metaDeps = new Set<string>()
  // 使用过的数组
  const usedKeys = new Set<string>()

  function setRefs(key: string, value: boolean) {
    refs[key] = value
  }

  function reset() {
    for (const key of usedKeys) setRefs(key, false)
  }

  function updateRefs(e: KeyboardEvent, value: boolean) {
    const key = e.key?.toLowerCase()
    const code = e.code?.toLowerCase()
    const values = [code, key].filter(Boolean)

    // current set
    if (key) {
      if (value) current.add(key)
      else current.delete(key)
    }

    for (const key of values) {
      usedKeys.add(key)
      setRefs(key, value)
    }

    // #1312
    // In macOS, keys won't trigger "keyup" event when Meta key is released
    // We track its combination and release manually
    if (key === 'meta' && !value) {
      // Meta key released
      metaDeps.forEach((key) => {
        current.delete(key)
        setRefs(key, false)
      })
      metaDeps.clear()
    } else if (typeof e.getModifierState === 'function' && e.getModifierState('Meta') && value) {
      ;[...current, ...values].forEach((key) => metaDeps.add(key))
    }
  }

  const cleanupKeyDown = useEventListener(target, 'keydown', (e: KeyboardEvent) => {
    updateRefs(e, true)
  })
  const cleanupKeyUp = useEventListener(target, 'keyup', (e: KeyboardEvent) => {
    updateRefs(e, false)
  })

  function handleKey(keyboard, cb: Function) {
    const cleanupListener = useEventListener(target, 'keydown', (e: KeyboardEvent) => {
      // create new tracking
      if (/[+_-]/.test(keyboard)) {
        const keys = keyboard.split(/[+_-]/g).map((i) => i.trim())
        refs[keyboard] = keys
          .map((key) => {
            if (key in aliasMap) {
              key = aliasMap[key]
            }
            return key
          })
          .every((key) => refs?.[key])
      } else {
        refs[keyboard] = false
      }

      if (refs[keyboard]) {
        if (cb && isFunction(cb)) {
          cb(e)
        }
      }
    })

    onBeforeUnmount(() => {
      reset()
      cleanupKeyUp()
      cleanupKeyDown()
      cleanupListener()
    })
  }

  return handleKey
}
