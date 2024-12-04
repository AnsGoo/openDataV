export interface StaticTextType {
  base: {
    text: string
    type: 'text' | 'symbol'
  }
  font: {
    fontSize: number
    color: string
    fontWeight: number
  }
}
