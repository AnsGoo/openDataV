interface TagType {
  TagName: string
  TagValue: string
}

// websocket 数据类型
interface WSDataType {
  TagName: string
  TagValue: string
}

interface WSData {
  actualData: Array<WSDataType>
}

export { WSData, WSDataType, TagType }
