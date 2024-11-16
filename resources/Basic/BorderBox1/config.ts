import type { BorderBox } from './type'

export function getDefaultValue(): BorderBox {
  return {
    base: {
      colorLeft: '#4fd2dd',
      colorRight: '#235fa7',
      backgroundColor: 'transparent'
    }
  }
}
