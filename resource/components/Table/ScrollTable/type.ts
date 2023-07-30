export interface ScrollTableType {
  header: {
    header: string[]
    headerBGC: string
    headerHeight: number
    index: boolean
    indexHeader: string
  }
  rows: {
    data: {
      oddRowBGC: string
      evenRowBGC: string
      height: number
    }
  }
}

export interface RowType {
  oddRowBGC: string
  evenRowBGC: string
  height: number
}
