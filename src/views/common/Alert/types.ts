export interface PageType {
  page: number
  pageSize: number
}

export interface SearchType {
  searchTime: string | Date[]
  tagName: string
  alarmType: string
  alarmLevel: string
}

export type AlertType = 'actual' | 'history'
