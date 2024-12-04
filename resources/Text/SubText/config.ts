import type { SubTextType } from './type'

export function getDefaultValue(): SubTextType {
  return {
    base: {
      tag: '',
      unit: 'cm',
      label: '',
      url: ''
    },
    font: {
      fontSize: 20,
      color: '#1E90FF',
      fontWeight: 200
    }
  }
}
