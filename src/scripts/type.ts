export interface CallbackType {
  handler?: (resp: any, options: Record<string, any>) => any
  error?: Error
}
