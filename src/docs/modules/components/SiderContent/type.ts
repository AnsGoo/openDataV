export interface MenuItem {
  label: string
  icon: string
  key: string
  children: Array<{
    label: string
    key: string
  }>
}
