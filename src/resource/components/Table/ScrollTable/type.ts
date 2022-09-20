export interface ScrollTableType {
  header: {
    column: TableColumnData[]
    headerBGC: string
    headerHeight: number
    index: boolean
    indexHeader: string
  }
  rows: {
    rowNum: number
    oddRowBGC: string
    evenRowBGC: string
    height: number
  }
  columns: {
    columnWidth: string[]
    align: string[]
  }
}

export interface TableColumnData {
  name: string
  width: string
  align: 'left' | 'right' | 'center'
}
