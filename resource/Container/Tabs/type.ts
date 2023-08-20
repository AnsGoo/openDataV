export interface Tabs {
  label: {
    items: Array<string>
    mode?: 'vertical' | 'horizontal'
  }

  style: {
    height: number
    color: string
    fontSize: number
    fontWeight: number
    fontFamily: number
  }
}
