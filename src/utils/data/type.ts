export interface CallbackType {
  handler?: (resp: any, options: Recordable) => any
  error?: Error
}
