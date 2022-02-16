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

interface WSAlertDataType extends WSDataType {
  AlarmDescription: string
  AlarmValue: string
  AlarmType: number
  Level: number
  AlarmTime: string
}

interface WSData {
  alertData: Array<WSAlertDataType>
  actualData: Array<WSDataType>
}

export { WSData, WSDataType, WSAlertDataType, TagType, AlarmType, AlarmInfo }
