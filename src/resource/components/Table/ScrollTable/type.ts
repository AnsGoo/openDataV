export interface ScrollTableType {
  header: {
    header: string[],
    headerBGC: string,
    headerHeight: number,
    index: boolean,
    indexHeader: string
  },
  rows: {
    rowNum: number,
    oddRowBGC: string,
    evenRowBGC: string
  },
  columns: {
    columnWidth: string[],
    align: string[]
  }
}
