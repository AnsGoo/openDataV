export interface IComponentItem {
  name: () => any
  key: string
  icon: () => any
  children?: Array<IComponentItem>
}
