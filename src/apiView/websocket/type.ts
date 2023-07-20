export interface WebsocketOption {
  url: string
  message: string
  timeout: number
  isRetry: boolean
  maxRetryCount: number
}
