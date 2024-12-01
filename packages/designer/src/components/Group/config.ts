import type { Group } from './type'

export function getDefaultValue(): Group {
  return {
    dataOption: {
      channel: '',
      isRegExp: false
    }
  }
}
