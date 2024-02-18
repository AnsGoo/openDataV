export const useWebsocket = (): WebSocketInstance => {
  return WebSocket
}

export interface WebSocketInstance {
  new (url: string | URL, protocols?: string | string[]): WebSocket
}
