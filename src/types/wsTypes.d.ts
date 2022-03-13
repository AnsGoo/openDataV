interface TagType {
  TagName: string
  TagValue: string
}

interface AlarmType {
  TagName: string
  TagValue: string
  AlarmType: number
  AlarmDescription: string
  AlarmTime: string
  AlarmValue: string
  DEV: number
  Level: number
}

interface AlarmInfo {
  date: string
  desc: string
  level: number
  type: number
  alarmValue: string
  tagValue: string
}

// websocket 数据类型
interface WSDataType {
  TagName: string
  TagValue: string
}


interface WSData {
  actualData: Array<WSDataType>
}

export { WSData, WSDataType, TagType, AlarmType, AlarmInfo }
