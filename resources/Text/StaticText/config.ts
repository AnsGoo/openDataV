import type { StaticTextType } from './type'

export function getDefaultValue(): StaticTextType {
  return {
    base: {
      text: 'OpenDataV',
      type: 'text'
    },
    font: {
      fontSize: 20,
      color: '#1E90FF',
      fontWeight: 200
    }
  }
}
