export interface MenuItem {
  label: string
  icon: string
  key: string
  count: number
  children: Array<{
    label: string
    key: string
  }>
}
