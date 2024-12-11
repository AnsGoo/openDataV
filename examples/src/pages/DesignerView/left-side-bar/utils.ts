export const diffIndex = (fromIndex: string, toIndex: string): boolean => {
  if (fromIndex && toIndex && fromIndex !== toIndex) {
    const fromLength = fromIndex.length
    const toLength = toIndex.length
    const length = Math.min(toLength, fromLength)
    if (fromIndex.substring(0, length) === toIndex.substring(0, length)) {
      return toLength <= fromLength
    } else {
      return true
    }
  } else {
    return false
  }
}
